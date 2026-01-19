---
applyTo: "**/*.ts, **/*.html, **/*.scss"
---
# Angular v20+ Development Guidelines

This file contains custom instructions for GitHub Copilot to ensure consistent code generation that follows Angular v20+ best practices, uses signals for reactive state management, standalone components, and modern control flow syntax.

## Code Examples

Modern Angular 20 component with signals:

```ts
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';


@Component({
  selector: '{{tag-name}}-root',
  templateUrl: '{{tag-name}}.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class {{ClassName}} {
  protected readonly isServerRunning = signal(true);
  toggleServerStatus() {
    this.isServerRunning.update(isServerRunning => !isServerRunning);
  }
}
```

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  button {
    margin-top: 10px;
  }
}
```

```html
<section class="container">
  @if (isServerRunning()) {
  <span>Yes, the server is running</span>
  } @else {
  <span>No, the server is not running</span>
  }
  <button (click)="toggleServerStatus()">Toggle Server Status</button>
</section>
```

When updating a component:
- Put logic in the `.ts` file
- Put styles in the `.css` file  
- Put HTML template in the `.html` file

## Resources

Essential Angular documentation:
- [Components](https://angular.dev/essentials/components)
- [Signals](https://angular.dev/essentials/signals)
- [Templates](https://angular.dev/essentials/templates)
- [Dependency Injection](https://angular.dev/essentials/dependency-injection)
- [Style Guide](https://angular.dev/style-guide)

## Best Practices

### TypeScript

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular

- Always use standalone components over `NgModules`
- Do NOT set `standalone: true` in decorators (default in Angular v20+)
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use `@HostBinding` and `@HostListener` decorators - use `host` object in `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images (not for inline base64)

### Accessibility

- MUST pass all AXE checks
- MUST follow all WCAG AA minimums (focus management, color contrast, ARIA attributes)

### Components

- Keep components small and focused on a single responsibility
- Use `input()` instead of decorators - [learn more](https://angular.dev/guide/components/inputs)
- Use `output()` instead of decorators - [learn more](https://angular.dev/guide/components/outputs)
- Use `computed()` for derived state - [learn more](https://angular.dev/guide/signals)
- Set `changeDetection: ChangeDetectionStrategy.OnPush`
- Prefer inline templates for small components
- Prefer Reactive forms over Template-driven ones
- Do NOT use `ngClass` - use `class` bindings instead - [learn more](https://angular.dev/guide/templates/binding#css-class-and-style-property-bindings)
- Do NOT use `ngStyle` - use `style` bindings instead - [learn more](https://angular.dev/guide/templates/binding#css-class-and-style-property-bindings)
- Use paths relative to the component TS file for external templates/styles

### State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

### Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Do not assume globals (e.g., `new Date()`) are available
- Do not write arrow functions in templates (not supported)
- Use the async pipe to handle observables
- Import pipes when used in templates - [learn more](https://angular.dev/guide/templates/pipes)
- Use paths relative to the component TS file for external templates/styles

### Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
