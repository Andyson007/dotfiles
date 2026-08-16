function vim
  if test "$argv" = "" 
    set dir $(fzf --preview-window right:80% --preview 'bat {} -fn --paging never' --no-scrollbar)
    nvim $dir
  else
    nvim "$argv"
  end
end
