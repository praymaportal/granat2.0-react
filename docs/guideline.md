# Granat 2.0 React — Figma Make Guidelines

These guidelines tell Figma Make how to build UI using our design system package `granat2.0-react`.

## Figma Make operating mode (mandatory)

You are generating code from Figma. Treat this as a **fidelity task**, not a "best effort" UI build.

Hard rules:

- **Figma is the source of truth.** Do not guess sizes/variants/typography.
- Use `granat2.0-react` components whenever possible. Do not re-implement them.
- Use **only** our tokens / CSS variables for styling. No hardcoded colors.
- **No inline styles** in JSX.
- **Never paste SVG from Figma** if the icon exists in our library.
- If anything is ambiguous (size/variant/icon name), **ask** instead of guessing.

### Workflow checklist (do this every time)

1) Identify the Figma node(s) you implement. Read exact values:
   - sizes (height/width), paddings, radius, typography (font size/line height/weight), colors, states.
2) Choose the library component(s) first. Only create custom UI if the component is missing.
3) Confirm component API before usage (do not assume defaults):
   - check the installed package types (e.g. `node_modules/granat2.0-react/dist/index.d.ts` or `dist/types`).
4) Set all **visual** props explicitly when they are specified by Figma:
   - `size`, `variant`, `fluid`, `kind`, etc. Do not rely on defaults.
5) Icons:
   - use `<Icon />` and existing icon names; do not paste paths from Figma.
6) Typography:
   - prefer our `.mtsds-*` typography utility classes; if writing CSS manually, set `font-weight` explicitly.
7) Styling:
   - create a local `*.css` file for layout overrides; use our CSS vars; no inline `style={{...}}`.
8) Final self-check before output:
   - sizes match Figma, correct variants, correct icon names, no inline styles, no external UI libs.

## Goal

- Use **only** `granat2.0-react` components whenever they match the requested UI.
- Use **only** our design tokens / CSS variables for colors, spacing, typography, radii, shadows, etc.
- Do **not** introduce other UI libraries, resets, or global styles.
- Treat **Figma as the source of truth** for sizes/variants. Do not guess component sizes.
- If a required component does not exist in our library yet, create a local component, but:
  - keep it minimal and compatible with our patterns,
  - use our CSS variables for all styles,
  - avoid inline styles,
  - follow our BEM-like naming conventions.

## Figma Make workflow (mandatory)

Figma Make must follow this workflow to prevent "guessing" and mismatches with the design system.

### 0) Preflight (before writing any JSX/CSS)

Confirm the package is installed and which version is used:

- Check `package.json` contains `granat2.0-react`.
- If something looks wrong, read: `node_modules/granat2.0-react/package.json`.

### 1) Source of truth for API (before using a component)

Do not invent props or rely on memory. Read the types:

- `node_modules/granat2.0-react/dist/types/index.d.ts`

For each component you use, verify:

- supported `size` values
- supported `variant/tone/kind` values
- what props implement built-in behaviors (e.g. full-width, integrated label, visited behavior)

If a desired prop does not exist, do not guess. Implement minimal local CSS (vars only) and leave a short note.

### 2) Icons workflow (before adding any icon)

- Never paste SVG exports from Figma.
- First, try to use our `Icon` component with an existing icon name.
- If you are unsure whether the icon exists, search in `node_modules/granat2.0-react/icons/` for the icon folder name.
- Only if the icon is truly missing: create a temporary local icon component and document it.

### 3) Figma-to-props mapping (always)

- Measure dimensions in Figma (height/width, typography) and set the matching component props explicitly.
- Do not rely on default sizes/variants when the design specifies them.
- If a component should fill its container, use the component prop that does it (example: `Button fluid`).

### 4) Final check (before answering "done")

Verify:

- correct component variants and sizes
- typography matches (weight is not inherited accidentally)
- icons come from our library
- no inline styles
- no third-party UI libs

