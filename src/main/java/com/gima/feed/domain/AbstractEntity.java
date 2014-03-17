package com.gima.feed.domain;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@MappedSuperclass
public abstract class AbstractEntity implements Entity, Comparable<AbstractEntity> {

   private static final long serialVersionUID = -2251281192410034958L;

   @Id
   @GeneratedValue(strategy=GenerationType.IDENTITY)
   @Column(name="id", precision=20, scale=0)
   private Long id;

   @Version
   @Column(name="version", precision=10, scale=0)
   private Integer version;

   /**
    * <p>
    * Answers true if this entity instance has never been saved and false if it
    * exists.
    * </p>
    * 
    * @return true if this is a new entity instance that does not exist in a 
    *          persistence store and false if it is not.
    */
   public Boolean isNew() {
      return id == null;
   }

   /**
    * <p>
    * Returns the unique identifier of the entity.
    * </p>
    */
   public Long getId() {
      return id;
   }
   
   /**
    * <p>
    * Sets the unique identifier of this instance.
    * </p>
    * 
    * @param id The unique identifier of this instance.
    */
   public void setId(Long id) {
      this.id = id;
   }

   /**
    * <p>
    * Returns the version of this instance.
    * </p>
    * 
    * @return The version of this instance.
    */
   public Integer getVersion() {
      return version;
   }

   /**
    * <p>
    * Set the version of this instance.
    * </p>
    * 
    * @param version The version of this instance.
    */
   public void setVersion(Integer version) {
      this.version = version;
   }

   /**
    * <p>
    * Returns zero if this instance and the object parameter are equal, a
    * positive integer if obj is greater, and a negative integer if obj is
    * lesser.
    * </p>
    * 
    * @param obj The object to compare with this instance. This parameter is
    *        required.
    * @throws NullPointerException If the parameter is null.
    */
   public int compareTo(AbstractEntity obj) {
      if (this == obj)
         return 0;
      return id.compareTo(obj.id);
   }

   /**
    * <p>
    * Answers true if this instance and the obj parameter are equal.
    * </p>
    * 
    * @param obj The object to compare equality with.
    * @return True if obj and this instance are equal and false if not. If obj
    *         is null this false is returned. If obj is not an instance of this
    *         class then return false.
    */
   public boolean equals(Object obj) {
      if (obj == null)
         return false;
      if (!(obj instanceof AbstractEntity))
         return false;
      return compareTo((AbstractEntity) obj) == 0;
   }

   /**
    * <p>
    * A string output of this instance.
    * </p>
    */
   public String toString() {
      StringBuilder buf = new StringBuilder();
      buf.append("id=" + id);
      buf.append(", version=" + version);
      return buf.toString();
   }

}
