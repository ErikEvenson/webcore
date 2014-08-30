# Installs vim.
# 2012-2014 3E Enterprises, LLC

class vim {
  Package {ensure => installed}
  package {'vim':}

  exec { '/usr/bin/update-alternatives --set editor /usr/bin/vim.basic':
    require => Package['vim'],
    unless  => '/usr/bin/test /etc/alternatives/editor -ef /usr/bin/vim.basic',
  }
}