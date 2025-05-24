function vim
  if test "$argv" = "" 
    set dir $(fzf)
    nvim $dir
  else
    nvim "$argv"
  end
end
