#!/bin/bash
#
# 2012-2014 Van Brunt & Associcates and 3E Enterprises, LLC

papply()
{
  echo "Puppet apply..."

  puppet apply /vagrant/puppet/manifests/site.pp \
    --modulepath=/vagrant/puppet/modules:/vagrant/puppet/local_modules $*

  return
}
