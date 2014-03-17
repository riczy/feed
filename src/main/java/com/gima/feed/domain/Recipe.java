package com.gima.feed.domain;

import java.util.Date;
import java.util.Set;

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
   
   @OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER, mappedBy="recipe")
   private Set<Ingredient> ingredients;
   
   @OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER, mappedBy="recipe")
   private Set<Instruction> instructions;
   
   @Temporal(TemporalType.TIMESTAMP)
   @Column(name="creationDate", nullable=false)
   private Date creationDate;

   @Temporal(TemporalType.TIMESTAMP)
   @Column(name="modificationDate", nullable=false)
   private Date modificationDate;

   
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
   
   public Set<Ingredient> getIngredients() {
      return ingredients;
   }

   public void setIngredients(Set<Ingredient> ingredients) {
      this.ingredients = ingredients;
   }
   
   public Set<Instruction> getInstructions() {
      return instructions;
   }
   
   public void setInstructions(Set<Instruction> steps) {
      this.instructions = steps;
   }
   
   public Date getCreationDate() {
      return creationDate;
   }
   
   public void setCreationDate(Date creationDate) {
      this.creationDate = creationDate;
   }
   
   public Date getModificationDate() {
      return modificationDate;
   }
   
   public void setModificationDate(Date modificationDate) {
      this.modificationDate = modificationDate;
   }
   
}
