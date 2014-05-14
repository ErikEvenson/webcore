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
Vagrant.require_version ">= 1.6.1"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # VirtualBox 4.3.10-93012 has a bug that requires the use of
  # https://www.virtualbox.org/download/testcase/VBoxGuestAdditions_4.3.11-93070.iso.

  # This _can_ be done with the following:

  # Temporary fix for bug https://www.virtualbox.org/ticket/12879 when using VirtualBox 4.3.10-93012
  # Also available at https://www.virtualbox.org/download/testcase/VBoxGuestAdditions_4.3.11-93070.iso
  # I think this is relative to the provisioning script (https://github.com/dotless-de/vagrant-vbguest/issues/119)
  # config.vbguest.iso_path = "../VBoxGuestAdditions_4.3.11-93070.iso"
  # End of temporary fix.

  # Until fixed, just use the VBoxGuestAdditions that come with the box -- simpler.
  # Options: https://github.com/dotless-de/vagrant-vbguest
  # config.vbguest.iso_path = "http://download.virtualbox.org/virtualbox/%{version}/VBoxGuestAdditions_%{version}.iso"
  # config.vbguest.iso_path = "../VBoxGuestAdditions_%{version}.iso"
  config.vbguest.no_install = true

  # Lock box version down
  config.vm.box = VM_BOX
  config.vm.box_version = VM_BOX_VERSION
  config.vm.box_check_update = true
  config.vm.synced_folder ".", SYNCED_FOLDER, type: "nfs"

  # And now the web server (web):
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
