package feed.domain;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

/**
 * <p>
 * Represents how much of an ingredient is used in a recipe. 
 * </p>
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Ingredient implements Serializable {

   private static final long serialVersionUID = 1L;
   private String quantity;
   private String measurement;
   private String item;
   
   public String getQuantity() {
      return quantity;
   }

   public void setQuantity(String quantity) {
      this.quantity = quantity;
   }
   
   public String getMeasurement() {
      return measurement;
   }
   
   public void setMeasurement(String measurement) {
      this.measurement = measurement;
   }
   
   public String getItem() {
      return item;
   }
  
   public void setItem(String item) {
      this.item = item;
   }
   
}
