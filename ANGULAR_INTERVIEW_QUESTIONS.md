# Angular Interview Questions and Answers

## Core Angular Fundamentals

1. What is Angular, and how is it different from AngularJS?
	Answer: Angular is a modern TypeScript-based framework for SPAs with components, DI, RxJS, CLI tooling, and AOT support, while AngularJS is the older 1.x JavaScript framework based on controllers and digest cycle.

2. What are the key building blocks of an Angular application?
	Answer: Components, templates, directives, services, dependency injection, routing, forms, and reactive data flow with RxJS and/or signals.

3. What is a standalone component, and how does it differ from NgModule-based architecture?
	Answer: A standalone component has `standalone: true` and imports dependencies directly, which removes the need to declare it in an NgModule and usually reduces boilerplate.

4. What is the role of `main.ts` in an Angular app?
	Answer: It is the app entry point that bootstraps the root component or root module and wires core app-level providers.

5. What is the difference between interpolation, property binding, and event binding?
	Answer: Interpolation prints values into text, property binding sets DOM or component properties, and event binding listens to events and executes handlers.

6. What is two-way data binding and how is it implemented in Angular?
	Answer: It keeps UI and model synchronized, usually with `[(ngModel)]`, which is shorthand for property + event binding.

7. What are directives in Angular? Explain the differences between structural and attribute directives.
	Answer: Directives add behavior to templates; structural directives change DOM shape (for example `*ngIf`, `*ngFor`) while attribute directives modify behavior/style of existing elements (for example `ngClass`).

8. What does `*ngIf` do under the hood?
	Answer: It expands into an `ng-template` and conditionally creates or destroys embedded views in the DOM.

9. What is the difference between `*ngIf` and `[hidden]`?
	Answer: `*ngIf` adds/removes elements from the DOM, while `[hidden]` only toggles visibility and keeps elements in the DOM.

10. What is `*ngFor`, and how can `trackBy` improve performance?
	Answer: `*ngFor` repeats a template for each item in a list, and `trackBy` gives stable identities so Angular reuses DOM nodes instead of recreating them.

## Components and Templates

11. What is the lifecycle of an Angular component?
	Answer: Typical hooks are `ngOnChanges`, `ngOnInit`, `ngDoCheck`, `ngAfterContentInit`, `ngAfterContentChecked`, `ngAfterViewInit`, `ngAfterViewChecked`, and `ngOnDestroy`.

12. When would you use `ngOnInit` vs `ngAfterViewInit`?
	Answer: Use `ngOnInit` for initialization that does not require view children, and `ngAfterViewInit` when template/view child references must exist first.

13. What are `@Input()` and `@Output()` decorators used for?
	Answer: `@Input()` accepts data from parent to child, and `@Output()` emits events from child to parent.

14. How does component communication work between parent and child components?
	Answer: Parent to child uses inputs; child to parent uses output events; for deeper trees, use shared services or state stores.

15. What are template reference variables?
	Answer: They are local template identifiers (for example `#searchBox`) used to reference DOM elements, directives, or component instances.

16. What is content projection, and how does `ng-content` work?
	Answer: Content projection lets a parent pass markup into a child layout slot, and `ng-content` is the placeholder where projected content is rendered.

17. What is `ViewChild` and when should you use it?
	Answer: `ViewChild` gets a reference to a child component/directive/element from the component view, useful for focused imperative interactions.

18. What is the difference between `ChangeDetectionStrategy.Default` and `OnPush`?
	Answer: Default checks frequently for many triggers, while `OnPush` limits checks mainly to input reference changes, events, async emissions, and manual marks, improving performance.

19. How does Angular change detection work at a high level?
	Answer: Angular runs checks to compare template bindings against current values and updates the DOM when values differ.

20. What is the purpose of `ng-container` and `ng-template`?
	Answer: `ng-container` groups template logic without adding a DOM node, and `ng-template` defines deferred or conditional template content.

## Dependency Injection and Services

21. What is dependency injection in Angular?
	Answer: It is a pattern where Angular creates and supplies required dependencies instead of classes constructing them directly.

22. What is the injector hierarchy in Angular?
	Answer: Angular has nested injectors from root to feature/component scopes, allowing either shared singletons or scoped instances.

23. What is the difference between providing a service in `root` vs in a component?
	Answer: Root provides one app-wide singleton; component providers create per-component-subtree instances.

24. What are singleton services in Angular?
	Answer: Services with one shared instance across the app, commonly configured with `providedIn: 'root'`.

