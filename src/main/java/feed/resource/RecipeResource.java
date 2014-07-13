package feed.resource;

import java.net.URI;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import feed.domain.Recipe;
import feed.service.RecipeService;


/**
 * <p>
 * The RESTful resource for managing recipes.
 * </p>
 * 
 * @author whyceewhite
 */
@Path("/recipes")
public class RecipeResource {

   protected final static Logger logger = Logger.getLogger(RecipeResource.class.getName());
   
   /**
    * <p>
    * A RESTful creation of a recipe instance.
    * </p>
    * 
    * @param recipe
    * @return
    */
   @POST
   @Consumes("application/json")
   @Produces("application/json")
   public Response create(Recipe recipe) {
      Recipe savedObj = RecipeService.getInstance().save(recipe);
      URI uri = UriBuilder.fromResource(this.getClass()).path(savedObj.getId().toString()).build();
      return Response.created(uri).entity(savedObj).build();
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
   @GET
   @Path("/{id: [0-9]+}")
   @Produces("application/json")
   public Recipe find(Long id) {
      return RecipeService.getInstance().find(id);
   }
   
}
