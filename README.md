# Yeoman

A yeoman development box with angular fullstack generator installed.

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
  mkdir temp
  cp -R ~/.ssh/{config,github,heroku} temp/.
```

Enter the virtual development environment on the web server.

```
	vagrant ssh
```

Move the ssh keys necessary for connecting to the github repository to `~/.ssh` on web VM.  This will allow pulling/pushing to github.  ***Be sure not to commit your ssh keys to the repository.***

```
  mv temp/{config,github,heroku} ~/.ssh/.
```

If you will be committing from the VM, be sure to set your name and email for commit messages, and keep git from being chatty (substitute your data).

```
  git config --global user.name "Erik Evenson"
  git config --global user.email "erik.e.evenson@gmail.com"
  git config --global push.default simple
```

Enable ssh-agent.

```
  eval `ssh-agent -s` && ssh-add ~/.ssh/**/*id_rsa
```

When done, exit the virtual environment and `vagrant halt` to stop the virtual machine.  Use `vagrant destroy` to reclaim the disk space (although this will require you to re-provision the machine again later).  `vagrant remove` should be used to remove the base box from the system as well.  `vagrant up` and `vagrant ssh web` to start another development session later.

## Generator

Adapted from [usage instructions](https://github.com/DaftMonk/generator-angular-fullstack)

```
  mkdir example && cd $_
  yo angular-fullstack example
```

Prompts:

bower stats yes
coffeescript
jade
Sass
uiRouter
bootstrap
UI Bootstrap
mongodb
auth
no strategies
no socket.io

Might need to:

```
  bower install & npm install
```

This seems to be necessary:

```
  npm install grunt-contrib-imagemin@0.7.1 --save-dev
```

grunt build
cd dist
heroku login
yo angular-fullstack:heroku
heroku addons:add mongohq
grunt build
grunt buildcontrol:heroku

Run grunt for building, grunt serve for preview, and grunt serve:dist for a preview of the built app.

## Development additions

http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
Create tasks directory.

```
  npm install grunt-mongoimport --save-dev
```

Set up mongoimport.


