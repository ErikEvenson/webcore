# Technology stack

These are the technologies used in this project.

Key components (may be direct dependencies or loaded by direct dependencies):

- [Angular](https://angularjs.org/)
- Bootstrap
- [Express](http://expressjs.com/)
- [Grunt](http://gruntjs.com/)
- heroku
- Jade
- Jasmine
- [Karma](http://karma-runner.github.io/0.12/index.html)
- Mocha
- MongoDB
- Mongoose
- [Passport](http://passportjs.org/)
- Protractor
- Puppet

## TBD

- [Protractor](http://angular.github.io/protractor/#/)

## Foundational

- [bash](http://www.gnu.org/software/bash/manual/bashref.html) 4.2.24 - shell.
- [CSS]()
- [HTML]()
- [javascript]()

## apt-get-installed

- [fontconfig](http://packages.ubuntu.com/precise/fontconfig) 2.8.0-3ubuntu9 - "generic font configuration library - support binaries."  Required by phantomjs.
- [git](http://git-scm.com/) 2.1.0 - "Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency." 
- [mercurial](http://mercurial.selenic.com/) 3.0.1 - "Easy-to-use, scalable distributed version control system."
- [xvfb](http://packages.ubuntu.com/trusty/xvfb) 2:1.15.1-0ubuntu2 - "Virtual Framebuffer 'fake' X server"

## bash-installed

- [puppet](http://puppetlabs.com/) - "Open source Puppet is a flexible, customizable framework available under the Apache 2.0 license designed to help system administrators automate the many repetitive tasks they regularly perform."
- [vagrant-cachier](https://github.com/fgrehm/vagrant-cachier/) 1.1.0 - "A Vagrant plugin that helps you reduce the amount of coffee you drink while waiting for boxes to be provisioned by sharing a common package cache among similiar VM instances."
- [vagrant-librarian-puppet](https://github.com/mhahn/vagrant-librarian-puppet) 0.7.1 - A Vagrant plugin to install Puppet modules using Librarian-Puppet.
- [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) 0.10.0 [Changelog[(https://github.com/dotless-de/vagrant-vbguest/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant-vbguest) - automatically keeps VirtualBox Guest Additions up to date.  ***Updates are manual.***

## bower-installed

### Normal

* [angular](https://github.com/angular/bower-angular) 1.3.2 - 'Bower package for AngularJS.'
* [angular-bootstrap](https://github.com/angular-ui/bootstrap-bower) 0.11.2 - 'This is a bower repository to hold Angular UI Bootstrap releases.'
* [angular-cookies](https://github.com/angular/bower-angular-cookies) 1.3.2 - 'https://github.com/angular/bower-angular-cookies.'
* [angular-resource](https://github.com/angular/bower-angular-resource) 1.3.2 - 'angular-resource bower repo.'
* [angular-sanitize](https://github.com/angular/bower-angular-sanitize) 1.3.2 - 'angular-sanitize bower repo.'
* [angular-socket-io](https://github.com/btford/angular-socket-io) 0.6.0 - 'Socket.IO component for AngularJS.'
* [angular-ui-router](https://github.com/angular-ui/ui-router) 0.2.11 - 'The de-facto solution to flexible routing with nested views.'
* [bootstrap](https://github.com/twbs/bootstrap) 3.1.1 - 'The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.'
* [bootstrap-sass-official](https://github.com/twbs/bootstrap-sass) 3.1.1+2 - 'Official Sass port of Bootstrap.'
* [es5-shim](https://github.com/es-shims/es5-shim) 3.0.2 - 'ECMAScript 5 compatibility shims for legacy JavaScript engines.'
* [font-awesome](https://github.com/interval-braining/font-awesome-bower) 4.2.0 - 'FontAwesome bower component with reduced footprint.'
* [jquery](https://github.com/jquery/jquery) 1.11.1 - 'jQuery JavaScript Library.'
* [json3](https://github.com/bestiejs/json3) 3.3.2 - 'A modern JSON implementation compatible with nearly all JavaScript platforms.'
* [lodash](https://github.com/lodash/lodash) 2.4.1 - 'A utility library delivering consistency, customization, performance, & extras.'

### Development

* [angular-mocks](https://github.com/angular/bower-angular-mocks) 1.3.2 - 'angular-mocks.js bower repo.'
* [angular-scenario](https://github.com/angular/bower-angular-scenario) 1.3.2 - 'bower repo for angular-scenario.js.'

## gem-installed

- [puppet-lint](http://puppet-lint.com/) 1.0.1 - "Check that your Puppet manifest conform to the style guide."
- [SASS](https://rubygems.org/gems/sass) 3.4.6 [Fork](https://github.com/EATechnologies/sass) - CSS extension language.  Installed during vagrant provisioning in install.sh for the web VM.  Used by django-pipeline to compile CSS.  ***Upgrade by changing the pinned version in the install.sh script and reprovision or gem install.***

## Installed on host

These tools are installed directly on the host.  On a Mac, they are can be installed easily using [homebrew](http://brew.sh/) and [homebrew cask](http://caskroom.io/).

***Check for updates manually.***

- [MongoDB](http://www.mongodb.org/) 2.6.5
- [Vagrant](https://www.vagrantup.com/) 1.6.5 [Change log](https://github.com/mitchellh/vagrant/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant) - used to manage development environment configuration.
- [VirtualBox](https://www.virtualbox.org/) 4.3.14 [Changelog](https://www.virtualbox.org/wiki/Changelog) 4.3.14-95030 - used to host development environment.

## Heroku add-ons

- [cedar-14]()
- [MongoHQ](https://addons.heroku.com/mongohq)

## npm-installed

### Global

- [bower](https://www.npmjs.org/package/bower) 1.3.12 [Changelog](https://github.com/bower/bower/blob/master/CHANGELOG.md)[Fork](https://www.virtualbox.org/) - front end package management.  Bower will warn when it has an update.
* [generator-angular-fullstack](https://www.npmjs.org/package/generator-angular-fullstack) 2.0.13 "Yeoman generator for creating MEAN stack applications, using MongoDB, Express, AngularJS, and Node."
- [grunt-cli](https://github.com/gruntjs/grunt-cli) 0.1.13 [Fork](https://github.com/EATechnologies/grunt-cli) 
- [npm](https://npmjs.org/doc/) 1.4.23 [Fork](https://github.com/EATechnologies/npm) - "node package manager"
* [npm-check-updates](https://www.npmjs.org/package/npm-check-updates) 1.2.0 [Fork](https://github.com/EATechnologies/npm-check-updates) - Find newer versions of dependencies than what your package.json allows.
* [npm-install-missing](https://www.npmjs.org/package/npm-install-missing) 0.1.4 - 'This module will attempt to reinstall any missing dependencies. It can be called via the command line or used programmatically.'
* [yo](http://yeoman.io/) 1.3.3 [Changelog](https://github.com/yeoman/yo/releases) [Fork](https://github.com/EATechnologies/yo) - "CLI tool for running Yeoman generators"  yeoman will install bower and grunt-cli.

### Local

#### Normal

* [body-parser](https://www.npmjs.org/package/body-parser) 1.5.2 - 'Node.js body parsing middleware.'
* [composable-middleware](https://www.npmjs.org/package/composable-middleware) 0.3.0 - 'Treat a sequence of middleware as middleware.'
* [compression](https://www.npmjs.org/package/compression) 1.0.11 - 'Compression middleware for connect and node.js.'
* [connect-mongo](https://www.npmjs.org/package/connect-mongo) 0.4.1 - 'MongoDB session store for Connect.'
* [cookie-parser](https://www.npmjs.org/package/cookie-parser) 1.0.1 - 'cookie parsing with signatures.'
* [errorhandler](https://www.npmjs.org/package/errorhandler) 1.0.2 - 'Development-only error handler middleware.'
* [express](https://www.npmjs.org/package/express) 4.0.0 - 'Fast, unopinionated, minimalist web framework.'
* [express-jwt](https://www.npmjs.org/package/express-jwt) 0.1.4 - 'JWT authentication middleware.'
* [express-session](https://www.npmjs.org/package/express-session) 1.0.4 - 'Simple session middleware for Express.'
* [jade](https://www.npmjs.org/package/jade) [Project](http://jade-lang.com/) 1.2.0 - 'Jade template engine.'
* [jsonwebtoken](https://www.npmjs.org/package/jsonwebtoken) 0.3.0 - 'JSON Web Token implementation (symmetric and asymmetric).'
* [lodash](https://www.npmjs.org/package/lodash) 2.4.1 - 'A utility library delivering consistency, customization, performance, & extras.'
* [method-override](https://www.npmjs.org/package/method-override) 1.0.2 - 'Override HTTP verbs.'
* [mongoose](https://www.npmjs.org/package/mongoose) 3.8.18 - 'Mongoose MongoDB ODM.'
* [morgan](https://www.npmjs.org/package/morgan) 1.0.1 - 'http request logger middleware for node.js.'
* [passport](https://www.npmjs.org/package/passport) 0.2.1 - 'Simple, unobtrusive authentication for Node.js.'
* [passport-facebook](https://www.npmjs.org/package/passport-facebook) 1.0.3 - 'Facebook authentication strategy for Passport.'
* [passport-google-oauth](https://www.npmjs.org/package/passport-google-oauth) 0.1.5 - 'Google (OAuth) authentication strategies for Passport.'
* [passport-local](https://www.npmjs.org/package/passport-local) 0.1.6 - 'Local username and password authentication strategy for Passport.'
* [passport-twitter](https://www.npmjs.org/package/passport-twitter) 1.0.2 - 'Twitter authentication strategy for Passport.'
* [serve-favicon](https://www.npmjs.org/package/serve-favicon) 2.0.1 - 'favicon serving middleware with caching.'
* [socket.io](https://www.npmjs.org/package/socket.io) 0.9.17 - 'node.js realtime framework server'
* [socket.io-client](https://www.npmjs.org/package/socket.io-client) 1.2.0 - ''
* [socketio-jwt](https://www.npmjs.org/package/socketio-jwt) 2.3.5 - 'authenticate socket.io connections using JWTs'

#### Development

* [connect-livereload](https://www.npmjs.org/package/connect-livereload) 0.4.1 - 'connect middleware for adding the livereload script to the response.'
* [grunt](https://www.npmjs.org/package/grunt) 0.4.5 - 'The JavaScript Task Runner.'
* [grunt-angular-templates](https://www.npmjs.org/package/grunt-angular-templates) 0.5.7 - 'Grunt build task to concatenate & register your AngularJS templates in the $templateCache.'
* [grunt-asset-injector](https://www.npmjs.org/package/grunt-asset-injector) 0.1.0 - 'Inject references to files into other files (think scripts and stylesheets into an html file).'
* [grunt-autoprefixer](https://www.npmjs.org/package/grunt-autoprefixer) 0.7.6 - 'Parse CSS and add vendor-prefixed CSS properties using the Can I Use database. Based on Autoprefixer.'
* [grunt-build-control](https://www.npmjs.org/package/grunt-build-control) "DaftMonk/grunt-build-control" - 'Automate version control tasks for your project's built code. Keep built code in sync with source code, maintain multiple branches of built code, commit with automatic messages, and push to remote repositories.'
* [grunt-concurrent](https://www.npmjs.org/package/grunt-concurrent) 0.5.0 - 'Run grunt tasks concurrently.'
* [grunt-contrib-clean](https://www.npmjs.org/package/grunt-contrib-clean) 0.5.0 - 'Clean files and folders.'
* [grunt-contrib-coffee](https://www.npmjs.org/package/grunt-contrib-coffee) 0.10.1 - 'Compile CoffeeScript files to JavaScript.'
* [grunt-contrib-concat](https://www.npmjs.org/package/grunt-contrib-concat) 0.4.0 - 'Concatenate files.'
* [grunt-contrib-copy](https://www.npmjs.org/package/grunt-contrib-copy) 0.5.0 - 'Copy files and folders.'
* [grunt-contrib-cssmin](https://www.npmjs.org/package/grunt-contrib-cssmin) 0.9.0 - 'Compress CSS files.'
* [grunt-contrib-htmlmin](https://www.npmjs.org/package/grunt-contrib-htmlmin) 0.2.0 - 'Minify HTML'
* [grunt-contrib-imagemin](https://www.npmjs.org/package/grunt-contrib-imagemin) 0.7.1 - 'Minify images'
* [grunt-contrib-jade](https://www.npmjs.org/package/grunt-contrib-jade) 0.11.0 - 'Compile Jade templates.'
* [grunt-contrib-jshint](https://www.npmjs.org/package/grunt-contrib-jshint) 0.10.0 - 'Validate files with JSHint.'
* [grunt-contrib-sass](https://www.npmjs.org/package/grunt-contrib-sass) 0.7.4 - 'Compile Sass to CSS'
* [grunt-contrib-uglify](https://www.npmjs.org/package/grunt-contrib-uglify) 0.4.1 - 'Minify files with UglifyJS.'
* [grunt-contrib-watch](https://www.npmjs.org/package/grunt-contrib-watch) 0.6.1 - 'Run predefined tasks whenever watched file patterns are added, changed or deleted.'
* [grunt-dom-munger](https://www.npmjs.org/package/grunt-dom-munger) 3.4.0 - 'Read and manipulate HTML with CSS selectors. Ex. read <script> tags from your html. Remove nodes, add nodes, and more.'
- [grunt-env](https://www.npmjs.org/package/grunt-env) 0.4.2 - 'Specify an ENV configuration for future tasks in the chain'
* [grunt-express-server](https://www.npmjs.org/package/grunt-express-server) 0.4.19 - 'Grunt task for running an Express Server that works great with LiveReload + Watch/Regarde'
* [grunt-google-cdn](https://www.npmjs.org/package/grunt-google-cdn) 0.4.3 - 'Grunt task for replacing refs to resources on the Google CDN'
* [grunt-karma](https://www.npmjs.org/package/grunt-karma) 0.8.3 - 'grunt plugin for karma test runner'
* [grunt-mocha-test](https://www.npmjs.org/package/grunt-mocha-test) 0.10.2 - 'A grunt task for running server side mocha tests'
* [grunt-newer](https://www.npmjs.org/package/grunt-newer) 0.7.0 - 'Run Grunt tasks with only those source files modified since the last successful run.'
* [grunt-ng-annotate](https://www.npmjs.org/package/grunt-ng-annotate) 0.2.3 - 'Add, remove and rebuild AngularJS dependency injection annotations.'
* [grunt-node-inspector](https://www.npmjs.org/package/grunt-node-inspector) 0.1.5 - 'Run node-inspector with the rest of your workflow to debug node.js'
* [grunt-nodemon](https://www.npmjs.org/package/grunt-nodemon) 0.2.1 - 'Grunt task to run a nodemon monitor of your node.js server'
* [grunt-open](https://www.npmjs.org/package/grunt-open) 0.2.3 - 'Open urls and files from a grunt task'
* [grunt-protractor-runner](https://www.npmjs.org/package/grunt-protractor-runner) 1.1.4 - 'A Grunt plugin for running protractor runner.'
* [grunt-rev](https://www.npmjs.org/package/grunt-rev) 0.1.0 - 'Static file asset revisioning through content hashing'
* [grunt-svgmin](https://www.npmjs.org/package/grunt-svgmin) 0.4.0 - 'Minify SVG'
* [grunt-usemin](https://www.npmjs.org/package/grunt-usemin) 2.1.1 - 'Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views).'
* [grunt-wiredep](https://www.npmjs.org/package/grunt-wiredep) 1.8.0 - 'Inject your Bower dependencies right into your HTML from Grunt.'
* [jit-grunt](https://www.npmjs.org/package/jit-grunt) 0.5.0 - 'JIT plugin loader for Grunt.'
* [jshint-stylish](https://www.npmjs.org/package/jshint-stylish) 0.1.5 - 'Stylish reporter for JSHint'
* [karma](https://www.npmjs.org/package/karma) 0.12.28 - 'Spectacular Test Runner for JavaScript.'
* [karma-chrome-launcher](https://www.npmjs.org/package/karma-chrome-launcher) 0.1.5 - 'A Karma plugin. Launcher for Chrome and Chrome Canary.'
* [karma-coffee-preprocessor](https://www.npmjs.org/package/karma-coffee-preprocessor) 0.2.1 - 'A Karma plugin. Compile coffee script on the fly.'
* [karma-firefox-launcher](https://www.npmjs.org/package/karma-firefox-launcher) 0.1.3 - 'A Karma plugin. Launcher for Firefox.'
* [karma-html2js-preprocessor](https://www.npmjs.org/package/karma-html2js-preprocessor) 0.1.2 - 'A Karma plugin. Convert HTML files into JS strings to serve them in a script tag.'
* [karma-jade-preprocessor](https://www.npmjs.org/package/karma-jade-preprocessor) 0.0.11 - 'A Karma plugin. Compile jade template on the fly.'
* [karma-jasmine](https://www.npmjs.org/package/karma-jasmine) 0.1.5 - 'A Karma plugin - adapter for Jasmine testing framework.'
* [karma-ng-html2js-preprocessor](https://www.npmjs.org/package/karma-ng-html2js-preprocessor) 0.1.2 - 'A Karma plugin. Compile AngularJS templates to JavaScript on the fly.'
* [karma-ng-jade2js-preprocessor](https://www.npmjs.org/package/karma-ng-jade2js-preprocessor) 0.1.5 - 'A Karma plugin. Compile Jade AngularJS templates to JavaScript on the fly.'
* [karma-ng-scenario](https://www.npmjs.org/package/karma-ng-scenario) 0.1.0 - 'A Karma plugin. Adapter for Angular's Scenario Runner.'
* [karma-phantomjs-launcher](https://www.npmjs.org/package/karma-phantomjs-launcher-nonet) 0.1.4 - 'Fork of karma-phantomjs-launcher - it never downloads phantomjs from the internet.'
* [karma-requirejs](https://www.npmjs.org/package/karma-requirejs) 0.2.2 - 'A Karma plugin. Adapter for RequireJS framework.'
* [karma-script-launcher](https://www.npmjs.org/package/karma-script-launcher) 0.1.0 - 'A Karma plugin. Launcher for shell scripts.'
* [open](https://www.npmjs.org/package/open) 0.0.5 - 'open a file or url in the user's preferred application'
* [requirejs](https://www.npmjs.org/search?q=requirejs) 2.1.15 - 'Node adapter for RequireJS, for loading AMD modules. Includes RequireJS optimizer'
* [should](https://www.npmjs.org/package/should) 3.3.2 - 'test framework agnostic BDD-style assertions'
* [supertest](https://www.npmjs.org/package/supertest) 0.11.0 - 'Super-agent driven library for testing HTTP servers'
* [time-grunt](https://www.npmjs.org/package/time-grunt) 0.3.2 - 'Display the elapsed execution time of grunt tasks'

## Puppet modules

- [puppetlabs-apt](https://forge.puppetlabs.com/puppetlabs/apt) 1.6.0 - "The APT module provides a simple interface for managing APT source, key, and definitions with Puppet."
- [puppetlabs-stdlib](https://forge.puppetlabs.com/puppetlabs/stdlib) 4.3.2 - "This module provides a "standard library" of resources for developing Puppet Modules."
- [jamesnetherton-google_chrome](https://forge.puppetlabs.com/jamesnetherton/google_chrome) 0.1.0 'Installs the Google Chrome web browser.'

## Vagrant/vagrant-installed

- [ubuntu/trusty64](https://vagrantcloud.com/ubuntu/trusty64) 14.04 - A standard [Ubuntu 14.04 LTS (Trusty Tahr)](http://releases.ubuntu.com/14.04/) 64-bit box.  ***Vagrant checks for updates to this box automatically.***