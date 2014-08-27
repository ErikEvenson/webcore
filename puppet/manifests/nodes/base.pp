# Defines the base node.
# 3E Enterprises, LLC

node 'base' {
  file {"temp.txt":
    content => "Hello from puppet.\n",
    path    => "/home/vagrant/temp.txt",
  }
}