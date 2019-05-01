workflow "Deploy to GitHub Pages" {
  on = "push"
  resolves = ["Build Site"]
}

action "Master Branch" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install Dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Master Branch"]
  args = "ci"
}

action "Build Site" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install Dependencies"]
  args = "run build"
}
