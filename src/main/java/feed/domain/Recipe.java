package feed.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

/**
 * <p>
 * Represents a recipe.
 * </p>
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Recipe implements Serializable {

   private static final long serialVersionUID = 1L;

   private Long uuid;
   private String title;
   private String description;
   private List<Section> sections;
   
   public Long getUuid() {
      return uuid;
   }

   public void setUuid(Long id) {
      this.uuid = id;
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
   
   public boolean add(Section section) {
      
      if (section == null) return false;
      if (this.sections == null) {
         this.sections = new ArrayList<Section>();
      }
      return this.sections.add(section);
   }
   
   public List<Section> getSections() {
      return sections;
   }

   public void setSections(List<Section> sections) {
      this.sections = sections;
   }
   
   public String toJson() {
      Gson gson = new Gson();
      return gson.toJson(this);
   }
   
   public static Recipe toObject(String json) throws JsonSyntaxException {
      Gson gson = new Gson();
      return gson.fromJson(json, Recipe.class);
   }
}
