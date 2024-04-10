
# Dotfiles tracker
To use this repo, you need to understand how it works first The `files_to_backup.txt` contains a dotfile to backup on every line. The `create_links.sh` script is used to create a copy of each of the files you specified and the ./links directory. This directory reproduces the the file tree base on $HOME relative to ./links. In this script, you can also directly sync this repo on github. 

To use these files you can use the `install.sh` script.

# Installed programs (in order)
 - [bat](https://github.com/sharkdp/bat) : A cat(1) clone with wings.
 - [neofetch](https://doc.ubuntu-fr.org/neofetch) : used as a welcome message in zsh
 - [Colloid](https://github.com/vinceliuice/Colloid-gtk-theme) As the main theme (no params used during installation)
 - [Wallpapers library](https://github.com/linuxdotexe/nordic-wallpapers) Selection of nordit themed wallpapers (I use `ign_astronaut.png`)
 - [Starship](https://starship.rs/guide/) : custom shell prompt
 - ZSH as shell (see the zshrc config file)
   - git (installed by default)
   - sudo (installed by default)
   - zsh-autosuggestions [install guide](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)
   - zsh-syntax-highlighting [install guide](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)
   - you-should-use [repo](https://github.com/MichaelAquilina/zsh-you-should-use?tab=readme-ov-file)
   - zsh-bat [repo](https://github.com/fdellwing/zsh-bat)