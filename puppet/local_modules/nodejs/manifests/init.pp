# Installs nodejs.
# 2012-2014 3E Enterprises, LLC

class nodejs {
  include apt
  apt::ppa {'ppa:chris-lea/node.js':}
  Package {ensure => installed}

  package {'nodejs':
    require => Apt::Ppa['ppa:chris-lea/node.js'],
  }
}