25. What is the purpose of `InjectionToken`?
	Answer: It provides a DI token for non-class dependencies such as config objects, interfaces, and primitive values.

26. What are multi providers and when do you use them?
	Answer: Multi providers allow multiple values for one token (for example HTTP interceptors), and Angular injects them as an array.

27. What is the difference between a service and a repository layer in frontend architecture?
	Answer: A service often contains business/UI orchestration, while a repository focuses on data access and mapping from API contracts.

28. How do you share state between unrelated components using services?
	Answer: Keep shared state in an injectable service using observable/signal APIs so components subscribe/react to a single source of truth.

29. What is the benefit of using interfaces/models in service responses?
	Answer: They give type safety, editor autocomplete, clearer contracts, and easier refactoring and testing.

30. How do you handle API errors in a service?
	Answer: Use RxJS `catchError`, map technical errors to user-meaningful errors, log where appropriate, and rethrow typed domain errors.

## Routing

31. How does Angular Router work?
	Answer: It matches URL paths to route configurations and renders the mapped component in the router outlet.

32. What is lazy loading, and why is it important?
	Answer: Lazy loading loads feature code on demand, reducing initial bundle size and improving first paint and startup times.

33. What is the difference between `loadChildren` and eager loading?
	Answer: `loadChildren` loads route chunks only when needed, while eager loading includes features at initial app load.

34. What are route guards and what types are available?
	Answer: Guards control navigation with checks like `CanActivate`, `CanDeactivate`, `CanMatch`, and `CanActivateChild`.

35. What is the difference between `CanActivate` and `CanLoad` (or `CanMatch` in newer versions)?
	Answer: `CanActivate` blocks route activation after matching; `CanLoad`/`CanMatch` can prevent matching/loading lazy routes before activation.

36. What are route resolvers and when should you use them?
	Answer: Resolvers fetch required data before route activation, useful when a page should render with data ready.

37. How do query params differ from route params?
	Answer: Route params are path segments that identify resources, while query params are optional URL key/value options for filters and state.

38. How do you navigate programmatically in Angular?
	Answer: Inject `Router` and call `navigate` or `navigateByUrl`, optionally passing params and navigation extras.

39. What is wildcard routing and where should it be placed?
	Answer: A wildcard route (usually `**`) catches unknown URLs and should be the last route definition.

40. How can you preserve or merge query parameters during navigation?
	Answer: Use `queryParamsHandling: 'preserve'` or `queryParamsHandling: 'merge'` in navigation extras.

## Forms

41. What is the difference between template-driven forms and reactive forms?
	Answer: Template-driven forms are directive-driven in templates, while reactive forms define explicit form models in TypeScript.

42. Why are reactive forms often preferred in enterprise applications?
	Answer: They are more explicit, testable, scalable, and better for dynamic forms and complex validation logic.

43. How do you build a form with `FormBuilder`?
	Answer: Inject `FormBuilder` and define controls/groups with initial values and validators using `group`, `control`, and `array`.

44. How do you add synchronous and asynchronous validators?
	Answer: Pass sync validators as the second control argument and async validators as the third argument or in options.

45. How do you create a custom validator?
	Answer: Create a function returning `ValidationErrors | null` and attach it to controls or groups as needed.

46. What is a `FormArray`, and when should you use it?
	Answer: `FormArray` manages a dynamic list of controls/groups when item count is unknown at compile time.

47. How do you set vs patch values (`setValue` vs `patchValue`)?
	Answer: `setValue` requires all controls to be provided, while `patchValue` updates only specified controls.

48. How do you detect form value/status changes?
	Answer: Subscribe to `valueChanges` and `statusChanges` observables on controls or groups.

49. How do you disable/enable controls programmatically?
	Answer: Call `disable()` and `enable()` on controls or groups, optionally controlling event emission.

50. How do you display user-friendly validation messages?
	Answer: Show messages conditionally based on `touched/dirty` plus specific error keys, and centralize message mapping for consistency.

## RxJS and Async Patterns

51. What is an Observable, and how is it different from a Promise?
	Answer: Observables can emit multiple values over time and be cancelled/unsubscribed, while promises resolve once.

52. What are common RxJS operators used in Angular apps?
	Answer: `map`, `tap`, `filter`, `debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`, `forkJoin`, and `combineLatest` are common.

53. What is the difference between `switchMap`, `mergeMap`, `concatMap`, and `exhaustMap`?
	Answer: `switchMap` cancels previous inner streams, `mergeMap` runs concurrently, `concatMap` runs in order, and `exhaustMap` ignores new triggers while active.

