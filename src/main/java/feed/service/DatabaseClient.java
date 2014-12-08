package feed.service;

import java.io.IOException;
import java.net.UnknownHostException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.DB;
import com.mongodb.MongoClient;


public class DatabaseClient {
   
   protected final static Logger logger = LoggerFactory.getLogger(DatabaseClient.class);
   
   protected final static MongoClient client;

   static {
      try {
         client = new MongoClient("localhost");
      } catch (UnknownHostException e) {
         logger.error("", e);
         throw new RuntimeException(e);
      }
   }
   
   static MongoClient getClient() throws IOException {
      return new MongoClient();
   }
   
   static DB getDB() throws IOException {
      return getClient().getDB("feed");
   }
   
   private DatabaseClient() throws UnknownHostException {
   }

}
