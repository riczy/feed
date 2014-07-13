package feed.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import feed.domain.Measurement;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 * <p>
 * Provides the service interface to the processing for measurements.
 * </p>
 */
@Path("/measurements")
public class MeasurementResource {

   private final static Logger logger = Logger.getLogger(MeasurementResource.class.getName());
   
   /**
    * <p>
    * Returns all the measurement types.
    * </p>
    * 
    * @return All measurement types.
    */
   @GET
   @Produces("application/json")
   public List<Measurement> fetchAll() {
      return new ArrayList<Measurement>();
   }
}
