---
layout: post
title: "Getting Started with Angular Material 2"
date: 2017-07-30 09:35:12.000000000 -02:00
path: 2017-07-30-getting-started-with-angular-material-2
tag: angular
---

This article will show you how to setup your Angular project (v2+) using Angular Material 2.

<div class="toc" markdown="1">
<span class="gamma">Table of contents</span>
{:.no_toc}
* TOC
{:toc}
</div>

> <i class="mdi mdi-github-circle"></i>  Want the code? Go [straight to GitHub repo](https://github.com/loiane/angular-material-example) or view the [live demo](https://angular-material-example.firebaseapp.com)

### 1: Create your Angular project with Angular CLI

The first step is creating your Angular project using [Angular CLI](https://github.com/angular/angular-cli).

For this example we will use the following command:

```bash
ng new angular-material-example --routing -is -st -style=scss
```

With the command above, we are asking Angular CLI to create a new project with a routing module (`--routing`), use inline style (`-is`) for `app.component.ts`, skip the creation of unit testing files (`-st`) - since we will not need `.spec` file for this example and also use `scss` as extension for our style/CSS files.

It will create a new project with the following files:

<img src="/images/2017/angular-material-01.png">

### 2: npm install @angular-material and hammerjs

Next, we need to install @angular-material and its required dependencies. Change the directory to the project we created (`cd angular-material-example`) and execute the following command:

```bash
npm install --save @angular/material @angular/cdk hammerjs
```

### 3: Configure angular-cli.json and hammerjs

`Hammer.js` is an optional dependency and helps with touch support for a few of the components (`md-slide-toggle`, `md-slider`, `mdTooltip`). 

I like to always include `hammerjs` as a dependency as well. And we also need to include its import in `angular-cli.json`. Locate the `scripts` section and add the `hammer.min.js` import:

```json
"scripts": [
  "../node_modules/hammerjs/hammer.min.js"
],
```

### 4: Include a theme and Material Icons

To add a theme to our project, open `src/style.css` or `src/style.scss` and add:

```scss
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
```

Angular Material 2 comes with 4 pre built themes: `indigo-pink`, `deeppurple-amber`, `purple-green` and `pink-bluegrey`. 

You can replace `indigo-pink.css` with any of the options mentioned above. 

#### Material Icons

If you need to use icons in your application, you can also import [Material Design icons](https://design.google.com/icons/).

If you are using `css` as file extension, include the following in your `src/style.css` before the material theme import:

```css
@import '~https://fonts.googleapis.com/icon?family=Material+Icons';
```

If you are using `scss` as file extension, include the following import in your `src/style.scss` file (before the material theme import):

```scss
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
```

##### Local support to Material Icons

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

### 5: Configure app.module

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

### 6: Using Material Components

Now the setup is already in place and we can start coding!

We can open `app.component.html` and start adding our Material components HTML tags. But we will do some extra steps so we have a project a little bit more organized.

#### Creating a HomeComponent page

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
<md-toolbar color="primary">
  <span>Angular Material Example</span>
</md-toolbar>  
```

If you are using VSCode and the [Angular Languague Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) extension, you will get some compilation errors in you HTML template:

<img src="/images/2017/angular-material-02.png">

This is because the `md-*` components are not known by Angular, hence we need to import them in our module.

We can verify in the [Angular Material docs](https://material.angular.io/components) which are the Material modules we need to import. 

For the `md-toolbar`, we can go to [Toolbar API tab link](https://material.angular.io/components/toolbar/api) and we will see that we need to import `MdToolbarModule`.

We have two options. The first one is importing `MdToolbarModule` in the `home.module.ts` file:

```js
import { MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MdToolbarModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
```

#### Creating a shared MaterialModule for our project

Suppose we have another module that is also going to use the `md-toolbar` component. We would need to import `MdToolbarModule` again in that module. 

To avoid repeating the same import in several different modules in our project, we are going to create a shared MaterialModule. This way, we only need to import the component we need once and we can import this module in any other module that is needed.

To do, we will use Angular CLI to create a new module:

```bash
ng g m app-material
```

We will add any Material module in this module. Let's start with the `MdToolbarModule`:

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdToolbarModule
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

#### Configuring the routes and app.component

Since we create a `home.component`, this is going to be the main Component for the `home.module`. So we need to add the `home.component` in our `HomeRoutingModule`:

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

If we do a `ng serve` and open `http://localhost:4200/` we will be able to see a purple toolbar:

<img src="/images/2017/angular-material-03.png">

Our code now has the following structure:

<img src="/images/2017/angular-material-05.png">

This is the project structure I usually use for my Angular Material projects. Now you can add more components and modules as needed and have fun with Material components!

#### Adding more Material Components to home.component.html

Let's go back to `home.component.html` and enhance our example. Our template should have the following code:

```html
<md-toolbar color="primary">
  <button md-icon-button [mdMenuTriggerFor]="menu">
    <md-icon>more_vert</md-icon>
  </button>
  <span>Angular Material Example</span>

  <md-menu #menu="mdMenu">
    <button md-menu-item>
    <md-icon>dialpad</md-icon>
    <span>Menu 1</span>
  </button>
    <button md-menu-item disabled>
    <md-icon>voicemail</md-icon>
    <span>Menu 2</span>
  </button>
    <button md-menu-item>
    <md-icon>notifications_off</md-icon>
    <span>Menu 3</span>
  </button>
  </md-menu>
</md-toolbar>

<md-card class="example-card">
  <md-card-header>
    <div md-card-avatar class="example-header-image"></div>
    <md-card-title>Angular</md-card-title>
    <md-card-subtitle>Material 2</md-card-subtitle>
  </md-card-header>
  <img md-card-image src="http://loiane.com/images/tags/angular.svg" height="300px">
  <md-card-content>
    <p>
      Material Design components for Angular
    </p>
  </md-card-content>
  <md-card-actions>
    <button md-button>LIKE</button>
    <button md-button>SHARE</button>
  </md-card-actions>
</md-card>
```

We also need to go back to `app-material.module.ts` and add the additional Material components we are using the HTML code above:

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdMenuModule,
  MdCardModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule],
  exports: [
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule
  ]
})
export class AppMaterialModule {}
```

After the changes above, this will be the output in the browser:

<img src="/images/2017/angular-material-04.png">

### Tip: Angular Material VSCode Extension

VSCode has a very good extension to work with Angular Material components.

In the HTML templates we can simply type `md-` and the extension provide code snippets for the components available in angulat material.

This is the extension I use: [Angular Material 2, Flex layout 1, Covalent 1 & Material icon snippets](https://marketplace.visualstudio.com/items?itemName=1tontech.angular-material).

> This extension is also part of the Angular extension package I created to work with Angular projects: [Angular Extension Pack](https://marketplace.visualstudio.com/items?itemName=loiane.angular-extension-pack)

> <i class="mdi mdi-github-circle"></i>  View the full source code [on GitHub](https://github.com/loiane/angular-material-example) or check out the [live demo](https://angular-material-example.firebaseapp.com)

References: 
* [Angular Material 2 docs](https://material.angular.io/components)
* [Angular Material Getting Started Guide](https://material.angular.io/guide/getting-started)

Please let me know in the comments section below if you would like any other tutorial related to Angular Material or Angular. :)

Happy coding!