54. Why is `switchMap` commonly used for HTTP search/autocomplete?
	Answer: It cancels stale requests when new input arrives, so results stay aligned with the latest user input.

55. What is the purpose of `BehaviorSubject` vs `Subject`?
	Answer: `BehaviorSubject` stores and replays the latest value to new subscribers; `Subject` only emits future values.

56. How do you avoid memory leaks with subscriptions?
	Answer: Prefer `async` pipe, and in code use `takeUntil`, `takeUntilDestroyed`, or complete finite streams.

57. What does the `async` pipe do, and why is it preferred in templates?
	Answer: It subscribes/unsubscribes automatically and updates the view safely, reducing manual subscription logic.

58. What is `takeUntil`, and how is it used with component destruction?
	Answer: It completes a stream when a notifier emits, often tied to a destroy signal to auto-clean subscriptions.

59. How do you combine multiple HTTP calls with RxJS?
	Answer: Use `forkJoin` for one-time parallel completion, or `combineLatest` for continuously combining latest values.

60. How do you handle retry and fallback logic in streams?
	Answer: Use `retry`/`retryWhen` for transient failures and `catchError` for graceful fallback values or domain errors.

## HTTP and Interceptors

61. How do you make HTTP calls in Angular?
	Answer: Inject `HttpClient` and call methods like `get`, `post`, `put`, and `delete`, returning typed observables.

62. What is the purpose of `HttpClientModule` / `provideHttpClient`?
	Answer: They register Angular HTTP services and features like interceptors in the dependency injection system.

63. What are HTTP interceptors in Angular?
	Answer: Interceptors are request/response middleware for cross-cutting concerns such as auth, logging, errors, and retries.

64. How would you implement an auth token interceptor?
	Answer: Read token from an auth service, clone request with `Authorization` header, and handle auth errors centrally.

65. How do you implement global error handling for HTTP requests?
	Answer: Use an interceptor to map HTTP errors, emit user notifications, log details, and optionally redirect for auth failures.

66. How do you cancel an ongoing HTTP request?
	Answer: Unsubscribe from the observable or use cancellation patterns like `switchMap` and `takeUntil`.

67. What is the difference between `tap`, `map`, and `catchError` in HTTP chains?
	Answer: `tap` performs side effects, `map` transforms values, and `catchError` handles and recovers or rethrows errors.

68. How do you strongly type HTTP responses in Angular?
	Answer: Use TypeScript generics with `HttpClient` methods (for example `http.get<UserDto[]>`) and map to domain models.

69. How do you handle loading indicators for concurrent requests?
	Answer: Track active request count in an interceptor/service and show loader while count is greater than zero.

70. What are best practices for API service abstraction?
	Answer: Keep services focused by domain, centralize request concerns, use typed contracts, and avoid leaking transport details into components.

## Performance and Architecture

71. What causes unnecessary re-rendering in Angular apps?
	Answer: Mutable object updates, expensive template calls, missing `trackBy`, broad change detection, and overuse of impure pipes.

72. How does `trackBy` help list rendering performance?
	Answer: It lets Angular identify unchanged items and reuse existing DOM nodes during list updates.

73. How do you optimize large Angular applications?
	Answer: Use lazy loading, `OnPush`, memoized selectors/computed values, optimized lists, smaller bundles, and profiling-driven changes.

74. What are pure and impure pipes?
	Answer: Pure pipes run when input references change; impure pipes run every change detection cycle.

75. When should you avoid using pipes in hot paths?
	Answer: Avoid expensive or impure pipes in frequently checked, large, or deeply nested template sections.

76. What is code splitting in Angular, and how is it achieved?
	Answer: It splits app code into chunks loaded on demand, mainly via lazy loaded routes and dynamic imports.

77. How do you analyze bundle size in Angular?
	Answer: Build with production stats and inspect chunk reports with bundle analysis tools to locate large dependencies.

78. What are common anti-patterns in Angular architecture?
	Answer: Fat components, duplicated business logic, tight API coupling in UI, mutable shared state, and weak boundaries between layers.

79. How do you organize a scalable folder/module structure?
	Answer: Group by feature/domain, keep shared and core concerns separated, and enforce clear boundaries between UI, state, and data access.

80. What is the role of smart/container vs dumb/presentational components?
	Answer: Smart components orchestrate data and actions; presentational components focus on rendering and emitting UI events.

