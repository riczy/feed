package com.gima.feed.service;

import java.util.List;
import java.util.logging.Logger;

import com.gima.feed.domain.Measurement;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 * <p>
 * Provides the service interface to the processing for measurements.
 * </p>
 */
@Path("/measurements")
@Stateless
public class MeasurementService {

   Logger logger = Logger.getLogger(MeasurementService.class.getName());
   
   @PersistenceContext(unitName="feed")
   private EntityManager manager;
   
   /**
    * <p>
    * Returns all the measurement types.
    * </p>
    * 
    * @return All measurement types.
    */
   @GET
   @Produces("application/json")
   @SuppressWarnings("unchecked")
   public List<Measurement> fetchAll() {
      return manager.createNamedQuery("everything").getResultList();
   }
}
