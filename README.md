# feed

## DEVELOPMENT SETUP

1. Install [Node.js](http://nodejs.org/download/).

1. Install [Bower](http://bower.io/). Bower's github page is [here](https://github.com/bower/bower).

    $ sudo npm install -g bower

1. Change into the project's webapp directory.

    $ cd feed/src/main/webapp
    
1. Run bower to install the dependencies listed in the current directory's `bower.json` file.

    $ bower install

1. Start Node.js.

    $ npm start --verbose
    
1. Use http://localhost:9000 to access the development page. (Note that the port number is configured in the `package.json` file.)

## RUNNING THE APP FOR DEVELOPMENT USING NODEJS

1. Change into the project's webapp directory.

    $ cd feed/src/main/webapp

1. Start Node.js.

    $ npm start

1. Go to http://localhost:9000

## RUNNING THE APP FOR DEVELOPMENT USING JBOSS

1. Start mongodb.

    $ sudo mongod

1. Start JBoss.

    $ sudo /usr/local/jboss/bin/standalone.sh

1. Copy the WAR to the JBoss deployment directory to hot deploy it.

    $ sudo cp feed/target/feed.war /usr/local/jboss/standalone/deployments

1. Monitor the log to determine the status of the deployment.

    $ tail -f /usr/local/jboss/standalone/log/server.log

1. Go to http://localhost:8080/feed