package feed.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

/**
 * <p>
 * Represents a section of ingredients and steps within a recipe. Most recipes
 * have only one sections. However, recipes may have two groups of ingredients 
 * and one set of steps. Or, two groups of ingredients with their own steps. The
 * combination is based on how the recipe is composed by the author.
 * </p>
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Section implements Serializable {

   private static final long serialVersionUID = 1L;

   private String title;
   private List<Ingredient> ingredients;
   private List<Step> steps;
   private SectionDisplay display;
   
   public String getTitle() {
      return title;
   }
   
   public boolean add(Ingredient ingredient) {
      
      if (ingredient == null) return false;
      
      if (this.ingredients == null) {
         this.ingredients = new ArrayList<Ingredient>();
      }
      return this.ingredients.add(ingredient);
   }
   
   boolean add(Integer order, String quantity, String measurement, String item) {
      
      Ingredient i = new Ingredient();
      i.setItem(item);
      i.setMeasurement(measurement);
      i.setOrder(order);
      i.setQuantity(quantity);
      return this.add(i);
   }
   
   public boolean add(Step step) {
      
      if (step == null) return false;
      
      if (this.steps == null) {
         this.steps = new ArrayList<Step>();
      }
      return this.steps.add(step);
   }
   
   boolean add(Integer order, String text) {
      
      Step s = new Step();
      s.setOrder(order);
      s.setText(text);
      return this.add(s);
   }
   
   public void setTitle(String title) {
      this.title = title;
   }
   
   public List<Ingredient> getIngredients() {
      return ingredients;
   }
   
   public void setIngredients(List<Ingredient> ingredients) {
      this.ingredients = ingredients;
   }
   
   public List<Step> getSteps() {
      return steps;
   }
   
   public void setSteps(List<Step> steps) {
      this.steps = steps;
   }

   public SectionDisplay getDisplay() {
      return display;
   }

   public void setDisplay(SectionDisplay display) {
      this.display = display;
   }
}
