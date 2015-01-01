HOST=localhost
PORT=27017
DB=feed

mongoimport --host $HOST:$PORT --db $DB --collection measurement --drop --file ./db-measurement.json -v

mongo $HOST:$PORT/$DB --eval "printjson(db.measurement.ensureIndex({sortOrder : 1}))"
mongo $HOST:$PORT/$DB --eval "printjson(db.measurement.ensureIndex({name : 1}, {unique : true}))"

mongo $HOST:$PORT/$DB --eval "printjson(db.recipe.ensureIndex({title : \"text\"}))"