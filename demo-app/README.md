# DemoApp


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

### Update Angular
I updated to the latest version of angular: Version 20.1.2
1. Install npm-check-updates to run the following npm command: npm i -g npm-check-updates
2. Run npm-check-updates with -u, will upgrade package.json file: ncu -u
3. delete the node_modules and package-lock.json
4. run npm install


## To Run the App
npm start then go to http://localhost:4200/

## To Run Frontend + API

From repository root, start API:

```bash
cd API
npm install
npm run dev
```

In a separate terminal, start Angular app:

```bash
cd demo-app
npm install
npm start
```

Frontend: http://localhost:4200/
API: http://localhost:3000/health
## Requirements:
Create an Angular App with the following pages

### Load spinner component TODO
### Sign in component
### Register component
### Catalog component with catalog service to get data
### Users component with user service

## Angular Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
## Troubleshooting packages
npm ls @angular/material @angular/cdk sass
## UI
Chose Azure Blue
Using @angular/material@20.2.14
using css grid and flexbox for layout: look at https://blog.angular.dev/modern-css-in-angular-layouts-4a259dca9127

## Naming Conventions Best Practices: taken from jcoop.io 
1. Components: Upper Camel Case e.g LoadingSpinnerComponent
2. Constants: Basic Camel Casses F2 to rename everywhere: lower camel case
3. All Classes named: Upper Camel Case: e.g CatalogRepositoryService
4. Properties and methods:  Lower Camel Case: e.g  ngOnInit, enroll

## Immutability
Not mutating existing objects in memory but rather creating new objects.
This helps with mutating state bugs

e.g problem here
this.currentUser.classes.push(classId)
This is mutating data in 2 ways
1. Mutating the classes array by adding an object to an existing array
2. And mutating the currentUser object by changing the contents of the classes property of the currentUser object

So change the above code to 
```
this.currentUser = { ...this.currentUser, classes: this.currentUser.classes.concat(classId)}

```
The concat creates a new array

Another example
```
this.currentUser.classes = this.currentUser.classes.filter((c: string) => c != classId);

```
This code is still changing the currentUser.classes array
So change to
```
this.currentUser = {
     ...this.currentUser, 
     classes: this.currentUser.classes.filter((c: string) => c !== classId) 
     };

```
put on separate lines for readability

The third example comes from a Save function
Here is the original code
```
saveUser(user: IUser): Observable<IUser>{
    user.classes = user.classes || [];
    this.currentUser = user;

    return EMPTY.pipe(delay(1000));
}

```

So this is not mutating the existing currentUser variable, it's actually replacing its value, 
it opens us up to a potential mutation value from outside this function.
It is pointing our currentUser variable to the same user object in memory that is passed in.
So if the code that calls this saveUser method were to change it's local user object after calling saveUser,
it could actually change our currentUser object here!  That could lead to a pretty hard to find bug and
may mess up change detection if you are going to use a more advanced type of change detection such as onPush
To avoid this, lets change the saveUser function

```

saveUser(user: IUser): Observable<IUser>{
    user.classes = user.classes || [];
    this.currentUser = { ...user, classes: [...classes] };

    return EMPTY.pipe(delay(1000));
}

```

## Small Functions
Functions should be no longer than 5 - 10 lines.  If they are long, refactor

e.g
```
applyFilter(filter: string) {
    if (!filter) {
      this.visibleClasses = this.classes;
      return;
    }

    if (filter === 'GEN') {
      this.visibleClasses = this.classes.filter(c =>
        !c.course.courseNumber.startsWith('CH') &&
        !c.course.courseNumber.startsWith('PO') &&
        !c.course.courseNumber.startsWith('SP'));
    } else {
      this.visibleClasses = this.classes.filter(c => c.course.courseNumber.startsWith(filter));
    }
  }

```

Change to 
```

applyFilter(filter: string) {
    if (!filter) {
      this.visibleClasses = this.classes;
      return;
    }

    if (filter === 'GEN') {
        this.onlyShowGeneralCourses();
    } else {
      this.visibleClasses = this.classes.filter(c => c.course.courseNumber.startsWith(filter));
    }
  }

private onlyShowGeneralCourse(){
     this.visibleClasses = this.classes.filter(c =>
        !c.course.courseNumber.startsWith('CH') &&
        !c.course.courseNumber.startsWith('PO') &&
        !c.course.courseNumber.startsWith('SP'));
}
```

