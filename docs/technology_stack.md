# Technology stack

These are the technologies used in this project.

## Foundational

- [bash](http://www.gnu.org/software/bash/manual/bashref.html) 4.3.11(1)-release (x86_64-pc-linux-gnu) - shell.

## apt-get-installed

- [fontconfig](http://packages.ubuntu.com/precise/fontconfig) 2.8.0-3ubuntu9 - "generic font configuration library - support binaries."  Required by phantomjs.
- [git](http://git-scm.com/) [apt-get source](https://launchpad.net/~git-core) 2.3.0 - "Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency." 
- [mercurial](http://mercurial.selenic.com/) 3.0.1 - "Easy-to-use, scalable distributed version control system."
- [vim](http://www.vim.org/) 2:7.4.052-1ubuntu3 - "Vim is an advanced text editor that seeks to provide the power of the de-facto Unix editor 'Vi', with a more complete feature set. It's useful whether you're already using vi or using a different editor."

## bash-installed

- [puppet](http://puppetlabs.com/) 3.7.4 - "Open source Puppet is a flexible, customizable framework available under the Apache 2.0 license designed to help system administrators automate the many repetitive tasks they regularly perform."

## gem-installed

- [puppet-lint](http://puppet-lint.com/) 1.1.0 - "Check that your Puppet manifest conform to the style guide."

## Installed on host

These tools are installed directly on the host.  On a Mac, they are can be installed easily using [homebrew](http://brew.sh/) and [homebrew cask](http://caskroom.io/).

***Check for updates manually.***

- [Vagrant](https://www.vagrantup.com/) 1.7.2 [Change log](https://github.com/mitchellh/vagrant/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant) - used to manage development environment configuration.
- [vagrant-cachier](https://github.com/fgrehm/vagrant-cachier/) 1.2.0 - "A Vagrant plugin that helps you reduce the amount of coffee you drink while waiting for boxes to be provisioned by sharing a common package cache among similiar VM instances."
- [vagrant-librarian-puppet](https://github.com/mhahn/vagrant-librarian-puppet) 0.8.0 - A Vagrant plugin to install Puppet modules using Librarian-Puppet.
- [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) 0.10.0 [Changelog[(https://github.com/dotless-de/vagrant-vbguest/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant-vbguest) - automatically keeps VirtualBox Guest Additions up to date.  ***Updates are manual.***
- [VirtualBox](https://www.virtualbox.org/) 4.3.20 [Changelog](https://www.virtualbox.org/wiki/Changelog) 4.3.20-96996 - used to host development environment.

## npm-installed

Global:

- [bower](https://www.npmjs.org/package/bower) 1.3.9 [Changelog](https://github.com/bower/bower/blob/master/CHANGELOG.md)[Fork](https://www.virtualbox.org/) - front end package management.  Bower will warn when it has an update.  Installed by yeoman.
- [grunt-cli](https://github.com/gruntjs/grunt-cli) 0.1.13 [Fork](https://github.com/EATechnologies/grunt-cli) 
- [npm](https://npmjs.org/doc/) 2.3.0 - "node package manager"
* [npm-check-updates](https://www.npmjs.org/package/npm-check-updates) 1.2.0 [Fork](https://github.com/EATechnologies/npm-check-updates) - Find newer versions of dependencies than what your package.json allows.
* [npm-install-missing](https://www.npmjs.org/package/npm-install-missing) 0.1.4 - 'This module will attempt to reinstall any missing dependencies. It can be called via the command line or used programmatically.'
* [yo](http://yeoman.io/) 1.3.3 [Changelog](https://github.com/yeoman/yo/releases) [Fork](https://github.com/EATechnologies/yo) - "CLI tool for running Yeoman generators"  yeoman will install bower and grunt-cli.

## Puppet modules

- [jamesnetherton-google_chrome](https://forge.puppetlabs.com/jamesnetherton/google_chrome) 0.1.0 'Installs the Google Chrome web browser.'
- [puppetlabs-apt](https://forge.puppetlabs.com/puppetlabs/apt) 1.7.0 - "The APT module provides a simple interface for managing APT source, key, and definitions with Puppet."
- [puppetlabs-stdlib](https://forge.puppetlabs.com/puppetlabs/stdlib) 4.5.1 - "This module provides a "standard library" of resources for developing Puppet Modules."

## Vagrant/vagrant-installed

- [ubuntu/trusty64](https://vagrantcloud.com/ubuntu/trusty64) 14.04 - A standard [Ubuntu 14.04 LTS (Trusty Tahr)](http://releases.ubuntu.com/14.04/) 64-bit box.  ***Vagrant checks for updates to this box automatically.***