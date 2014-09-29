package feed.resource;

import java.io.IOException;
import java.net.URI;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import feed.domain.Recipe;
import feed.service.RecipeService;


/**
 * <p>
 * The RESTful resource for managing recipes.
 * </p>
 */
@Path("/recipes")
public class RecipeResource {

   protected final static Logger logger = LoggerFactory.getLogger(RecipeResource.class.getName());
   
   /**
    * <p>
    * Saves the given recipe.
    * </p>
    * 
    * @param   recipe A JSON object of the recipe.
    * @return
    */
   @POST
   @Consumes("application/json")
   @Produces("application/json")
   public Response create(Recipe recipe) {
      
      Recipe savedObj;
      try {
         savedObj = RecipeService.getInstance().save(recipe);
      } catch (IOException e) {
         logger.error("Could not connect to db due to an unknown host.", e);
         return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
      }
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