## User Strict mode
see tsconfig.json file

```
"compilerOptions" : {
    ...
    "strict": false,  <=  this should be set to true
},
"angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }

```

@Input error
```
export class AccountMenuComponent{
    @Input() user;
    showMenu: boolean;
}
```

Set this to
```
   @Input() user: IUser | null = null;  // this is setting to null if no user is passed in
   showMenu: boolean = false;
```


## 4 types of Modules
1. Routing Module - Routes, Angular Routing Imports
2. Core Module - not recommended anymore: Shared Singleton services, App-level components
3. Shared Module - Shared components, directives, pipes
4. Feature Module - Feature level folders: Feature-level components, directives, and pipes

## Typescript
Members are public by default.  Put the public first

## Lifecycle Hooks
Component Implements the lifecycle hooks

e.g.
```
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
...

export class CatalogComponent implements OnInit

...

ngOnInit(){
    ...
}

ngOnChanges(changes: SimpleChange){

}
```


## Why use Angular
The nice thing about Angular is the ability to use Custom Components that encapsulate functionality
and are symantically expressive.  e.g.  LoadingSpinner

## Angular Services

1. Making services Injectable
2. Angular Injectors and providing services


In almost all cases, a singleton service in the root injector is what you typically want to create.
Here is an example of a service set up as a singleton.

```

@Injectable({
  // Any other value is not allowed after Angular 14-15
  providedIn: 'root' // tell Angular to provide this service at the root level
  providedIn: 'platform' // used when you have multiple angular applications on a single page

  // In some less common cases when you actually do want to provide a service 
  // from a module instead of using the providedIn attribute, 
  // you can set this to null or you can just leave it undefined by not defining the providedIn.
})

```
So in summary, Most of the time we will use the root for the providedIn in the @Injectable and this is best practice
## Using services for data retrieval
Use a service/repository

## Lazy Loading

This is a performance win!
Example: When an app is first loaded, buttons that do other stuff...  The data is not loaded until the user goes to that page
thru like a navigation button.  Lazy Loading
Requirements
1. Must be in its own feature module.  E.g. sign in and register of users.

Lets look at the routing module.  for the Users page it should look like this

```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent, },
  {
    path: 'users',
    // This lets Angular know that we want to load child routes from another module. 
    // And we'll set this to an arrow function. 
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
Now our users module needs a users.routing modulea
Create users.routing.component.ts file

```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }


