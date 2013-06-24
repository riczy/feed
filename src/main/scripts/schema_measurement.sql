USE feed;

DROP TABLE measurement;

CREATE  TABLE measurement (
  id NUMERIC(20) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  version NUMERIC(10) NOT NULL
  PRIMARY KEY (id) ,
  UNIQUE INDEX uidx_measurement_name (name ASC) );

INSERT INTO measurement (name) VALUES ("cup");
INSERT INTO measurement (name) VALUES ("teaspoon");
INSERT INTO measurement (name) VALUES ("tablespoon");
INSERT INTO measurement (name) VALUES ("bunch");
INSERT INTO measurement (name) VALUES ("dash");
INSERT INTO measurement (name) VALUES ("drop");
INSERT INTO measurement (name) VALUES ("gallon");
INSERT INTO measurement (name) VALUES ("handful");
INSERT INTO measurement (name) VALUES ("liter");
INSERT INTO measurement (name) VALUES ("milliliter");
INSERT INTO measurement (name) VALUES ("ounce");
INSERT INTO measurement (name) VALUES ("packet");
INSERT INTO measurement (name) VALUES ("piece");
INSERT INTO measurement (name) VALUES ("pinch");
INSERT INTO measurement (name) VALUES ("pint");
INSERT INTO measurement (name) VALUES ("pound");
INSERT INTO measurement (name) VALUES ("quart");
INSERT INTO measurement (name) VALUES ("shot");
INSERT INTO measurement (name) VALUES ("splash");
INSERT INTO measurement (name) VALUES ("sprig");
