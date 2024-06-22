#!/bin/bash


# Function to print messages in color
print_in_color() {
  case $1 in
    "green")
      echo -e "\033[0;32m$2\033[0m"
      ;;
    "red")
      echo -e "\033[0;31m$2\033[0m"
      ;;
    "yellow")
      echo -e "\033[0;33m$2\033[0m"
      ;;
    *)
      echo "$2" # Default to no color if no valid color is provided
      ;;
  esac
}


# Welcome message and prompt
echo "Welcome to the bootstrap script!"
read -p "Do you want to continue? (y/n) " answer
if [ "$answer" != "y" ]; then
  print_in_color "red" " ✗ Exiting..."
  exit 0
fi


# Create a temporary file for stderr
temp_file=$(mktemp /tmp/bootsrap-errors.XXXXXX)

# Redirect stderr to the temporary file
exec 2>>"$temp_file"

ls /testfoirfj

# Base programs install
print_in_color "" " ↺ Installing base programs"
sudo apt update -y
sudo apt upgrade -y
sudo apt install git gh curl wget zsh bat fzf gnome-tweaks chrome-gnome-shell gnome-shell-extensions dconf-editor openjdk-17-jdk software-properties-common apt-transport-https jq python3 python3-pip -y
print_in_color "green" " ✓ Installed base programs"


# Git config
print_in_color "" " ↺ Setting up git"
git config --global user.name "Angus-Paillaugue"
git config --global user.email "angus.paillaugue40@gmail.com"
print_in_color "green" " ✓ Set up git"


# Fonts install
print_in_color "" " ✓ Installing fonts"
wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/JetBrainsMono.zip
unzip JetBrainsMono.zip -d ~/.local/share/fonts/
fc-cache -f -v
print_in_color "green" " ✓ Installed JetBrains Mono"


# Google Chrome Beta install
print_in_color "" " ↺ Installing Google Chrome Beta"
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
sudo apt update -y
sudo apt install google-chrome-beta -y
print_in_color "green" " ✓ Installed Google Chrome Beta"



# Login to github
echo "When stopping, type the sudo password (The script is waiting but not prompting you)"
echo "go to https://github.com/login"
google-chrome-beta &
echo "Press enter when you are logged in"
read
gh auth login


