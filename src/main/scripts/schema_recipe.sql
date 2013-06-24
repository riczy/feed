USE feed;

DROP TABLE feed;

CREATE  TABLE feed.recipe (
  id NUMERIC(20) NOT NULL AUTO_INCREMENT COMMENT 'Uniquely identifies this recipe entry.' ,
  title VARCHAR(1000) NOT NULL COMMENT 'A name that concisely describes or identifies the recipe.' ,
  description TEXT NULL COMMENT 'A description or essay that provides important or interesting information regarding the origins or preparation.' ,
  creationDate DATETIME NOT NULL COMMENT 'The date and time when this recipe was created.' ,
  lastModifcationDate DATETIME NOT NULL COMMENT 'The date and time when this recipe was last modified.' ,
  version NUMERIC(10) NOT NULL COMMENT 'The version of this entry to assist with oplocking capability.' ,
  PRIMARY KEY (id) );
