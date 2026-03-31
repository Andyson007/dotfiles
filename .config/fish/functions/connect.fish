function connect
  while true
    nmcli device wifi connect $argv && exit
  end
end
