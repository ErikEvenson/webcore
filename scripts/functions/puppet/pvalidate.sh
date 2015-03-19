#!/bin/bash
#
# 2012-2015 3E Enterprises, LLC

pvalidate()
{
  echo "Puppet validate..."
  puppet parser validate /vagrant/puppet/manifests/site.pp
  return
}
