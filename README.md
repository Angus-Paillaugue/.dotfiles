
# Dotfiles tracker
To use this repo, you need to understand how it works first The `files_to_backup.txt` contains a dotfile to backup on every line. The `backup.sh` script is used to create a copy of each of the files you specified and the ./links directory. This directory reproduces the the file tree base on $HOME relative to ./links. In this script, you can also directly sync this repo on github.

To use these files you can use the `install.sh` script that copies all the dotfiles in the links directory into their actual places (be aware that  fi les that need to be copied into a non-existant directory will not be copied).

# Installed programs (in order)
 - [bat](https://github.com/sharkdp/bat) : A cat(1) clone with wings.
 - [fastfetch](https://github.com/fastfetch-cli/fastfetch) : used as a welcome message in zsh
 - [Colloid](https://github.com/vinceliuice/Colloid-gtk-theme) As the main theme (use the following command for the correct params : `./install.sh --tweaks float nord rimless`). Also, comment out the background-color property on the `#panel` in the `~/.themes/Colloid-Dark-Nord/gnome-shell/gnome-shell.css` file and add `background-color: #2e3440;` instead.
 - [Wallpapers library](https://github.com/linuxdotexe/nordic-wallpapers) Selection of nordit themed wallpapers (I use `ign_astronaut.png`)
 - [Starship](https://starship.rs/guide/) : custom shell prompt
 - [White sur icons](https://github.com/vinceliuice/WhiteSur-icon-theme) : Installed with the bold blag on : `./install.sh -b`.
 - ZSH as shell (see the zshrc config file)
   - git (installed by default)
   - sudo (installed by default)
   - zsh-autosuggestions [install guide](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)
   - zsh-syntax-highlighting [install guide](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)
   - you-should-use [repo](https://github.com/MichaelAquilina/zsh-you-should-use?tab=readme-ov-file)
 - [YouTube music](https://github.com/th-ch/youtube-music?tab=readme-ov-file#download) : Installed and configured only with the .dotfiles

# Configurations
To configure the aforementioned programs, you can just run the `./install.sh` script in the directory and it will overwrite the default configs with saved ones.

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
          Panel blur : OFF
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
    <li>Colloid Nord Dark</li>
  </ul>
</details>

<!-- Vitals -->
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

# Misc

## Terminal

### Looks
To have a cleaner look, I removed the the default top bar. To do So I follow this answer :
>Install dconf-editor
>`sudo apt install dconf-editor`
>
>Open dconf-editor (run `dconf-editor`)
>
>Go to `/org/gnome/terminal/legacy/headerbar`
>
>Disable "Default value" and change "Custom value" to "False".
>
>Close all your gnome-terminal windows and then reopen your terminal. Voilà!
>
>To remove menu bar, in terminal go to "View" and uncheck "Show menu bar" (or something else).


### Settings


#### General
Install the Nord theme by following the tutorial : [https://github.com/nordtheme/gnome-terminal](https://github.com/nordtheme/gnome-terminal)
Unchecked the "Show menubar by default in new terminals" in the terminal settings under general.

#### Shortcuts
File -> New Tab : <kbd>Ctrl+T</kbd>
File -> Close Tab : <kbd>Ctrl+W</kbd>
Edit -> Pase : <kbd>Ctrl+V</kbd>
View -> Hide and Show menubar : <kbd>Ctrl+M</kbd>
Tabs -> Switch to Previous Tab : <kbd>Alt+Left</kbd>
Tabs -> Switch to Next Tab : <kbd>Alt+Right</kbd>

#### Profiles
Install the Nord theme by following the tutorial : [https://github.com/nordtheme/gnome-terminal](https://github.com/nordtheme/gnome-terminal)
Then set it as default by clicking on the dropdown icon in the terminal settings under profiles. Then click on "Set as default".

##### Text
Change the size to 100 columns and 27 rows
Change the font to JetBrainsMono Nerd Font whit a size of 14
Change the cursor shape to the |-Beam

## Mouse
!only if using actual mouse and not a trackpad!
Changed the mouse speed to 3. (see : [https://askubuntu.com/questions/255890/how-can-i-adjust-the-mouse-scroll-speed#answer-1361121](https://askubuntu.com/questions/255890/how-can-i-adjust-the-mouse-scroll-speed#answer-1361121))

## App menu

Install menulibre (`sudo apt install menulibre`) and run it in the terminal to hide apps from the dock.
