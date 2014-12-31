package feed.service;

import com.mongodb.BasicDBList;
import com.mongodb.DBCursor;
import com.mongodb.WriteConcern;
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
import java.util.Iterator;
import java.util.List;

/**
 * <p>
 * The service manager for handling persistence for recipe objects.
 * </p>
 */
public class RecipeService {
   
   protected final static Logger logger = LoggerFactory.getLogger(RecipeService.class.getName());
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
    * <p>
    * Saves the given recipe instance to a persistent store.
    * </p>
    * 
    * @param   recipe The recipe instance to save.
    * @return  The unique id of the instance that was inserted.
    * @throws  RuntimeException If the insert failed.
    */
   public ObjectId save(Recipe recipe) {

      if (recipe.getId() == null) {
         recipe.setId(new ObjectId());
      }
      DBObject dbObj = (DBObject)JSON.parse(recipe.toJson());
      WriteResult result = collection.insert(dbObj, WriteConcern.ACKNOWLEDGED);
      logger.debug("The recipe save result for id #{}: {}", recipe.getId(), result);
      return recipe.getId();
   }
   
   /**
    * <p>
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
      return Recipe.toObject(result.toString());
   }

   public List<Recipe> search(SearchParameters searchParameters) {

      ArrayList<Recipe> results = new ArrayList<>();

      // TODO: add limit & skip
      BasicDBList orValues = new BasicDBList();
      orValues.add(new BasicDBObject("title", searchParameters.getText()));
      orValues.add(new BasicDBObject("description", searchParameters.getText()));
      DBObject query = new BasicDBObject("$or", orValues);

      DBCursor cursor = collection.find(query);
      Iterator<DBObject> iterator = cursor.iterator();
      while (iterator.hasNext()) {
         results.add(Recipe.toObject(iterator.next().toString()));
      }
      cursor.close();

      return results;
   }

}
