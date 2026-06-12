# Angular Interview Model Answers (Top 30)

Use these as baseline answers, then personalize with your own project examples.

## 1) What is Angular, and how is it different from AngularJS?
**Angular is a TypeScript-based, component-driven framework for building single-page applications.**  
AngularJS (1.x) was JavaScript-based and used a very different architecture (controllers, `$scope`, digest cycle). Modern Angular has better tooling, stronger typing, improved performance, RxJS integration, and a structured CLI ecosystem.

## 2) What are the key building blocks of an Angular app?
The core building blocks are components, templates, directives, services, dependency injection, routing, and forms. In modern Angular, standalone components can be the primary unit instead of NgModules.

## 3) What is a standalone component?
A standalone component is a component declared with `standalone: true`, so it can directly import other components/directives/pipes without being declared in an NgModule. It reduces boilerplate and makes feature boundaries clearer.

## 4) Explain interpolation vs property binding vs event binding.
Interpolation (`{{value}}`) renders values into template text. Property binding (`[prop]="value"`) sets DOM/component properties. Event binding (`(event)="handler()"`) listens to user or DOM events.

## 5) What is two-way data binding in Angular?
Two-way binding combines property and event binding so UI and model stay in sync, commonly with `[(ngModel)]`. Under the hood, it is syntactic sugar for one input + one output event.

## 6) What are structural vs attribute directives?
Structural directives change DOM structure (add/remove elements), e.g., `*ngIf`, `*ngFor`. Attribute directives change appearance/behavior of existing elements, e.g., `ngClass`, `ngStyle`.

## 7) What is the Angular component lifecycle?
Typical sequence: constructor, `ngOnChanges` (if inputs change), `ngOnInit`, `ngDoCheck`, `ngAfterContentInit`, `ngAfterContentChecked`, `ngAfterViewInit`, `ngAfterViewChecked`, and `ngOnDestroy`. `ngOnDestroy` is where cleanup should happen.

## 8) `ngOnInit` vs `ngAfterViewInit`?
Use `ngOnInit` for initialization that does not require rendered child views. Use `ngAfterViewInit` when you need access to `ViewChild`/template elements that exist only after the view is initialized.

## 9) What are `@Input()` and `@Output()`?
`@Input()` passes data from parent to child. `@Output()` exposes events from child to parent via `EventEmitter`. Together, they provide explicit parent-child communication.

## 10) How does dependency injection work in Angular?
Angular resolves dependencies from injector trees. Classes request dependencies (usually via constructor), and Angular provides instances based on provider configuration. This improves testability and loose coupling.

## 11) Provide service in `root` vs component?
`providedIn: 'root'` creates a singleton shared app-wide. Providing in a component creates a new instance scoped to that component subtree, useful for local state isolation.

## 12) What is Angular Router and why use lazy loading?
Angular Router maps URLs to components. Lazy loading defers loading feature code until needed, reducing initial bundle size and improving first load performance.

## 13) Route params vs query params?
Route params are part of the path and usually identify resources (e.g., `/users/42`). Query params are optional key-value pairs for filtering/sorting/pagination (e.g., `?page=2&sort=name`).

## 14) Template-driven forms vs reactive forms?
Template-driven forms are simpler and template-centric, good for small forms. Reactive forms are model-driven, explicit, and more scalable for complex validation, dynamic controls, and testing.

## 15) Why are reactive forms common in enterprise apps?
They provide predictable state, strong composability, easier unit testing, and support for complex scenarios like dynamic form generation and custom synchronous/asynchronous validation.

## 16) What is an Observable vs Promise?
A Promise emits one value once and completes. An Observable can emit multiple values over time, supports cancellation, and has rich operator composition (RxJS), making it ideal for UI streams.

## 17) `switchMap` vs `mergeMap` vs `concatMap` vs `exhaustMap`?
`switchMap` cancels previous inner stream when a new source value arrives. `mergeMap` runs inner streams concurrently. `concatMap` queues them sequentially. `exhaustMap` ignores new source emissions while one inner stream is active.

## 18) Why use `switchMap` for search/autocomplete?
It cancels stale in-flight HTTP calls when users keep typing, so only the latest input result is processed and displayed.

## 19) `Subject` vs `BehaviorSubject`?
`Subject` emits only future values to subscribers. `BehaviorSubject` stores the latest value and immediately replays it to new subscribers, making it useful for state.

## 20) How do you prevent memory leaks from subscriptions?
Prefer `async` pipe in templates. In code, use patterns like `takeUntil`, `takeUntilDestroyed` (modern Angular), or finite operators (`first`, `take(1)`). Always clean up long-lived subscriptions.

## 21) What is an HTTP interceptor?
An interceptor is middleware for HTTP requests/responses. It is commonly used for auth headers, centralized error handling, logging, retry strategies, and request timing.

## 22) How do you implement auth token handling?
Store token safely (often in memory with refresh flow, with careful fallback strategy), attach `Authorization` header in an interceptor, and handle 401 responses by refreshing token or redirecting to login.

## 23) What is change detection, and `Default` vs `OnPush`?
Change detection updates the view when data changes. `Default` checks broadly; `OnPush` checks mainly on input reference changes, events, async emissions, and explicit marks, improving performance with immutable patterns.

## 24) What is `trackBy` in `*ngFor`?
`trackBy` gives Angular a stable identity for list items, so it reuses DOM nodes instead of recreating all rows. This greatly improves large-list rendering performance.

## 25) What are pure vs impure pipes?
Pure pipes run only when input references change and are faster for most cases. Impure pipes run on every change detection cycle and should be used sparingly due to cost.

## 26) What is NgRx and when should you use it?
NgRx is a Redux-style state management library with actions, reducers, selectors, and effects. Use it when state is complex/shared across many features and you need strong predictability and tooling.

## 27) How does Angular help with XSS protection?
Angular automatically escapes/sanitizes untrusted values in templates based on context (HTML, URL, style). Bypassing sanitization should be rare and only for trusted, validated content.

## 28) What is AOT compilation?
Ahead-of-Time compilation compiles templates at build time, improving startup performance, reducing runtime template parsing, and catching template errors earlier.

## 29) What are Angular Signals?
Signals are reactive primitives for local state (`signal`, `computed`, `effect`) with fine-grained updates. They simplify some state flows and can reduce unnecessary checks compared to broad change detection patterns.

## 30) How would you upgrade Angular across major versions?
Upgrade incrementally (one major at a time), use `ng update`, review breaking changes, run tests/lint/build after each step, migrate deprecated APIs early, and validate performance and critical user flows before release.

## Interview Tip
For each answer, add one real example from your own project. Interviewers usually score practical decision-making higher than textbook definitions.
