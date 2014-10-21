package feed.domain;

import org.junit.Test;

import static org.junit.Assert.*;

public class RecipeTest {
   
   @Test
   public void toJson() {
      
      Recipe r = new Recipe();
      r.setDescription("Description");
      r.setUuid("ABC");
      r.setTitle("Title");
      
      Section s = new Section();
      s.setTitle("Section");
      s.add(1, "1", "cup", "parsely");
      s.add(2, null, "handful", "sesame seeds");
      s.add(2, "3", null, "lemons");
      s.add(1, "Step 1");
      s.add(2, "Step 2");
      r.add(s);
      
      String json = r.toJson();
      System.out.println(json);
      Recipe r2 = Recipe.toObject(json);
      assertEquals(r.getDescription(), r2.getDescription());
      assertEquals(r.getUuid(), r2.getUuid());
   }

}