## Required imports (always)

1) Import our global styles once at the application entry:

```ts
import 'granat2.0-react/style.css';
```

2) Import components only from the package root (no deep imports):

```ts
import { Button, Input, Checkbox } from 'granat2.0-react';
```

## Theme

- Default theme is **light**.
- Theme can be switched by adding `data-mts-theme` on a top-level wrapper:

```tsx
export function App() {
  return <div data-mts-theme="light">{/* UI */}</div>;
}
```

Do not implement your own theme system.

## Styling rules (strict)

- **No inline styles** in JSX (`style={{ ... }}` is forbidden).
- Prefer library props first. If a visual variant exists as props, use props, not custom CSS.
- If custom layout styles are needed, put them into a local `*.css` file and use classes.
- Use **only CSS variables** from our tokens for colors / backgrounds / typography / radii / shadows:
  - Example: `color: var(--color-text-primary);`
  - Example: `border-radius: var(--radius-16);`
  - Example: `box-shadow: var(--shadow-elevated-1);` (if defined in our tokens)
- Do not hardcode hex colors, rgba, px values (except when there is no token yet).
- If a needed token does not exist, define a **component-scoped CSS variable** (prefixed) and use it:
  - `--gr-<component>-<token-name>: ...;`
  - Keep it local to the component stylesheet.

## Layout and sizing rules (Figma fidelity)

- If a component in Figma is **full width** (fills its container), do not rely on "auto" sizing.
- Prefer component props that implement full-width behavior. Only use custom CSS if the component has no prop.

Examples:

- For `Button`, use `fluid` when a button must stretch to container width:

```tsx
<Button variant="primary" size={52} fluid>
  ОСТАВИТЬ ЗАЯВКУ
</Button>
```

## Typography rules (Figma fidelity)

Do not let typography "accidentally" inherit from parents. This is a common source of bugs
(e.g. text becomes `medium` instead of `regular`).

- Prefer our **typography utility classes** from the design system over hand-written font styles.
- If you must write custom typography CSS, always set `font-weight` explicitly (or use `font: ...` shorthand).

Example for regular body text (14/20) used in many labels/help texts:

```css
/* Prefer this when possible */
.my-text {
  /* 14px / 20px, regular, MTS Compact */
  /* class: mtsds-p4-regular-comp */
}

/* If you write it manually, never omit font-weight */
.my-text {
  font-family: 'MTS Compact', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400; /* required */
  color: var(--color-text-secondary);
}
```

Common mappings (use the matching one from Figma):

- `14/20 regular` -> `.mtsds-p4-regular-comp` (or `font-weight: 400`)
- `14/20 medium`  -> `.mtsds-p4-medium-comp`  (or `font-weight: 500`)
- `12/16 regular` -> `.mtsds-c1-regular-comp` (or `font-weight: 400`)

## Component usage rules

Use these components and patterns by default:

- `Button`: primary/secondary/ghost/blur/negative/disabled, icons, loading/spinner
- `IconButton`: use for icon-only actions; do not rebuild icon buttons manually
- `Icon`: use for all icons; do not embed random SVGs unless the icon is missing in our pack
- `Input`: use for text/password/money/phone/date/time inputs; use built-in props (label/description integrated)
- `Checkbox`: use for boolean/tri-state selection
- `Badge`: use for statuses/chips/labels in UI
- `Card`: use for surfaces/containers and clickable cards
- `Link`: use for links; hover underline is handled by component styles
- `Label` + `Description`: use only when you explicitly need them standalone; otherwise prefer `Input` which already integrates them
- `Spinner`, `Avatar`, `Counter`: use as provided

## Size and variant selection (Figma fidelity)

When implementing a screen from a Figma design:

