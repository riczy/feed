package feed.service;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import feed.domain.Measurement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 */
public class MeasurementService {

    protected final static Logger logger = LoggerFactory.getLogger(MeasurementService.class.getName());
    private final static MeasurementService service;
    private DBCollection collection;

    static {
        service = new MeasurementService();
    }

    public static MeasurementService getInstance() {
        return service;
    }

    private MeasurementService() {
        collection = DatabaseClient.getDB().getCollection("measurement");
    }

    /**
     * Fetches all measurements.
     *
     * @return  A list of all measurements.
     */
    public List<Measurement> fetchAll() {

        ArrayList<Measurement> results = new ArrayList<>();
        DBCursor cursor = collection.find().sort(new BasicDBObject("sortOrder", 1));
        Iterator<DBObject> iterator = cursor.iterator();
        while (iterator.hasNext()) {
            results.add(Measurement.toObject(iterator.next().toString()));
        }
        cursor.close();
        return results;
    }
}
