# Installs development base.
# 2012-2014 Van Brunt and Associates and 3E Enterprises, LLC

class dev_base {
  include stdlib

  package {'puppet-lint':
    ensure   => installed,
    provider => gem,
  }

  file_line {'cd_vagrant':
    path => '/home/vagrant/.bashrc',
    line => 'cd /vagrant',
  }
}
