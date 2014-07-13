package feed.domain;

import java.io.Serializable;
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
 * 
 * @author  whyceewhite
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Section implements Serializable {

   private static final long serialVersionUID = 1L;
   private String title;
   private List<Ingredient> ingredients;
   private List<Step> steps;
   
   public String getTitle() {
      return title;
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
   
}
