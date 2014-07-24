package feed.domain;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * <p>
 * Represents a recipe.
 * </p>
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Recipe implements Serializable {

   private static final long serialVersionUID = 1L;

   private Long id;
   private String title;
   private String description;
   private List<Section> sections;
   
   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

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
   
   public List<Section> getSections() {
      return sections;
   }

   public void setSections(List<Section> sections) {
      this.sections = sections;
   }
   
}
