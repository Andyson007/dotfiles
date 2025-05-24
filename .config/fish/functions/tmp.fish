function tmp --description "Creates a temporary directory and navigates there"
  cd (mktemp -d)
end
