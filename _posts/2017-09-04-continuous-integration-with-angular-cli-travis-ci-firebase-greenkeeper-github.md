---
layout: post
title: "Continuous Integration with Angular CLI + Travis CI + Firebase Hosting + Greenkeeper + Github"
date: 2017-09-04 07:35:12.000000000 -02:00
path: 2017-09-04-continuous-integration-with-angular-cli-travis-ci-firebase-greenkeeper-github.md
image: /assets/images/2017/angular-travis-firebase.jpg
category: firebase
---

In this article we will learn how to automatically deploy an Angular CLI project to Firebase hosting using Github + Travis CI with Greenkeeper.

<div class="toc" markdown="1">
* TOC
{:toc}
</div>

In this tutorial I'll show you step by step how I setup my Angular CLI projects in Github to automate the build and deployment steps (you can also automate the testing) using Travis CI, and as a bonus, how to keep the dependencies updated using Greenkeeper.

## 1 - Angular CLI

The first step is creating your Angular project using [Angular CLI](https://github.com/angular/angular-cli).

For this example we will use the following command:

```bash
ng new angular-travisci-firebase
```

After the project is created, we can run it locally using the following command:

```bash
cd angular-travisci-firebase
ng serve
```

We will see the starter template from [Angular CLI](https://github.com/angular/angular-cli).

<img src="/assets/images/2017/angular-travis-firebase-01.jpg">

## 2 - Github

I'm supposing you already have a [Github account](https://github.com/). If not, I highly recommend to create one - it's free!

We can create the repository manually directly in Github and follow the steps to commit our code to it. 

<img src="/assets/images/2017/angular-travis-firebase-02.jpg">

For this example I'll use the command below since Angular CLI already has built in git integration and makes the first commit automatically when the create the project. So we just need to link the remote repository with our project and push our code to it:

```bash
git remote add origin https://github.com/loiane/angular-travisci-firebase.git
git push -u origin master
```

Github also displays the available options when we create a repository.

<img src="/assets/images/2017/angular-travis-firebase-03.jpg">

As an alternative, I like to use the Github desktop app as well, which makes much easier to create the project in my computer and then commit it and push it directly to Github.com (without needing to create the repo in Github first). But you can use any git client of your preference and link it to your Github account.

## 3 - Travis CI

For this example we will use Travis CI for Continuous Integration. If you don't have a Travis CI account, please go to [https://travis-ci.org](https://travis-ci.org/) and sign in with your GitHub account.

Travis CI has a great support to Github repositories. It is free for public repos as well (but you have to pay if you want to use it with private repos)!

Enable Travis CI for the repository we just created:

<img src="/assets/images/2017/angular-travis-firebase-04.jpg">

Since the Angular CLI production build requires a special command (`ng build`) we will tell Travis CI how we want the production build to be created. So we will change the repo settings to only run the build after we have the `.travis.yml` created. 

> if you do not see the settings tab you can go to "More Options" - it can take a few seconds before it is displayed after we enable the repository:

<img src="/assets/images/2017/angular-travis-firebase-05.jpg">

To use CI with Travis we simply need to create a `.travis.yml` file in the repository root folder with the following content (already prepared for Angular CLI projects!):

```bash
language: node_js

node_js:
   - node # will use latest node

before_script: # commands to run before the build step
   - npm install -g --silent @angular/cli

script: # the build step
   - ng build --prod

notifications:
  email: # only receive email when the build status changes (someone broke the build!) 
    on_failure: change
    on_success: change   
```

The file above can be used with any Angular CLI - with or without Firebase hosting and will validate the commits for any branch. We will modify it to support Firebase in the next section.

Note that we are using the `--silent flag` when installing `@angular/cli` to execute the build. This is just because the log trace when installing `@angular/cli` is very long and I prefer not to see the install trace - this way is much smaller and easier to read and focus on the main tasks which is `ng build --prod` command. 

> <i class="mdi mdi-comment-alert-outline mdi-24px"></i>  You can also check the options available to customize this file at [https://docs.travis-ci.com/user/customizing-the-build](https://docs.travis-ci.com/user/customizing-the-build).

## 4 - Firebase

For this example, we will only use Firebase hosting. *I'll write another article on how to use Firebase real time database with Angular projects! :)*

So the first thing we will do is creating a new project in the Firebase console [https://console.firebase.google.com/](https://console.firebase.google.com/):

<img src="/assets/images/2017/angular-travis-firebase-06.jpg">

Next step is installing the `firebase-tools` and initialize our project:

```bash
npm install -g firebase-tools
firebase login
firebase init
```

We will prompted to select the functionality we want to use - in this case is hosting:

<img src="/assets/images/2017/angular-travis-firebase-07.jpg">

Next we need to select the project we created in the console: 

<img src="/assets/images/2017/angular-travis-firebase-08.jpg">

Note that two new files where created in the root of the project: `.firebaserc` and `firebase.json`:

<img src="/assets/images/2017/angular-travis-firebase-09.jpg">

By default, the `firebase.json` will be created empty and we need to configure what files we would like to deploy on Firebase. I usually add the following content to `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

This file tells Firebase we want to deploy the content of the `dist` folder (which is where Angular CLI generated the prod build by default) and the main page is `index.html`.

And that's it! We don't need to manually deploy our poject to Firebase hosting. We will let Travis CI take care of it for us! Even for the first build. I like to let Travis handle the first so I know the automated process it is working OK.

However, if you do want to test the upload and the hosting manually, you can use the following commands:

```bash
ng build --prod
firebase deploy
```

### 4.1 - Firebase + Travis CI

Now let's go back to Travis CI to customize our build process to include the Firebase hosting deploy. 

When we do `firebase deploy` from our computer, we are already logged in to Firebase. But Travis is not logged in. So we need to tell Travis how to login and get access to our Firebase account and execute the `firebase deploy`. To so, we will generate a special token. Firebase supports CI tools, and to get a token to use with Travis CI we need to execute the following command (from our project folder):

```bash
firebase login:ci
```

You will be prompted to authorize the access to the Firebase account. After you click on "Authorize" you will see the token generated in the terminal/cmd:

<img src="/assets/images/2017/angular-travis-firebase-10.jpg">

Firebase already provides us the command we need to use: `firebase deploy --token $FIREBASE_TOKEN`

So let's go back to the Travis CI repository settings page and create the `FIREBASE_TOKEN` environment variable - and as value we add the token generated (you can copy it from the terminal): 

<img src="/assets/images/2017/angular-travis-firebase-11.jpg">

We will modify the `.travis.yml` to look like the following:

```bash
language: node_js

node_js:
   - node

branches:
   only:
      - master # will only build for master branch commits

before_script:
   - npm install -g --silent firebase-tools # installs firebase to run firebase deploy
   - npm install -g --silent @angular/cli

script:
   - ng build --prod

after_success:
  - firebase deploy --token $FIREBASE_TOKEN --non-interactive # firebase deploy after angular-cli build

notifications:
  email:
    on_failure: change
    on_success: change   
```

> Very important: we need the `--non-interactive` flag when executing `firebase deploy` from Travis CI, otherwise the deploy will fail:

<img src="/assets/images/2017/angular-travis-firebase-12.jpg">

You can commit the new `.travis.yml` and see the automated process! But there is still on extra step.

## 5 - Greenkeeper

Greenkeeper is an automated dependency management tool. When integrated with your Github repository, it will send a PR so you can update your NPM packages. This service is also free for public repositories. 

If you don't have Greenkeeper enabled for your repos, please go to [https://github.com/integration/greenkeeper](https://github.com/integration/greenkeeper) and sign in with your GitHub account.

<img src="/assets/images/2017/angular-travis-firebase-13.jpg">

Select the repositories you would like to enable Greenkeeper. It is not recommended to enable it for all your repositories. Also,Greenkeeper requires to have CI tool such as Travis enabled in the repository to be able to work its magic. For our example, let's add our project:

<img src="/assets/images/2017/angular-travis-firebase-14.jpg">

As soon as we add our project to Greenkeeper, it will send an inital Pull Request to update package.json packages (if there is any outdated) and also to add badge to README.md file. It will automatically trigger the CI process to verify if the build is still OK and if so, we can merge the PR.

However, with our current Travis CI setup, Greenkeeper will fail:

<img src="/assets/images/2017/angular-travis-firebase-15.jpg">

This happens because our Travis CI setup is only configured to run on the master branch, and Greenkeeper creates a separate branch with the changes to send the PR. 

## 5.1 - Greenkeeper + Travis CI + Firebase

Our current Travis CI setup is not 100%. Greenkeeper even suggests in the initial PR to add the `greenkeeper` regex to the list of allowed branches:

```bash
branches:
    only:
      - master
 +    - /^greenkeeper/.*$/
```

However. we still have two issues:

* The Firebase deploy will be execute for every Greenkeeper PR, and we do not want this to happen. Ideally, we only want to run `firebase deploy` when we commit to the `master` branch.
* If this is an open source project, other developers can send PRs with fixes/enhancements. We also want to be able to verify if the build is still OK if we merge the PR - but not deploy the changes until they are in the `master` branch.

Let's see how we can fix this.

## 6 - Updating .travis.yml config (last version!)
 
So we are going to remove the `branches` config from `.travis.yml` and verify after each build if the CI process was trigged from the `master` branch. If is from `master` then we trigger the `firebase deploy`, otherwise, the build is executed and the deploy is skipped.

Below is the `.travis.yml` file I use for my Angular CLI + Firebase hosting + Greenkeeper projects:

```bash
language: node_js

node_js:
  - node

before_script:
  - npm install -g --silent firebase-tools
  - npm install -g --silent @angular/cli

script:
  - ng build --prod

after_success:
  - test $TRAVIS_BRANCH = "master" && test $TRAVIS_PULL_REQUEST = "false" && firebase deploy --token $FIREBASE_TOKEN --non-interactive

notifications:
  email:
    on_failure: change
    on_success: change
```

When Travis builds a PR targeted at master, `$TRAVIS_BRANCH` will be set to "master". So to make sure this is really only executed for master, you need to use `test $TRAVIS_BRANCH = "master" && test $TRAVIS_PULL_REQUEST = "false"`.

> <i class="mdi mdi-comment-alert-outline mdi-24px"></i>  You can check other Travis environment variables that can be used at [https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables](https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables)

You can copy this version and use in you projects as well! 

This is the same setup I use for the Angular examples published in this blog!

### 6.1 - Testing everything together

Just to make our build process will work as we expect, let's make two tests:

1 - PR to master branch - we still want te build process to be verified, but no Firebase deploy:

<img src="/assets/images/2017/angular-travis-firebase-16.jpg">

Great! The deploy was skipped.

2 - Master branch build - we want to update our Firebase deploy with the latest changes:

<img src="/assets/images/2017/angular-travis-firebase-17.jpg">

Perfect! :)

## Source code and live demo

> <i class="mdi mdi-github-circle mdi-24px"></i>  Source code available [on GitHub](https://github.com/loiane/angular-travisci-firebase)

> <i class="mdi mdi-laptop-mac mdi-24px"></i>  [Live demo](https://angular-travisci-firebase.firebaseapp.com/)

References:
* [Angular CLI](https://github.com/angular/angular-cli)
* [Github](https://github.com/)
* [Travis CI](https://travis-ci.org)
* [Greenkeeper](https://greenkeeper.io/)
* [Houssein article on Angular CLI + Firebase](https://houssein.me/continuous-integration-angular-firebase-travisci)

Happy coding!
