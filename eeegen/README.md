# eeegen [![Build Status](https://secure.travis-ci.org/erikevenson/slush-eeegen.png?branch=master)](https://travis-ci.org/erikevenson/slush-eeegen) [![NPM version](https://badge-me.herokuapp.com/api/npm/slush-eeegen.png)](http://badges.enytc.com/for/npm/slush-eeegen)

> Experimental generator

## Getting Started

Install `slush-eeegen` globally:

```bash
  npm install -g slush-eeegen
```

Note: until this generator is released to npm, link the module from the module's home directory with:

```bash
  npm install
  sudo npm link
```

### Usage

Create a new folder for your project:

```bash
  mkdir example
```

Run the generator from within the new folder:

```bash
  cd example && slush eeegen
```

Answer the questions.  Additional details about the built project are available in the built project's README.md file.

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/klei/slush).

## Features

- bower
- mongo via Mongolab
- heroku
- initializr
- SSL

## Developing

Make sure you have the following installed on your development box:

- [heroku toolbelt](https://toolbelt.heroku.com/) - 'Everything you need to get started using heroku.'
- [mongoDB](http://www.mongodb.org/) 2.6.7 - 'The only database that harnesses the innovations of NoSQL (flexibility, scalability, performance) and builds on the foundation of relational databases (expressive query language, secondary indexes, strong consistency).'
- [node](http://nodejs.org/) 0.10.33 - 'Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.'

You will also need the following node modules installed globally:

- [gulp](http://gulpjs.com/) 3.8.10 - 'The streaming build system.'
- [npm](https://npmjs.org/doc/) 2.5.0 - 'node package manager'

If you are cloning this project rather than creating it from scratch the first time, be sure to install dependencies with:

```bash
  npm install
```

To run the app on a development server:

```bash
  gulp
```

You should be able to see the app at [https://localhost:3000](https://localhost:3000).  Changes in the source are watched for and are reflected in the refreshed browser.

To clean and then build the app into the `build` directory:

```bash
  gulp clean && gulp build
```

To run the built app on a development server:

```bash
  cd build && npm start
```

To deploy the built app to Heroku:

Enter secret credentials into `config/env.js` starting from the `config/env.sample.js` template.

To setup the app for the first time:

```bash
  gulp heroku-setup
```

This will create a tarball in the `temp` directory, upload it to a temporary location on AWS, and have Heroku use it to provision the app.  TBD -- allow choice of app name.  The app will be available at [https://appName.herokuapp.com](https://appName.herokuapp.com) after a short delay.

To deploy an already provisioned and re-built app with changes:

```bash
  gulp heroku-deploy --app appName
```

To ease deployment of an already provisioned and re-build app, add the app name as an instance to `config/build.js` and deploy with:

```bash
  gulp heroku-deploy --instance staging
```

More details are provided in the docs.

### Bower commands

Install bower dependencies with commands like

```bash
  bower install angularjs --save
```

The dependency will be added to the bower.json file and automatically added to your HTML with `wiredep`.

### Gulp commands

General build commands are documented inline in [config/build.js!](config/build.js).

- gulp (default)

Runs a development server with un-optimized files.  Watches source files and rebuilds.

- gulp build

Builds and lints an optimized version of the project in the build directory.

- gulp buildClient
- gulp buildServer
- gulp clean

Cleans the build and temp directory.

- gulp cssServer
- gulp htmlServer
- gulp jadeServer
- gulp jsClient
- gulp jsServer
- gulp misc
- gulp watch

#### AWS management

- gulp aws-s3-bucketsList
- gulp aws-s3-createBucket --name <bucketName>
- gulp aws-s3-objectsList --name <bucketName>

#### Heroku management

These commands aid the creation and deployment of the app on Heroku.

- heroku-addonsCreate

- heroku-appsInfo

- heroku-appsList

- heroku-backup

- gulp heroku-copy --from <fromInstance> --to <toInstance>

- gulp heroku-appSetupsInfo --id <appSetupId>

Provides information about the app setup.

- gulp heroku-buildsResultInfo --app <appName> --id <buildId> --instance <instanceName>

Provides information about the build results.  Either an instance name or an app name should be provided.  The instance name takes precedence if both are provided.

- heroku-configVarsInfo

- heroku-deploy

- heroku-restore

- heroku-setup

- gulp heroku-tarball

Creates a tarball (`.tar.gz`) of the built app in the build directory.

#### Mongo management

- mongo-seed

#### Lint management

- gulp gjslint
- gulp jshint
- gulp lint

#### Server management

- gulp server:restart
- gulp server:start

### Slush sub-generators

TBD

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/erikevenson/slush-eeegen/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/erikevenson/slush-eeegen/issues).

## License 

The MIT License

Copyright (c) 2015, Erik E. Evenson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

