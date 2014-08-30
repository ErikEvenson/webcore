# Installs git.
# 2012-2014 3E Enterprises, LLC

class git {
  include apt
  apt::ppa {'ppa:git-core/ppa':}
  Package {ensure => installed}

  package {'git':
    require => Apt::Ppa['ppa:git-core/ppa'],
  }
}