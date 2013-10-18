USE feed;

DROP TABLE feed;

CREATE  TABLE feed.ingredient (
  id NUMERIC(20) NOT NULL AUTO_INCREMENT COMMENT 'Uniquely identifies the ingredient.' ,
  recipe_id NUMERIC(20) NOT NULL COMMENT 'The recipe to which this ingredient belongs.' ,
  sort_order NUMERIC(3) NOT NULL COMMENT 'The placement in which this ingredient appears in the list of ingredients in the parent recipe.' ,
  quantity VARCHAR(20) NULL COMMENT 'The quantity of the item or measurement.' ,
  measurement_id NUMERIC(20) NULL COMMENT 'The measurement type used for this ingredient.' ,
  item VARCHAR(2000) NOT NULL COMMENT 'The ingredient itself.' ,
  PRIMARY KEY (id) );
