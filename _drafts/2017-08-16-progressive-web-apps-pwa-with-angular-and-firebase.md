---
layout: post
title: "Getting Started with Progressive Web Apps: Developing your first PWA"
date: 2017-08-11 09:35:12.000000000 -02:00
path: 2017-08-16-progressive-web-apps-pwa-with-angular-and-firebase.md
image: /images/2017/img.png
tag: pwa
---

In this article we will learn how to create a Progressive Web App (PWA).

<div class="toc" markdown="1">
<span class="gamma">Table of contents</span>
{:.no_toc}
* TOC
{:toc}
</div>

> <i class="mdi mdi-github-circle mdi-24px"></i>  Want the code? Go [straight to GitHub](https://github.com/loiane/repo) or view the [live demo](https://loiane.com/repo/)

### Progressive Web Apps: Introduction

The first question is what is a Progress Web App (PWA) and why should we learn about it? Is it just another buzzword?

When I started my career as a developer 10 years ago (give it or take), the web was not this modern. There was not FrontEnd developer as a career (if you worked with web you had the Web Master job title). JavaScript was used to avoid readers to copy your content (not allowing the user to Ctrl+C or right click to see the source code of the website). Debbugging was done using alerts. When I got my first job as a developer, Ajax was the subject that everyone was talking about and how it was going to be a revolution on how developers created websites.

After some time, with the boom of the mobile applications, a new profession emerged. At this point, the web had also evolved, and we started talking about HTML 5. Hybrid applications using Apache Cordova (or Phonegap) also emerged. Then, we had the Native apps x Hybrid apps war. It is super cool to be able to create applications writing JavaScript + HTML + CSS and access some native device functionalies such as Camera, Geolocation, Contacts, and so on. Nowadays, we have a market for both types of apps: native and hybrid.

And then, we web evolved a little bit more and now we are talking about Progressive Web Apps. 

First, let’s start by defining what a PWA is. [Google defines them as](https://developers.google.com/web/progressive-web-apps/):

> Progressive Web Apps are user experiences that have the reach of the web, and are:
> * Reliable: Load instantly and never show the downasaur, even in uncertain network conditions.
> * Fast: Respond quickly to user interactions with silky smooth animations and no janky scrolling.
> * Engaging: Feel like a natural app on the device, with an immersive user experience.
> This new level of quality allows Progressive Web Apps to earn a place on the user’s home screen.

Also, Progressive Web Apps are a set of concepts (Google definition):

* **Progressive**: Work for every user, regardless of browser choice because they’re built with progressive enhancement as a core tenet.
* **Responsive**: Fit any form factor, desktop, mobile, tablet, or whatever is next.
* **Connectivity independent**: Enhanced with service workers to work offline or on low quality networks.
* **App-like**: Use the app-shell model to provide app-style navigations and interactions.
* **Fresh**: Always up-to-date thanks to the service worker update process.
* **Safe**: Served via TLS to prevent snooping and ensure content hasn’t been tampered with.
* **Discoverable**: Are identifiable as “applications” thanks to W3C manifests and service worker registration scope allowing search engines to find them.
* **Re-engageable**: Make re-engagement easy through features like push notifications.
* **Installable**: Allow users to “keep” apps they find most useful on their home screen without the hassle of an app store.
* **Linkable**: Easily share via URL and not require complex installation.

Basically, a PWA is a web app that behaves like a top quality native app.

If you are a web developer and want to develop a mobile app that needs acess to the device hardware, you are probably going to develop a hybrid app (to leverage the knowledge you already have). And suppose you need to take a picture. In this case, you need to use the Cordova camera plugin. Well, the web has evolved, and if we need to take a picture, there is a JavaScript API that can do that already (very similar to the Cordova API)! Nowadays, the browser is capable of doing a lot of things we could not do a few years back!

There is a website [What Web Can Do Today](https://whatwebcando.today/) where we can see what behaviors are supported by the browsers already.

A PWA is built with progressive enhancements in mind, where its basic functionality should work on every device. But should also leverage APIs and device capabilities, meaning it is supercharged in modern browsers.

Let's not start a war of native x web (not again). As developers, our job is solving problems using technologies. This does not mean that every app we develop from now on is going to be a PWA. It just means that the web is evolving and now we have another option to use to create an app. We have another tool in our toolbox of technologies. We will continue developing native apps, hybrid apps and now we will also develop Progressive Web Apps.

### Anatomy of a Progressive Web App

We will develop a PWA from scratch. It is a Pokedex.

The web app is very simple: Once we load it, we can see a list of Pokemons retrieved from an API. We can also see some Pokemon details clicking on the Pokemon card. To develop this webapp, we will use EcmaScript and to help us with the CSS, we will use Material Design - let's keep it generic for this first example. But we could develop this webapp using any of our favorite frameworks: Angular, Ionic, React, Vue, Polimer, and on.

To transform our web app into a progressive web application, we will use different technologies. 

First we will create the app shell of our app so we can separate the design and structure of our app from the data. Then, we'll store the pokemon data so we can access our app when we are offline or on a bad network. Afterwards, we'll cache full pages and resources through the cache storage and the app cache API. We'll add service workers to our app to have more control over the requests and caching lifecycle. And lastly, we will create a manifest.jason and make our web app installabe. With all these steps, we will complete the [PWA checklist]((https://developers.google.com/web/progressive-web-apps/checklist)).

### Setting up the environment



<img src="/images/2017/img.png">

> <i class="mdi mdi-lightbulb-on mdi-24px"></i>  Text 

> <i class="mdi mdi-comment-alert-outline mdi-24px"></i>  Text

### Source code and live demo

> <i class="mdi mdi-github-circle mdi-24px"></i>  View the full source code [on GitHub](https://github.com/loiane/repo) or check out the [live demo](https://loiane.com/repo/)!

References: 
* [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)
* [Why Progressive Web Apps Are The Future Of Web Development](https://arc.applause.com/2015/11/30/application-shell-architecture/)
* [What Web Can Do Today](https://whatwebcando.today/)
* [Progressive Web App Checklist](https://developers.google.com/web/progressive-web-apps/checklist)

Happy coding!



http://codewithstyle.info/how-i-built-a-progressive-web-app-with-angular-and-firebase-part-1/
http://blog.ionic.io/navigating-the-world-of-progressive-web-apps-with-ionic-2/
https://javebratt.com/pwa-faq/
https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/
https://ionicframework.com/docs/developer-resources/progressive-web-apps/
https://addyosmani.com/blog/getting-started-with-progressive-web-apps/
https://medium.com/progressive-web-apps/progressive-web-apps-in-ionic-2336b23e34b3
https://www.joshmorony.com/the-bare-necessities-progressive-web-apps-in-ionic/
