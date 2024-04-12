
# Dotfiles tracker
To use this repo, you need to understand how it works first The `files_to_backup.txt` contains a dotfile to backup on every line. The `backup.sh` script is used to create a copy of each of the files you specified and the ./links directory. This directory reproduces the the file tree base on $HOME relative to ./links. In this script, you can also directly sync this repo on github. 

To use these files you can use the `install.sh` script that copies all the dotfiles in the links directory into their actual places (be aware that  fi les that need to be copied into a non-existant directory will not be copied).

# Installed programs (in order)
 - [bat](https://github.com/sharkdp/bat) : A cat(1) clone with wings.
 - [neofetch](https://doc.ubuntu-fr.org/neofetch) : used as a welcome message in zsh
 - [Colloid](https://github.com/vinceliuice/Colloid-gtk-theme) As the main theme (no params used during installation)
 - [Wallpapers library](https://github.com/linuxdotexe/nordic-wallpapers) Selection of nordit themed wallpapers (I use `ign_astronaut.png`)
 - [Starship](https://starship.rs/guide/) : custom shell prompt
 - [White sur icons](https://github.com/vinceliuice/WhiteSur-icon-theme) : Installed without any flags. 
 - [alacarte](https://doc.ubuntu-fr.org/alacarte) : Used `alacarte` (`sudo apt install alacarte` then just run `alacarte` in the terminal then change the vivaldi browser icon to `/home/angus/.local/share/icons/WhiteSur-dark/apps/scalable/81F5_winebrowser.0.svg`)
 - ZSH as shell (see the zshrc config file)
   - git (installed by default)
   - sudo (installed by default)
   - zsh-autosuggestions [install guide](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)
   - zsh-syntax-highlighting [install guide](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)
   - you-should-use [repo](https://github.com/MichaelAquilina/zsh-you-should-use?tab=readme-ov-file)
   - zsh-bat [repo](https://github.com/fdellwing/zsh-bat)

## Extension manager
<!-- Blur my shell -->
<details>
  <summary>Blur my shell</summary>
  <ul>
    <li>
      General
      <ul>
        <li>
          Blur preference
          <ul>
            <li>Sigma : 5</li>
            <li>Brightness : .5</li>
          </ul>
        </li>
        <li>
          Performance
          <ul>
            <li>Color and noise effects : OFF</li>
            <li>Hack level : default</li>
            <li>Debug : OFF</li>
          </ul>
        </li>
        <li>Panel </li>
        <li>
          Panel blur
          <ul>
            <li>Customize properties : OFF</li>
            <li>Static blur : ON</li>
            <li>Disable overview : ON</li>
            <li>Override background : ON</li>
          </ul>
        </li>
        <li>
          Compatibility 
          <ul>
            <li>Hidetopbar extension : OFF</li>
            <li>Blur original panel with Dash to Panel : ON</li>
          </ul>
        </li>
        <li>Overview</li>
        <li>
          Background blur : ON
          <ul>
            <li>Customize properties : OFF</li>
            <li>Overview component style : light</li>
          </ul>
        </li>
        <li>
          Application folder blur : ON
          <ul>
            <li>Customize properties : OFF</li>
            <li>Application folder dialog style : transparent</li>
          </ul>
        </li>
        <li>Dash</li>
        <li>
          Dash to dock blur : OFF
          <ul>
            <li>Customize properties : OFF</li>
            <li>
              Override background : ON
              <ul>
                <li>Background style : Light</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>Application</li>
        <li>
          Application blur : ON
          <ul>
            <li>Customize properties : ON</li>
            <li>Opacity : 230</li>
            <li>Blur on overview : OFF</li>
            <li>Enable all by default : OFF</li>
          </ul>
        </li>
        <li>Whitelist : empty list</li>
        <li>Other</li>
        <li>
          Lockscreen blur : ON
          <ul>
            <li>
              Customize properties : ON
              <ul>
                <li>Sigma : 5</li>
                <li>Brightness : .5</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          Screenshot blur : ON
          <ul>
            <li>Customize properties : OFF</li>
          </ul>
        </li>
        <li>
          Window list extension blur : ON
          <ul>
            <li>Customize properties : OFF</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</details>

<!-- Clipboard indicator -->
<details>
  <summary>Clipboard indicator</summary>
  <ul>
    <li>
      Keyboard shortcuts
      <ul>
        <li>
          Toggle the menu : <kbd>Shift + Super + V</kbd>
        </li>
      </ul>
    </li>
  </ul>
</details>

<!-- Gnome 4x UI Improvements -->
<details>
  <summary>Gnome 4x UI Improvements</summary>
  <ul>
    <li>All settings as default</li>
  </ul>
</details>

<!-- Just perfection -->
<details>
  <summary>Just perfection</summary>
  <ul>
    <li>Profile : Custom</li>
    <li>
      Visibility
      <ul>
        <li>
          All ON except : Activities button, Accessibility Menu
        </li>
      </ul>
    </li>
    <li>Icons : Default</li>
    <li>Behavior : Default</li>
    <li>
      Customize
      <ul>
        <li>
          Notification Banner Position : Bottom End
        </li>
      </ul>
    </li>
  </ul>
</details>

<!-- Lock screen background -->
<details>
  <summary>Lock screen background</summary>
  <ul>
    <li>Image same as current wallpaper</li>
  </ul>
</details>

<!-- Rounded window corners -->
<details>
  <summary>Rounded window corners</summary>
  <ul>
    <li>
      General
      <ul>
        <li>
          Global settings 
          <ul>
            <li>Border radius : 15</li>
            <li>Keep rounded corners when maximized : ON</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</details>

<!-- Sound Input & Output device chooser -->
<details>
  <summary>Sound Input & Output device chooser</summary>
  <ul>
    <li>
      All settings as default
    </li>
  </ul>
</details>

<!-- Transparent Window Moving -->
<details>
  <summary>Transparent Window Moving</summary>
  <ul>
    <li>Opacity : 170</li>
    <li>Animation time : .1</li>
    <li>Transparent on moving : ON</li>
    <li>Transparent on resizing : ON</li>
  </ul>
</details>

<!-- User themes -->
<details>
  <summary>User themes</summary>
  <ul>
    <li>Colloid Dark</li>
  </ul>
</details>

<details>
  <summary>Vitals</summary>
  <ul>
    <li>
      General
      <ul>
        <li>Seconds between updates : 5</li>
        <li>Position in panel : Right</li>
        <li>Use higher precision : OFF</li>
        <li>Hide zero values : OFF</li>
        <li>Use fixed width : OFF</li>
        <li>Hide icons in top bar : OFF</li>
      </ul>
    </li>
    <li>
      Sensors
      <ul>
        <li>Monitor temperatures : ON</li>
        <li>Monitor voltage : OFF</li>
        <li>Monitor fan : OFF</li>
        <li>Monitor memory : ON</li>
        <li>Monitor processor : ON</li>
        <li>Monitor system : ON</li>
        <li>Monitor network : ON</li>
        <li>Monitor storage : ON</li>
        <li>Monitor battery : OFF</li>
      </ul>
    </li>
  </ul>
</details>
