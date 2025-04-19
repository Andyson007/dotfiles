{
  description = "My Awesome bar";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    nixpkgs,
    ags,
    ...
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    packages.${system}.default = ags.lib.bundle {
      inherit pkgs;
      src = ./.;
      name = "ags-andy";
      entry = "app.ts";
      gtk4 = true;

      extraPackages = [
        ags.packages.${system}.wireplumber
        ags.packages.${system}.network
        ags.packages.${system}.bluetooth
        ags.packages.${system}.mpris
        ags.packages.${system}.battery
      ];
    };
  };
}
