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
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
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
         recipe.setId(new ObjectId());
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
      return Recipe.toObject(result.toString());
   }

   /**
    *
    * @param searchParameters
    * @return
    */
   public List<Recipe> search(SearchParameters searchParameters) {

      ArrayList<Recipe> results = new ArrayList<>();

      // TODO: add limit & skip
      DBObject query = new BasicDBObject("$text", new BasicDBObject("$search", searchParameters.getText()));
      DBCursor cursor = collection.find(query);
      Iterator<DBObject> iterator = cursor.iterator();
      while (iterator.hasNext()) {
         results.add(Recipe.toObject(iterator.next().toString()));
      }
      cursor.close();

      return results;
   }

}
