# Slush generator workspace

A workspace for developing a slush generator.

## Setting up the base box

Using the base box requires installing two packages on the host machine: [VirtualBox](https://www.virtualbox.org/) and [Vagrant](http://www.vagrantup.com/).  Both are free.  On a Mac, the easiest way to install both is via [Homebrew](http://mxcl.github.io/homebrew/) and [homebrew-cask](https://github.com/phinze/homebrew-cask).  See the `technology_stack.md` document to find out what versions of software are known to be compatible.

Install the [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) plugin to enable the [VirtualBox Guest Additions](https://www.virtualbox.org/manual/ch04.html).

```bash
	vagrant plugin install vagrant-vbguest
```

Install the [vagrant-librarian-puppet](https://github.com/mhahn/vagrant-librarian-puppet) plugin.

```bash
	vagrant plugin install vagrant-librarian-puppet
```

Install vagrant-cachier to speed up provisioning.  vagrant-cachier requires Xcode Command Line Tools to be installed as well.

```bash
  vagrant plugin install vagrant-cachier
```

Remove any existing vagrant boxes.
	
```bash
	vagrant destroy
```

Refresh the base box if desired.  This shouldn't really be necessary.

```bash
	vagrant box remove <box name>
```

## Using the base box

Bring up the box -- this will take a while the first time to both download and provision the box.  A password may be necessary for the host to enable folder syncing.

```bash
	vagrant up
```

Copy a version of the ssh keys necessary for connecting to the github repository to the web VM.  ***Be sure not to commit your ssh keys to the repository.***

```bash
  mkdir temp
  cp -R ~/.ssh/{config,github,heroku} temp/.
```

Enter the virtual development environment on the web server.

```bash
	vagrant ssh
```

Move the ssh keys necessary for connecting to the github repository to `~/.ssh` on web VM.  This will allow pulling/pushing to github and use of the heroku toolbelt.  ***Be sure not to commit your ssh keys to the repository.***

```bash
  mv temp/{config,github,heroku} ~/.ssh/.
```

If you will be committing from the VM, be sure to set your name and email for commit messages, and keep git from being chatty (substitute your data).

```bash
  git config --global user.name "Erik Evenson"
  git config --global user.email "erik.e.evenson@gmail.com"
  git config --global push.default simple
```

Enable ssh-agent.

```bash
  eval `ssh-agent -s` && ssh-add ~/.ssh/**/*id_rsa
```

Add node globals.  Reflect any updates to these modules in the technology stack document.

```bash
  npm config set strict-ssl false
  sudo npm -g install npm@2.5.0
  sudo npm -g install npm-check-updates@1.5.1 npm-install-missing@0.1.4
  sudo npm -g install gulp@3.8.10 slush@1.0.1
  sudo npm -g install slush-generator@0.2.5
  sudo npm -g install bower@1.3.12
```

When done, exit the virtual environment and `vagrant halt` to stop the virtual machine.  Use `vagrant destroy` to reclaim the disk space (although this will require you to re-provision the machine again later).  `vagrant remove` should be used to remove the base box from the system as well.  `vagrant up` and `vagrant ssh web` to start another development session later.  Avoid using `--no-provision` as this seems to prevent `vagrant-cachier` from working correctly.
