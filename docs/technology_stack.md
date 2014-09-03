# Technology stack

These are the technologies used in this project.

## Foundational

- [bash](http://www.gnu.org/software/bash/manual/bashref.html) 4.2.24 - shell.

## apt-get-installed

- [fontconfig](http://packages.ubuntu.com/precise/fontconfig) 2.8.0-3ubuntu9 - "generic font configuration library - support binaries."  Required by phantomjs.
- [git](http://git-scm.com/) 2.1.0 - "Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency." 
- [mercurial](http://mercurial.selenic.com/) 3.0.1 - "Easy-to-use, scalable distributed version control system."
- [node](http://nodejs.org/) 0.10.31 - Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.  Note that npm comes with node now.

## bash-installed

- [puppet](http://puppetlabs.com/) - "Open source Puppet is a flexible, customizable framework available under the Apache 2.0 license designed to help system administrators automate the many repetitive tasks they regularly perform."
	- apt-get-installed
- [vagrant-librarian-puppet](https://github.com/mhahn/vagrant-librarian-puppet) 0.7.1 - A Vagrant plugin to install Puppet modules using Librarian-Puppet.
- [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) 0.10.0 [Changelog[(https://github.com/dotless-de/vagrant-vbguest/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant-vbguest) - automatically keeps VirtualBox Guest Additions up to date.  ***Updates are manual.***

## bower-installed

- [bootstrap-sass-official](https://github.com/twbs/bootstrap-sass) 3.2.0 - "Official Sass port of Bootstrap"
- [modernizr](https://github.com/Modernizr/Modernizr) 2.8.2 = "Modernizr is a JavaScript library that detects HTML5 and CSS3 features in the user’s browser."

## gem-installed

- [puppet-lint](http://puppet-lint.com/) 1.0.1 - "Check that your Puppet manifest conform to the style guide."
- [sass](https://rubygems.org/gems/sass) 3.4.2 - CSS extension language.

blankslate (2.1.2.4)
bundler (1.7.2)
celluloid (0.15.2)
chunky_png (1.3.1)
classifier (1.3.4)
classifier-reborn (2.0.1)
coffee-script (2.3.0)
coffee-script-source (1.8.0)
colorator (0.1)
commander (4.1.6)
compass (1.0.1)
compass-core (1.0.1)
compass-import-once (1.0.5)
execjs (2.2.1)
fast-stemmer (1.0.2)
ffi (1.9.3)
highline (1.6.21)
jekyll (2.3.0, 1.4.3)
jekyll-coffeescript (1.0.1)
jekyll-gist (1.1.0)
jekyll-paginate (1.0.0)
jekyll-sass-converter (1.2.1)
jekyll-watch (1.1.0)
kramdown (1.4.1)
liquid (2.6.1, 2.5.5)
listen (2.7.9, 1.3.1)
maruku (0.7.2)
mercenary (0.3.4)
multi_json (1.10.1)
parslet (1.5.0)
posix-spawn (0.3.9)
pygments.rb (0.6.0, 0.5.4)
rb-fsevent (0.9.4)
rb-inotify (0.9.5)
rb-kqueue (0.2.3)
redcarpet (3.1.2, 2.3.0)
safe_yaml (1.0.3, 0.9.7)
timers (1.1.0)
toml (0.1.1)
yajl-ruby (1.1.0)

## Installed on host

These tools are installed directly on the host.  On a Mac, they are can be installed easily using [homebrew](http://brew.sh/) and [homebrew cask](http://caskroom.io/).

***Check for updates manually.***

- [Vagrant](https://www.vagrantup.com/) 1.6.3 [Change log](https://github.com/mitchellh/vagrant/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant) - used to manage development environment configuration.
- [VirtualBox](https://www.virtualbox.org/) 4.3.14 [Changelog](https://www.virtualbox.org/wiki/Changelog) 4.3.14-95030 - used to host development environment.

## npm-installed

Global:

- [bower](https://www.npmjs.org/package/bower) 1.3.9 [Changelog](https://github.com/bower/bower/blob/master/CHANGELOG.md)[Fork](https://www.virtualbox.org/) - front end package management.  Bower will warn when it has an update.  Installed by yeoman.
- [generator-mocha](https://www.npmjs.org/package/generator-mocha) 0.1.5 - "Yeoman generator for Mocha."  Installed by generator-jekyllrb.
- [generator-jekyllrb]() 1.2.1
- [grunt-cli](https://github.com/gruntjs/grunt-cli) 0.1.13 [Fork](https://github.com/EATechnologies/grunt-cli) 
- [npm](https://npmjs.org/doc/) 1.4.23 [Fork](https://github.com/EATechnologies/npm) - "node package manager"
- [npm-check-updates](https://www.npmjs.org/package/npm-check-updates) 1.2.0 [Fork](https://github.com/EATechnologies/npm-check-updates) - Find newer versions of dependencies than what your package.json allows.
- [yo](http://yeoman.io/) 1.2.1 [Changelog](https://github.com/yeoman/yo/releases) [Fork](https://github.com/EATechnologies/yo) - "CLI tool for running Yeoman generators"  yeoman will install bower and grunt-cli.

Local:

- [coffeelint]() 1.6.0
- [grunt](http://gruntjs.com/) 0.4.5 - "The JavaScript Task Runner."
- [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) 1.0.1 - "Parse CSS and add vendor-prefixed CSS properties using the Can I Use database."
- [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control) 0.1.3 - "Version control your built code."
- [grunt-coffeelint](https://github.com/vojtajina/grunt-coffeelint) 0.0.13
- [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) 0.5.0 - "Run grunt tasks concurrently."
- [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) 0.6.0 - "Clear files and folders."
- [grunt-contrib-coffee](https://github.com/gruntjs/grunt-contrib-coffee) 0.11.1 - "Compile CoffeeScript files to JavaScript."
- [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass) 0.7.2
- [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) 0.5.0 - "Concatenate files."
- [grunt-contrib-connect](https://www.npmjs.org/package/grunt-contrib-connect) 0.8.0 - "Start a static web server."
- [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy) 0.5.0 - "Copy files and folders."
- [grunt-contrib-csslint](https://github.com/gruntjs/grunt-contrib-csslint) 0.2.0
- [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin) 0.10.0 - "Compress CSS files."
- [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin) 0.3.0 - "Minify HTML."
- [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) 0.8.1 - "Minify PNG and JPEG images."
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) 0.10.0 - "Validate files with JSHint."
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) 0.5.1 - "Minify files with UglifyJS."
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) b8849488 - "Run tasks whenever watched files change."
- [grunt-filerev]() 0.2.1
- [grunt-jekyll](https://github.com/dannygarcia/grunt-jekyll) 0.4.2
- [grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin) 0.4.0 - "Minify SVG."
- [grunt-usemin](https://github.com/yeoman/grunt-usemin) 2.4.0 - "Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views)."
- [jshint-stylish](https://github.com/sindresorhus/jshint-stylish) 0.4.0 - "Stylish reporter for JSHint."
- [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) 0.4.0 - "Load multiple grunt tasks using globbing patterns."
- [time-grunt](https://github.com/sindresorhus/time-grunt) 0.2.10 - "Display the elapsed execution time of grunt tasks."

## Puppet modules

- [puppetlabs-apt](https://forge.puppetlabs.com/puppetlabs/apt) 1.6.0 - "The APT module provides a simple interface for managing APT source, key, and definitions with Puppet."
- [puppetlabs-stdlib](https://forge.puppetlabs.com/puppetlabs/stdlib) 4.3.2 - "This module provides a "standard library" of resources for developing Puppet Modules."

## Vagrant/vagrant-installed

- [ubuntu/trusty64](https://vagrantcloud.com/ubuntu/trusty64) 14.04 - A standard [Ubuntu 14.04 LTS (Trusty Tahr)](http://releases.ubuntu.com/14.04/) 64-bit box.  ***Vagrant checks for updates to this box automatically.***