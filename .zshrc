typeset -U path cdpath fpath manpath

for profile in ${(z)NIX_PROFILES}; do
  fpath+=($profile/share/zsh/site-functions $profile/share/zsh/$ZSH_VERSION/functions $profile/share/zsh/vendor-completions)
done

# Oh-My-Zsh/Prezto calls compinit during initialization,
# calling it twice causes slight start up slowdown
# as all $fpath entries will be traversed again.
autoload -U compinit && compinit

# History options should be set in .zshrc and after oh-my-zsh sourcing.
# See https://github.com/nix-community/home-manager/issues/177.
HISTSIZE="10000"
SAVEHIST="10000"

HISTFILE="$HOME/.zsh_history"
mkdir -p "$(dirname "$HISTFILE")"

setopt HIST_FCNTL_LOCK
setopt HIST_IGNORE_DUPS
unsetopt HIST_IGNORE_ALL_DUPS
setopt HIST_IGNORE_SPACE
unsetopt HIST_EXPIRE_DUPS_FIRST
setopt SHARE_HISTORY
unsetopt EXTENDED_HISTORY


eval "$(zoxide init zsh)"
eval "$(atuin init zsh --disable-up-arrow)"

if [[ $TERM != "dumb" ]]; then
  eval "$(starship init zsh)"
fi


# Aliases
alias -- 'a'='eza -AMl --git'
alias -- 'l'='eza -Ml --git'
alias -- 'lg'='lazygit'
alias -- 'cp'='cp -v'
alias -- 'mv'='mv -v'
alias -- 'c'='ping yr.no'
alias start="cd;Hyprland;logout"
alias aoeu="vimm" &&

alias tmp="cd \`mktemp -d\`"
alias weather="curl wttr.in"
alias dot="cd ~/.dotfiles/"

# Functions
function vim() {
  if [[ $# -eq 0 ]]; then
    dir=$(fzf)
    if [[ $? -eq 0 ]]; then
      nvim "$dir"
    fi
  else
    nvim "$@"
  fi
}