# Install of theme and icons
print_in_color "" " ↺ Installing theme"
cd ~/Downloads
git clone https://github.com/vinceliuice/Colloid-gtk-theme
cd Colloid-gtk-theme/
./install.sh --tweaks float nord rimless
print_in_color "green" " ✓ Installed themes"
# Copying themes for GDM settings to be able to use them
sudo cp -r ~/.themes/* /usr/share/themes
print_in_color "" " ✓ Installing icons"
cd ~/Downloads
git clone https://github.com/vinceliuice/WhiteSur-icon-theme
cd WhiteSur-icon-theme
./install.sh -b
cd ~/Downloads
print_in_color "green" " ✓ Installed icons"


# Flatpack install
print_in_color "" " ↺ Installing flatpak"
sudo add-apt-repository ppa:flatpak/stable -y && sudo apt update -y && sudo apt install flatpak -y
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo -y
print_in_color "green" " ✓ Installed flatpak"


# DejaDup install (backups)
print_in_color "" " ↺ Installing DejaDup (backups)"
flatpak install flathub org.gnome.DejaDup
print_in_color "green" " ✓ Installed DejaDup"


# ZSH extensions
print_in_color "" " ↺ Installing ZSH extensions"
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/MichaelAquilina/zsh-you-should-use.git $ZSH_CUSTOM/plugins/you-should-use


# Starship install
print_in_color "" " ↺ Installing Starship"
curl -sS https://starship.rs/install.sh | sh -s -- -y
print_in_color "green" " ✓ Installed Starship"


# NVM and node install
print_in_color "" " ↺ Installing NVM and Node"
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install node
nvm install v20
print_in_color "green" " ✓ Installed NVM and Node"


# Fastfetch install
print_in_color "" " ↺ Installing Fastfetch"
sudo add-apt-repository ppa:zhangsongcui3371/fastfetch -y
sudo apt update && sudo apt install fastfetch -y
fastfetch --gen-config
print_in_color "green" " ✓ Installed Fastfetch"


# PNPM install
print_in_color "" " ↺ Installing PNPM"
wget -qO- https://get.pnpm.io/install.sh | sh -
print_in_color "green" " ✓ Installed PNPM"


# Vscode install
print_in_color "" " ↺ Installing Visual Studio Code"
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" -y
sudo apt install code -y
print_in_color "green" " ✓ Installed Visual Studio Code"


# Gnome terminal themeing
print_in_color "" " ↺ Installing Nord theme for Gnome Terminal"
git clone https://github.com/nordtheme/gnome-terminal.git ~/Downloads && cd ~/Downloads/gnome-terminal/src && ./nord.sh
print_in_color "green" " ✓ Installed Nord theme for Gnome Terminal"


# Eclipse install
print_in_color "" " ↺ Installing Eclipse"
cd ~/Downloads
wget https://ftp.fau.de/eclipse/oomph/products/eclipse-inst-linux64.tar.gz
tar xvfz eclipse-inst-linux64.tar.gz
cd eclipse-installer/
./eclipse-inst
print_in_color "green" " ✓ Installed Eclipse"


# Dotfiles install
print_in_color "" " ↺ Installing dotfiles"
git clone https://github.com/Angus-Paillaugue/.dotfiles ~/
cd ~/.dotfiles
./install.sh
print_in_color "green" " ✓ Installed dotfiles"


# Cutom titlebar terminal
print_in_color "" " ↺ Custom titlebar terminal"
dconf-editor
echo -e "Now go to org > gnome > terminal > legacy > headerbar\nUncheck the default value and set it to false"
echo "Press enter when you are done"
read
print_in_color "green" " ✓ Custom titlebar terminal"


# Center new windows
print_in_color "" " ↺ Centering new windows"
gsettings set org.gnome.mutter center-new-windows
print_in_color "green" " ✓ Centered new windows"


# Virtualbox install
print_in_color "" " ↺ Installing Virtualbox"
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/oracle_vbox_2016.gpg] http://download.virtualbox.org/virtualbox/debian $(lsb_release -sc) contrib" | sudo tee /etc/apt/sources.list.d/virtualbox.list
sudo apt update -y
sudo apt install virtualbox-7.0 -y
sudo apt install --reinstall virtualbox-dkms -y && sudo apt install libelf-dev -y
print_in_color "green" " ✓ Installed Virtualbox"


# Gnome extensions
print_in_color "" " ↺ Installing Gnome extensions"
cd ~/Downloads
pip3 install --upgrade gnome-extensions-cli
# Use the extension UUID in the url
# Ex : for this url, https://extensions.gnome.org/extension/19/user-themes/, the  UUID is 19
gnome-extensions-cli install 3193 779 4158 3843 5237 1446 19 1460
print_in_color "green" " ✓ Installed Gnome extensions"


# GDM Settings
print_in_color "" " ↺ Installing GDM Settings"
flatpak install io.github.realmazharhussain.GdmSettings -y
print_in_color "green" " ✓ Installed GDM Settings"


# Cleanup
print_in_color "green" " ↺ Cleaning up"
rm -rf ~/Downloads/
print_in_color "green" " ✓ Cleaned up"


# At the end of the script, check if there were any errors
if [ -s "$temp_file" ]; then
  print_in_color "red" "Errors occurred during execution:"
  while IFS= read -r line; do
    print_in_color "red" "$line"
  done < "$temp_file"
  # Append errors to a log file
  cat "$temp_file" >> ./bootstrap-errors.log
else
  print_in_color "green" "No errors occurred during execution."
  # Reboot prompt
  print_in_color "green" " ↺ All done!"
  echo "Reboot now? (y/n)"
  read reboot
  if [ $reboot == "y" ]; then
    sudo reboot
  fi
fi
