package feed.service;

import com.mongodb.WriteConcern;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;
import com.mongodb.util.JSON;

import feed.domain.Recipe;

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
      logger.info("WriteResult for insert: {}", result);
      logger.info("result.getLastConcert: {}", result.getLastConcern());
      logger.info("UpsertedId: {}", result.getUpsertedId());
      /*
      if (result.getN() != 1) {
         logger.error("The recipe object was not inserted successfully. {}", recipe);
         throw new RuntimeException(String.format("The recipe could not be inserted: %1s", recipe));
      }
      */
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

      DBObject dbObj = new BasicDBObject("_id", id);
      DBObject result = collection.findOne(dbObj);
      return Recipe.toObject(result.toString());
   }

}
