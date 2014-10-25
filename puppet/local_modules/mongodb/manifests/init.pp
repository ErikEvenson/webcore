# Installs mongodb
# 2014 3E Enterprises, LLC
# Adopted from
# http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
# and
# http://www.snatchfrigate.com/2012/05/24/installing-mongodb-and-zend-server-using-puppet/

class mongodb {   
  class services {
    require configure

    service { 
      'mongod':
        ensure => running,
        enable => true;
    }
  }
   
  class configure {
    require packages
  }
   
  class packages {
    require updates

    package {
      "mongodb-org":              ensure => "present";
    }
  }
   
  class updates {
    require repos

    # We must run apt-get update before we install our packaged because we installed some repo's
    exec { "apt-update":
      command => "/usr/bin/apt-get update -y -q",
      timeout => 0
    }
  }
   
  class repos {
    require users

    #lets install some repos
    exec { 
      "get-mongo-key" :
        command => "/usr/bin/apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10",
        unless  => "/usr/bin/apt-key list| /bin/grep -c 10gen";
      "install-mongo-repo":
        command => "/bin/echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' >> /etc/apt/sources.list",
        unless  => "/bin/grep 'http://downloads-distro.mongodb.org/repo/ubuntu-upstart' -c /etc/apt/sources.list";
    }
  }
   
  class users {
  }

  require services
}