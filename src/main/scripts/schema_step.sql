USE feed;

DROP TABLE feed;

CREATE  TABLE feed.step (
  id NUMERIC(20) NOT NULL AUTO_INCREMENT COMMENT 'Uniquely identifies the recipe step.' ,
  recipe_id NUMERIC(20) NOT NULL COMMENT 'The recipe to which this step belongs.' ,
  sort_order NUMERIC(3) NOT NULL COMMENT 'The placement in which this step appears in the list of steps in the recipe.' ,
  text TEXT NULL COMMENT 'Text that provides information to perform a step of the recipe preparation.' ,
  PRIMARY KEY (id) );
