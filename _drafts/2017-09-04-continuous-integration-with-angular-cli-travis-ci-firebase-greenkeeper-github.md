---
layout: post
title: "Continuous Integration with Angular CLI + Travis CI + Firebase + Greenkeeper + Github"
date: 2017-09-01 09:35:12.000000000 -02:00
path: 2017-09-04-continuous-integration-with-angular-cli-travis-ci-firebase-greenkeeper-github.md
image: /assets/images/2017/angular-custom-date-pipe.jpg
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

## 4 - Firebase

For this example, we will only use Firebase hosting. *I'll write another article on how to use Firebase real time database with Angular projects! :)*

And that's it! We don't need to manually deploy our poject to Firebase hosting. We will let Travis CI take care of it for us!

## 2 - Github

I'm supposing you already have a Github account. If not, I highly recommend to create one - it's free!

We can create the repository manually directly in Github and follow the steps to commit our code to it. 

I like to use the Github desktop app as well, which makes much easier to create the project in my computer and then commit it and push it to Github.com. It is only available for Windows and MacOS users. But you can use any git client of your preference and link it to your Github account.

## 3 - Travis CI

For this example we will use Travis CI for Continuous Integration. If you don't have a Travis CI account, please go to [https://travis-ci.org](https://travis-ci.org/) and sign in with your GitHub account.

Travis CI has a great support to Github repositories. It is free for public repos as well (but you have to pay if you want to use it with private repos)!

To use CI with Travis we simply need to create a `.travis.yml` file in the repository root folder with the following content (already prepared for Angular CLI projects!):

```bash
```

You can commit this





