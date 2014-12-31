package feed.domain;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * <p>
 * Represents a measurement used for cooking.
 * </p>
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Measurement implements Serializable {

   private static final long serialVersionUID = 1L;
   private String name;
   private int sortOrder;

   public String getName() {
      return name;
   }
   
   public void setName(String name) {
      this.name = name;
   }

   public int getSortOrder() {
      return sortOrder;
   }

   public void setSortOrder(int sortOrder) {
      this.sortOrder = sortOrder;
   }

   public String toJson() {
      Gson gson = new Gson();
      return gson.toJson(this);
   }

   public static Measurement toObject(String json) throws JsonSyntaxException {
      Gson gson = new Gson();
      return gson.fromJson(json, Measurement.class);
   }

}
