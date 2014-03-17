CREATE TABLE feed.measurement (
  id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Uniquely identifies this entry.',
  name VARCHAR(45) NOT NULL COMMENT 'The name that identifies this measurement for cooking.',
  version MEDIUMINT NOT NULL DEFAULT 1 COMMENT 'The revision number of this entry.',
  PRIMARY KEY (id),
  UNIQUE INDEX (name ASC)
  );
  
CREATE  TABLE feed.recipe (
  id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Uniquely identifies this entry.' ,
  title VARCHAR(1000) NOT NULL COMMENT 'A name that concisely describes or identifies the recipe.' ,
  description TEXT NULL COMMENT 'Text that provides an overview or information regarding the origins or preparation.' ,
  creationDate DATETIME NOT NULL COMMENT 'The date and time when this entry was created.' ,
  modificationDate DATETIME NOT NULL COMMENT 'The date and time when this entry was last modified.' ,
  version MEDIUMINT NOT NULL COMMENT 'The revision number of this entry.' ,
  PRIMARY KEY (id)
  );
  
CREATE TABLE feed.ingredient (
  id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Uniquely identifies this entry.',
  recipe_id BIGINT NOT NULL COMMENT 'The recipe to which this ingredient belongs.',
  quantity VARCHAR(20) NULL COMMENT 'The quantity of the item or measurement.',
  measurement_id BIGINT NULL COMMENT 'The measurement type used for this ingredient.',
  item VARCHAR(2000) NOT NULL COMMENT 'The ingredient itself.',
  sort_order TINYINT NOT NULL COMMENT 'The placement in which this ingredient appears in the list of ingredients in the recipe.',
  PRIMARY KEY (id),
  FOREIGN KEY (recipe_id)
  	REFERENCES recipe (id)
  	ON DELETE CASCADE,
  FOREIGN KEY (measurement_id)
  	REFERENCES measurement (id)
  );
  
CREATE TABLE feed.instruction (
  id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Uniquely identifies this entry.',
  recipe_id BIGINT NOT NULL COMMENT 'The recipe to which this instruction belongs.',
  sort_order NUMERIC(3) NOT NULL COMMENT 'The placement in which this step appears in the list of steps in the recipe.',
  text TEXT NOT NULL COMMENT 'Text that provides instructions to perform a step in the recipe creation.',
  PRIMARY KEY (id),  
  FOREIGN KEY (recipe_id)
  	REFERENCES recipe (id)
  	ON DELETE CASCADE
  );
