package feed.domain;

import org.junit.Test;

import static org.junit.Assert.*;

public class RecipeTest {
   
   @Test
   public void toJson() {
      
      Recipe r = new Recipe();
      r.setDescription("Description");
      r.setTitle("Title");
      
      Section s = new Section();
      s.setTitle("Section");
      s.add("1", "cup", "parsely");
      s.add(null, "handful", "sesame seeds");
      s.add("3", null, "lemons");
      s.add("Step 1");
      s.add("Step 2");
      r.add(s);
      
      String json = r.toJson();
      System.out.println(json);
      Recipe r2 = Recipe.toObject(json);
      assertEquals(r.getDescription(), r2.getDescription());
   }

}
