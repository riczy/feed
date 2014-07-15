package feed.service;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.logging.Logger;

import com.mongodb.DB;
import com.mongodb.MongoClient;


public class DatabaseClient {
   
   protected final static Logger logger = Logger.getLogger(DatabaseClient.class.getName());
   
   static MongoClient getClient() throws IOException {
      return new MongoClient();
   }
   
   static DB getDB() throws IOException {
      return getClient().getDB("feed");
   }
   
   private DatabaseClient() throws UnknownHostException {
   }

}
