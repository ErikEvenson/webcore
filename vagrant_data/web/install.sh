#!/bin/bash

# This provisioning script creates a web server.

echo "#########################"
echo "## Provisioning web VM ##"
echo "#########################"

PROJECT_NAME=webcore

# Update the local package index
echo "#######################"
echo "## Updating base box ##"
echo "#######################"
apt-get update -y
sudo apt-get install -y python-software-properties
sudo add-apt-repository ppa:debfx/virtualbox

# Upgrades can cause regressions, so they are not applied here.
# Required upgrades should be specifically applied.

# # # Actually upgrade all packages that can be upgraded
# # apt-get dist-upgrade -y

# Actually upgrade all packages that can be upgraded
# apt-get upgrade -y

# Install git and mercurial
echo "######################"
echo "## Installing DVCSs ##"
echo "######################"
apt-get install -y git
apt-get install -y mercurial

# Install python dev packages
echo "############################################"
echo "## Installing python development packages ##"
echo "############################################"
# TODO heroku using: https://devcenter.heroku.com/changelog-items/427
apt-get install -y build-essential

# Install npm
if ! command -v npm; then
	echo "#############################"
	echo "## Installing node and npm ##"
	echo "#############################"
	# From https://gist.github.com/isaacs/579814
	# echo 'export PATH=~vagrant/local/bin:$PATH' >> ~vagrant/.bashrc
	# PATH=~vagrant/local/bin:$PATH
	sudo apt-get install -y curl
	mkdir ~vagrant/local
	mkdir ~vagrant/node-latest-install
	cd ~vagrant/node-latest-install
	curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
	./configure
	make install
	curl https://npmjs.org/install.sh | sh
	cd
fi

echo "####################################"
echo "## Installing global npm packages ##"
echo "####################################"
npm install -g yo

# Remove any packages that are no longer needed
echo "#################################################"
echo "## Removing packages that are no longer needed ##"
echo "#################################################"
apt-get autoremove -y

echo -e "\nSuccess!"
exit 0
