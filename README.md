# NurByte — Next.js migration of the accepted HTML master

Source: `NurByte_TECH_Master_v2(3).zip`.

## Scope

This phase migrates the accepted HOME, PROJECTS, ABOUT and TECH sections to:

- Next.js App Router
- React + TypeScript
- split component architecture
- `index.tsx` as each component-folder entry point
- Tailwind CSS available as the primary styling system for new/refactored UI
- the accepted master stylesheet retained temporarily as `src/app/master.css` to preserve the HTML master's exact visual appearance during migration

CONTACT is intentionally not included yet. The themed 404 is also deferred.

## Why `master.css` is still present

The uploaded HTML master contains ~1400 lines of tuned CSS, including responsive rules, pseudo-elements, arcade effects, scene composition, scanlines, and exact asset positioning. Replacing all of it with approximate Tailwind classes in one pass changes the design. This migration first preserves the visual source of truth while moving structure and behavior to React. After visual parity is confirmed, rules can be converted incrementally to Tailwind without redesigning the page.

## Run

```bash
rm -rf .next node_modules .pnp.cjs .pnp.loader.mjs
yarn install
yarn dev
```

`.yarnrc.yml` explicitly uses:

```yaml
nodeLinker: node-modules
```

## v2

Restores the accepted HTML master's HOME pointer/scroll parallax, HOME leaving transition, fireflies, and PROJECTS scroll parallax using React lifecycle-safe effects. Mobile HOME remains protected by the master's <=760px overrides.
