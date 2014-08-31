# Defines the base node.
# 3E Enterprises, LLC

node 'base' {
  require dev_base
  
  $message = hiera('greeting')
  notify { $message: }

  require nodejs

  exec {'npm_globals':
    command => '/usr/bin/npm config set prefix /home/vagrant/.npm \
      && npm -g install yo@1.2.1',
    timeout => 0,
  }
}