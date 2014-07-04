# feed

## DEVELOPMENT SETUP

1. Install [Node.js](http://nodejs.org/download/).

1. Install [Bower](http://bower.io/). Bower's github page is [here](https://github.com/bower/bower).

    $ npm install -g bower

1. Change into the project's webapp directory.

    $ cd feed/src/main/webapp
    
1. Run bower to install the dependencies listed in the current directory's `bower.json` file.

    $ bower install

1. Start Node.js.

    $ npm start --verbose
    
1. Use http://localhost:9000 to access the development page. (Note that the port number is configured in the `package.json` file.) 