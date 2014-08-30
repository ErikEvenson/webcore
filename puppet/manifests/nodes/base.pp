# Defines the base node.
# 3E Enterprises, LLC

node 'base' {
  include stdlib

  file_line {'cd_vagrant':
    path    => '/home/vagrant/.bashrc',
    line    => "cd /vagrant",
  }
}