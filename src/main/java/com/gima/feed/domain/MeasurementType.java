package com.gima.feed.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * <p>
 * Represents a measurement used for cooking.
 * </p> 
 */
@Entity
@Table(name="measurement_type")
public class MeasurementType extends AbstractEntity {

   private static final long serialVersionUID = 1L;
   
   @Column(name="name")
   private String name;
   
   public String getName() {
      return name;
   }
   
   public void setName(String name) {
      this.name = name;
   }
   
}
