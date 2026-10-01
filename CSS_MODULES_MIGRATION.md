# CSS Modules migration

## Pass 9A — safe pilot

The migration starts with the self-contained Projects Lady love/hearts interaction.

- `src/components/Projects/ProjectsLady.module.scss` now owns the hearts layout, animation and mobile positioning.
- `ProjectsLady.tsx` consumes the module class while retaining the legacy semantic class temporarily for compatibility with route-specific styles.
- The migrated hearts rules were removed from the global `src/styles/components/lady/_projects.scss` partial.

This is intentionally incremental. The current global stylesheet contains historical cross-section overrides and responsive selectors, so moving an entire section in one pass would risk visual regressions. Once this pilot is visually verified, the next step is to migrate Projects component-by-component, then About, Tech, Contact, and finally Home/Header while shrinking `master.scss` to reset/fonts/tokens/theme/shared primitives.
