package feed.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.annotations.SerializedName;
import org.bson.types.ObjectId;

/**
 * <p>
 * Represents a recipe.
 * </p>
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Recipe implements Serializable {

   private static final long serialVersionUID = 1L;

   @SerializedName("_id")
   private String id;
   private String format;
   private String title;
   private String description;
   private Date createdDate;
   private Date modifiedDate;
   private List<Section> sections;
   private List<String> hashtags;

   public String getId() {
      return id;
   }

   public void setId(String id) {
      this.id = id;
   }

   public String getFormat() {
      return format;
   }

   public void setFormat(String format) {
      this.format = format;
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

   public Date getCreatedDate() {
      return createdDate;
   }

   public void setCreatedDate(Date createdDate) {
      this.createdDate = createdDate;
   }

   public Date getModifiedDate() {
      return modifiedDate;
   }

   public void setModifiedDate(Date modifiedDate) {
      this.modifiedDate = modifiedDate;
   }

   public boolean add(Section section) {
      
      if (section == null) return false;
      if (this.sections == null) {
         this.sections = new ArrayList<>();
      }
      return this.sections.add(section);
   }
   
   public List<Section> getSections() {
      return sections;
   }

   public void setSections(List<Section> sections) {
      this.sections = sections;
   }

   public boolean add(String hashtag) {

      if (hashtag == null || hashtag.isEmpty()) return false;
      if (this.hashtags == null) {
         this.hashtags = new ArrayList<>();
      }
      return this.hashtags.add(hashtag);
   }

   public List<String> getHashtags() {
      return hashtags;
   }

   public void setHashtags(List<String> hashtags) {
      this.hashtags = hashtags;
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
