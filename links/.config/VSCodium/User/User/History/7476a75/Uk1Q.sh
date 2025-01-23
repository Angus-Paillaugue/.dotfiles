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


# Install of programs
# Base programs install
installBasePrograms() {
  printInColor "" " ↺ Installing base programs"
  sudo apt update -y
  sudo apt upgrade -y
  sudo apt install git gh curl wget zsh bat fzf gnome-tweaks chrome-gnome-shell gnome-shell-extensions dconf-editor openjdk-17-jdk software-properties-common apt-transport-https jq python3 python3-pip dconf-cli uuid-runtime tree sassc lowdown cava pipx cmatrix ffmpeg vlc ffmpegthumbnailer -y
  pipx ensurepath
  chsh -s $(which zsh)
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
  wget -O JetBrainsMono.zip https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/JetBrainsMono.zip
  unzip JetBrainsMono.zip -d ~/.local/share/fonts/
  fc-cache -f -v
  rm JetBrainsMono.zip
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
  ./Colloid-gtk-theme/install.sh --color dark --tweaks float nord rimless
  rm -rf Colloid-gtk-theme

  git clone https://github.com/Angus-Paillaugue/Gruvbox-GTK-Theme
  ./Gruvbox-GTK-Theme/themes/install.sh --theme grey --color dark --tweaks float outline macos
  rm -rf Gruvbox-GTK-Theme
  # Copying themes for GDM settings to be able to use them
  sudo cp -r ~/.themes/* /usr/share/themes
  printInColor "green" " ✓ Installed themes"
}
# Install of icons
installIcons() {
  printInColor "" " ✓ Installing icons"
  cd ~/Downloads
  git clone https://github.com/vinceliuice/WhiteSur-icon-theme
  ./WhiteSur-icon-theme/install.sh -b
  ./WhiteSur-icon-theme/install.sh -b -t grey
  rm -rf WhiteSur-icon-theme
  mkdir ~/.icons
  sudo cp -r ~/.local/share/icons/* /usr/share/icons
  printInColor "green" " ✓ Installed icons"
}
# Flatpak install
installFlatpak() {
  printInColor "" " ↺ Installing flatpak"
  sudo add-apt-repository ppa:flatpak/stable -y && sudo apt update -y && sudo apt install flatpak -y
  # Reload shell
  exec "$SHELL"
  flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
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
  printInColor "" " ↺ Installing themes for Gnome Terminal"
  cd ~/Downloads
  git clone https://github.com/Gogh-Co/Gogh.git gogh
  cd gogh/installs
  export TERMINAL=gnome-terminal
  ./nord.sh
  ./gruvbox-material.sh
  rm -rf gogh

  # Disable headerbar
  dconf write /org/gnome/terminal/legacy/headerbar false
  printInColor "green" " ✓ Installed themes for Gnome Terminal"
}
# Eclipse install
installEclipse() {
  printInColor "" " ↺ Installing Eclipse"
  cd ~/Downloads
  wget -O eclipse-inst-linux64.tar.gz https://ftp.fau.de/eclipse/oomph/products/eclipse-inst-linux64.tar.gz
  tar xvfz eclipse-inst-linux64.tar.gz
  ./eclipse-installer/eclipse-inst &
  rm eclipse-inst-linux64.tar.gz
  printInColor "green" " ✓ Installed Eclipse"
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
  pipx install gnome-extensions-cli
  exec "$SHELL"
  # Use the extension UUID in the url
  # Ex : for this url, https://extensions.gnome.org/extension/19/user-themes/, the  UUID is 19
  gnome-extensions-cli install 3193 779 4158 3843 1446 19 1460 3952 7065
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
  mkdir macOS
  tar -xf macOS.tar.xz -C ./macOS
  cp -r ./macOS/macOS* ~/.icons/
  rm -rf ./macOS
  rm macOS.tar.xz
  printInColor "green" " ✓ Installed cursors"
}
# Docker install
installDocker() {
  printInColor "" " ↺ Installing Docker"
  # Add Docker's official GPG key:
  sudo apt-get install ca-certificates curl -y
  sudo install -m 0755 -d /etc/apt/keyrings
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  sudo chmod a+r /etc/apt/keyrings/docker.asc

  # Add the repository to Apt sources:
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update -y
  # Install Docker
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

  # Install docker desktop
  cd ~/Downloads
  wget -O docker-desktop.deb https://desktop.docker.com/linux/main/amd64/docker-desktop-4.12.0-amd64.deb
  sudo apt install ./docker-desktop.deb -y
  rm docker-desktop-4.12.0-amd64.deb
  printInColor "green" " ✓ Installed Docker"
}
# Mongodb install
installMongodb() {
  printInColor "" " ↺ Installing Mongodb"
  cd ~/Downloads
  # Mongodb install
  sudo apt-get install gnupg curl
  curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc |  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
  echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
  sudo systemctl start mongod
  sudo systemctl enable mongod

  # Compass install
  wget -O mongodb-compass.deb https://downloads.mongodb.com/compass/mongodb-compass_1.40.4_amd64.deb
  sudo dpkg -i mongodb-compass.deb
  "green" " ✓ Installed Mongodb"
}
# Discord install
installDiscord() {
  printInColor "" " ↺ Installing Discord"
  cd ~/Downloads
  wget -O discord.deb "https://discord.com/api/download?platform=linux&format=deb"
  sudo apt install ./discord.deb -y
  rm discord.deb
  printInColor "green" " ✓ Installed Discord"
}
# Postman install
installPostman() {
  printInColor "" " ↺ Installing Postman"
  cd ~/Downloads
  wget -O postman.tar.gz https://dl.pstmn.io/download/latest/linux_64
  sudo tar -xzf postman.tar.gz -C /opt
  rm postman.tar.gz
  sudo ln -s /opt/Postman/Postman /usr/bin/postman
  echo "[Desktop Entry]
Encoding=UTF-8
Name=Postman
Exec=/opt/Postman/app/Postman %U
Icon=/opt/Postman/app/resources/app/assets/icon.png
Terminal=false
Type=Application
Categories=Development;" > ~/.local/share/applications/postman.desktop
  printInColor "green" " ✓ Installed Postman"
}
# Btop install
installBtop() {
  printInColor "" " ↺ Installing Btop"
  cd ~/Downloads
  git clone https://github.com/aristocratos/btop
  cd btop
  echo "" > btop.desktop
  # Changes the desktop decalration file
cat <<EOT >> btop.desktop
[Desktop Entry]
Type=Application
Version=1.0
Name=Btop
GenericName=System Monitor
Comment=Resource monitor that shows usage and stats for processor, memory, disks, network and processes
Icon=btop
Exec=btop
Terminal=true
Categories=System;Monitor;ConsoleOnly;
Keywords=system;process;task
EOT
  make
  sudo make install
  printInColor "green" " ✓ Installed Btop"
}



# Settings custom themes
# Gnome extensions preferences
setExtensionsPreferences() {
  # Blur my shell
  dconf write /org/gnome/shell/extensions/blur-my-shell/sigma 5
  dconf write /org/gnome/shell/extensions/blur-my-shell/brightness 0.5
  dconf write /org/gnome/shell/extensions/blur-my-shell/color-and-noise false
  dconf write /org/gnome/shell/extensions/blur-my-shell/hacks-level 1
  dconf write /org/gnome/shell/extensions/blur-my-shell/color-and-noise false
  dconf write /org/gnome/shell/extensions/blur-my-shell/debug false
  dconf write /org/gnome/shell/extensions/blur-my-shell/panel/blur false
  dconf write /org/gnome/shell/extensions/blur-my-shell/overview/blur true
  dconf write /org/gnome/shell/extensions/blur-my-shell/overview/customize true
  dconf write /org/gnome/shell/extensions/blur-my-shell/overview/sigma 5
  dconf write /org/gnome/shell/extensions/blur-my-shell/overview/brightness 0.5
  dconf write /org/gnome/shell/extensions/blur-my-shell/appfolder/blur true
  dconf write /org/gnome/shell/extensions/blur-my-shell/appfolder/customize false
  dconf write /org/gnome/shell/extensions/blur-my-shell/appfolder/style-dialogs 1
  dconf write /org/gnome/shell/extensions/blur-my-shell/dash-to-dock/blur false
  dconf write /org/gnome/shell/extensions/blur-my-shell/applications/blur false
  dconf write /org/gnome/shell/extensions/blur-my-shell/lockscreen/blur false
  dconf write /org/gnome/shell/extensions/blur-my-shell/screenshot/blur true
  dconf write /org/gnome/shell/extensions/blur-my-shell/screenshot/customize false
  dconf write /org/gnome/shell/extensions/blur-my-shell/window-list/blur true
  dconf write /org/gnome/shell/extensions/blur-my-shell/window-list/customize false
  # Clipboard indicator
  dconf write /org/gnome/shell/extensions/clipboard-indicator/toggle-menu \[\'\<\S\h\i\f\t\>\<\S\u\p\e\r\>\v\'\]
  # Just Perfection
  dconf write /org/gnome/shell/extensions/just-perfection/activities-button false
  dconf write /org/gnome/shell/extensions/just-perfection/accessibility-menu false
  dconf write /org/gnome/shell/extensions/just-perfection/app-menu-icon false
  # Transparent window moving
  dconf write /org/gnome/shell/extensions/transparent-window-moving/window-opacity 170
  # Vitals
  dconf write /org/gnome/shell/extensions/vitals/show-voltage false
  dconf write /org/gnome/shell/extensions/vitals/show-fan false
  dconf write /org/gnome/shell/extensions/vitals/show-battery false
  dconf write /org/gnome/shell/extensions/vitals/fixed-widths false
  # Tiling shell
  dconf write /org/gnome/shell/extensions/tilingshell/outer-gaps 8
  dconf write /org/gnome/shell/extensions/tilingshell/inner-gaps 8
  dconf write /org/gnome/shell/extensions/tilingshell/enable-blur-selected-tilepreview true
  dconf write /org/gnome/shell/extensions/tilingshell/enable-blur-snap-assistant true
  # Workspace indicator
  # dconf write /org/gnome/shell/extensions/horizontal-workspace-indicator/widget-position 'left'
  # dconf write /org/gnome/shell/extensions/horizontal-workspace-indicator/widget-orientation 'horizontal'
  # dconf write /org/gnome/shell/extensions/horizontal-workspace-indicator/icons-style 'circles'
}
# Set the theme from the gnome-tweaks app
setTheme() {
  printInColor "" " ↺ Setting theme"
  gsettings set org.gnome.desktop.interface gtk-theme 'Gruvbox-Grey-Dark'
  gsettings set org.gnome.desktop.interface color-scheme prefer-dark
  gsettings set org.gnome.desktop.interface icon-theme 'WhiteSur-grey-dark'
  gsettings set org.gnome.desktop.interface cursor-theme 'macOS'
  gsettings set org.gnome.shell.extensions.user-theme name 'Gruvbox-Grey-Dark'
  printInColor "green" " ✓ Set theme"
}
# Set Gnome Terminal theme and properties
setGnomeTerminalThemeAndPropreties() {
  printInColor "" " ↺ Setting Gnome Terminal theme and properties"
  # Disable headerbar
  gsettings set org.gnome.Terminal.Legacy.Settings headerbar "@mb false"
  printInColor "green" " ✓ Set Gnome Terminal theme and properties"

}
# Dotfiles install
installDotfiles() {
  printInColor "" " ↺ Installing dotfiles"
  git clone https://github.com/Angus-Paillaugue/.dotfiles ~/.dotfiles
  cd ~/.dotfiles
  ./install.sh
  printInColor "green" " ✓ Installed dotfiles"
}
# Center new windows
centerNewWindows() {
  printInColor "" " ↺ Centering new windows"
  gsettings set org.gnome.mutter center-new-windows true
  printInColor "green" " ✓ Centered new windows"
}
# Remove the video thumbnails movie strip
removeVideoThumbnailsMovieStrip() {
  printInColor "" " ↺ Removing video thumbnails movie strip"
  
  rm -r ~/.cache/thumbnails
  printInColor "green" " ✓ Removed video thumbnails movie strip"
}

# Apply all of my custom settings and preferences
applyCutomSettings() {
  setExtensionsPreferences
  setTheme
  setGnomeTerminalThemeAndPropreties
  centerNewWindows
  installDotfiles
  # Dock
  gsettings set org.gnome.shell.extensions.dash-to-dock dock-position BOTTOM
  dconf write /org/gnome/shell/extensions/dash-to-dock/show-trash false
  dconf write /org/gnome/shell/extensions/dash-to-dock/show-mounts false
  dconf write /org/gnome/shell/extensions/dash-to-dock/dock-fixed false
  dconf write /org/gnome/shell/extensions/dash-to-dock/extend-height false
  # Power button press
  # dconf write /org/gnome/settings-daemon/plugins/power/power-button-action 'nothing'
}


# Prompt for installation options
read -p "Do you want to install all programs? (y/n) " installAll

# Install all programs
if [ "$installAll" == "y" ]; then
  # Run all functions
  installBasePrograms
  configureGit
  # Require user interaction
  installChromeBeta
  logInToGithub
  installGnomeExtensions
  installEclipse # Just need to click on "Install"
  # No user interaction
  installFlatpak
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
  installVirtualbox
  installGdmSettings
  installTheme
  installIcons
  installFonts
  installCursors
  installDocker
  installBtop
  installMongodb
  installPostman
  installDiscord
  applyCutomSettings
# Install specific programs
else
  # Prompt for specific installations
  echo "Which programs do you want to install?"
  echo "1. Base programs"
  echo "2. Git config"
  echo "3. Chrome Beta"
  echo "4. Log in to GitHub"
  echo "5. Eclipse"
  echo "6. Flatpak"
  echo "7. DejaDup"
  echo "8. ZSH extensions"
  echo "9. Starship"
  echo "10. NVM and Node"
  echo "11. Fastfetch"
  echo "12. PNPM"
  echo "13. Vercel CLI"
  echo "14. Visual Studio Code"
  echo "15. Virtualbox"
  echo "16. Gnome extensions"
  echo "17. GDM Settings"
  echo "18. Theme"
  echo "19. Icons"
  echo "20. Fonts"
  echo "21. Cursors"
  echo "22. Youtube Music"
  echo "23. Docker"
  echo "24. Btop"
  echo "25. Mongodb"
  echo "26. Postman"
  echo "27. Discord"
  echo "28. Set custom settings"
  read -p "Enter the numbers of the programs you want to install (separated by spaces): " programNumbers

  # Install selected programs
  for number in $programNumbers; do
    case $number in
      1)
        installBasePrograms
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
        installEclipse
        ;;
      6)
        installFlatpak
        ;;
      7)
        installDejaDup
        ;;
      8)
        installZshExtensions
        ;;
      9)
        installStarship
        ;;
      10)
        installNvmAndNode
        ;;
      11)
        installFastfetch
        ;;
      12)
        installPnpm
        ;;
      13)
        installVercelCli
        ;;
      14)
        installVscode
        ;;
      15)
        installVirtualbox
        ;;
      16)
        installGnomeExtensions
        ;;
      17)
        installGdmSettings
        ;;
      18)
        installTheme
        ;;
      19)
        installIcons
        ;;
      20)
        installFonts
        ;;
      21)
        installCursors
        ;;
      22)
        installYoutubeMusic
        ;;
      23)
        installDocker
        ;;
      24)
        installBtop
        ;;
      25)
        installMongodb
        ;;
      26)
        installPostman
        ;;
      27)
        installDiscord
        ;;
      28)
        applyCutomSettings
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
