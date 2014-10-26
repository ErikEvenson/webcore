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

## gem-installed

- [puppet-lint](http://puppet-lint.com/) 1.0.1 - "Check that your Puppet manifest conform to the style guide."

## Installed on host

These tools are installed directly on the host.  On a Mac, they are can be installed easily using [homebrew](http://brew.sh/) and [homebrew cask](http://caskroom.io/).

***Check for updates manually.***

- [MongoDB](http://www.mongodb.org/) 2.6.5
- [Vagrant](https://www.vagrantup.com/) 1.6.3 [Change log](https://github.com/mitchellh/vagrant/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant) - used to manage development environment configuration.
- [VirtualBox](https://www.virtualbox.org/) 4.3.14 [Changelog](https://www.virtualbox.org/wiki/Changelog) 4.3.14-95030 - used to host development environment.

## npm-installed

Global:

- [bower](https://www.npmjs.org/package/bower) 1.3.9 [Changelog](https://github.com/bower/bower/blob/master/CHANGELOG.md)[Fork](https://www.virtualbox.org/) - front end package management.  Bower will warn when it has an update.  Installed by yeoman.
- [grunt-cli](https://github.com/gruntjs/grunt-cli) 0.1.13 [Fork](https://github.com/EATechnologies/grunt-cli) 
- [npm](https://npmjs.org/doc/) 1.4.23 [Fork](https://github.com/EATechnologies/npm) - "node package manager"
- [npm-check-updates](https://www.npmjs.org/package/npm-check-updates) 1.2.0 [Fork](https://github.com/EATechnologies/npm-check-updates) - Find newer versions of dependencies than what your package.json allows.
- [yeoman](http://yeoman.io/) 1.3.3 [Changelog](https://github.com/yeoman/yo/releases) [Fork](https://github.com/EATechnologies/yo) - "CLI tool for running Yeoman generators"  yeoman will install bower and grunt-cli.


## Puppet modules

- [puppetlabs-apt](https://forge.puppetlabs.com/puppetlabs/apt) 1.6.0 - "The APT module provides a simple interface for managing APT source, key, and definitions with Puppet."
- [puppetlabs-stdlib](https://forge.puppetlabs.com/puppetlabs/stdlib) 4.3.2 - "This module provides a "standard library" of resources for developing Puppet Modules."

## Vagrant/vagrant-installed

- [ubuntu/trusty64](https://vagrantcloud.com/ubuntu/trusty64) 14.04 - A standard [Ubuntu 14.04 LTS (Trusty Tahr)](http://releases.ubuntu.com/14.04/) 64-bit box.  ***Vagrant checks for updates to this box automatically.***