workflow "Deployment" {
  on = "push"
  resolves = ["Deploy to GitHub Pages"]
}

action "Install Dependencies" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Build Frontend" {
  uses = "actions/npm@master"
  args = "run build"
  needs = ["Install Dependencies"]
}

action "Master Branch" {
  uses = "actions/bin/filter@master"
  args = "branch master"
  needs = ["Build Frontend"]
}

# action "Deploy to GitHub Pages" {
#   uses = "maxheld83/ghpages@master"
#   needs = ["Master Branch"]
# }
