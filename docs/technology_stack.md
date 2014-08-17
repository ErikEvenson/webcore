# Technology stack

These are the technologies used in implementing webcore.  Version numbers represent version noted as being used successfully with webcore.

Tools are organized by method of installation.  Methods to check for and apply updates are described.

These sections are being updated...

## Foundational

## apt-get-installed

These packages are installed into the development environment via the vagrant provisioning scripts (install.sh) via apt-get.  Typically, they are pinned and not updated.

***To check for available updates:***

- web VM: `apt-get -s build-essential curl git mercurial node python-software-properties`

Be sure to update this check command when adding new packages.

### Vagrant guest tools dependencies

- [python-software-properties](http://packages.ubuntu.com/precise/python-software-properties) 0.82.7.7 - Manage the repositories that you install software from.  This software provides an abstraction of the used apt repositories.  It allows you to easily manage your distribution and independent software vendor software sources.

### Stand alone dependencies

- [curl](http://packages.ubuntu.com/precise/curl) 7.22.0-3ubuntu4.8 - Get a file from an HTTP, HTTPS or FTP server.
- [git](https://launchpad.net/~git-core/+archive/ubuntu/ppa) 1:2.0.4-0ppa1~ubuntu12.04.1 [Changelog](https://github.com/git/git/tree/master/Documentation/RelNotes) - fast, scalable, distributed revision control system.  A PPA is used to get the latest version of git.
- [mercurial](https://launchpad.net/~mercurial-ppa/+archive/ubuntu/releases) 3.0.1-0ppa1~precise1 - easy-to-use, scalable distributed version control system.  A PPA is used to get a more recent version of mercurial.
- [node](https://launchpad.net/~chris-lea/+archive/ubuntu/node.js) 0.10.30-1chl1~precise1 [Website](http://nodejs.org/) - Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.  Note that npm comes with node now.

## bash-installed

These packges are installed manually into the develpoment VM using bash in the provisioning scripts.

-...

These packages are manually installed into the host machine using bash.

- [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) 0.10.0 [Changelog[(https://github.com/dotless-de/vagrant-vbguest/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant-vbguest) - automatically keeps VirtualBox Guest Additions up to date.  ***Updates are manual.***

## bower-installed

***Check for available updates with `bower list`.***  Dependencies are upgraded via `bower.json`.  Bower itself is installed via npm.


## gem-installed

***Check for updates with `gem outdated`.***

## homebrew and homebrew-cask-installed

***Check for updates manually.***

- [Vagrant](https://github.com/caskroom/homebrew-cask/blob/master/Casks/vagrant.rb) 1.6.3 [Change log](https://github.com/mitchellh/vagrant/blob/master/CHANGELOG.md) [Fork](https://github.com/EATechnologies/vagrant) - used to manage development environment configuration.
- [VirtualBox](https://www.virtualbox.org/) 4.3.14 [Changelog](https://www.virtualbox.org/wiki/Changelog) 4.3.14-95030 - used to host development environment.

## npm-installed

npm has global and local installs.  Check for updates with:

```
npm-check-updates -g && npm-check-updates  
```

Globals are updated with:

```
sudo npm install package@version -g
```

and changing the VM install script.  Locals are updated with:

```
sudo npm install package@version
```

and changing the `package.json` file.

npm is installed during provisioning along with node.  Upgrade npm itself with:

```
npm install npm@version -g
```

and repin the new version in the install script.

  Global:

- [npm](https://npmjs.org/doc/) 1.4.23 [Fork](https://github.com/EATechnologies/npm) - "node package manager"
- [npm-check-updates](https://www.npmjs.org/package/npm-check-updates) 1.2.0 [Fork](https://github.com/EATechnologies/npm-check-updates) - Find newer versions of dependencies than what your package.json allows.

  Local:

- ...

## Vagrant-installed

- [hashicorp/precise64](https://vagrantcloud.com/hashicorp/precise64) 1.1.0 - A standard [Ubuntu 12.04 LTS (Precise Pangolin)](http://releases.ubuntu.com/12.04/) 64-bit box.  Vagrant checks for updates to this box automatically.
