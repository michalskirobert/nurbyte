# Asset architecture

`public/assets` contains runtime assets only. Historical/unused variants are intentionally not kept here.

## Lady

- `characters/lady/header/` – header-specific lightweight sprite.
- `characters/lady/shared/` – canonical interaction sprites shared by Projects and 404.
- `characters/lady/contact/` – normalized Contact sprites.

Lady PNG sprites were converted to lossless WebP, preserving transparency while reducing source/deployment size.

## Other assets

- `backgrounds/` – desktop section backgrounds.
- `backgrounds/mobile/` – mobile section backgrounds.
- `characters/` – hero character artwork.
- `decor/` – shared scene/parallax artwork.
- `projects/` – project screenshots.
- `brand/` – brand assets used by the site/mail flow.

Generated caches/build artifacts (`.next`, `*.tsbuildinfo`, Yarn install state) are not source assets and should not be shipped in source archives.
