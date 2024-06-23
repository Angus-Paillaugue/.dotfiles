#!/bin/bash


# Function to print messages in color
printInColor() {
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


# Base programs install
installBasePrograps() {
  printInColor "" " ↺ Installing base programs"
  sudo apt update -y
  sudo apt upgrade -y
  sudo apt install git gh curl wget zsh bat fzf gnome-tweaks chrome-gnome-shell gnome-shell-extensions dconf-editor openjdk-17-jdk software-properties-common apt-transport-https jq python3 python3-pip -y
  printInColor "green" " ✓ Installed base programs"
}


# Git config
configureGit() {
  printInColor "" " ↺ Setting up git"
  git config --global user.name "Angus-Paillaugue"
  git config --global user.email "angus.paillaugue40@gmail.com"
  printInColor "green" " ✓ Set up git"
}


# Google Chrome Beta install
installChromeBeta() {
  printInColor "" " ↺ Installing Google Chrome Beta"
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
  sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
  sudo apt update -y
  sudo apt install google-chrome-beta -y
  printInColor "green" " ✓ Installed Google Chrome Beta"
}


# Fonts install
installFonts() {
  printInColor "" " ✓ Installing fonts"
  cd ~/Downloads
  wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/JetBrainsMono.zip
  unzip JetBrainsMono.zip -d ~/.local/share/fonts/
  fc-cache -f -v
  printInColor "green" " ✓ Installed JetBrains Mono"
}


# Login to github
logInToGithub() {
  echo "When stopping, type the sudo password (The script is waiting but not prompting you)"
  echo "go to https://github.com/login"
  google-chrome-beta &
  echo "Press enter when you are logged in"
  read
  gh auth login
}


# Install of theme
installTheme() {
  printInColor "" " ↺ Installing theme"
  cd ~/Downloads
  git clone https://github.com/vinceliuice/Colloid-gtk-theme
  cd Colloid-gtk-theme/
  ./install.sh --tweaks float nord rimless
  # Copying themes for GDM settings to be able to use them
  sudo cp -r ~/.themes/* /usr/share/themes
  cd ~/Downloads
  rm -rf Colloid-gtk-theme
  printInColor "green" " ✓ Installed themes"
}


# Install of icons
installIcons() {
  printInColor "" " ✓ Installing icons"
  cd ~/Downloads
  git clone https://github.com/vinceliuice/WhiteSur-icon-theme
  cd WhiteSur-icon-theme
  ./install.sh -b
  cd ~/Downloads
  rm -rf WhiteSur-icon-theme
  printInColor "green" " ✓ Installed icons"
}


# Flatpack install
installFlatpack() {
  printInColor "" " ↺ Installing flatpak"
  sudo add-apt-repository ppa:flatpak/stable -y && sudo apt update -y && sudo apt install flatpak -y
  flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo -y
  printInColor "green" " ✓ Installed flatpak"
}


# DejaDup install (backups)
installDejaDup() {
  printInColor "" " ↺ Installing DejaDup (backups)"
  flatpak install flathub org.gnome.DejaDup
  printInColor "green" " ✓ Installed DejaDup"
}


# ZSH extensions
installZshExtensions() {
  printInColor "" " ↺ Installing ZSH extensions"
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
  git clone https://github.com/MichaelAquilina/zsh-you-should-use.git $ZSH_CUSTOM/plugins/you-should-use
  printInColor "green" " ✓ Installed ZSH extensions"
}


# Starship install
installStarship() {
  printInColor "" " ↺ Installing Starship"
  curl -sS https://starship.rs/install.sh | sh -s -- -y
  printInColor "green" " ✓ Installed Starship"
}


# NVM and node install
installNvmAndNode() {
  printInColor "" " ↺ Installing NVM and Node"
  curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
  nvm install node
  nvm install v20
  printInColor "green" " ✓ Installed NVM and Node"
}


# Fastfetch install
installFastfetch() {
  printInColor "" " ↺ Installing Fastfetch"
  sudo add-apt-repository ppa:zhangsongcui3371/fastfetch -y
  sudo apt update && sudo apt install fastfetch -y
  fastfetch --gen-config
  printInColor "green" " ✓ Installed Fastfetch"
}


# PNPM install
installPnpm() {
  printInColor "" " ↺ Installing PNPM"
  wget -qO- https://get.pnpm.io/install.sh | sh -
  printInColor "green" " ✓ Installed PNPM"
}


# Vercel cli install
installVercelCli() {
  printInColor "" " ↺ Installing Vercel CLI"
  pnpm i -g vercel
  vercel login
  printInColor "green" " ✓ Installed Vercel CLI"
}


# Vscode install
installVscode() {
  printInColor "" " ↺ Installing Visual Studio Code"
  wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" -y
  sudo apt install code -y
  printInColor "green" " ✓ Installed Visual Studio Code"
}


# Gnome terminal themeing
installGnomeTerminalTheme() {
  printInColor "" " ↺ Installing Nord theme for Gnome Terminal"
  cd ~/Downloads
  git clone https://github.com/nordtheme/gnome-terminal.git ~/Downloads
  cd gnome-terminal/src
  ./nord.sh
  printInColor "green" " ✓ Installed Nord theme for Gnome Terminal"
}


# Eclipse install
installEclipse() {
  printInColor "" " ↺ Installing Eclipse"
  cd ~/Downloads
  wget https://ftp.fau.de/eclipse/oomph/products/eclipse-inst-linux64.tar.gz
  tar xvfz eclipse-inst-linux64.tar.gz
  cd eclipse-installer/
  ./eclipse-inst &
  printInColor "green" " ✓ Installed Eclipse"
}


# Dotfiles install
installDotfiles() {
  printInColor "" " ↺ Installing dotfiles"
  git clone https://github.com/Angus-Paillaugue/.dotfiles ~/
  cd ~/.dotfiles
  ./install.sh
  printInColor "green" " ✓ Installed dotfiles"
}


# Cutom titlebar terminal
setCustomTitlebarTerminal() {
  printInColor "" " ↺ Custom titlebar terminal"
  echo -e "Now go to org > gnome > terminal > legacy > headerbar\nUncheck the default value and set it to false"
  echo "Press enter when you are done"
  dconf-editor &
  read
  printInColor "green" " ✓ Custom titlebar terminal"
}


# Center new windows
centerNewWindows() {
  printInColor "" " ↺ Centering new windows"
  gsettings set org.gnome.mutter center-new-windows
  printInColor "green" " ✓ Centered new windows"
}


# Virtualbox install
installVirtualbox() {
  printInColor "" " ↺ Installing Virtualbox"
  echo "deb [arch=amd64 signed-by=/usr/share/keyrings/oracle_vbox_2016.gpg] http://download.virtualbox.org/virtualbox/debian $(lsb_release -sc) contrib" | sudo tee /etc/apt/sources.list.d/virtualbox.list
  sudo apt update -y
  sudo apt install virtualbox-7.0 -y
  sudo apt install --reinstall virtualbox-dkms -y && sudo apt install libelf-dev -y
  printInColor "green" " ✓ Installed Virtualbox"
}


# Gnome extensions
installGnomeExtensions() {
  printInColor "" " ↺ Installing Gnome extensions"
  cd ~/Downloads
  pip3 install --upgrade gnome-extensions-cli
  # Use the extension UUID in the url
  # Ex : for this url, https://extensions.gnome.org/extension/19/user-themes/, the  UUID is 19
  gnome-extensions-cli install 3193 779 4158 3843 5237 1446 19 1460
  printInColor "green" " ✓ Installed Gnome extensions"
}


# GDM Settings
installGdmSettings() {
  printInColor "" " ↺ Installing GDM Settings"
  flatpak install io.github.realmazharhussain.GdmSettings -y
  printInColor "green" " ✓ Installed GDM Settings"
}


# Youtube Music install
installYoutubeMusic() {
  printInColor "" " ↺ Installing Youtube Music"
  cd ~/Downloads
  curl -s https://api.github.com/repos/th-ch/youtube-music/releases/latest | grep "browser_download_url.*deb" | cut -d : -f 2,3 | tr -d \" | wget -qi -
  sudo apt install ./youtube-music*.deb
  rm youtube-music*.deb
  printInColor "green" " ✓ Installed Youtube Music"
}


# Cursors install
installCursors() {
  printInColor "" " ↺ Installing cursors"
  cd ~/Downloads
  curl -s https://api.github.com/repos/ful1e5/apple_cursor/releases/latest | grep "macOS.tar.xz" | cut -d : -f 2,3 | tr -d \" | wget -qi -
  tar -xf macOS.tar.xz
  ls
  mv macOS* ~/.icons/
  rm -rf macOS*
  printInColor "green" " ✓ Installed cursors"
}



# Welcome message and prompt
echo "Welcome to the bootstrap script!"
read -p "Do you want to continue? (y/n) " answer
if [ "$answer" != "y" ]; then
  printInColor "red" " ✗ Exiting..."
  exit 0
fi


# Prompt for installation options
read -p "Do you want to install all programs? (y/n) " installAll

# Install all programs
if [ "$installAll" == "y" ]; then
  # Run all functions
  installBasePrograps
  configureGit
  # Require user interaction
  installChromeBeta
  logInToGithub
  setCustomTitlebarTerminal
  installEclipse # Just need to click on "Install"
  # No user interaction
  installFlatpack
  installDejaDup
  installZshExtensions
  installStarship
  installNvmAndNode
  installFastfetch
  installPnpm
  installYoutubeMusic
  installVercelCli
  installVscode
  installGnomeTerminalTheme
  centerNewWindows
  installVirtualbox
  installGnomeExtensions
  installGdmSettings
  installTheme
  installIcons
  installFonts
  installCursors
  installDotfiles
  cleanup
# Install specific programs
else
  # Prompt for specific installations
  echo "Which programs do you want to install?"
  echo "1. Base programs"
  echo "2. Git config"
  echo "3. Chrome Beta"
  echo "4. Log in to GitHub"
  echo "5. Set custom titlebar terminal"
  echo "6. Eclipse"
  echo "7. Flatpak"
  echo "8. DejaDup"
  echo "9. ZSH extensions"
  echo "10. Starship"
  echo "11. NVM and Node"
  echo "12. Fastfetch"
  echo "13. PNPM"
  echo "14. Vercel CLI"
  echo "15. Visual Studio Code"
  echo "16. Gnome Terminal themeing"
  echo "17. Center new windows"
  echo "18. Virtualbox"
  echo "19. Gnome extensions"
  echo "20. GDM Settings"
  echo "21. Theme"
  echo "22. Icons"
  echo "23. Fonts"
  echo "24. Cursors"
  echo "25. Youtube Music"
  echo "26. Dotfiles"
  read -p "Enter the numbers of the programs you want to install (separated by spaces): " programNumbers

  # Install selected programs
  for number in $programNumbers; do
    case $number in
      1)
        installBasePrograps
        ;;
      2)
        configureGit
        ;;
      3)
        installChromeBeta
        ;;
      4)
        logInToGithub
        ;;
      5)
        setCustomTitlebarTerminal
        ;;
      6)
        installEclipse
        ;;
      7)
        installFlatpack
        ;;
      8)
        installDejaDup
        ;;
      9)
        installZshExtensions
        ;;
      10)
        installStarship
        ;;
      11)
        installNvmAndNode
        ;;
      12)
        installFastfetch
        ;;
      13)
        installPnpm
        ;;
      14)
        installVercelCli
        ;;
      15)
        installVscode
        ;;
      16)
        installGnomeTerminalTheme
        ;;
      17)
        centerNewWindows
        ;;
      18)
        installVirtualbox
        ;;
      19)
        installGnomeExtensions
        ;;
      20)
        installGdmSettings
        ;;
      21)
        installTheme
        ;;
      22)
        installIcons
        ;;
      23)
        installFonts
        ;;
      24)
        installCursors
        ;;
      25)
        installYoutubeMusic
        ;;
      26)
        installDotfiles
        ;;
      *)
        echo "Invalid program number: $number"
        ;;
    esac
  done

  printInColor "green" " ✓ Installation completed!"
fi


# Reboot prompt
printInColor "green" " ✓ All done!"
read -p "Reboot now? (y/n)" reboot
if [ $reboot == "y" ]; then
  sudo reboot
fi
