# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
# ZSH_THEME="nord"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
HIST_STAMPS="dd/mm/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
	git
	sudo
	zsh-autosuggestions
	zsh-syntax-highlighting
	you-should-use
)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.



#!#!#!#!# MY CONMFIG #!#!#!#!#

# ENV Variables

# fzf
export FZF_DEFAULT_OPTS="--height 50% --layout reverse --border --print0"
export FZF_DEFAULT_COMMAND='find . -not -path "*/.git/*" -not -path "*/node_modules/*" -not -path "*/.*/*"'
# History
export FZF_CTRL_R_OPTS="--preview 'echo {}' --preview-window up:3:hidden:wrap --bind 'ctrl-/:toggle-preview' --bind 'ctrl-y:execute-silent(echo -n {2..} | pbcopy)+abort' --color header:italic --header 'Press CTRL-Y to copy command into clipboard'"
# Fancy cd
export FZF_ALT_C_COMMAND='find . -type d -not -path "*/.git/*" -not -path "*/node_modules/*" -not -path "*/__pycache__/*"'
export FZF_ALT_C_OPTS='--preview "tree -L 4 -C --dirsfirst -I \"node_modules|.git|__pycache__\" {} | head -200" --preview-window=right:60%:wrap'
# Remaped to Ctrl-F
export FZF_CTRL_T_COMMAND='find . -type f -not -path "*/.git/*" -not -path "*/node_modules/*" -not -path "*/.*/*"'
export FZF_CTRL_T_OPTS='--preview "batcat --style=numbers --theme=gruvbox-dark --color=always --line-range :500 {}" --print0'

# Others
PATH=~/.console-ninja/.bin:$PATH
export SHELL=/usr/bin/zsh

# ENV Variables End

# Star Ship
eval "$(starship init zsh)"

# Fastfetch
fastfetch
echo

# Custom liases
alias code="codium"
alias settings="code ~/.zshrc"
alias cat="batcat --theme gruvbox-dark --color always"
alias ls="ls -A --color"
alias h="cd ~"
alias c="clear"
alias count="echo \"There are $(find . -maxdepth 1 -type f | wc -l) files and $(($(find . -maxdepth 1 -type d | wc -l) - 1)) directories here.\""
alias r="source ~/.zshrc"
alias pi="pnpm i"
alias pa="pnpm add"
alias pr="pnpm run"
alias size="du -hs"
alias nfr="echo \"There are $(find . -type f | wc -l) files (recursively) in this directory.\""
alias ascii="man ascii | grep -m 1 -A 66 --color=never Oct | batcat --style grid,numbers -l vimrc --theme gruvbox-dark"
alias of='selected=$(find . -type f -not -path "*/.git/*" -not -path "*/node_modules/*" -not -path "*/__pycache__/*" | fzf --preview "batcat --style=numbers --theme=gruvbox-dark --color=always --line-range :500 {}" --print0 | tr -d "\n"); [ -n "$selected" ] && echo "$selected" | xargs -0 -o code'
alias od='selected=$(eval "$FZF_ALT_C_COMMAND" | fzf --preview "tree -L 4 -C --dirsfirst -I \"node_modules|.git|__pycache__\" {} | head -200" --preview-window=right:60%:wrap); [ -n "$selected" ] && code "$selected"'
alias install="sudo nala install"
alias nano="codium"
alias nvm="fnm"
alias ventoy="$HOME/ventoy*/VentoyGUI.x86_64"
alias apt="sudo nala"

# pnpm
export PNPM_HOME="/home/angus/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end

# fnm
FNM_PATH="/home/angus/.local/share/fnm"
if [ -d "$FNM_PATH" ]; then
  export PATH="/home/angus/.local/share/fnm:$PATH"
  eval "`fnm env`"
fi

eval "$(fnm env --use-on-cd --shell zsh)"


# fzf
bindkey '^F' fzf-file-widget
[ -f /usr/share/doc/fzf/examples/key-bindings.zsh ] && source /usr/share/doc/fzf/examples/key-bindings.zsh
[ -f /usr/share/doc/fzf/examples/completion.zsh ] && source /usr/share/doc/fzf/examples/completion.zsh
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Generated for envman. Do not edit.
[ -s "$HOME/.config/envman/load.sh" ] && source "$HOME/.config/envman/load.sh"

# Removes the python venv from the start of the prompt
export VIRTUAL_ENV_DISABLE_PROMPT=""

# Go path
export PATH=$PATH:/usr/local/go/bin

# bun completions
[ -s "/home/angus/.bun/_bun" ] && source "/home/angus/.bun/_bun"

# fnm
FNM_PATH="/home/angus/.local/share/fnm"
if [ -d "$FNM_PATH" ]; then
  export PATH="/home/angus/.local/share/fnm:$PATH"
  eval "`fnm env`"
fi


# SQL Developer
export PATH=$PATH:/opt/sqldeveloper/sqldeveloper/bin
export PATH="/home/angus/.config/herd-lite/bin:$PATH"
export PHP_INI_SCAN_DIR="/home/angus/.config/herd-lite/bin:$PHP_INI_SCAN_DIR"

# Symfony
export PATH="$HOME/.symfony5/bin:$PATH"

# Maven
export PATH="/opt/apache-maven-3.9.9/bin:$PATH"
