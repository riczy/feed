package feed.service;

import com.mongodb.BasicDBList;
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

import javax.persistence.OrderBy;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * The service manager for handling persistence for recipe objects.
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

      logger.debug("Query: {}", query);
      logger.debug("Sort:  {}", sort);
      logger.debug("Skip:  {}", skip);
      logger.debug("Limit: {}", limit);

      DBCursor cursor = collection.find(query).sort(sort).skip(skip).limit(limit);
      Iterator<DBObject> iterator = cursor.iterator();
      int resultCount = 1;
      while (iterator.hasNext()) {
         String recipeJson = iterator.next().toString();
         logger.debug("Result {}: {}", resultCount++, recipeJson);
         results.add(Recipe.toObject(recipeJson));
      }
      cursor.close();

      return results;
   }

   public long count(SearchParameters criteria) {

      DBObject query = this.createQueryObject(criteria);
      return collection.count(query);
   }

   private DBObject createQueryObject(SearchParameters criteria) {

      DBObject query = new BasicDBObject();
      if (criteria.getText() != null) {
         query.put("$text", new BasicDBObject("$search", criteria.getText()));
      }
      return query;
   }

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
