---
layout: post
title: Jetty and Eclipse Integration in 3 Steps
published: true
author: Loiane
comments: false
date: 2012-06-14 05:06:54
tags:
    - Eclipse
    - Jetty
    - Web Application
categories:
    - jetty
image: /assets/images/assets/Jetty_loiane_10.png
category: java    
---
This tutorial will walk you through out how to integrate Jetty and Eclipse and how to run a web application on Jetty server inside Eclipse.

## Steps:

  1. Install Jetty Eclipse plugin
  2. Create web application
  3. Run web application

## Installing Jetty Eclipse Plugin

* When you add a server to the Servers view, you will not see an option for Jetty as you will find for Tomcat, JBoss, Apache, etc.
* First you need to [install a plugin](http://code.google.com/p/run-jetty-run/).
* Go to Eclipse -> Install new Software menu.
* Click on add and type Jetty for Name and [http://run-jetty-run.googlecode.com/svn/trunk/updatesite](http://run-jetty-run.googlecode.com/svn/trunk/updatesite) for Location.
* Select the Jetty plugin to install. Click on Next and follow the installation:

<img src="/assets/images/assets/Jetty_loiane_03.png">

## Creating a Web Application

When you restart Eclipse, got o Project Explorer view or the New menu and click on New -> Dynamic Web Project:

<img src="/assets/images/assets/Jetty_loiane_04.png">

Configure the Project, create a name for it and click on Next:

<img src="/assets/images/assets/Jetty_loiane_05.png">

Click on Next:

<img src="/assets/images/assets/Jetty_loiane_06.png">

Configure the Web Module:

<img src="/assets/images/assets/Jetty_loiane_07.png">

And the project is created. Create also a index.html file. The project structure should look like this:

<img src="/assets/images/assets/Jetty_loiane_08.png">

## Running the Web Application

Select the application you want to run on Jetty.

Click on the Run button -> Run Configurations.


<img src="/assets/images/assets/Jetty_loiane_09.png">

Configure your app on Jetty as shown in the picture bellow and click on Run:

<img src="/assets/images/assets/Jetty_loiane_10.png">

Wait for the server to start. You should get something like the following on your log:

<img src="/assets/images/assets/Jetty_loiane_11.png">

Open a browser and test the application!

<img src="/assets/images/assets/Jetty_loiane_12.png">

Happy Coding!
