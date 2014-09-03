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

Generate the website.  Use Compass, Autoprefixer, Coffeescript, Default Jekyll, pretty, ../dist

```
  mkdir example
  cd example
  yo jekyllrb
```

0.0.0.0/5000

Change baseurl in _config.yml and _config.build.yml

Add these lines to example/Gruntfile.js, replacing as necessary.

```
  var pkg = require('./package.json');
```

```
  buildcontrol: {
    options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
    },
    heroku: {
      options: {
        remote: 'git@heroku.com:ancient-forest-2940.git',
        branch: 'master',
        tag: pkg.version
      }
    },
    local: {
      options: {
        remote: '../dist',
        branch: 'build'
      }
    },
    pages: {
      options: {
        remote: 'git@github.com:ErikEvenson/webcore.git',
        branch: 'gh-pages'
      }
    }
  }
```

Add {{ set.baseurl }} to ...

Add cdn task and add to build:
```
  npm install grunt-cdn --save-dev
```

```
  cdn: {
    options: {
      cdn: '/baseurl/', flatten: true
    },
    dist: {
      src: ['<%= yeoman.dist %>/**/*.html', '<%= yeoman.dist %>/**/*.css']
    }
  },
```

Build and check site.

```
  grunt build
  grunt serve
```

Test pages: http://erikevenson.github.io/webcore/

```
  grunt build
  grunt buildcontrol:pages
```


===

heroku stub instructions
Build a local.

```
  cd dist
  npm init

  name: (dist) example
  version: (1.0.0) 0.0.0
  description: example
  entry point: (index.js) web.js
  test command: 
  git repository: git@github.com:ErikEvenson/webcore.git
  keywords: 
  author: 
  license: (ISC)

  npm install express gzippo --save

```

Add web.js

```
  var express = require('express');
  var http = require('http');
  var gzippo = require('gzippo');
  var app = express();
  //app.use(express.logger());
  app.use(gzippo.staticGzip('' + __dirname));
  var server = http.createServer(app);
  server.listen(process.env.PORT || 5000);
```

Add Procfile

```
  web: node web.js
```

Add grunt-build-control.

```
  cd ..
  npm install grunt-build-control --save-dev
```


Update grunt clean.

```
  clean: {
    dist: {
      files: [{
        dot: true,
        src: [
          '.tmp',
          '<%= config.dist %>/*',
          '!<%= config.dist %>/.git*',
          '!<%= config.dist %>/Procfile',
          '!<%= config.dist %>/package.json',
          '!<%= config.dist %>/web.js',
          '!<%= config.dist %>/node_modules'
        ]
      }]
    },
    server: '.tmp'
  },
```

Test local: http://192.168.50.4:5000/

```
  grunt buildcontrol:local
  foreman start
```


Test heroku: http://ancient-forest-2940.herokuapp.com/

```
  grunt buildcontrol:heroku
```