## Testing

81. What testing tools are commonly used in Angular projects?
	Answer: Angular TestBed, Jasmine/Jest, Karma or modern runners, and Playwright/Cypress for end-to-end flows.

82. How do you unit test a component with TestBed?
	Answer: Configure a testing module, create component fixture, trigger change detection, and assert rendered output and behavior.

83. How do you mock dependencies in Angular tests?
	Answer: Provide test doubles with `useValue`/`useClass`, and spy on methods for controlled behavior.

84. How do you test services that use `HttpClient`?
	Answer: Use `HttpClientTestingModule` or `provideHttpClientTesting`, issue requests, and verify responses with test controller APIs.

85. What is `HttpTestingController` and how do you use it?
	Answer: It captures outgoing HTTP requests in tests so you can assert URL/method/payload and flush mock responses.

86. How do you test async code with `fakeAsync` and `tick`?
	Answer: Wrap test in `fakeAsync`, execute async logic, and advance virtual time with `tick`/`flush` to assert outcomes deterministically.

87. What is the difference between unit tests and integration tests in Angular?
	Answer: Unit tests isolate one unit with mocks; integration tests validate collaboration among multiple real units.

88. How do you test route guards and resolvers?
	Answer: Call them with mock router/auth/data dependencies and assert returned booleans, UrlTrees, or resolved data streams.

89. What should be covered in component tests vs end-to-end tests?
	Answer: Component tests cover rendering and interactions in isolation; end-to-end tests cover critical user journeys across the full app.

90. How do you make Angular tests reliable and maintainable?
	Answer: Keep tests deterministic, avoid timing flakiness, use clear fixture setup helpers, and test behavior over implementation details.

## State Management

91. When is local component state enough, and when do you need a global store?
	Answer: Local state is enough for isolated UI concerns; use global state when many features share data, workflows, and caching rules.

92. What are popular state management options in Angular?
	Answer: Component services with RxJS/signals, NgRx, NGXS, Akita, and lightweight custom patterns.

93. What is NgRx, and what problems does it solve?
	Answer: NgRx is a Redux-style ecosystem that centralizes state changes, improves predictability, and supports scalable side-effect handling.

94. What are actions, reducers, selectors, and effects in NgRx?
	Answer: Actions describe events, reducers compute new state, selectors read derived state, and effects handle async side effects.

95. What are common pitfalls when introducing NgRx too early?
	Answer: Over-engineering small apps, too much boilerplate, and team overhead without enough state complexity to justify it.

96. How would you manage cached API data in Angular?
	Answer: Cache in service/store with TTL or invalidation rules, and expose cached observables/selectors to avoid repeated fetches.

97. How do you handle optimistic updates in UI state?
	Answer: Update UI immediately, call API, and rollback or reconcile state if the request fails.

98. What is the difference between mutable and immutable updates?
	Answer: Mutable updates change existing objects; immutable updates create new references, which is safer for predictable change detection.

99. How do selectors improve performance and maintainability?
	Answer: Selectors centralize state queries, enable memoization, and prevent duplicated filtering/transformation logic.

100. How would you decide whether to use NgRx in a small project?
	Answer: Evaluate shared state complexity, team familiarity, and future scale; if state is simple, prefer service-based state first.

## Security and Best Practices

101. How does Angular help protect against XSS?
	Answer: Angular escapes and sanitizes untrusted values by default in templates based on security context.

102. What is sanitization in Angular templates?
	Answer: It removes or neutralizes potentially dangerous content before rendering in HTML, URL, style, or script-sensitive contexts.

103. When should `DomSanitizer` be used carefully?
	Answer: Only when you must trust known safe content and have validated it, because bypass methods can disable Angular protections.

104. How do you store and handle JWT tokens securely in a frontend app?
	Answer: Prefer short-lived tokens, secure refresh flow, least-privilege scopes, and avoid exposing tokens broadly in client-side storage logic.

105. What are common frontend security mistakes in Angular apps?
	Answer: Bypassing sanitization casually, trusting client-side role checks alone, logging secrets, and weak token/session handling.

106. How do you protect routes based on authentication and roles?
	Answer: Use guards for auth/role checks and also enforce authorization on the backend because frontend checks are not sufficient alone.

107. How do environment files work in Angular builds?
	Answer: Angular build configurations replace environment files per target (development, production, and so on) at build time.

108. What is Ahead-of-Time (AOT) compilation?
	Answer: AOT compiles templates during build, improving startup performance and catching template errors earlier.

