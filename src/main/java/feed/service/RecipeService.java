package feed.service;

import java.util.logging.Logger;

import feed.domain.Recipe;

/**
 * <p>
 * The service manager for handling persistence for recipe objects.
 * </p>
 * 
 * @author  whyceewhite
 */
public class RecipeService {
   
   protected final static Logger logger = Logger.getLogger(RecipeService.class.getName());
   private final static RecipeService service;
   
   static {
      service = new RecipeService();
   }
   
   public static RecipeService getInstance() {
      return service;
   }
   
   private RecipeService() {
   }

   /**
    * <p>
    * Saves the given recipe instance to a persistent store.
    * </p>
    * 
    * @param   entity The recipe instance to save.
    * @return  The saved recipe instance along with any attribute updates that
    *          result from saving.
    */
   public Recipe save(Recipe recipe) {
      return null;
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
   public Recipe find(Long id) {
      return null;
   }
  
}