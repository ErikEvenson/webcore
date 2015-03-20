#!/bin/bash
#
# 2012-2015 3E Enterprises, LLC

lint()
{
  echo "Linting..."
  puppet-lint /vagrant/puppet/manifests
  puppet-lint /vagrant/puppet/local_modules
  return
}
