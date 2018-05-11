---
layout: post
title: "Angular Tips: Avoiding duplication of RxJS operator imports"
date: 2017-08-01 08:35:12.000000000 -02:00
path: 2017-08-01-angular-rxjs-imports.md
image: /assets/images/2017/angular-rxjs-imports_.jpg
category: angular
---

### Updated post

Update May 2018: since Angular v5, we can use [RxJS Pipeable Operators](https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md), which makes easier to import only the operators needed in the files they are needed. So the original content published in this article can still be used in Angular v5, but needs to be [updated in Angular v6](https://loiane.com/2018/05/upgrading-to-angular-v6/).

As a quick summary regarding the changes in the imports:

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

From

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

Before:

```js
this.http.get('url')
  .do(console.log)
  .map(results => results.data)
  .subscribe(results => {
    console.log('Results', results);
  });
```

After:

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


### Original Content

In this article we will learn how to avoid duplication of RxJS operators imports in your Angular project files.

I love working with RxJS in Angular projects. But I often forget how to import the operators. Some editors such as [VSCode](https://code.visualstudio.com/) provide the capability of [creating and saving your own code snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets), and this helps a lot.

However, when working with Angular, NgRx or Ionic, we create services, providers and effects files and to help us manipulating the data we use RxJS operators. And even using code snippets, we end up repeating the same RxJS operator imports throughout our files.

For this reason, I usually create a RxJS file with the operators used by the project (usually in the shared or common module). You can also create this file directly in the `src/app` directoy.

`src/app/shared/rxjs-operators.ts` - Below is how it looks like:

```js
// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
```

Updated (thanks Maxime for this tip!): Whenever we import a class extension or an operator, it will patch the *Observable* prototype. This means that the operator or extension will be part of the *Observable* class in any part of the application after the import is made. So instead of importing this *operators* file, we need to import it only once.

You can import it directly in you `app.module`:

```js
import './rxjs-operators';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ...
  ],
  providers: [
    // ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Or if you want it, you can import it in the first module or service that will be lazy loaded by your application as well.

In my services and effects files, I only need to import `Observable` (or `BehaviorSubject` or any other Rx class needed). 

This helps me keep the imports section of the files a little bit cleaner, and if a new operator is needed by any file, I just open the common file and add it there.

It also saves me some Kb in the production bundle size!

### What to avoid

Some people like to import RxJS as `import {Observable} from 'rxjs';`

With this code, you do not need to import each operator manually. However, I highly recommend NOT to use this code since it imports the entire RxJS library, and we do not need all RxJS functionalities and operators in our projects.

Happy coding!
