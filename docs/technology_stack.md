# Technology stack

These are the technologies used in this project.

## Foundational

- [bash](http://www.gnu.org/software/bash/manual/bashref.html) 4.2.24 - shell.

## apt-get-installed

- [fontconfig](http://packages.ubuntu.com/precise/fontconfig) 2.8.0-3ubuntu9 - "generic font configuration library - support binaries."  Required by phantomjs.
- [git](http://git-scm.com/) 2.1.0 - "Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency." 
- [mercurial](http://mercurial.selenic.com/) 3.0.1 - "Easy-to-use, scalable distributed version control system."

## bash-installed

- [puppet](http://puppetlabs.com/) - "Open source Puppet is a flexible, customizable framework available under the Apache 2.0 license designed to help system administrators automate the many repetitive tasks they regularly perform."
- [vagrant-librarian-puppet](https://github.com/mhahn/vagrant-librarian-puppet) 0.7.1 - A Vagrant plugin to install Puppet modules using Librarian-Puppet.
- [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) 0.10.0 [Changelog[(https://github.com/dotless-de/vagrant-vbguest/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant-vbguest) - automatically keeps VirtualBox Guest Additions up to date.  ***Updates are manual.***

## bower-installed

### Normal

- [angular](https://github.com/angular/bower-angular) 1.3.0 - 'Bower package for AngularJS.'
- [angular-bootstrap](https://github.com/angular-ui/bootstrap-bower) 0.11.2 - 'This is a bower repository to hold Angular UI Bootstrap releases.'
- [angular-cookies](https://github.com/angular/bower-angular-cookies) 1.3.0 - 'https://github.com/angular/bower-angular-cookies.'
- [angular-resource](https://github.com/angular/bower-angular-resource) 1.3.0 - 'angular-resource bower repo.'
- [angular-sanitize](https://github.com/angular/bower-angular-sanitize) 1.3.0 - 'angular-sanitize bower repo.'
- [angular-ui-router](https://github.com/angular-ui/ui-router) 0.2.11 - 'The de-facto solution to flexible routing with nested views.'
- [bootstrap](https://github.com/twbs/bootstrap) 3.1.1 - 'The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.'
- [bootstrap-sass-official](https://github.com/twbs/bootstrap-sass) 3.1.1+2 - 'Official Sass port of Bootstrap.'
- [es5-shim](https://github.com/es-shims/es5-shim) 3.0.2 - 'ECMAScript 5 compatibility shims for legacy JavaScript engines.'
- [font-awesome](https://github.com/interval-braining/font-awesome-bower) 4.2.0 - 'FontAwesome bower component with reduced footprint.'
- [jquery](https://github.com/jquery/jquery) 1.11.1 - 'jQuery JavaScript Library.'
- [json3](https://github.com/bestiejs/json3) 3.3.2 - 'A modern JSON implementation compatible with nearly all JavaScript platforms.'
- [lodash](https://github.com/lodash/lodash) 2.4.1 - 'A utility library delivering consistency, customization, performance, & extras.'

### Development

- [angular-mocks](https://github.com/angular/bower-angular-mocks) 1.3.0 - 'angular-mocks.js bower repo.'
- [angular-scenario](https://github.com/angular/bower-angular-scenario) 1.3.0 - 'bower repo for angular-scenario.js.'

## gem-installed

- [puppet-lint](http://puppet-lint.com/) 1.0.1 - "Check that your Puppet manifest conform to the style guide."
- [SASS](https://rubygems.org/gems/sass) 3.4.6 [Fork](https://github.com/EATechnologies/sass) - CSS extension language.  Installed during vagrant provisioning in install.sh for the web VM.  Used by django-pipeline to compile CSS.  ***Upgrade by changing the pinned version in the install.sh script and reprovision or gem install.***

## Installed on host

These tools are installed directly on the host.  On a Mac, they are can be installed easily using [homebrew](http://brew.sh/) and [homebrew cask](http://caskroom.io/).

***Check for updates manually.***

- [MongoDB](http://www.mongodb.org/) 2.6.5
- [Vagrant](https://www.vagrantup.com/) 1.6.3 [Change log](https://github.com/mitchellh/vagrant/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant) - used to manage development environment configuration.
- [VirtualBox](https://www.virtualbox.org/) 4.3.14 [Changelog](https://www.virtualbox.org/wiki/Changelog) 4.3.14-95030 - used to host development environment.

## Heroku add-ons

- [MongoHQ](https://addons.heroku.com/mongohq)

## npm-installed

### Global

- [bower](https://www.npmjs.org/package/bower) 1.3.9 [Changelog](https://github.com/bower/bower/blob/master/CHANGELOG.md)[Fork](https://www.virtualbox.org/) - front end package management.  Bower will warn when it has an update.  Installed by yeoman.
- [generator-angular-fullstack](https://www.npmjs.org/package/generator-angular-fullstack) 2.0.13 "Yeoman generator for creating MEAN stack applications, using MongoDB, Express, AngularJS, and Node."
- [grunt-cli](https://github.com/gruntjs/grunt-cli) 0.1.13 [Fork](https://github.com/EATechnologies/grunt-cli) 
- [npm](https://npmjs.org/doc/) 1.4.23 [Fork](https://github.com/EATechnologies/npm) - "node package manager"
- [npm-check-updates](https://www.npmjs.org/package/npm-check-updates) 1.2.0 [Fork](https://github.com/EATechnologies/npm-check-updates) - Find newer versions of dependencies than what your package.json allows.
- [yo](http://yeoman.io/) 1.3.3 [Changelog](https://github.com/yeoman/yo/releases) [Fork](https://github.com/EATechnologies/yo) - "CLI tool for running Yeoman generators"  yeoman will install bower and grunt-cli.

### Local

#### Normal

- [body-parser](https://www.npmjs.org/package/body-parser) 1.9.1 - 'Node.js body parsing middleware.'
- [composable-middleware](https://www.npmjs.org/package/composable-middleware) 0.3.0 - 'Treat a sequence of middleware as middleware.'
- [compression](https://www.npmjs.org/package/compression) 1.2.0 - 'Compression middleware for connect and node.js.'
- [connect-mongo](https://www.npmjs.org/package/connect-mongo) 0.4.1 - 'MongoDB session store for Connect.'
- [cookie-parser](https://www.npmjs.org/package/cookie-parser) 1.3.3 - 'cookie parsing with signatures.'
- [errorhandler](https://www.npmjs.org/package/errorhandler) 1.2.2 - 'Development-only error handler middleware.'
- [express](https://www.npmjs.org/package/express) 4.10.0 - 'Fast, unopinionated, minimalist web framework.'
- [express-jwt](https://www.npmjs.org/package/express-jwt) 0.4.0 - 'JWT authentication middleware.'
- [express-session](https://www.npmjs.org/package/express-session) 1.9.1 - 'Simple session middleware for Express.'
- [jade](https://www.npmjs.org/package/jade) 1.7.0 - 'Jade template engine.'
- [jsonwebtoken](https://www.npmjs.org/package/jsonwebtoken) 1.1.2 - 'JSON Web Token implementation (symmetric and asymmetric).'
- [lodash](https://www.npmjs.org/package/lodash) 2.4.1 - 'A utility library delivering consistency, customization, performance, & extras.'
- [method-override](https://www.npmjs.org/package/method-override) 2.3.0 - 'Override HTTP verbs.'
- [mongoose](https://www.npmjs.org/package/mongoose) 3.8.18 - 'Mongoose MongoDB ODM.'
- [morgan](https://www.npmjs.org/package/morgan) 1.4.1 - 'http request logger middleware for node.js.'
- [passport](https://www.npmjs.org/package/passport) 0.2.1 - 'Simple, unobtrusive authentication for Node.js.'
- [passport-local](https://www.npmjs.org/package/passport-local) 1.0.0 - 'Local username and password authentication strategy for Passport.'
- [serve-favicon](https://www.npmjs.org/package/serve-favicon) 2.1.6 - 'favicon serving middleware with caching.'

#### Development

- [connect-livereload](https://www.npmjs.org/package/connect-livereload) 0.5.0 - 'connect middleware for adding the livereload script to the response.'
- [grunt](https://www.npmjs.org/package/grunt) 0.4.5 - 'The JavaScript Task Runner.'
- [grunt-angular-templates](https://www.npmjs.org/package/grunt-angular-templates) 0.5.7 - 'Grunt build task to concatenate & register your AngularJS templates in the $templateCache.'
- [grunt-asset-injector](https://www.npmjs.org/package/grunt-asset-injector) 0.1.0 - 'Inject references to files into other files (think scripts and stylesheets into an html file).'
- [grunt-autoprefixer](https://www.npmjs.org/package/grunt-autoprefixer) 1.0.1 - 'Parse CSS and add vendor-prefixed CSS properties using the Can I Use database. Based on Autoprefixer.'
- [grunt-build-control](https://www.npmjs.org/package/grunt-build-control) "DaftMonk/grunt-build-control" - 'Automate version control tasks for your project's built code. Keep built code in sync with source code, maintain multiple branches of built code, commit with automatic messages, and push to remote repositories.'
- [grunt-concurrent](https://www.npmjs.org/package/grunt-concurrent) 1.0.0 - 'Run grunt tasks concurrently.'
- [grunt-contrib-clean](https://www.npmjs.org/package/grunt-contrib-clean) 0.6.0 - 'Clean files and folders.'
- [grunt-contrib-coffee](https://www.npmjs.org/package/grunt-contrib-coffee) 0.12.0 - 'Compile CoffeeScript files to JavaScript.'
- [grunt-contrib-concat](https://www.npmjs.org/package/grunt-contrib-concat) 0.5.0 - 'Concatenate files.'


"grunt-contrib-copy": "~0.5.0",
"grunt-contrib-cssmin": "~0.9.0",
"grunt-contrib-htmlmin": "~0.2.0",
"grunt-contrib-imagemin": "^0.7.1",
"grunt-contrib-jade": "^0.11.0",
"grunt-contrib-jshint": "~0.10.0",
"grunt-contrib-sass": "^0.7.3",
"grunt-contrib-uglify": "~0.4.0",
"grunt-contrib-watch": "~0.6.1",
"grunt-dom-munger": "^3.4.0",
"grunt-env": "~0.4.1",
"grunt-express-server": "~0.4.17",
"grunt-google-cdn": "~0.4.0",
"grunt-karma": "~0.8.2",
"grunt-mocha-test": "~0.10.2",
"grunt-newer": "~0.7.0",
"grunt-ng-annotate": "^0.2.3",
"grunt-node-inspector": "~0.1.5",
"grunt-nodemon": "~0.2.0",
"grunt-open": "~0.2.3",
"grunt-protractor-runner": "^1.1.0",
"grunt-rev": "~0.1.0",
"grunt-svgmin": "~0.4.0",
"grunt-usemin": "~2.1.1",
"grunt-wiredep": "~1.8.0",
"jit-grunt": "^0.5.0",
"jshint-stylish": "~0.1.5",
"karma": "~0.12.9",
"karma-chrome-launcher": "~0.1.3",
"karma-coffee-preprocessor": "~0.2.1",
"karma-firefox-launcher": "~0.1.3",
"karma-html2js-preprocessor": "~0.1.0",
"karma-jade-preprocessor": "0.0.11",
"karma-jasmine": "~0.1.5",
"karma-ng-html2js-preprocessor": "~0.1.0",
"karma-ng-jade2js-preprocessor": "^0.1.2",
"karma-ng-scenario": "~0.1.0",
"karma-phantomjs-launcher": "~0.1.4",
"karma-requirejs": "~0.2.1",
"karma-script-launcher": "~0.1.0",
"open": "~0.0.4",
"requirejs": "~2.1.11",
"should": "~3.3.1",
"supertest": "~0.11.0",
"time-grunt": "~0.3.1"

## Puppet modules

- [puppetlabs-apt](https://forge.puppetlabs.com/puppetlabs/apt) 1.6.0 - "The APT module provides a simple interface for managing APT source, key, and definitions with Puppet."
- [puppetlabs-stdlib](https://forge.puppetlabs.com/puppetlabs/stdlib) 4.3.2 - "This module provides a "standard library" of resources for developing Puppet Modules."

## Vagrant/vagrant-installed

- [ubuntu/trusty64](https://vagrantcloud.com/ubuntu/trusty64) 14.04 - A standard [Ubuntu 14.04 LTS (Trusty Tahr)](http://releases.ubuntu.com/14.04/) 64-bit box.  ***Vagrant checks for updates to this box automatically.***