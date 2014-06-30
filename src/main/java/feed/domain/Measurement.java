package feed.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 * <p>
 * Represents a measurement used for cooking.
 * </p> 
 */
@Entity
@NamedQueries(
      @NamedQuery(name="everything",
            query="select a from MeasurementType a"))
@Table(name="measurement")
public class Measurement extends AbstractEntity {

   private static final long serialVersionUID = 1L;
   
   @Column(name="name")
   private String name;
   
   public String getName() {
      return name;
   }
   
   public void setName(String name) {
      this.name = name;
   }
   
}
