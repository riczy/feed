package feed.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import feed.domain.OrderByParameters;
import feed.domain.SearchParameters;
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
    * Creates the given recipe.
    * </p>
    * 
    * @param   recipe The recipe to create. Required.
    * @return  The recipe object that was created wrapped inside of a Response
    *          object.
    */
   @POST
   @Consumes("application/json")
   public Response create(Recipe recipe) {
      
      try {
         recipe = RecipeService.getInstance().save(recipe);
         return Response.status(Status.CREATED).entity(recipe).build();
      } catch (Exception e) {
         logger.error("An error occurred while creating a recipe.", e);
         return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
      }
   }

   /**
    * Updates the given recipe.
    * </p>
    *
    * @param   recipe The recipe to update. Required.
    * @return  The recipe object that was updated wrapped inside of a Response
    *          object.
    */
   @PUT
   @Consumes("application/json")
   public Response update(Recipe recipe) {

      try {
         recipe = RecipeService.getInstance().save(recipe);
         return Response.status(Status.OK).entity(recipe).build();
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
    *          if no matching recipe is found. The result is wrapped in a
    *          Response object.
    */
   @GET
   @Path("/{id}")
   public Response find(@PathParam("id") String id) {

      try {
         Recipe recipe = RecipeService.getInstance().find(id);
         if (recipe == null) {
            return Response.status(Status.NOT_FOUND).entity("Not Found").build();
         }
         return Response.status(Status.OK).entity(recipe).build();
      } catch (Exception e) {
         logger.error("An error occurred while creating a recipe.", e);
         return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
      }
   }

   /**
    * Searches for recipes that have text that matches the given text in the
    * title or description.
    * </p>
    *
    * @param   text The search value that is used to find matching recipes.
    *          Required.
    * @param   page The set or page of results to return. For example:
    *          A page == zero will return results 1 through pageSize. If
    *          pageSize = 10, then results 1 - 10 are returned.
    *          A page == 1 will return results (pageSize * page) + 1 through
    *          (pageSize * page) + pageSize. If pageSize = 10, then results
    *          11 - 20 are returned.
    * @param   pageSize The maximum number of search results to return. A value
    *          equal to or less than zero will bring back a default maximum
    *          number of results.
    * @param   sortBy Indicates how the results should be sorted. Possible
    *          values are: titleAscending, titleDescending, createdDateAscending,
    *          createdDateDescending, modifiedDateAscending,
    *          modifiedDateDescending
    */
   @GET
   @Path("/search")
   public Response search(@QueryParam("text") String text,
                          @QueryParam("page") Integer page,
                          @QueryParam("pageSize") Integer pageSize,
                          @QueryParam("sortBy") String sortBy) {

      SearchParameters searchParameters = new SearchParameters();
      searchParameters.setPageSize(pageSize);
      searchParameters.setPage(page);
      searchParameters.setText(text);

      OrderByParameters orderByParameters = createOrderByParameters(sortBy);

      try {
         List<Recipe> results = RecipeService.getInstance().search(searchParameters, orderByParameters);
         return Response.status(Status.OK).entity(results).build();
      } catch (Exception e) {
         logger.error("An error occurred while search for a recipe.", e);
         return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
      }
   }

   @GET
   @Path("/search/count")
   public Response count(@QueryParam("text") String text) {

      SearchParameters searchParameters = new SearchParameters();
      searchParameters.setText(text);

      try {
         Long resultsCount = RecipeService.getInstance().count(searchParameters);
         return Response.status(Status.OK).entity(resultsCount).build();
      } catch (Exception e) {
         logger.error("An error occurred while search for a recipe.", e);
         return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
      }
   }

   /**
    *
    * @param   sortByQueryParam
    * @return
    */
   private OrderByParameters createOrderByParameters(String sortByQueryParam) {

      OrderByParameters orderByParameters = new OrderByParameters();

      if ("createdDateAscending".equalsIgnoreCase(sortByQueryParam)) {
         orderByParameters.add(OrderByParameters.OrderByColumn.CREATED_DATE, OrderByParameters.SortDirection.ASC);
      } else if ("createdDateDescending".equalsIgnoreCase(sortByQueryParam)) {
         orderByParameters.add(OrderByParameters.OrderByColumn.CREATED_DATE, OrderByParameters.SortDirection.DESC);
      } else if ("modifiedDateAscending".equalsIgnoreCase(sortByQueryParam)) {
         orderByParameters.add(OrderByParameters.OrderByColumn.MODIFIED_DATE, OrderByParameters.SortDirection.ASC);
      } else if ("modifiedDateDescending".equalsIgnoreCase(sortByQueryParam)) {
         orderByParameters.add(OrderByParameters.OrderByColumn.MODIFIED_DATE, OrderByParameters.SortDirection.DESC);
      } else if ("titleAscending".equalsIgnoreCase(sortByQueryParam)) {
         orderByParameters.add(OrderByParameters.OrderByColumn.TITLE, OrderByParameters.SortDirection.ASC);
      } else if ("titleDescending".equalsIgnoreCase(sortByQueryParam)) {
         orderByParameters.add(OrderByParameters.OrderByColumn.TITLE, OrderByParameters.SortDirection.DESC);
      }

      return orderByParameters;
   }

}
