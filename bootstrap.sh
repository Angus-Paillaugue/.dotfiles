#!/bin/bash


# Base programs install
echo "Installing base programs"
sudo apt update -y
sudo apt upgrade -y
sudo apt install git gh curl wget zsh bat fzf gnome-tweaks chrome-gnome-shell gnome-browser-connector gnome-shell-extensions dconf-editor google-chrome-beta openjdk-17-jdk software-properties-common apt-transport-https jq python3 python3-pip -y


# Git config
git config --global user.name "Angus-Paillaugue"
git config --global user.email "angus.paillaugue40@gmail.com"


# Install of theme and icons
echo "Installing theme and icons"
cd ~/Downloads
git clone https://github.com/vinceliuice/Colloid-gtk-theme
cd Colloid-gtk-theme/
./install.sh --tweaks float nord rimless
cd ~/Downloads
git clone https://github.com/vinceliuice/WhiteSur-icon-theme
cd WhiteSur-icon-theme
./install.sh -b
cd ~/Downloads


# Fonts install
wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/JetBrainsMono.zip
unzip JetBrainsMono.zip -d ~/.local/share/fonts/
fc-cache -f -v


# Google Chrome Beta install
echo "Installing Google Chrome Beta"
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
sudo apt-get update -y


# Login to github
echo "go to https://github.com/login"
google-chrome-beta &
echo "Press enter when you are logged in"
read
gh auth login


# Flatpack install
echo "Installing flatpak"
sudo add-apt-repository ppa:flatpak/stable -y && sudo apt update -y && sudo apt install flatpak -y
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo -y


# DejaDup install (backups)
echo "Installing DejaDup (backups)"
flatpak install flathub org.gnome.DejaDup


# ZSH extensions
echo "Installing ZSH extensions"
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/MichaelAquilina/zsh-you-should-use.git $ZSH_CUSTOM/plugins/you-should-use


# Starship install
curl -sS https://starship.rs/install.sh | sh -s -- -y


# NVM and node install
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install node
nvm install v20


# Fastfetch install
sudo add-apt-repository ppa:zhangsongcui3371/fastfetch
sudo apt update && sudo apt install fastfetch -y
fastfetch --gen-config


# PNPM install
wget -qO- https://get.pnpm.io/install.sh | sh -


# Vscode install
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" -y
sudo apt install code -y


# Gnome terminal themeing
git clone https://github.com/nordtheme/gnome-terminal.git ~/Downloads && cd ~/Downloads/gnome-terminal/src && ./nord.sh


# Eclipse install
cd ~/Downloads
wget https://ftp.fau.de/eclipse/oomph/products/eclipse-inst-linux64.tar.gz
tar xvfz eclipse-inst-linux64.tar.gz
cd eclipse-installer/
./eclipse-inst


# Dotfiles install
git clone https://github.com/Angus-Paillaugue/.dotfiles ~/
cd ~/.dotfiles
./install.sh


# Cutom titlebar terminal
dconf-editor
echo -e "Now go to org > gnome > terminal > legacy > headerbar\nUncheck the default value and set it to false"


# Center new windows
gsettings set org.gnome.mutter center-new-windows true


# Virtualbox install
echo "When stopping, type the sudo password (The script is waiting but not prompting you)"
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/oracle_vbox_2016.gpg] http://download.virtualbox.org/virtualbox/debian $(lsb_release -sc) contrib" | sudo tee /etc/apt/sources.list.d/virtualbox.list
sudo apt update -y
sudo apt install virtualbox-7.0 -y
sudo apt install --reinstall virtualbox-dkms -y && sudo apt install libelf-dev -y


# Gnome extensions
cd ~/Downloads
pip3 install --upgrade gnome-extensions-cli
# Use the extension UUID in the url
# EX : for this url, https://extensions.gnome.org/extension/19/user-themes/, the  UUID is 19
gnome-extensions-cli install 3193 779 4158 3843 5237 1446 19 1460


# Cleanup
rm -rf ~/Downloads/


# Reboot prompt
echo "All done!"
echo "Reboot now? (y/n)"
read reboot
if [ $reboot == "y" ]; then
  sudo reboot
fi
