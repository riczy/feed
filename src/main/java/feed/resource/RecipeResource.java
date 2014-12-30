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

import org.bson.types.ObjectId;
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
@Produces("application/json")
public class RecipeResource {

   protected final static Logger logger = LoggerFactory.getLogger(RecipeResource.class.getName());
   
   /**
    * <p>
    * Saves the given recipe.
    * </p>
    * 
    * @param   recipe A JSON object of the recipe.
    * @return  The unique id of the instance that was created wrapped inside
    *          of a Response object.
    */
   @POST
   @Consumes("application/json")
   public Response create(Recipe recipe) {
      
      try {
         ObjectId savedObjId = RecipeService.getInstance().save(recipe);
         return Response.status(Status.CREATED).entity(savedObjId.toString()).build();
      } catch (Exception e) {
         logger.error("An error occurred while creating a recipe.", e);
         return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
      }
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
   @Path("/{id}")
   public Recipe find(String id) {
      return RecipeService.getInstance().find(id);
   }
   
}
