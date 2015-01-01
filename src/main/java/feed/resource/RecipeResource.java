package feed.resource;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;

import feed.domain.SearchParameters;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import feed.domain.Recipe;
import feed.service.RecipeService;


/**
 * The RESTful resource for managing recipes.
 * </p>
 */
@Path("/recipe")
@Produces("application/json")
public class RecipeResource {

   protected final static Logger logger = LoggerFactory.getLogger(RecipeResource.class.getName());
   
   /**
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

   /**
    * Searches for recipes that have text that matches the given text in the
    * title or description.
    * </p>
    *
    * @param   text The search value that is used to find matching recipes.
    *          Required.
    * @param   limit The maximum number of search results to return. A value
    *          equal to or less than zero will bring back all results.
    * @param   skip The number of matching results to skip. The skipped results
    *          will not be included in the returned results.
    */
   @GET
   @Path("/search")
   public Response search(@QueryParam("text") String text,
                          @QueryParam("limit") int limit,
                          @QueryParam("skip") int skip) {

      SearchParameters searchParameters = new SearchParameters();
      searchParameters.setLimit(limit);
      searchParameters.setSkip(skip);
      searchParameters.setText(text);

      try {
         List<Recipe> results = RecipeService.getInstance().search(searchParameters);
         return Response.status(Status.CREATED).entity(results).build();
      } catch (Exception e) {
         logger.error("An error occurred while search for a recipe.", e);
         return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
      }
   }
   
}
