# Installs nodejs.
# 2012-2014 3E Enterprises, LLC

class nodejs {
  include apt
  apt::ppa {'ppa:chris-lea/node.js':}
  Package {ensure => installed}

  package {'nodejs':
    require => Apt::Ppa['ppa:chris-lea/node.js'],
  }

#  # Create a place for npm globals within vagrant user home.
#  file {'.npm':
#    ensure => directory,
#    path   => '/home/vagrant/.npm',
#    owner  => vagrant,
#    group  => vagrant,
#  }#

#  # Set the npm global prefix via config file.
#  file { '.npmrc':
#    ensure  => present,
#    path    => '/home/vagrant/.npmrc',
#    owner   => vagrant,
#    group   => vagrant,
#    content => "prefix = ~/.npm\n",
#  }#

#  # Put globals on PATH for vagrant user.
#  file_line {'npm_bashrc':
#    path => '/home/vagrant/.bashrc',
#    line => 'export PATH=~/.npm/bin:$PATH',
#  }#

#  file_line {'node_bashrc':
#    path => '/home/vagrant/.bashrc',
#    line => 'export NODE_PATH=$NODE_PATH:~/.npm/lib/node_modules',
#  }
}