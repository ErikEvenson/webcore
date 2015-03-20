# Base box

This is a base vagrant box with a puppet provisioner.  The stack used is documented at [docs/technology_stack.md](docs/technology_stack.md).

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

Install [vagrant-cachier](https://github.com/fgrehm/vagrant-cachier) to speed up provisioning.  vagrant-cachier requires Xcode Command Line Tools to be installed as well.

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

Copy a version of any necessary ssh keys to the web VM.  ***Be sure not to commit your ssh keys to the repository.***

```bash
mkdir temp
cp -R ~/.ssh/{config,github,heroku} temp/.
```

Enter the virtual development environment on the web server.

```bash
vagrant ssh
```

Move any ssh keys necessary (to connect to a github repository for example) to `~/.ssh` on web VM.  ***Be sure not to commit your ssh keys to any public repository.***

```bash
mv temp/{config,github,heroku} ~/.ssh/.
```

If you will be committing from the VM, be sure to set your name and email for commit messages, and keep git from being chatty (substitute your data).

```bash
git config --global user.name "Erik Evenson"
git config --global user.email "erik.e.evenson@gmail.com"
git config --global push.default simple
```

Enable ssh-agent if you have added ssh keys.

```bash
eval `ssh-agent -s` && ssh-add ~/.ssh/**/*id_rsa
```

When done, exit the virtual environment and `vagrant halt` to stop the virtual machine.  Use `vagrant destroy` to reclaim the disk space (although this will require you to re-provision the machine again later).  `vagrant remove` should be used to remove the base box from the system as well.  `vagrant up` and `vagrant ssh web` to start another development session later.

## Scripts

### Lint scripts

Linting of the puppet scripts can be done via [puppet-lint](http://puppet-lint.com/) with:

```bash
./scripts/manage.sh lint
```

This will lint manifests and local_modules.

### Puppet scripts

Puppet script validation can be performed with:

```bash
./scripts/manage.sh pvalidate
```

Puppet provisioning can be applied with:

```bash
sudo ./scripts/manage.sh papply
```
