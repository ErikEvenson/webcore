#!/bin/bash

# This provisioning script creates a web server.
echo "#########################"
echo "## Provisioning web VM ##"
echo "#########################"

PROJECT_NAME=WEBCORE
NODE_VERSION="0.10.30"

# Update the local package index.
echo "#######################"
echo "## Updating base box ##"
echo "#######################"

# Update to catch python-software-properties.
apt-get update -y

# Install for add-apt-repository.
sudo apt-get install -y python-software-properties=0.82.7.7

# Add virtualbox PPA
add-apt-repository ppa:debfx/virtualbox

# Add git-core PPA to get a more recent version of git.
add-apt-repository ppa:git-core/ppa

# Add mercuriall PPA to get a more recent version of mercurial.
add-apt-repository ppa:mercurial-ppa/releases

# Update to include PPAs
apt-get update -y

# Upgrades can cause regressions, so they are not applied here.
# Required upgrades should be specifically applied.

# # # Actually upgrade all packages that can be upgraded
# # apt-get dist-upgrade -y

# Actually upgrade all packages that can be upgraded
# apt-get upgrade -y

# Install git and mercurial.
echo "######################"
echo "## Installing DVCSs ##"
echo "######################"

echo "## Installing git..."
apt-get install -y git=1:2.0.4-0ppa1~ubuntu12.04.1

echo "## Installing mercurial..."
apt-get install -y mercurial=3.0.1-0ppa1~precise1

# Install dev packages.
echo "#####################################"
echo "## Installing development packages ##"
echo "#####################################"
# build-essential for make, etc.
apt-get install -y build-essential=11.5ubuntu2.1

# Install curl for downloading.
echo "## Installng curl for downloading tools..."
sudo apt-get install -y curl=7.22.0-3ubuntu4.8

# Install node/npm.
echo "#####################"
echo "## Installing node ##"
echo "#####################"
# From https://gist.github.com/isaacs/579814

# Install node.  npm comes with node now.
echo "## Installing node version $NODE_VERSION"
# mkdir ~vagrant/local
mkdir "/home/vagrant/$NODE_VERSION"
cd "/home/vagrant/$NODE_VERSION"
curl "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION.tar.gz" | tar xz --strip-components=1
./configure --prefix=/usr
make install

# Clean up.
cd /vagrant
rm -rf "/home/vagrant/$NODE_VERSION"

echo "####################################"
echo "## Installing global npm packages ##"
echo "####################################"
npm install -g npm@1.4.23

npm install -g npm-check-updates@1.2.0
npm install -g yo@1.2.1

# Remove any packages that are no longer needed
echo "#################################################"
echo "## Removing packages that are no longer needed ##"
echo "#################################################"
apt-get autoremove -y

# Report
echo -e "\nInstalled versions:"
(
  git --version
  ruby --version
) | sed -u "s/^/  /"

echo -e "\nSuccess!"
exit 0