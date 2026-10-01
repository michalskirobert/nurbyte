# NurByte SCSS architecture — Pass 4

## Layers

- `abstracts/` — shared design tokens (`variables`) and reusable mixins.
- `base/` — reset, font contract and scene primitives.
- `atoms/` — smallest reusable UI pieces, currently shared buttons.
- `components/` — header, terminal, content primitives and Lady states.
- `sections/` — Home/Projects/About/Tech/Contact section styling.
- `pages/` — route-only styles. The 404/Lady rules are outside the homepage master bundle.
- `utilities/` — cross-section responsive compatibility and final interaction polish.

## Refactor policy

This pass prioritizes cascade safety: existing rule order is preserved wherever rules remain global. Historical monoliths were split into smaller responsibility-oriented modules without rewriting selectors. Shared runtime colors/font roles remain CSS custom properties; repeated static build-time values live in Sass variables. `base/_reset.scss` already consumes `$page-background` from `abstracts/_variables.scss`.

The next CSS pass can deduplicate historical overrides inside these smaller modules after visual verification. JavaScript should be refactored only after the CSS structure is accepted.
