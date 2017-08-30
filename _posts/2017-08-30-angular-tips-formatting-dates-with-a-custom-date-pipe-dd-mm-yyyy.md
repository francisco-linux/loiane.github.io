---
layout: post
title: "Angular Tips: Formatting Dates with a Custom Date Pipe (dd/MM/yyyy)"
date: 2017-08-30 09:35:12.000000000 -02:00
path: 2017-08-30-angular-tips-formatting-dates-with-a-custom-date-pipe-dd-mm-yyyy.md
image: /assets/images/2017/angular-custom-date-pipe.jpg
category: angular
---

In this article we will learn how to create a custom Date Pipe with Angular.

<div class="toc" markdown="1">
* TOC
{:toc}
</div>


## Using Angular default Date Pipe

When working with Angular, we can use the `date` pipe to format a date in the template:

```js
today | date: 'dd/MM/yyyy'
```

The `date` pipe accepts a format (optional parameter) that can be customized as showed in the code above (day/month/year) and we can also use some predefined formats according to the [Angular docs](https://angular.io/api/common/DatePipe#datepipe):

> * 'medium': equivalent to 'yMMMdjms' (e.g. Sep 3, 2010, 12:05:08 PM for en-US)
> * 'short': equivalent to 'yMdjm' (e.g. 9/3/2010, 12:05 PM for en-US)
> * 'fullDate': equivalent to 'yMMMMEEEEd' (e.g. Friday, September 3, 2010 for en-US)
> * 'longDate': equivalent to 'yMMMMd' (e.g. September 3, 2010 for en-US)
> * 'mediumDate': equivalent to 'yMMMd' (e.g. Sep 3, 2010 for en-US)
> * 'shortDate': equivalent to 'yMd' (e.g. 9/3/2010 for en-US)
> * 'mediumTime': equivalent to 'jms' (e.g. 12:05:08 PM for en-US)
> * 'shortTime': equivalent to 'jm' (e.g. 12:05 PM for en-US)

By default, most of the predefined formats support the american date format (month/day/year). 

We can configure the `LOCALE_ID` [token](https://angular.io/api/core/LOCALE_ID) to the language/region our application is being designed for, and when configured, the pipes will also apply the locale settings. In this case, the default date format will change to day/month/year for most of the countries/regions.

Even with the locale config in place, using `date: 'medium'` or `date: 'dd/MM/yyyy'` everywhere in the application is not the best scenario (IMHO) because we have the same code in several places. 

Suppose the user or the client changes the requirenment, and instead of `dd/MM/yyyy` the application needs to use `dd/MMM/yyyy` to display the month name (with 3 chars) instead of the month number. We need to search all files and apply the changes to all date formats. That's not the best option.

## Creating a Custom Date Pipe

To solve this problem, we can create a custom Date pipe:

```js
import { Constants } from './../util/constants';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_FMT);
  }
}
```

I also like to create a Date pipe with the datetime format to display audit information such as `Last Updated Date`:

```js
import { Constants } from './../util/constants';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_TIME_FMT);
  }
}
```

Instead of creating the formatting code ourselves, we can still use the Angular `DatePipe` through inheritance and call its transform method passing the date format we want to use.

Note that I'm also using a `Constants` reference. I usually like to create a `Constants` class with some default project settings:

```js
export class Constants {
  static readonly DATE_FMT = 'dd/MMM/yyyy';
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm:ss`;
}
```

The properties are static, meaning we do not need a class instance to access their values, and they are also read only. This is a very common practice in Java/C# projects, and thanks to TypeScript we can also use it in Angular!

If the default date format needs to be changed, we only need to modify the `Constants` file and the update will be applied automatically in all templates that are using the custom date pipes. 

And to use the custom pipes:

```js
today | dateFormat
today | dateTimeFormat
```

We get the following output:

```bash
30/Aug/2017
30/Aug/2017 10:00:00
```

#### Using moment.js

As an alternative, you can also use [moment.js](https://momentjs.com/) in your project to manipulate dates.

There is also a moment.js pipes for Angular project available with some additional pipes to display date/time: [https://github.com/urish/angular2-moment](https://github.com/urish/angular2-moment)

Happy coding!
