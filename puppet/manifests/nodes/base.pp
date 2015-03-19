# Defines the base node.
# 2012-2015 3E Enterprises, LLC

node 'base' {
  require dev_base
  
  $message = hiera('greeting')
  notify { $message: }
}