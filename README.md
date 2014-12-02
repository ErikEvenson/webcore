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

Install vagrant-cachier to speed up provisioning.  vagrant-cachier requires Xcode Command Line Tools to be installed as well.

```
  vagrant plugin install vagrant-cachier
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

Add node globals

```
  npm config set strict-ssl false
  npm config set registry http://registry.npmjs.eu/
  sudo npm -g install npm@2.1.10
  sudo npm -g install bower@1.3.12 generator-angular-fullstack@2.0.13 grunt-cli@0.1.13 npm-check-updates@1.2.0 npm-install-missing@0.1.4
```

When done, exit the virtual environment and `vagrant halt` to stop the virtual machine.  Use `vagrant destroy` to reclaim the disk space (although this will require you to re-provision the machine again later).  `vagrant remove` should be used to remove the base box from the system as well.  `vagrant up` and `vagrant ssh web` to start another development session later.  Avoid using `--no-provision` as this seems to prevent `vagrant-cachier` from working correctly.

## Generator -- first time

Adapted from [usage instructions](https://github.com/DaftMonk/generator-angular-fullstack)

```
  mkdir example && cd $_
  yo angular-fullstack example
```

Answer prompts with:

- bower stats yes
- use coffeescript
- use jade
- use Sass
- use uiRouter
- include bootstrap
- include UI Bootstrap
- use mongodb with mongoose
- use authorization scaffold
- use authorization strategies as needed
- use socket.io

Sometimes this fails.  For conflicts, use angular 1.3.2 option #2.  Might need to:

```
  npm-install-missing
```

Set up end-to-end testing:

```
  npm run update-webdriver
```

```
  grunt build
  cd dist
  heroku login
```

Set up staging:

```
  yo angular-fullstack:heroku
```

Set name as `example-staging`.  Note heroku repo name and modify buildcontrol with something like this:


```
  staging: {
    options: {
      remote: 'git@heroku.com:example-staging.git',
      branch: 'master'
    }
  }
```

Add mongodb addon and set environment (duplicate example/server/config/environment/production.js for staging):

```
  heroku addons:add mongohq --app example-staging
  heroku config:set NODE_ENV=staging --app example-staging
```

Check buildcontrol:

```
  grunt build
  grunt buildcontrol:staging
```

Set up production:

```
  yo angular-fullstack:heroku
```

Set name as `example`.  Note heroku repo name and modify buildcontrol with something like this:


```
  production: {
    options: {
      remote: 'git@heroku.com:example.git',
      branch: 'master'
    }
  }
```

Add mongodb addon and set environment:

```
  heroku addons:add mongohq --app example
  heroku config:set NODE_ENV=production --app example
```

Check buildcontrol:

```
  grunt build
  grunt buildcontrol:production
```

Run grunt for building, grunt serve for preview, and grunt serve:dist for a preview of the built app.

## Generator -- subsequent clones

```
  cd example
  sudo chown -R vagrant:vagrant /home/vagrant/.npm
  bower install & npm install
  npm-install-missing
```

This seems to be necessary:

```
  npm install grunt-contrib-imagemin@0.7.1
```

Set up end-to-end testing:

```
  npm run update-webdriver
```

```
  grunt build
  heroku login
  set buildcontrol git@heroku.com:example.git
  grunt buildcontrol:heroku
```
Run grunt for building, grunt serve for preview, and grunt serve:dist for a preview of the built app.

## Development additions

## To do

Xvfb config before e2e tests:

```
  Xvfb :1 -screen 5 1024x768x8 &
  export DISPLAY=:1.5
```

http://www.yann.com/en/use-xvfb-selenium-and-chrome-to-drive-a-web-browser-in-php-23/08/2012.html
https://github.com/cwarden/puppet-module-xvfb



