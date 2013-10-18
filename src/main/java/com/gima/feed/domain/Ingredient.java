package com.gima.feed.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@Entity
@Table(name="recipe_ingredient")
public class Ingredient extends AbstractEntity {

   private static final long serialVersionUID = 1L;
   
   @ManyToOne(optional=false)
   @JoinColumn(name="recipe_id", nullable=false, updatable=false)
   private Recipe recipe;
   
   @Column(name="sort_order", precision=5, nullable=false)
   private Integer sortOrder;
   
   @Column(name="quantity", length=20)
   private String quantity;
   
   @ManyToOne
   @JoinColumn(name="measurement_id")
   private Measurement measurement;

   @Column(name="item", length=2000, nullable=false)
   private String item;

   public Recipe getRecipe() {
      return recipe;
   }

   public void setRecipe(Recipe recipe) {
      this.recipe = recipe;
   }
   
   public Integer getSortOrder() {
      return sortOrder;
   }

   public void setSortOrder(Integer sortOrder) {
      this.sortOrder = sortOrder;
   }
   
   public String getQuantity() {
      return quantity;
   }

   public void setQuantity(String quantity) {
      this.quantity = quantity;
   }
   
   public Measurement getMeasurement() {
      return measurement;
   }
   
   public void setMeasurement(Measurement measurement) {
      this.measurement = measurement;
   }
   
   public String getItem() {
      return item;
   }
  
   public void setItem(String item) {
      this.item = item;
   }
   
}
