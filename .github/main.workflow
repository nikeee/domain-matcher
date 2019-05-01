workflow "Deploy to GitHub Pages" {
  on = "push"
  resolves = ["Deploy"]
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

action "Deploy" {
  uses = "maxheld83/ghpages@7231c0da52e365fc54f15981044e1e71a249f512"
  needs = ["Build Site"]
  env = {
    BUILD_DIR = "build/"
  }
  secrets = ["GH_PAT"]
}
