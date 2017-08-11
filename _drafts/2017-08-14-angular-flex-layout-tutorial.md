---
layout: post
title: "Angular Flex Layout Tutorial"
date: 2017-08-24 10:00:01.000000000 -02:00
path: 2017-08-14-angular-flex-layout-tutorial.md
image: /images/2017/img.png
tag: angular
---

In this article we will learn how to use Flex Layout for Angular using the @angular/flex-layout package along with Angular Material components.

<div class="toc" markdown="1">
<span class="gamma">Table of contents</span>
{:.no_toc}
* TOC
{:toc}
</div>

> <i class="mdi mdi-github-circle mdi-24px"></i>  Want the code? Go [straight to GitHub](https://github.com/loiane/repo) or view the [live demo](https://loiane.com/repo/)

### What is Angular Flex Layout

I'm currently in the process of rewriting my [courses web site](https://loiane.traning) using Angular and [Angular Material](https://material.angular.io/). Angular Material has very nice components, but it's not enough for the page layouts and make the project responsive. You can use CSS frameworks such as Bootstrap, Pure CSS, and Materialize CSS, but during some tests, I found that it conficted with some Material styles. You could get the *scss* or *less* files from these frameworks and remove the unwanted styles, but that's is too much work just to use the responsive utilities (or you could also write the CSS you need from scratch!). 

Doing a little bit of research, I found [Angular Flex Layout](https://github.com/angular/flex-layout) and I fell in love with it.

**Angular Flex Layout** provides a sophisticated layout API using Flexbox CSS + mediaQuery. It is written in pure TypeScript and fits perfectly with Angular. You can use it along with Angular Material or any other UI component library of your preference.

At the time this post was written, the current version of `@angular/flex-layout` is `2.0.0-beta.8`. It supports Angular v4+, and v2.4.x is going to be dropped on version `2.0.0-beta.9`.

Before we get started, I suggest taking a look at the following resources:

* [Angular Flex Layout Github](https://github.com/angular/flex-layout)
* [Angular Flex Layout Demo](https://tburleson-layouts-demos.firebaseapp.com/): really nice demo!
* [A Complete Guide to Flexbox by CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/): my favorite guide to learn Flexbox

In this article I'm going to demonstrate some examples of how to use Angular Flex-Layout with Angular Material.

### Setting up Angular Flex Layout

I always use Angular CLI to create my Angular projects. I have also described the steps to [setup Angular Material in a project in this post](https://loiane.com/2017/07/getting-started-with-angular-material-2).

To install Angular Flex Layout from npm:

```bash
npm install @angular/flex-layout --save
```

As the project is still currently in beta, you can also install the latest build (code merges and bug fixes) from the project's master/HEAD branch using:

```bash
npm install github:angular/flex-layout-builds --save
```

Open `app.module.ts` and add `FlexLayoutModule.forRoot()` in the `imports` metadata:

```js
// ...
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule.forRoot()
  ],
  // ...
})
export class AppModule {}
```

That's it! We can start using Flex Layout in our HTML templates!

### HTML API (Declarative)

Flex-Layout API has a declative API (HTML) and also has an imperative API (JavaScript), The HTML API that has 2 feature sets:

* *Static API*: Summary of static API features.
* *Responsive API*: Introducing Responsive API and BreakPoints details.

API for DOM containers:

| HTML API      | Allowed values                                                                    |
|---------------|-----------------------------------------------------------------------------------|
| fxLayout      | `row | column | row-reverse | column-reverse`                                     |
| fxLayoutAlign | `start |center |end | space-around | space-betweenstart | center | end | stretch` |
| fxLayoutWrap  | `"" | wrap | none | nowrap | reverse`                                             |
| fxLayoutGap   | `%, px, vw, vh`                                                                   | 

API for child Elements within containers:

| HTML API     | Allowed values                    |
|--------------|-----------------------------------|
| fxFlex       | `“” , px , %, vw, vh, ” “,`       |
| fxFlexOrder  | int                               |
| fxFlexOffset | `%, px, vw, vh`                   |
| fxFlexAlign  | `start | baseline | center | end` |
| fxFlexFill   |                                   |

API for any element:

| HTML API | Allowed values     |
|----------|--------------------|
| fxHide   | true, false, 0, “” |
| fxShow   | true, false, 0, “” |

Breakpoint aliases for the responsive API:

| Breakpoint | mediaQuery                                             |
|------------|--------------------------------------------------------|
| “”         | screen                                                 |
| xs         | screen and (max-width: 599px)                          |
| gt-xs      | screen and (min-width: 600px)                          |
| sm         | screen and (min-width: 600px) and (max-width: 959px)   |
| gt-sm      | screen and (min-width: 960px)                          |
| md         | screen and (min-width: 960px) and (max-width: 1279px)  |
| gt-md      | screen and (min-width: 1280px)                         |
| lg         | screen and (min-width: 1280px) and (max-width: 1919px) |
| gt-lg      | screen and (min-width: 1920px)                         |
| xl         | screen and (min-width: 1920px)                         |



//http://www.dzurico.com/angular-flex-layout/
//https://github.com/angular/flex-layout/wiki/API-Documentation
http://slides.com/webmax/deck#/13

#### Responsive API Overview


### Source code and live demo

> <i class="mdi mdi-github-circle mdi-24px"></i>  View the full source code [on GitHub](https://github.com/loiane/repo) or check out the [live demo](https://loiane.com/repo/)!

References: 
* [Angular Flex Layout Github](https://github.com/angular/flex-layout)
* [Angular Flex Layout Demo](https://tburleson-layouts-demos.firebaseapp.com/)
* [A Complete Guide to Flexbox by CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

Happy coding!
