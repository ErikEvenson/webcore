# Installs node globals.
# 2012-2014 3E Enterprises, LLC

class node_globals {
  require nodejs

  # Install heroku toolbelt.
  exec {'heroku_toolbelt':
    command => 'wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh',
    path    => ['/bin', '/usr/bin'],
    unless  => 'which heroku | grep -c "heroku"',
  }

  # fontconfig needed for phantomjs operation.
  # phantomjs is used by many generators.
  package {'fontconfig':
    ensure => installed,
  }

  # SASS required by generator-webapp
  package {'sass':
    ensure => installed,
    provider => gem,
  }

  $node_globals_array = [
    'npm-check-updates@1.2.0',
    'yo@1.2.1',
    'generator-webapp@0.5.0',
  ]

  $node_globals = join($node_globals_array, ' ')

  exec {'npm_globals':
    command => "/usr/bin/npm config set prefix /home/vagrant/.npm \
      && npm -g install ${node_globals} \
      && chown -R vagrant:vagrant /home/vagrant/.npm",

    require => [
      Package['fontconfig'],
      Package['sass'],
    ],

    timeout => 0,
  }
}