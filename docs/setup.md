# Development environment

The easiest way to develop webcore is to use the provided vagrant box definitions for a database server and a web server.

- Install [VirtualBox](https://www.virtualbox.org/) and [Vagrant](http://www.vagrantup.com/).  Both are free.  On a Mac, the easiest way to install both is via [Homebrew](http://mxcl.github.io/homebrew/) and [homebrew-cask](https://github.com/phinze/homebrew-cask).

## Install host software and link remotes

- Install [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest)

```
  vagrant plugin install vagrant-vbguest
```

- Clone this repository and checkout the branch you want to work with.

```
  git clone git@github.com:ErikEvenson/webcore.git
```

## Build development box

The vagrant box will update the image occasionally and this might cause some issues.  To reset everything, `vagrant destroy` the development box and `vagrant box remove <box name>` the base box.  This shouldn't be necessary very often.

- Remove any existing vagrant boxes.
  
```
  vagrant destroy
```

- Refresh the base box if desired.

```
  vagrant box remove <box name>
```

- Check that the latest versions of vagrant and virtualbox are being used.  Both are best installed on a Mac with homebrew and homebrew cask.

- Make sure the config parameters in the vagrant install scripts are as desired.  These are in the `/vagrant_data` directory and include things like database version to use.

- Bring up the box -- this will take a while the first time to both download and provision the box.  A password may be necessary for the host to enable folder syncing.

```
  vagrant up
```

- It is best to reload the VMs once to make sure all the VM's software is updated.

```
  vagrant reload
```

- Enter the virtual development environment on the web server with:

```
  vagrant ssh web
```

- Copy a version of the ssh keys necessary for connecting to the github repository to `~/.ssh` on web VM.  This will allow pulling/pushing to github.  Typically this is `cp ~/.shh/*id_rsa*` on the host and `mv *id_rsa* ~/.ssh/.` on the web VM.  ***Be sure not to commit your ssh keys to the repository.***

```
  cp ~/.ssh/*id_rsa* .
  mv *id_rsa* ~/.ssh/.
```

- If you will be committing from the VM, be sure to set your name and email for commit messages.

```
  git config --global user.name "Erik Evenson"
  git config --global user.email "erik.e.evenson@gmail.com"
```

- Install vim, set the default text editor for commit messages, and enable ssh-agent.

```
  sudo apt-get install vim
  sudo update-alternatives --config editor
  eval `ssh-agent -s` && ssh-add
```

- Since the provisioning script installs a recent version (but pinned so check this) of git keep git from being chatty with:

```
  git config --global push.default simple
```
