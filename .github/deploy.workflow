workflow "Deploy to GitHub Pages" {
  on = "push"
  resolves = ["Master Branch"]
}

action "Master Branch" {
  uses = "actions/bin/filter@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "branch master"
}

action "Install Dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "ci"
  needs = ["Master Branch"]
}

action "Build Frontend" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run build"
  needs = ["Install Dependencies"]
}
