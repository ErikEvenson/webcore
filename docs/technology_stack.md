# Technology stack

These are the technologies used in this project.

## Foundational

- [bash](http://www.gnu.org/software/bash/manual/bashref.html) 4.2.24 - shell.

## bash-installed

- [puppet](http://puppetlabs.com/) - "Open source Puppet is a flexible, customizable framework available under the Apache 2.0 license designed to help system administrators automate the many repetitive tasks they regularly perform."
	- apt-get-installed
- [vagrant-librarian-puppet](https://github.com/mhahn/vagrant-librarian-puppet) 0.7.1 - A Vagrant plugin to install Puppet modules using Librarian-Puppet.
- [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) 0.10.0 [Changelog[(https://github.com/dotless-de/vagrant-vbguest/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant-vbguest) - automatically keeps VirtualBox Guest Additions up to date.  ***Updates are manual.***

## Installed on host

These tools are installed directly on the host.  On a Mac, they are can be installed easily using [homebrew](http://brew.sh/) and [homebrew cask](http://caskroom.io/).

***Check for updates manually.***

- [Vagrant](https://www.vagrantup.com/) 1.6.3 [Change log](https://github.com/mitchellh/vagrant/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant) - used to manage development environment configuration.
- [VirtualBox](https://www.virtualbox.org/) 4.3.14 [Changelog](https://www.virtualbox.org/wiki/Changelog) 4.3.14-95030 - used to host development environment.

## Puppet modules

- [puppetlabs-stdlib](https://forge.puppetlabs.com/puppetlabs/stdlib) 4.3.2 - "This module provides a "standard library" of resources for developing Puppet Modules."

## Vagrant/vagrant-installed

- [ubuntu/trusty64](https://vagrantcloud.com/ubuntu/trusty64) 14.04 - A standard [Ubuntu 14.04 LTS (Trusty Tahr)](http://releases.ubuntu.com/14.04/) 64-bit box.  ***Vagrant checks for updates to this box automatically.***