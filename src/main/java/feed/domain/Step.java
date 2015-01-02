package feed.domain;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

/**
 * <p>
 * This object represents one step in a set of instructions for
 * making a recipe.
 * <p>
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Step implements Serializable {

   private static final long serialVersionUID = 1L;
   private String text;

   public String getText() {
      return text;
   }
   
   public void setText(String text) {
      this.text = text;
   }
}