- Always check the **exact dimensions** in Figma (at least height) before choosing a component size.
- Choose the **matching** size variant from our component props.
- Do not rely on default component sizes. If a component has a `size` prop and the design specifies a size, set it explicitly.
- Do **not** default to the largest size (`xl`, `extra large`, etc.) unless the design matches it.
- If no variant matches the design closely, use the closest one and leave a short note in code
  (or ask for clarification) instead of silently picking a random size.

### Input size mapping (do not guess)

Our `Input` supports these sizes (match by height from Figma):

- `small`  -> height **32**
- `medium` -> height **44**
- `large`  -> height **52**
- `xl`     -> height **72**

Use `xl` **only** when the Figma input height is 72 and the design uses the floating/animated label pattern.

### Input label/description (do not compose manually)

`Input` already **integrates** `Label` and `Description`. When a design shows an input with a label and/or helper/error text:

- Use `Input` built-in props (`showLabel`, `label`, `labelHint`, `showDescription`, `description`, `descriptionState`).
- Do **not** render a separate `<Label />` above `<Input />` to "simulate" a labeled input.

Important for `size="xl"`:

- The label must be **inside** the input (centered) and animates/floats on focus/filled.
- This behavior is part of the `Input` component. You will break it if you place a standalone `Label` above the field.

### Button size mapping (match by height)

`Button` uses a numeric `size` prop which equals the button height in px. Choose the exact height from Figma:

- `24` -> height **24**
- `32` -> height **32**
- `44` -> height **44**
- `52` -> height **52**
- `72` -> height **72**

Icon size inside `Button` is derived from the button size:

- `24` / `32` -> icon **16x16**
- `44` / `52` / `72` -> icon **24x24**

#### Button full-width (do not guess)

If a button in the design stretches to the full container width, use `fluid`.
Do not wrap in random containers or add `width: 100%` unless you must.

### IconButton size mapping (match by height)

`IconButton` uses a numeric `size` prop which equals the control size in px (square). Choose the exact size from Figma:

- `24` -> **24x24**
- `32` -> **32x32**
- `44` -> **44x44**
- `52` -> **52x52**
- `72` -> **72x72**

Icon size inside `IconButton` is derived from the button size:

- `24` -> icon **16x16**
- `32` / `44` -> icon **24x24**
- `52` / `72` -> icon **32x32**

#### IconButton variant selection (do not improvise)

- Pick `IconButton` `variant` by the **exact name** in Figma / design spec.
- Do not "guess" `secondary` vs `secondary-alternate`. If you are unsure, use `secondary` and ask.
- Do not use `secondary-alternate` just because the background is light; check the spec.

#### IconButton icon prop (do not use children)

`IconButton` does **not** accept `children`. It expects the icon via the `icon` prop (and requires `label` for accessibility).

Correct:

```tsx
import { Icon, IconButton } from 'granat2.0-react';

<IconButton
  size={32}
  variant="secondary"
  label="Close"
  icon={<Icon name="cross" size={24} />}
  onClick={handleClose}
/>
```

Incorrect (icon via children; will not render):

```tsx
<IconButton size={32} variant="secondary" label="Close">
  <Icon name="cross" size={24} />
</IconButton>
```

### Checkbox size mapping (match by control size)

`Checkbox` supports only these sizes (match by the checkbox control size in Figma):

- `16` -> **16x16**
- `24` -> **24x24**
- `32` -> **32x32**

### Badge size mapping (match by height)

`Badge` numeric `size` equals badge height in px. Choose the exact height from Figma:

- `16` -> height **16** (no vertical padding)
- `20` -> height **20**
- `24` -> height **24**
- `32` -> height **32**

### Counter size mapping (match by height)

`Counter` numeric `size` equals counter height in px. Choose the exact height from Figma:

- `16` -> height **16**
- `20` -> height **20**
- `24` -> height **24**

`Counter kind="notification"` is a dot (6x6). Use it only when the design shows a notification dot.

### Link size mapping (match by typography)

`Link` numeric `size` maps to typography. Choose it by matching the Figma text style:

