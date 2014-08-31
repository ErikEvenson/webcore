# Yeoman

A yeoman development box using generator-webapp.

## Setting up the base box

Using the base box requires installing two packages on the host machine: [VirtualBox](https://www.virtualbox.org/) and [Vagrant](http://www.vagrantup.com/).  Both are free.  On a Mac, the easiest way to install both is via [Homebrew](http://mxcl.github.io/homebrew/) and [homebrew-cask](https://github.com/phinze/homebrew-cask).

Install the [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) plugin to enable the [VirtualBox Guest Additions](https://www.virtualbox.org/manual/ch04.html).

```
	vagrant plugin install vagrant-vbguest
```

Install the [vagrant-librarian-puppet](https://github.com/mhahn/vagrant-librarian-puppet) plugin.

```
	vagrant plugin install vagrant-librarian-puppet
```

Remove any existing vagrant boxes.
	
```
	vagrant destroy
```

Refresh the base box if desired.  This shouldn't really be necessary.

```
	vagrant box remove <box name>
```

## Using the base box

Bring up the box -- this will take a while the first time to both download and provision the box.  A password may be necessary for the host to enable folder syncing.

```
	vagrant up
```

Copy a version of the ssh keys necessary for connecting to the github repository to the web VM.  ***Be sure not to commit your ssh keys to the repository.***

```
  cp ~/.ssh/*id_rsa* .
```

Enter the virtual development environment on the web server.

```
	vagrant ssh
```

Move the ssh keys necessary for connecting to the github repository to `~/.ssh` on web VM.  This will allow pulling/pushing to github.  ***Be sure not to commit your ssh keys to the repository.***

```
  mv *id_rsa* ~/.ssh/.
```

If you will be committing from the VM, be sure to set your name and email for commit messages, and keep git from being chatty (substitute your data).

```
  git config --global user.name "Erik Evenson"
  git config --global user.email "erik.e.evenson@gmail.com"
  git config --global push.default simple
```

Enable ssh-agent.

```
  eval `ssh-agent -s` && ssh-add
```

When done, exit the virtual environment and `vagrant halt` to stop the virtual machine.  Use `vagrant destroy` to reclaim the disk space (although this will require you to re-provision the machine again later).  `vagrant remove` should be used to remove the base box from the system as well.  `vagrant up` and `vagrant ssh web` to start another development session later.

## Generate web site

Generate the website.  Use bootstrap, SASS, Modernizr, and libsass.

```
mkdir example
cd example
yo webapp --coffee
```

## Develop

```
grunt
grunt test
grunt serve
```