109. What is tree shaking and why does it matter?
	Answer: Tree shaking removes unused code from bundles, reducing download size and improving load performance.

110. What coding standards and linting practices would you enforce in an Angular team?
	Answer: Enforce strict TypeScript, Angular ESLint rules, formatting consistency, small focused components/services, and automated CI checks.

## Angular 16+ / Modern Angular Focus

111. What are Angular Signals, and how do they compare to RxJS-based state?
	Answer: Signals are synchronous reactive primitives for local state and derived values, while RxJS is stream-oriented and stronger for async/event composition.

112. What are computed signals and effects?
	Answer: `computed` derives values from signals with memoization, and `effect` runs side effects whenever tracked signal dependencies change.

113. How does signal-based change detection differ from zone-based updates?
	Answer: Signals can trigger fine-grained updates from explicit dependencies, while zone-based change detection often checks broader component trees.

114. What are standalone APIs (`bootstrapApplication`, standalone components, etc.)?
	Answer: They are modern Angular APIs that allow bootstrapping and composing apps without NgModules as the primary composition unit.

115. What are functional route guards/interceptors and why use them?
	Answer: They are function-based forms of guards/interceptors that are concise, tree-shakable, and use `inject()` directly.

116. What does `inject()` do, and when is it preferable to constructor injection?
	Answer: `inject()` retrieves dependencies from the current injection context and is useful in functional APIs and utility helpers.

117. How do you migrate from NgModule-heavy code to standalone components?
	Answer: Migrate feature by feature, convert components to standalone, move imports to component level, and keep routing/providers compatible during transition.

118. What improvements in recent Angular versions impact performance most?
	Answer: Better build pipeline, standalone architecture, signal-based patterns, and continued hydration/SSR improvements are the major wins.

119. How does server-side rendering (SSR) work in Angular today?
	Answer: Angular can render routes on the server for faster first content and SEO, then hydrate on the client for full interactivity.

120. What would your strategy be for upgrading an Angular app across major versions?
	Answer: Upgrade incrementally with `ng update`, resolve deprecations each step, run tests/builds continuously, and verify critical flows before release.

## Behavioral / Practical Interview Prompts

1. Describe a production bug you fixed in an Angular app and how you diagnosed it.
	Answer: A strong answer explains how you reproduced the bug, inspected logs/network/state, found root cause, implemented a minimal fix, added tests, and prevented regression.

2. Tell me about a time you improved performance in a component-heavy screen.
	Answer: Mention profiling baseline metrics, then concrete changes such as `OnPush`, `trackBy`, memoized selectors/computed values, and measured improvement after release.

3. Explain a situation where you refactored a service or module structure.
	Answer: Describe pain points (duplication/tight coupling), the new boundaries (feature-based layers), migration strategy, and measurable maintainability gains.

4. How do you approach introducing tests into a legacy Angular codebase?
	Answer: Start with high-risk business paths, add characterization tests first, refactor safely in small steps, and increase coverage around changed code.

5. Describe how you handle disagreements on architecture choices in a frontend team.
	Answer: Present trade-offs with data, align on constraints, run a small proof of concept if needed, and agree on a documented decision.

6. Walk through how you would design a catalog page with filtering, pagination, and caching.
	Answer: Keep filters in URL query params, separate presentation/data layers, debounce/filter requests, cache results by query key, and restore state on navigation.

7. How would you implement authentication flow end-to-end in an Angular app?
	Answer: Use secure login, token/refresh strategy, auth interceptor, route guards, backend authorization checks, and logout/session-expiry handling.

8. How do you ensure accessibility in Angular UI components?
	Answer: Use semantic HTML, keyboard navigation, focus management, ARIA only when needed, sufficient contrast, and automated plus manual accessibility testing.

9. If your app becomes slow after adding new features, what is your debugging workflow?
	Answer: Reproduce with profiling, isolate hot paths, inspect change detection and network waterfalls, optimize bottlenecks, and compare before/after metrics.

10. How do you mentor junior developers in Angular best practices?
	Answer: Pair regularly, review PRs with clear rationale, share patterns and checklists, and grow ownership through incremental tasks and feedback loops.

## Tips For Practice

- Practice each answer out loud in 60 to 90 seconds.
- Add one real project example to each core topic answer.
- For behavioral prompts, use STAR: Situation, Task, Action, Result.
- Emphasize trade-offs and why you chose a solution.
- Review latest Angular release notes before interviews.
