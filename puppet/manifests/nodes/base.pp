# Defines the base node.
# 3E Enterprises, LLC

node 'base' {
  require dev_base
  
  $message = hiera('magic_word')
  notify { $message: }
}