# Vagrantfile default
# 2012-2014 3E Enterprises, LLC

# This configuration will set up a default base VM provisioned with puppet.

# Assumes the use of VirtualBox 4.3.14-95030 as a provider.
# Uses vagrant-vbguest plugin (https://github.com/dotless-de/vagrant-vbguest)
# to keep VirtualBox Guest Addition wrangled.

# Configuration settings
BOOTSTRAP_SCRIPT = "vagrant_data/base/install.sh"
CPUS             = "1"
IP               = "192.168.50.4"
MEMORY           = "512"
PROVIDER         = "virtualbox"

# Eventually change this to a directory when this change hits vagrant (1.6.4?):
# https://github.com/mitchellh/vagrant/pull/4169
# This will kill the deprecation warning.
PUPPET_MANIFEST_FILE    = "site.pp"

HIERA_CONFIG_PATH       = "puppet/hiera.yaml"
PUPPET_MANIFESTS_PATH   = "puppet/manifests"
PUPPET_MODULE_PATH      = ["puppet/modules", "puppet/local_modules"]
SYNCED_FOLDER           = "/vagrant"
SYNCED_FOLDER_TYPE      = "nfs"
VAGRANT_VERSION_REQUIRE = ">= 1.6.3"
VAGRANTFILE_API_VERSION = "2"
VM_BOX                  = "ubuntu/trusty64"
VM_BOX_VERSION          = "14.04"

# Lock down vagrant version.
Vagrant.require_version VAGRANT_VERSION_REQUIRE

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # vagrant-vbguest config
  config.vbguest.no_install = false

  # vagrant-librarian-puppet config
  config.librarian_puppet.puppetfile_dir       = "puppet"
  config.librarian_puppet.placeholder_filename = ".gitkeep"

  # Lock box version down.
  config.vm.box              = VM_BOX
  config.vm.box_version      = VM_BOX_VERSION
  config.vm.box_check_update = true
  config.vm.synced_folder ".", SYNCED_FOLDER, type: SYNCED_FOLDER_TYPE
  
  # Run the bootstrap script on every machine.
  config.vm.provision :shell, :path => BOOTSTRAP_SCRIPT

  # Build the base VM (base):
  config.vm.define :"base", primary: true do |base|
    base.vm.hostname = "base"
    base.vm.network :private_network, ip: IP

    base.vm.provision :puppet, run: "always" do |puppet|
      puppet.hiera_config_path = HIERA_CONFIG_PATH
      puppet.manifests_path    = PUPPET_MANIFESTS_PATH
      puppet.module_path       = PUPPET_MODULE_PATH
      puppet.manifest_file     = PUPPET_MANIFEST_FILE
    end

    # Set up VM
    base.vm.provider PROVIDER do |v|
      v.customize [
        "modifyvm", :id,
        "--memory", MEMORY,
        "--cpus", CPUS
      ]
    end
  end
end