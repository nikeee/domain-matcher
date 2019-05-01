workflow "Deploy to GitHub Pages" {
  on = "push"
  resolves = ["Master Branch"]
}

action "Master Branch" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install Dependencies" {
  uses = "actions/npm@master"
  args = "ci"
  needs = ["Master Branch"]
}

action "Build Frontend" {
  uses = "actions/npm@master"
  args = "run build"
  needs = ["Install Dependencies"]
}