```


## Deploying Production Builds
Build and deploy to production web server
Production builds are now the default in angular

npm run build // so no --prod flag
Creates a dist/ folder: this folder is optimized for production and is what you would copy and deploy to a production web server

If you want to test out and simulate a production web server
Simulate running this in a production web server by installing a simple web server with npm

Install http-server:  http‑server package is a very simple little web server.
npm install -g http-server

To run:
http-server dist/demo-app  // spins up app running on port 80

Go to localhost:8080/catalog

Look at how much data is downloaded compared to running on the dev server
Performance Best Practices





## Monitoring Bundle Sizes
Another Performance best practice
When you build an Angular application is built, it is packaged up into packages called bundles or chunks, which are downloaded to the browser when someone navigates to your website.
The size of these bundles can be a huge contributor to performance degradation of your application. 
 It is a best practice to put something in place that proactively monitors these bundle sizes. Thankfully, Angular has some built‑in tooling to help us monitor our bundle sizes and either provide a warning or an error if any of the bundles get too big.

look at the output when you run **npm run build**
Get report of the chunks, that were created and how big each of them are. It also shows us how much will need to be downloaded on the initial load or when the user first navigates to our website, as well as how big each of our lazily‑loaded modules are.  
So if I open up my Angular JSON file, down here in this build section, you can see this budget section. 
```
...
"configurations": {
            "production": {
              "budgets": [ // this budget section
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          ...


```

This allows us to set size budgets for our production builds. 
And inside here, you can see that there are two budgets that have been created by default 
by the Angular CLI, an initial bundle size budget and an AnyComponentStyle budget. 
These two budgets are defining warning and error levels based on the size of our initial bundle 
and the size of any single components styles. 

So looking at our initial bundle budget, you can see this maximumWarning setting, 
which is set to 500kb by default. 
This setting will generate a warning during the production build process if the initial bundle size ever exceeds 500 KB. 
And it will generate an error and completely fail to build if our initial bundle size exceeds 1 MB. 

Our initial bundle size is currently 305 KB, so let's set a more aggressive warning budget for this. Let's change it to 320 KB instead, which is about a 5% increase over our current size. 
All right, now, let's see what happens when we exceed that. 
To demonstrate that, I'm going to install a library by the name of Lodash, which provides some functions for working with arrays among other things. 

So I'll install this with npm install lodash, and then we'll need to install the types for that too, so I'll npm install @types/lodash. 

Okay, now with that installed, let's come over to our UserRepositoryService, and let's import the concat function from lodash. 

All right, now, down here in our enroll function, you can see that we're using JavaScript built‑in concat function right here to append a classId, the classes array. Let's use the Lodash concat function instead. 
I'll call concat here, which is the Lodash concat function we just imported, and we'll pass in the classes and the classId. 

```
...
import { concat } from 'lodash';
...

// In enroll function, use concat
change 
this.currentUser = { ...this.currentUser, classes: this.currentUser.classes.concat(classId) }
to 
this.currentUser = { ...this.currentUser, classes: concat(this.currentUser.classes, classId) }

```
So this is now doing the exact same thing that we were doing before with the built‑in JavaScript concat function, but we're using Lodash instead. Again, this isn't necessary. I'm just doing this to demonstrate what happens when we exceed our initial bundle size budget. All right, so now let's do an npm run build. And when that finishes, you can see we got a couple of warnings here. This first one, you could ignore that. This is just saying Lodash isn't really that compatible with Angular. I wouldn't really use this library with Angular anyways. The one we care about is this second warning right here that says bundle initial exceeded maximum budget, telling us that our budget was 320 KB and our initial bundle exceeded that by 57 KB. We are now a total of 377 KB in size. So this is awesome, and it was as simple as just simply modifying the budget in the config. Now, let's see what happens if we change the error threshold, so instead of 1 MB, I'm going to set this to 350 KB, which is still smaller than our current bundle size. So now if I run an npm run build, then you can see that we're still getting our warning, but more importantly, we got an actual build error. So our application actually failed to build. This is really useful for automated build pipelines so your automatic build can fail at a certain size, which is sure to be noticed. 

Accidentally growing your application by unexpectedly large amounts is really easy to do if you don't monitor your application size. 

So the best practice is to create budgets that are appropriate for your application and **monitor the results in your build pipeline**

Now, before we wrap this up, I just wanted to mention that there are a few different types of budgets that we can create. 
We just learned about the initial bundle size budget, and there's also this anyComponentStyle budget, which will be triggered if the CSS styles for any single component is larger than the budgets specified here. 
But you can also create budgets for a specifically named bundle by specifying bundle here and adding a name property which is set to the name of the bundle that you would want to monitor. Or you can also create an allScript budget to monitor the size of the JavaScript for your entire application. So if all of the JavaScript for your application exceeds these budgets, then you'll get a warning. 

And then you can also specify all, and this is a budget to monitor the size of your entire application. 

And then lastly, you can create an any budget to ensure that no single file of any type exceeds this budget. And we'll go ahead and change this back to anyComponentStyle. But there is another way that you can monitor these rather than specifying a size. So for example, for our initial bundle budget, I could say I want a warning if the app grows by more than 5% and an error if it grows by more than 10%. But for this to work, we need a baseline size. So I can add a baseline property and I could set that to, for example, 305 KB, which was our current initial bundle size before we added Lodash. So now if the initial bundle ever becomes 5% or 10% bigger than this baseline 305 KB, I would then receive the corresponding warning or error message. But however you decide to monitor your application, as a best practice, make sure you set reasonable budgets that will alert you if your application grows in ways that you determine excessive in order to keep your application performing well.

## Immutability and OnPush change detection
In most cases there will not be a need for OnPush change detection
Best practice: avoid unless  you absolutely need it

To understand OnPush change detection, it's helpful to first understand how Angular's change detection works. If we take a look at this Catalog page, we have bindings for every one of these fields, and we can see the bindings for those fields in the template over here. And if we go back to that page, we can click on each of these buttons, and Angular's change detection detects those clicks and the corresponding changes caused by the click and then updates the view. 
So how does it do that? Well, **Angular taps into all low‑level events, such as click and mouseover**, and asynchronous events, such as JavaScript's setTimeout function, or API calls, etc. 
Whenever Angular detects one of these events, it checks every one of these bindings to see if they've changed, which means it has to check all of the properties on every one of these Course objects for every row in this table. 

And it has to reevaluate these bindings, even if just one item changes. 
Angular can do this very quickly, so this number of bindings with the amount of data we're working with in this app is totally manageable. 
And really, Angular can handle tens of thousands of checks pretty quickly. 

But if you have some crazy page that really needs to do this, or even more likely if reevaluating some of these bindings is a little costly, say you have to do an expensive calculation to generate the value for one of these bindings, in that case, you would really only want to reevaluate your bindings when it's totally necessary. 

This is where OnPush change detection comes in, and you can turn it on at the component level. 
So over in our CatalogComponent, up here in the Component's metadata, I can add a changeDetectionProperty and set that to ChangeDetectionStrategy.OnPush, and I can just import ChangeDetectionStrategy from @angular/core. 

```

@Component({
  styleUrls: ['./catalog.component.css'],
  templateUrl: './catalog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

```
With OnPush change detection, Angular will only do comparisons to object references, not to every one of the object's properties. 

In addition, instead of change detection firing for every browser event, OnPush detectors only fire when input references change or when an async observable fires an event, and in a few other cases. This is oversimplifying things a little bit, but change detection is a whole topic of its own and beyond the scope of this course. 
It is helpful to know about OnPush change detection and to have an idea of the scenarios where it may be useful to use it. 
It is a little painful to use though, because it has all sorts of side effects that can be difficult to manage, so definitely don't just go using it everywhere. As a best practice, you should only use it when you find it necessary. But if you have a component that is having performance issues and you determine that change detection is causing an expensive expression to be reevaluated too frequently, you may want to look into OnPush change detection.
 And when you do, you'll find that using immutability in your code becomes important because, as we mentioned, Angular will look at object reference changes, not object property changes. 
 So when you want to actually change something in the view, you need to be sure Angular notices it by changing the object reference, not just by mutating its properties, so another good reason to use immutability an Angular. 
 So be aware of OnPush change detection, you won't typically need it, but it's there if you do. In the next clip, we're going to take a look at performance considerations when using pipes.


## Pure vs impure pipes

Performance considerations when creating your own custom pipes:

Sorting in a grid
Creating a custom order-by-pipe
1. Create a sorting pipe that takes in a field
2. Add to catalog-module.ts, under declarations, add OrderByPipe
3. In catalog-component.html: Add a (click) event to Professor Header: 
```
    <th (click)="<th (click)="orderByField = 'professor'">Professor</th> = 'professor'">Professor</th>

```
4. On catalog-component.ts, add orderByField property
```
   orderByField: string = '';

```
5. Use on ngFor
```
<tbody>
      <tr *ngFor="let class of visibleClasses | orderBy:orderByField">
      ...
```
Note: Pipes are pure by default, meaning they don't work with data mutation.
They only get reevaluated if the actual object reference changes of the object that the pipe is being applied to. 
But we're not changing the visibleClasses array.
We're changing a property on an object in that array. 
So there are a couple of ways that we could fix this. 
The easiest and dirtiest way is just to make this pipe impure. 

on order-by-pipe.ts
```
@Pipe({
  name: 'orderBy',
  pure: false // big performance issue
})

``` 
We can do that up here in the Pipe's metadata by setting pure to false. 
And now if we come back over here and sort our list, now I'm going to rename this professor here. 
Notice this is the Monday, Wednesday, Friday, Intro to Potions class. 
Now when I rename it, there we go, it worked. 

Sorting can be a fairly expensive operation, and making this **pipe impure** can cause it to be evaluated many times. 

**the best recommendation is just to sort the data in your component code and don't use a pipe for things like sorting.**

Use a pure pipe using Immunability

Use the below code
We're now using immutability to set visible classes to a new array where the first object in the array is the first class from the visible classes array, 
but with the professor changed to Lucarion and then all of the rest of the classes. 
```
// add updateFirstProfessor button

  mutateFirstProfessor() {
    this.visibleClasses[0].professor = "Lucarion";
  }

  updateFirstProfessor() {
    this.visibleClasses = [
      { ...this.visibleClasses[0], professor: "Lucarion" },
      ...this.visibleClasses.slice(1)
    ];
  }

```

Set pipe to pure


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
