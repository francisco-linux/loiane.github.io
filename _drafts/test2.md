---
layout: post
title: "."
date: 2018-08-03 08:35:12.000000000 -02:00
path: 2017-08-04-angular-reactive-forms-trigger-validation-on-submit
image: /images/2017/angular-reactive-forms-validate-submit-02.png
tag: angular
---

In this article we will learn 2 different approaches of validating all form fields when user clicks on submit button for Angular Reactive Forms.

<div class="toc" markdown="1">
<span class="gamma">Table of contents</span>
{:.no_toc}
* TOC
{:toc}
</div>

> <i class="mdi mdi-github-circle"></i>  Want the code? Go [straight to GitHub repo](https://github.com/loiane/angular-reactive-forms-validate-submit) or view the [live demo](https://ng-forms-fields-validation.firebaseapp.com/)

When working with forms we have 2 options: the first one is to disable the submit button if the form is invalid (meaning there is at least one invalid field) and the second option is to validate the form before the HTTP POST action is executed by the code and display a message to the user to fix any pending errors. Let's take a look at these 2 scenarios in the following sections.

### Creating the project with Angular CLI

Before we get started, if you want to code along with this tutorial, we need to generate a new Angular project with Angular CLI](https://github.com/angular/angular-cli):

```bash
ng new angular-reactive-forms-validate-submit --routing
```

For this example, I'm using the [Bootstrap](getbootstrap.com) (v3) framework. So we also need to install Bootstrap. Change the directory to the project we created (`cd angular-reactive-forms-validate-submit`) and execute the following command:

```bash
npm install bootstrap --save
```

Next, we also need to add the Bootstrap CSS file in our project. To do so, open `angular-cli.json`, locate the `styles` section and add the Bootstrap css import:

```json
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "styles.css"
]
```

Since we will not use any Bootstrap component that requires JQuery integration, our setup is completed. 

> In case you do need to use any component such as accordion, modal popup, datepicker, and so on, I recommend installing [ngx-bootstrap](http://valor-software.com/ngx-bootstrap/#/) (for Bootstrap v3 and v4) to make your life easier!

#### Creating the components

Next, we are going to use Angular CLI to create the components for this example:

```bash
ng g c simple-form
ng g c validate-fields-submit-form
ng g c submit-flag-form
ng g c field-error-display
```

With the command above we created 4 different components:

* `simple-form`: first example with the submit button disabled;
* `validate-fields-submit-form`: second example that will trigger the validation of all fields when submit button is clicked;
* `simple-form`: third example that will flag the atempt of submitting the form
* `field-error-display`: a presentational component to help us displaying the fields validation errors messages.

Since this is a very simple example, we will not create any lazy loading modules.

> Using the `ng g c` command from Angular CLI to generate the components, the `app.module.ts` will be automatically updated with the `declarations` of the components created.

#### Editing the app.component

In the `app.component.html` we will add 3 navigation links for the examples we will develop during this tutorial:

```html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" routerLink="">Angular Forms Fields Validation</a>
    </div>
    <ul class="nav navbar-nav">
      <li routerLinkActive="active">
        <a routerLink="/simpleForm">Simple Form</a>
      </li>
      <li routerLinkActive="active">
        <a routerLink="/validateSubmit">Validate on Submit</a>
      </li>
      <li routerLinkActive="active">
        <a routerLink="/submitFlag">Submit Flag</a>
      </li>
    </ul>
  </div>
</nav>

<div class="container">
  <router-outlet></router-outlet>
</div>
```

#### Configuring the router

And at last, we also need to configure the router config with the components we created and referenced in the `app.component.html` nav links. Open `app-routing.module.ts` and edit the `routes` const:

```js
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'simpleForm', component: SimpleFormComponent },
      { path: 'validateSubmit', component: ValidateFieldsSubmitFormComponent },
      { path: 'submitFlag', component: SubmitFlagFormComponent }
    ]
  }
];
```

The project basic structure is now completed and we can start coding our examples!

### Disable the submit button if form is invalid

The first option we have when working with forms is to disable the submit button if the form is invalid. This approach is OK for very small forms such as login forms, where we only have 2 fields (user/email and password). It is easy for the user to guess it is needed to inform both fields before the submit button becomes available:

<img src="/images/2017/angular-reactive-forms-validate-submit-01.png">

Let's take a look at the code that renders the form above.

`simple-form.component.ts`:

```js
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styles: []
})
export class SimpleFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }
}
```

In the code above we have an Angular Reactive Forms with only 2 fields: `email` and `password` and both are required.

Now let's take a look at the `simple-form.component.html` code:

```html
<form class="form-horizontal" [formGroup]="form">

  <div class="form-group">
    <div class="col-sm-12">
      <label for="email" class="control-label">Email</label>
      <input type="text" id="email" class="form-control" formControlName="email">
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-12">
      <label for="password" class="control-label">Password</label>
      <input type="password" id="password" class="form-control" formControlName="password">
    </div>
  </div>

  <button type="submit" class="btn btn-primary" [disabled]="!form.valid">
    Submit
  </button>

</form>
```

The submit button will only be enabled if the form is valid (`[disabled]="!form.valid"`), meaning the email must be informed (and also must be a valid email) and the password also must be informed.

Please note that in this form we do not have any visual indication that the `email` and `password` fields are required. We also do not display any validation error message. So the user have to guess that something is missing before the submit button is enabled.

However, specially when working with enterprise projects, we have forms with lots of fields. And this approach is not appropriate. Let's take a look at a different approach in the next example. 

### Trigger validation of all fields on submit

Let's develop a new form with some more fields. For this example, we will work on the `validate-fields-submit-form.component`:

```js
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-validate-fields-submit-form',
  templateUrl: './validate-fields-submit-form.component.html',
  styles: []
})
export class ValidateFieldsSubmitFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        street: [null, Validators.required],
        street2: [null],
        zipCode: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        country: [null, Validators.required]
      })
    });
  }
}
```

For this form we have `name`, `email` and a set of `address` fields. Note that the fields related to the address are grouped under the form control named `address`. 

Now let's see the code for the template `validate-fields-submit-form.component.html`:

```html
<form class="form-horizontal" [formGroup]="form">

  <div class="form-group" [ngClass]="displayFieldCss('name')">
    <div class="col-sm-12">
      <label for="name" class="control-label required">Name</label>
      <input type="text" id="name" class="form-control" formControlName="name">
      <app-field-error-display [displayError]="isFieldValid('name')" errorMsg="Please inform your name">
      </app-field-error-display>
    </div>
  </div>

  <div class="form-group" [ngClass]="displayFieldCss('email')">
    <div class="col-sm-12">
      <label for="email" class="control-label required">Email</label>
      <input type="text" id="email" class="form-control" formControlName="email">
      <app-field-error-display [displayError]="isFieldValid('email')" errorMsg="Please inform your email">
      </app-field-error-display>
    </div>
  </div>

  <div formGroupName="address">

    <div class="form-group">

      <div class="col-md-6" [ngClass]="displayFieldCss('address.street')">
        <label for="street" class="control-label required">Address</label>
        <input type="text" id="street" class="form-control" formControlName="street">
        <app-field-error-display [displayError]="isFieldValid('address.street')" errorMsg="Please inform your address">
        </app-field-error-display>
      </div>

      <div class="col-md-3">
        <label for="street2" class="control-label">Address 2</label>
        <input type="text" id="street2" class="form-control" formControlName="street2">
      </div>

      <div class="col-md-3" [ngClass]="displayFieldCss('address.zipCode')">
        <label for="zipCode" class="control-label required">Zip Code</label>
        <input type="text" id="zipCode" class="form-control" formControlName="zipCode">
        <app-field-error-display [displayError]="isFieldValid('address.zipCode')" errorMsg="Please inform your zipCode">
        </app-field-error-display>
      </div>

    </div>

    <div class="form-group">

      <div class="col-md-4" [ngClass]="displayFieldCss('address.city')">
        <label for="city" class="control-label required">City</label>
        <input type="text" id="city" class="form-control" formControlName="city">
        <app-field-error-display [displayError]="isFieldValid('address.city')" errorMsg="Please inform your city">
        </app-field-error-display>
      </div>

      <div class="col-md-4" [ngClass]="displayFieldCss('address.state')">
        <label for="state" class="control-label required">State / Province / Region</label>
        <input type="text" id="state" class="form-control" formControlName="state">
        <app-field-error-display [displayError]="isFieldValid('address.state')" errorMsg="Please inform your state">
        </app-field-error-display>
      </div>

      <div class="col-md-4" [ngClass]="displayFieldCss('address.country')">
        <label for="country" class="control-label required">Country</label>
        <input type="text" id="country" class="form-control" formControlName="country">
        <app-field-error-display [displayError]="isFieldValid('address.country')" errorMsg="Please inform your country">
        </app-field-error-display>
      </div>

    </div>
  </div>

  <button class="btn btn-primary" (click)="onSubmit()">Submit</button>
  <button class="btn" (click)="reset()">Reset</button>

</form>
```

Since we are using Boostrap classes in our project, each `form-group` is a row of our form. For the fields we want to occupy an entire row we can use the class `col-sm-12` (part of the Bootstrap grid CSS). For the fields we want a more complex layout (street, street2 and zipCode), we wrap the fields in a `form-group` div and we can use `col-md-6`, `col-md-3` and so on to set the width that each field will ocuppy (just remember that the sum of the col-md-X needs to be 12). The address fields are also wrapped in a div `<div formGroupName="address">` so the reactive control group can be linked to the HTML template form as well.

The template above will render the form below:

<img src="/images/2017/angular-reactive-forms-validate-submit-02.png">

#### Displaying the required field asterisk (*)

To display the red asterisk in each field using Bootstrap styles, we can use the following CSS:

```css
.control-label.required:after { 
  color: #d00;
  content: "*";
  position: absolute;
  margin-left: 5px;
  top:7px;
}
```

Then, in the labels of the required fields we can add the class `required` along with the Boostrap label class `control-label`.

#### Displaying Bootstrap validation styles

Boostrap 3 has built in [validation styles for form fields](https://getbootstrap.com/css/#forms-control-validation). 

For error styles, it consists in adding `has-error` class along with `form-group` class. We can also add icons by adding the class `has-feedback`.

For this example, we will consider a field has validation error when the field is not valid and it has been touched.

We can use Angular `ngClass` directive to display the validation styles in our form fields:

```html
<div class="form-group" 
  ngClass="{
      'has-error': !this.form.get('name').valid && this.form.get('name').touched,
      'has-feedback': !this.form.get('name').valid && this.form.get('name').touched
  }">
```

Now imagine doing this for all 7 fields of our small form? We are going to repeat a lot of code.

So, we are going to create some helper functions in our `ValidateFieldsSubmitFormComponent` (you can also have a Helper or Util class in your project with these functions so you do not repeat the code in all your form components):

```js
isFieldValid(field: string) {
  return !this.form.get(field).valid && this.form.get(field).touched;
}

displayFieldCss(field: string) {
  return {
    'has-error': this.isFieldValid(field),
    'has-feedback': this.isFieldValid(field)
  };
}
```

And in our HTML template we simply call `displayFieldCss` passing the name of the form control (field):

```html
[ngClass]="displayFieldCss('name')"
```

Just remember that if you have nested controls you need to pass the complete path of the control:

```html
[ngClass]="displayFieldCss('address.street')"
```

##### Displaying the validation error message

To display the validation error message of each field

### Source code and live demo

> <i class="mdi mdi-github-circle"></i>  View the full source code [on GitHub](https://github.com/loiane/angular-reactive-forms-validate-submit) or check out the [live demo](https://ng-forms-fields-validation.firebaseapp.com/)

References: 
* [Angular Reactive Forms docs](https://material.angular.io/components)

Happy coding!