- `16` -> `font-size: 12`, `line-height: 16`
- `20` -> `font-size: 14`, `line-height: 20`
- `24` -> `font-size: 17`, `line-height: 24`

Do not omit `size` on `Link` in layouts taken from Figma. The default is `16`, which often mismatches body text.
If the link is part of a sentence/paragraph, its `size` must match the surrounding text.

Example (body text 14/20 => `size={20}`):

```tsx
<p className="mtsds-p4-regular-comp">
  Я даю согласие на обработку <Link href="#" size={20}>согласие</Link>.
 </p>
```

### Spinner size mapping (match by diameter)

`Spinner` supports:

- `16` -> **16x16**
- `24` -> **24x24**
- `44` -> **44x44**

### Avatar size mapping (match by diameter)

`Avatar` numeric `size` equals the avatar diameter in px. Choose the exact size from Figma:

- `24`, `32`, `44`, `52`, `64`, `80`

### Card size mapping (match by paddings and radius)

`Card` uses semantic sizes:

- `size="s"` -> padding **16**, radius **24**
- `size="m"` -> padding **24**, radius **32** by default

For `size="m"`, `radius` can be explicitly set to: **32 / 40 / 48 / 64 / 80** (match Figma).

### Icon size mapping (match by frame size)

`Icon` supports these sizes (match by the icon frame size in Figma):

- `16`, `24`, `32`, `44`

### Icons

- Icons must come from our `Icon` component.
- Icon color must be controlled by CSS `color` (icon uses `currentColor`).
- If an icon is missing in our pack, create a local icon component **only** as a temporary fallback and keep it isolated.

#### Do not paste SVG from Figma

- Never copy/paste SVG paths exported from Figma (e.g. `svgPaths` imports or inline `<svg><path ... /></svg>`).
- If the icon exists in our library, use:

```tsx
import { Icon } from 'granat2.0-react';

<Icon name="close" size={24} />
```

- Only if the icon is truly missing: create a temporary local icon component, keep it scoped, and document it.

## Layout guidance

- Use simple semantic structure and minimal wrappers.
- Prefer CSS Grid / Flexbox for layout.
- Keep spacing consistent with our spacing tokens and variables.

## When a component is missing

If the UI needs a component that does not exist in `granat2.0-react`:

1) Create a new local component (single responsibility).
2) Create a local CSS file and style it via our variables.
3) Do not mimic a third-party library API.
4) Do not add dependencies unless strictly necessary.

Also:

- Keep the API small and prop-driven (match our component style).
- Prefer reusing existing components (`Button`, `IconButton`, `Icon`, `Badge`, etc.) inside your local component.

Example skeleton:

```tsx
// MyWidget.tsx
import './my-widget.css';
export function MyWidget() {
  return (
    <div className="my-widget">
      <div className="my-widget__title">Title</div>
      <div className="my-widget__body">Body</div>
    </div>
  );
}
```

```css
/* my-widget.css */
.my-widget {
  background: var(--color-background-primary);
  color: var(--color-text-primary);
  border-radius: var(--radius-16);
}

.my-widget__title {
  font-family: 'MTS Wide', 'MTS Text', sans-serif;
}
```

## Prohibited (do not do)

- Do not import any other UI library (MUI, Ant, Chakra, Radix, etc.).
- Do not use Tailwind or CSS-in-JS.
- Do not add global CSS resets.
- Do not hardcode colors.
- Do not implement custom hover/active/focus states if our component already provides them.

## Minimal example (preferred)

```tsx
import 'granat2.0-react/style.css';
import { Button, Input, Checkbox } from 'granat2.0-react';
import './app.css';

export default function App() {
  return (
    <div data-mts-theme="light" className="app">
      <Input
        size="medium"
        showLabel
        label="Email"
        placeholder="name@company.com"
      />

      <Checkbox size={24} />

      <Button variant="primary" size={44}>
        Submit
      </Button>
    </div>
  );
}
```
