# Defines the base node.
# 3E Enterprises, LLC

node 'base' {
  require dev_base
  
  $message = hiera('greeting')
  notify { $message: }

  require nodejs
  require node_globals
}