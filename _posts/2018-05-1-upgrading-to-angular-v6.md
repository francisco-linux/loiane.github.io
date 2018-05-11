---
layout: post
title: "Upgrading to Angular v6: Step by Step"
date: 2018-05-11 12:35:12.000000000 -02:00
path: 2018-05-1-upgrading-to-angular-v6.md
image: /assets/images/2018/angular-v6.jpg
tag: angular
---

Angular v6 was released on May 3rd and now we can focus on upgrading our projects to the new version. In this post I documented my experience and steps upgrading some projects from v5 to v6. Some tips and key differences between projects created with v5 and v6 are also included.

<div class="toc" markdown="1">
{:.no_toc}
* TOC
{:toc}
</div>

### What's new in Angular v6

First things first, Angular team published a detailed summary on what's new in v6 [here](https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4). So before continuing reading this article, I suggest you read the official Angular blog first.

### Upgrading to Angular v6

The best resource with details on how to upgrade to a new Angular version is [https://update.angular.io/](https://update.angular.io/). Even if you are upgrading from v2 to v6, it will list all the breaking changes since v2 to v6! It is a great way to know in details what you need to change in your code.


#### 1: Instaling latest Angular CLI

First step is to make sure you have the latest CLI available:

```bash
npm install -g @angular/cli
```

or (linux and macos)

```bash
sudo npm install -g @angular/cli
```

You should see something like this:

<img src="/assets/images/2018/angular-v6.jpg">

> With the release of Angular v6, the Angular CLI is now also versioned as Angular, meaning until Angular v5, we would use Angular CLI 1.x, and now Angular CLI is also on version 6.x. It makes it much easier!

#### 2: ng update

Needless to say, please do create a branch to update your project, as you'll never now if all dependencies will still work after upgrading to Angular v6.

We can use `ng update -d` or `ng update --dry-run` to check what needs to be updated in our project:

<img src="/assets/images/2018/angular-v6_02.jpg">

So first, we will start with `@angular/cli`. In order for the `ng update` command to work inside the project, we need first to update the `@angular/cli` version to 6.x.

```bash
npm install --save-dev @angular/cli@latest
```

Next, run the `ng update` command for `@angular/cli`, then `@angular/core` and then for the other packages required (`rxjs`, `@angular/material`):

```bash
ng update @angular/cli
ng update @angular/core
ng update @angular/material
ng update rxjs
```

Some project structure files have changed from v5 to v6. There is no `angular-cli.json` anymore, it has been replaced by `angular.json`. The structure of `angular.json` also has changed to support multiple projects per workspace. When we run `ng update @angular/cli` all the required files will be updated!

#### 3: Updating other dependencies

I also like to update the other npm depedencies used by the project during an Angular upgrade. The npm package [`npm-check-updates`](https://www.npmjs.com/package/npm-check-updates) is really helpful for this task.

```bash
npm install -g npm-check-updates
```

Use the command `ncu` to check what packages have updates available. And `ncu -u` to update your `package.json`.

When changing versions of package of `package.json`, I personally also like to delete the `node_module` and run `npm i` again just to make sure the correct versions are availavle locally (and also update `package-lock.json`).

#### 4: Updating RxJS

So, next step now is running `ng serve` to check if everything is ok with the code. Don't forget to verify [https://update.angular.io/](https://update.angular.io/) for all beaking changes. 

Even though we were able to update RxJS code since Angular v5 (with RxJS v5) to use the pipeble operators, in the projects I did the upgrade to v6, I forgot to change a few places. To help us with this task, we can install `rxjs-tslint` to help us removing all deprecated RxJS code.

```bash
npm install -g rxjs-tslint
rxjs-5-to-6-migrate -p src/tsconfig.app.json
```

As a quick summary regarding the imports:

```js
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of;'
```

to:

```js
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
```

Or, if you were not using RxJS pipeble operators yet:

```js
import 'rxjs/add/observable/of';	
import 'rxjs/add/operator/catch';	
import 'rxjs/add/operator/do';	
import 'rxjs/add/operator/map';	
import 'rxjs/add/operator/mergeMap';	
import 'rxjs/add/operator/switchMap';
```

to

```js
import { of } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
```

The following operators were renamed as well:

```js
do -> tap
catch -> catchError
switch -> switchAll
finally -> finalize
```

And in our code, we can start using the [pipeble operators](https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md). 

From:

```js
this.http.get('url')
  .do(console.log)
  .map(results => results.data)
  .subscribe(results => {
    console.log('Results', results);
  });
```

To:

```js
this.http.get('url')
  pipe(
    tap(console.log), // old 'do' operator
    map(results => results.data)
  )
  .subscribe(results => {
    console.log('Results', results);
  });
```

After updating your RxJS code, you might still get errors regarding RxJS from third-party dependencies. To solve this, install [`rxjs-compat`](https://www.npmjs.com/package/rxjs-compat) and once the dependencies have upgraded their code as well, you can remove this package from your project.

```bash
npm install --save rxjs-compat
```
#### 5: Simplifying Dependency Injection for Core Services

A new feature introduced in Angular v6 is called "tree-shakable providers". This means we no longer need to declare services in a module by using the property `providedIn`, and this will allow the services to be tree-shakable, meaning if they are not being used, they will not be part of the prod bundle.

```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyCoreService { }
```

I applied this feature in all core services (global scope) of my projects, but I'm still using non tree-shakable providers with services that do not have global scope.

This allowed to clean up the `providers` section from `CoreModule`.

For more information about tree-shakable providers:

* [Angular docs](https://angular.io/guide/dependency-injection#tree-shakable-providers)
* [More reference links](https://twitter.com/bradlygreen/status/993892134557179904)

#### 6: Updating Angular Material (optional)

If you are using Angular Material in your project, don't forget to run `ng update @angular/material` to update the material dependencies.

A breaking change from v5 to v6 is how we import the Material modules in our project:

From:

```js
import {
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdMenuModule,
  MdCardModule
} from '@angular/material';
```

To:

```js
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
```

Now each module has its own package. This is also one of the reasons I like to create a separate module for thrid party imports as already [explained in this article](https://loiane.com/2017/07/getting-started-with-angular-material-2/). It makes much easier to fix imports!

### Some other things...

I do have some projects that were created since Angular v2, and after every major version update, I usually just updated `package.json` and fixed the breaking changes in the code and that was ok.

Since there were some project structure changes in Angular CLI v6, I also decided to migrate a project by creating a brand new project with CLI 6 and copying the `src` folder from the old project to the new project. Below are some of the most impacted changes.

The major difference that had some impact on the code is the `baseUrl: './'` from `tsconfig.json`. With projects created with CLI 1.x (for Angular v4 and v5), this configuration is not there by default (but inside `src/tsconfig.ap.json`). Moving `baseUrl` to the root `tsconfig.json` had an impact on custom paths declared in `tsconfig.json` and also on the path for lazy loading modules.

Before - custom path in `tsconfig.json`: 

```json
paths: {
  "@env/*": ["environments/*"]
}
```

After (single project created with CLI v6):

```json
paths: {
  "@env/*": ["src/environments/*"]
}
```

And the lazy loading modules need to be declared using the relative path:

Before:

```js
{ path: 'home', loadChildren: 'app/home/home.module#HomeModule' }
```

After:

```js
{ path: 'home', loadChildren: './home/home.module#HomeModule' }
```

If you have nested modules, you also need to update them to use relative paths:

Before (`module1-routing.module.ts`):

```js
{ path: 'foo', loadChildren: 'app/module1/module2/module2.module#Module2Module' }
```

After (`module1-routing.module.ts`):

```js
{ path: 'foo', loadChildren: './module2/module2.module#Module2Module' }
```

There were a few changes in the CLI v6 commands as well.

As the majority of my professional applications use Java in the backend, the output folder (`dist`) from `ng build` is configured to a different path. Until CLI 1.x, there was a flag (`output-path -op`) that could be used in the `ng build` command (`ng build -op ../other/path`). With CLI v6, if you need to use a different output path, you need to update `angular.json` and remove the `-op` flag from `ng build`:

```json
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
      "outputPath": "../other/path",
      ...
    }
  }
}         
```

> Please note this is not needed if you upgrade from an existing CLI 1.x project to CLI v6.x using ng update

### References

Hopefully this article might help you migrating your project, and if you find anything else that is relevant, please leave a comment so we can update this article together! :)

* [Angular v6 announcement](https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4)
* [Angular Update guide](https://update.angular.io/)
* [RxJS migration guide](https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md)

Happy coding and happy upgrating!
