# Vagrantfile for webcore development environment
# 2012-2014 Van Brunt & Associates and 3E Enterprises, LLC

# This configuration will set up a web server (web) VM.

# Assumes the use of VirtualBox 4.3.14-95030 as a provider.
# Uses vagrant-vbguest plugin (https://github.com/dotless-de/vagrant-vbguest)
# to keep VirtualBox Guest Addition wrangled.

# Configuration

# Machine-specific configuration
WEB_INSTALL_SCRIPT = "vagrant_data/web/install.sh"
WEB_IP = "192.168.50.4"

# General configuration

# CPUs per machine
CPUS = "1"

# Memory per machine - set to 512MB to match Heroku limits.
MEMORY = "512"

PROVIDER = "virtualbox"
SYNCED_FOLDER = "/vagrant"
VM_BOX = "hashicorp/precise64"
VM_BOX_VERSION = "1.1.0"
VAGRANTFILE_API_VERSION = "2"

# Lock down vagrant version.
Vagrant.require_version ">= 1.6.3"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vbguest.no_install = false

  # Lock box version down
  config.vm.box = VM_BOX
  config.vm.box_version = VM_BOX_VERSION
  config.vm.box_check_update = true
  config.vm.synced_folder ".", SYNCED_FOLDER, type: "nfs"

  config.vm.define :"web", primary: true do |web|
    web.vm.hostname = "web"
    web.vm.provision :shell, :path => WEB_INSTALL_SCRIPT
    web.vm.network :private_network, ip: WEB_IP

    # Set up VM
    web.vm.provider PROVIDER do |v|
      v.customize [
        "modifyvm", :id,
        "--memory", MEMORY,
        "--cpus", CPUS
      ]
    end
  end
end