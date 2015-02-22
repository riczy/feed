package feed.service;

import com.mongodb.DBCursor;
import com.mongodb.WriteConcern;
import feed.domain.OrderByParameters;
import feed.domain.SearchParameters;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;
import com.mongodb.util.JSON;

import feed.domain.Recipe;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * The service manager for handling persistence for recipe objects.
 * </p>
 *
 * Use the #getInstance method to obtain a instance for making calls to the
 *
 * service.
 * </p>
 */
public class RecipeService {
   
   protected final static Logger logger = LoggerFactory.getLogger(RecipeService.class.getName());
   private final static int DEFAULT_SKIP = 0;
   private final static int DEFAULT_LIMIT = 20;
   private final static RecipeService service;
   private DBCollection collection;

   static {
      service = new RecipeService();
   }

   /**
    * Returns an instance of this Recipe service.
    *
    * @return  A recipe service instance.
    */
   public static RecipeService getInstance() {
      return service;
   }
   
   private RecipeService() {
      collection = DatabaseClient.getDB().getCollection("recipe");
   }

   /**
    * Saves the given recipe instance to a persistent store.
    * </p>
    * 
    * @param   recipe The recipe instance to save.
    * @return  The unique id of the instance that was inserted.
    * @throws  RuntimeException If the insert failed.
    */
   public Recipe save(Recipe recipe) {

      boolean isNew = false;
      Date now = new Date();
      WriteResult result;

      if (recipe.getId() == null) {
         recipe.setId(new ObjectId().toString());
         recipe.setCreatedDate(now);
         isNew = true;
      }
      recipe.setModifiedDate(now);
      DBObject dbObj = (DBObject)JSON.parse(recipe.toJson());

      result = isNew ?
              collection.insert(dbObj, WriteConcern.ACKNOWLEDGED) :
              collection.update(new BasicDBObject("_id", recipe.getId()), dbObj);

      logger.debug("The save result for recipe id #{}: {}", recipe.getId(), result);
      return recipe;
   }
   
   /**
    * Returns the recipe instance that is uniquely identified by the give id.
    * If no matching instance exists then null is returned.
    * </p>
    * 
    * @param   id The unique id of the recipe instance to find. Required.
    * @return  The recipe that is uniquely identified by the given id or null
    *          if no matching recipe is found.
    */
   public Recipe find(String id) {

      DBObject query = new BasicDBObject("_id", id);
      DBObject result = collection.findOne(query);
      return result == null ? null : Recipe.toObject(result.toString());
   }

   /**
    * Searches and returns recipe objects that match the criteria given.
    * </p>
    *
    * @param   searchParameters The criteria used to find recipes. In addition,
    *          paging information is provided here. If no paging information is
    *          given then the default values are used. Required.
    * @param   orderBy Information that indicates how the results should be
    *          sorted. If null or empty then no explicit sorting is applied.
    * @return  A collection of recipe objects that match the given criteria.
    *          If no matches were found then an empty collection is returned.
    */
   public List<Recipe> search(SearchParameters searchParameters, OrderByParameters orderBy) {

      ArrayList<Recipe> results = new ArrayList<>();
      int limit = DEFAULT_LIMIT;
      int skip = DEFAULT_SKIP;

      if (searchParameters.getPageSize() != null && searchParameters.getPageSize() > 0) {
         limit = searchParameters.getPageSize();
      }
      if (searchParameters.getPage() != null && searchParameters.getPage() > 0) {
         skip = (searchParameters.getPage() - 1) * limit;
      }

      DBObject query = this.createQueryObject(searchParameters);
      DBObject sort = this.createOrderByObject(orderBy);

      logger.debug("Search Query: {}", query);
      logger.debug("Search Sort:  {}", sort);
      logger.debug("Search Skip:  {}", skip);
      logger.debug("Search Limit: {}", limit);

      DBCursor cursor = collection.find(query).sort(sort).skip(skip).limit(limit);
      Iterator<DBObject> iterator = cursor.iterator();
      int resultCount = 0;
      while (iterator.hasNext()) {
         String recipeJson = iterator.next().toString();
         logger.trace("Search Result {}: {}", ++resultCount, recipeJson);
         results.add(Recipe.toObject(recipeJson));
      }
      cursor.close();
      logger.debug("Search Results Count: {}", resultCount);

      return results;
   }

   /**
    * Deletes the recipe that is uniquely identified by the given id.
    *
    * @param   id The value that uniquely identifies the recipe to be deleted.
    * @return  true if the delete was successful and false if not.
    */
   public boolean delete(String id) {

      WriteResult result = collection.remove(new BasicDBObject("_id", id), WriteConcern.ACKNOWLEDGED);
      logger.debug("The result of Recipe #{} delete: {}", id, result);
      return true;
   }

   /**
    * Returns the number of documents that match the given criteria.
    * </p>
    *
    * @param   criteria The criteria used to find recipes. Required.
    * @return  An integer that indicates how many documents match the given
    *          criteria.
    */
   public long count(SearchParameters criteria) {

      DBObject query = this.createQueryObject(criteria);
      return collection.count(query);
   }

   /**
    * Creates the object that establishes the query criteria for matching
    * recipe records.
    * </p>
    *
    * @param   criteria The search criteria from which the query object is
    *          built. Required.
    * @return  The db object specifying the given criteria.
    */
   private DBObject createQueryObject(SearchParameters criteria) {

      DBObject query = new BasicDBObject();
      if (criteria != null) {
         if (criteria.getText() != null) {
            query.put("$text", new BasicDBObject("$search", criteria.getText()));
         }
      }
      return query;
   }

   /**
    * Creates the object that establishes the ordering when searching for
    * recipe records.
    * </p>
    *
    * @param   orderBy The sort criteria from which the ordering of the
    *          results will be build.
    * @return  The db object specifying the given sort criteria.
    */
   private DBObject createOrderByObject(OrderByParameters orderBy) {

      DBObject sort = new BasicDBObject();
      if (orderBy != null) {
         Iterator<OrderByParameters.OrderByPair> iter = orderBy.iterator();
         while (iter.hasNext()) {
            OrderByParameters.OrderByPair pair = iter.next();
            sort.put(pair.getColumn().getColumnName(), pair.getSortDirection().getDirection());
         }
      }
      return sort;
   }

}
