if status is-interactive
    zoxide init fish | source
    atuin init fish --disable-up-arrow | source

    alias 'a'='eza -AMl --git'
    alias 'l'='eza -Ml --git'
    alias 'weather'='curl wttr.in'
    alias 'lg'=lazygit
    alias 'emerge'='emerge -pv'
    fish_vi_key_bindings
end
export EDITOR=nvim
