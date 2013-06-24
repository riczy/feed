package com.gima.feed.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@Entity
@Table(name="recipe")
public class Recipe extends AbstractEntity {

   private static final long serialVersionUID = 1L;

   @Column(name="title", length=1000, nullable=false)
   private String title;
   
   @Column(name="description", length=2000)
   private String description;
   
   @OneToMany(cascade={CascadeType.REMOVE}, fetch=FetchType.EAGER, mappedBy="recipe")
   //@XmlTransient
   private List<RecipeIngredient> ingredients;
   
   @OneToMany(cascade={CascadeType.REMOVE}, fetch=FetchType.EAGER, mappedBy="recipe")
   private List<RecipeStep> steps;
   
   @Temporal(TemporalType.TIMESTAMP)
   @Column(name="creationDate", nullable=false)
   private Date creationDate;

   @Temporal(TemporalType.TIMESTAMP)
   @Column(name="lastModificationDate", nullable=false)
   private Date lastModificationDate;

   
   public String getTitle() {
      return title;
   }

   
   public void setTitle(String title) {
      this.title = title;
   }

   
   public String getDescription() {
      return description;
   }

   
   public void setDescription(String description) {
      this.description = description;
   }

   
   public List<RecipeIngredient> getIngredients() {
      return ingredients;
   }

   
   public void setIngredients(List<RecipeIngredient> ingredients) {
      this.ingredients = ingredients;
   }

   
   public List<RecipeStep> getSteps() {
      return steps;
   }

   
   public void setSteps(List<RecipeStep> steps) {
      this.steps = steps;
   }

   
   public Date getCreationDate() {
      return creationDate;
   }

   
   public void setCreationDate(Date creationDate) {
      this.creationDate = creationDate;
   }

   
   public Date getLastModificationDate() {
      return lastModificationDate;
   }

   
   public void setLastModificationDate(Date lastModificationDate) {
      this.lastModificationDate = lastModificationDate;
   }
   
}
