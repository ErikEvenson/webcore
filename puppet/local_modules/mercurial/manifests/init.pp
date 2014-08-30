# Installs mercurial.
# 2012-2014 3E Enterprises, LLC

class mercurial {
  include apt
  apt::ppa {'ppa:mercurial-ppa/releases':}
  Package {ensure => installed}

  package {'mercurial':
    require => Apt::Ppa['ppa:mercurial-ppa/releases'],
  }
}