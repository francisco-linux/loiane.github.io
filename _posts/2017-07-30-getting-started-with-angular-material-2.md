---
layout: post
title: "Getting Started with Angular Material 2"
date: 2017-07-30 09:35:12.000000000 -02:00
path: 2017-07-30-getting-started-with-angular-material-2.md
image: /assets/images/2017/angular-material.jpg
category: angular
---

This article will show you how to setup your Angular project (v2+) using Angular Material 2.

Update December 2017: code updated to Angular v5+ and Material v5+. Stackblitz link also available at the end of this article.

### Contents
{:.no_toc}

<div class="toc" markdown="1">
* TOC
{:toc}
</div>

## 1: Create your Angular project with Angular CLI

The first step is creating your Angular project using [Angular CLI](https://github.com/angular/angular-cli).

For this example we will use the following command:

```bash
ng new angular-material-example --routing -is -st -style=scss
```

With the command above, we are asking Angular CLI to create a new project with a routing module (`--routing`), use inline style (`-is`) for `app.component.ts`, skip the creation of unit testing files (`-st`) - since we will not need `.spec` file for this example and also use `scss` as extension for our style/CSS files.

It will create a new project with the following files:

<img src="/assets/images/2017/angular-material-01.png">

## 2: npm install @angular-material and hammerjs

Next, we need to install @angular-material and its required dependencies. Change the directory to the project we created (`cd angular-material-example`) and execute the following command:

```bash
npm install --save @angular/material @angular/cdk hammerjs
```

## 3: Configure angular-cli.json and hammerjs

`Hammer.js` is an optional dependency and helps with touch support for a few of the components (`mat-slide-toggle`, `mat-slider`, `atTooltip`). 

I like to always include `hammerjs` as a dependency as well. And we also need to include its import in `angular-cli.json`. Locate the `scripts` section and add the `hammer.min.js` import:

```json
"scripts": [
  "../node_modules/hammerjs/hammer.min.js"
],
```

## 4: Include a theme and Material Icons

To add a theme to our project, open `src/style.css` or `src/style.scss` and add:

```scss
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
```

Angular Material 2 comes with 4 pre built themes: `indigo-pink`, `deeppurple-amber`, `purple-green` and `pink-bluegrey`. 

You can replace `indigo-pink.css` with any of the options mentioned above. 

### Material Icons

If you need to use icons in your application, you can also import [Material Design icons](https://design.google.com/icons/).

If you are using `css` as file extension, include the following in your `src/style.css` before the material theme import:

```css
@import '~https://fonts.googleapis.com/icon?family=Material+Icons';
```

If you are using `scss` as file extension, include the following import in your `src/style.scss` file (before the material theme import):

```scss
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
```

#### Local support to Material Icons

If you prefer to host Material Icons locally, you can also follow the next steps.

First, install `material-design-icons` from npm:

```bash
npm install material-design-icons --save
```

In your `src/style.css` add the following import:

```css
@import '~material-design-icons/iconfont/material-icons.css';
```

And that's it!

## 5: Configure app.module

Some Angular Material components depend on `@angular/animations` package. Open your `package.json` and confirm if it has been already installed (Angular CLI already adds it as a dependency along with other `@angular` packages). If it is not installed, then install it with the command below:

```bash
npm install --save @angular/animations
```

Make sure you use the same version as the other `@angular` packages.

Open `app.module.ts` and configure the animations package.

If you would like Material components to be animated, then add `BrowserAnimationsModule` to the app.module `imports` section:

```js
//other EcmaScript imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    //other imports
    BrowserAnimationsModule
  ]
})
export class AppModule { }
```

If you would not like to use animations, then replace `BrowserAnimationsModule` with `NoopAnimationsModule` in the code above.

## 6: Using Material Components

Now the setup is already in place and we can start coding!

We can open `app.component.html` and start adding our Material components HTML tags. But we will do some extra steps so we have a project a little bit more organized.

### Creating a HomeComponent page

Let's create a new module and component using Angular CLI:

```bash
ng g m home --routing
```

With the command above the following files will be created:

```
├── home
|   ├── home-routing.module.ts
|   ├── home.module.ts
```

Now let's also create a HomeComponent:

```bash
ng g c home/home -st
```

Open `home.component.html` add add the following code:

```html
<mat-toolbar color="primary">
  <span>Angular Material Example</span>
</mat-toolbar>
```

If you are using VSCode and the [Angular Languague Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) extension, you will get some compilation errors in your HTML template:

<img src="/assets/images/2017/angular-material-02.png">

This is because the `mat-*` components are not known by Angular, hence we need to import them in our module.

> Please note that Angular Material RC changed its prefix from `md` to `mat`


We can verify in the [Angular Material docs](https://material.angular.io/components) which are the Material modules we need to import in our project.

For the `mat-toolbar`, we can go to [Toolbar API tab link](https://material.angular.io/components/toolbar/api) and we will see that we need to import `MatToolbarModule`.

We have two options. The first one is importing `MatToolbarModule` in the `home.module.ts` file:

```js
import { MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
```

### Creating a shared MaterialModule for our project

Suppose we have another module that is also going to use the `mat-toolbar` component. We would need to import `MatToolbarModule` again in that module.

To avoid repeating the same import in several different modules in our project, we are going to create a shared MaterialModule (this is the second option, and I personally prefer using this one). This way, we only need to import the component we need once and we can import this module in any other module that is needed.

To do so, we will use Angular CLI to create a new module:

```bash
ng g m app-material
```

We will add any Material module in this module. Let's start with the `MatToolbarModule`:

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule
  ]
})
export class AppMaterialModule { }
```

Note that we will add any Material Module we need for this project in the `exports` metadata. 

Now we can go back to the `home.module` and import the shared Material module we created:

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

import { AppMaterialModule } from './../app-material/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
```

### Configuring the routes and app.component

Since we created a `home.component`, this is going to be the main Component for the `home.module`. So we need to add the `home.component` in our `HomeRoutingModule`:

```js
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];
```

Angular CLI generates `app.component.ts` with some starter code. For this example, we will only need the `router-outlet` tag, so we can simplify the code for `app.component.ts`:

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent {}

```

Since our template has only 1 line of code, it is OK to use the inline template (the Angular style guide says inline template is ok up to 3 lines of code).

And as a last step of our basic configuration, we need to add a routing path to the HomeModule in the `app-routing.module.ts`:

```js
const routes: Routes = [
  {
    path: '', loadChildren: 'app/home/home.module#HomeModule'
  }
];
```

When we load our application in the browser (path ''), the HomeModule will be lazy loaded and the HomeComponent will be rendered.

If we execute `ng serve` and open `http://localhost:4200/` we will be able to see a purple-ish toolbar:

<img src="/assets/images/2017/angular-material-03.png">

Our code now has the following structure:

<img src="/assets/images/2017/angular-material-05.png">

This is the project structure I usually use for my Angular Material projects. Now you can add more components and modules as needed and have fun with Material components!

### Adding more Material Components to home.component.html

Let's go back to `home.component.html` and enhance our example. Our template should have the following code:

```html
<mat-toolbar color="primary">
  <button mat-icon-button [matMenuTriggerFor]="menu">
    <mat-icon>more_vert</mat-icon>
  </button>
  <span>Angular Material Example</span>

  <mat-menu #menu="matMenu">
    <button mat-menu-item>
    <mat-icon>dialpad</mat-icon>
    <span>Menu 1</span>
  </button>
    <button mat-menu-item disabled>
    <mat-icon>voicemail</mat-icon>
    <span>Menu 2</span>
  </button>
    <button mat-menu-item>
    <mat-icon>notifications_off</mat-icon>
    <span>Menu 3</span>
  </button>
  </mat-menu>
</mat-toolbar>

<mat-card class="example-card">
  <mat-card-header>
    <div mat-card-avatar class="example-header-image"></div>
    <mat-card-title>Angular</mat-card-title>
    <mat-card-subtitle>Material 2</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="https://loiane.com/images/tags/angular.svg" height="300px">
  <mat-card-content>
    <p>
      Material Design components for Angular
    </p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>
```

We also need to go back to `app-material.module.ts` and add the additional Material components we are using the HTML code above:

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule
  ]
})
export class AppMaterialModule {}
```

After the changes above, this will be the output in the browser:

<img src="/assets/images/2017/angular-material-04.png">

## Tip: Angular Material VSCode Extension

VSCode has a very good extension to work with Angular Material components.

In the HTML templates we can simply type `mat-` and the extension provide code snippets for the components available in angulat material.

This is the extension I use: [Angular Material 2, Flex layout 1, Covalent 1 & Material icon snippets](https://marketplace.visualstudio.com/items?itemName=1tontech.angular-material).

> This extension is also part of the Angular extension package I created to work with Angular projects: [Angular Extension Pack](https://marketplace.visualstudio.com/items?itemName=loiane.angular-extension-pack)

## Source code and live demo

> <i class="mdi mdi-github-circle mdi-24px"></i>  Source code available [on GitHub](https://github.com/loiane/angular-material-example)

> <i class="mdi mdi-laptop-mac mdi-24px"></i>  [Live demo](https://angular-material-example.firebaseapp.com)

> <i class="mdi mdi-laptop-mac mdi-24px"></i>  [Stackblitz online demo](https://stackblitz.com/edit/angular-material-hello)

References:
* [Angular Material 2 docs](https://material.angular.io/components)
* [Angular Material Getting Started Guide](https://material.angular.io/guide/getting-started)

Happy coding!
