# Installs development base.
# 2012-2014 Van Brunt and Associates and 3E Enterprises, LLC

class dev_base {
  include git
  include mercurial
  include stdlib
  include vim

  package {['xvfb']:
    ensure   => installed,
    provider => apt,
  }

  package {['sass', 'puppet-lint']:
    ensure   => installed,
    provider => gem,
  }

  file_line {'cd_vagrant':
    path => '/home/vagrant/.bashrc',
    line => 'cd /vagrant',
  }

  # Install heroku toolbelt.
  exec {'heroku_toolbelt':
    command => 'wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh',
    path    => ['/bin', '/usr/bin'],
    unless  => 'which heroku | grep -c "heroku"',
  }

}