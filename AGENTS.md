# Icon Pack — Design Language & Redesign Guidelines

## 1. Design identity

The icon pack has its own visual language based on Soft Geometry: a combination of geometric precision, continuous forms, subtle curvature, and human warmth.

The identity is defined by five core qualities:

- Minimal
- Clean
- Technological
- Warm
- Simple

The icons should feel modern, calm, lightweight, approachable, and deliberately designed.

Lucide and Tabler are quality references for clarity, consistency, and usability, not sources to copy. The goal is to establish an independent visual identity rather than reproduce an existing icon library.

Every icon should look like it was designed by the same designer as part of the same system.

## 2. Signature visual language

The signature of the pack is Continuous Soft Geometry.

Build icons using coherent silhouettes, smooth transitions, intentional curves, and balanced negative space.

Prefer:

- Continuous, visually connected forms.
- Smooth and natural geometric transitions.
- Rounded stroke endings and joins.
- Open, breathable compositions.
- Clear and immediately recognizable silhouettes.
- Subtle personality without unnecessary decoration.
- Geometry that feels precise but not mechanically rigid.

Avoid:

- Arbitrary gaps in outlines.
- Decorative cuts and disconnected fragments.
- Excessive rounding that makes every object look like a capsule.
- Generic AI-generated visual patterns.
- Unmotivated asymmetry.
- Unnecessary complexity.
- Decorative sparkles, dots, or additional shapes.
- Repetitive visual tricks applied to unrelated icons.

The identity must emerge from the construction of the icons themselves, not from decorative elements added afterward.

Do not force a signature detail into every icon. Consistency of form is more important than repetition of a visual gimmick.

## 3. The ghost

The ghost is the original symbol and emotional anchor of the icon pack.

Preserve its original silhouette, facial expression, eyes, smile, proportions, curves, and stroke weight.

The canonical ghost must remain in `icons/outline/ghost.svg` and preserve the geometry of the original Android resource `inu_ghost.xml`.

The supplied ghost SVG serves as a visual reference for the pack's personality.

Its character comes from:

- A simple and recognizable silhouette.
- Smooth, continuous curves.
- A balanced combination of geometric and organic forms.
- Minimal but expressive details.
- A friendly personality without excessive playfulness.

Translate these qualities into the rest of the icon pack without literally reproducing ghost-related shapes.

The ghost is a protected exception to the standard stroke width. Do not modify it to enforce global styling rules.

## 4. Geometry and canvas

All icons must use a 24 × 24 coordinate system.

Use `viewBox="0 0 24 24"` and a transparent background.

Keep all visible geometry, including strokes, within the central 20 × 20 safe area, between coordinates 2 and 22.

The safe area defines the maximum bounds, not a mandatory icon size.

- Do not stretch icons to fill the available space.
- Preserve natural aspect ratios.
- Use optical alignment rather than relying exclusively on mathematical centering.
- Balance the perceived size and visual weight of different silhouettes.
- Use geometric primitives where appropriate.
- Allow controlled organic curves when they improve the shape.
- Allow purposeful asymmetry, rotation, and perspective when they improve recognition.
- Avoid excessive coordinate precision and unnecessarily complicated paths.

A simple narrow symbol does not need to occupy the same width as a complex emblem.

## 5. Container-free design

Do not enclose symbols inside circles, squares, rounded rectangles, shields, or other containers unless the container is essential to the meaning or identity of the icon.

The symbol itself should communicate the intended action or concept.

For example:

- Information: a standalone information symbol, without an enclosing circle.
- Help: a standalone question mark unless the context specifically requires a container.
- Add: a standalone plus.
- Close: a standalone cross.
- Clock: a circular face is appropriate because it represents the object.
- Camera: an enclosing body is appropriate because it is part of the object.
- Shield: the enclosing silhouette is part of the meaning.
- Brand marks: preserve enclosing shapes only when they are integral to the brand identity.

Never add a container merely to fill the canvas, increase visual weight, or make an icon appear more complete.

Do not confuse the icon's geometry with the background of its gallery preview.

## 6. Outline style

Outline is the primary and canonical style of the icon pack.

Design and approve all icons in outline before introducing additional styles.

Use the following standard root attributes:

```svg
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="1.5"
     stroke-linecap="round"
     stroke-linejoin="round">
</svg>
```

The standard stroke width is exactly 1.5 units.

- Maintain consistent stroke width across all standard outline icons.
- Do not compensate for visual weight by changing stroke width.
- Adjust geometry, spacing, proportions, and detail density instead.
- Use rounded stroke caps and joins.
- Do not mix filled shapes and outlined shapes.
- Do not create artificial double outlines.
- Avoid overlapping strokes and accidental intersections.
- Keep sufficient space between adjacent lines.
- Preserve readability when the application changes the stroke width.

Rounded joins do not mean that every silhouette must be fully rounded. Preserve meaningful corners, directional changes, and object-specific geometry.

The original ghost is exempt from the standard stroke width.

## 7. Detail and negative space

Icons should be lightweight, spacious, and easy to recognize.

Use the minimum amount of geometry necessary to communicate the intended meaning.

Every detail must serve at least one purpose:

- Recognition.
- Meaning.
- Differentiation.
- Brand identity.

Keep dots that communicate a recognizable feature, such as drive status LEDs,
connector contacts, or a control indicator. Check their spacing at 16 px.

Remove details that do not improve any of these qualities.

However, minimalism must not destroy the identity of a symbol.

Complex icons and recognizable brand marks, such as Anthropic, may retain a higher level of detail when necessary.

Do not simplify complex symbols into generic or unrecognizable shapes merely to match the simplicity of basic interface icons.

Maintain consistent visual weight through composition and spacing rather than enforcing an identical number of paths or details.

## 8. Brand icons

Redesign brand icons using the same visual language as the rest of the pack.

Use the supplied reference or the official brand mark as the source of truth.

Preserve:

- Recognizable silhouettes.
- Characteristic proportions.
- Essential negative spaces.
- Distinctive structural details.
- The relationship between important elements.

Adapt:

- Curvature.
- Stroke construction.
- Detail density.
- Optical scale.
- Internal spacing.
- Geometric transitions.

Brand icons should feel native to the pack rather than look like unrelated logos imported from different sources.

Reinterpret the geometry while preserving the visual archetype. Keep the
six-part woven knot for OpenAI and the leaning monogram for Anthropic.

Do not blindly trace original SVG files.

Do not automatically outline every edge of a filled logo. Reconstruct the symbol as an intentional outline icon while preserving its identity.

Prefer recognizable emblems or monograms over full wordmarks. Preserve the wordmark when the brand cannot be reliably identified without it.

Remove backgrounds, shadows, gradients, presentation frames, and decorative containers unless they are integral to the brand mark.

If a brand cannot be faithfully represented under the outline constraints, create a draft and flag the conflict for review instead of silently introducing a different visual style.

## 9. Icon style architecture

The pack will eventually support three styles:

1. Outline — primary.
2. Solid — secondary.
3. Duotone — future extension.

Only outline is in scope for the current redesign.

Do not generate solid or duotone variants during this phase.

Future variants must be designed from the approved outline geometry.

All styles must preserve the same underlying identity, proportions, semantic structure, optical center, and approximate visual footprint.

Solid variants must be intentionally reconstructed as filled silhouettes, not automatically generated by filling outline paths.

Duotone rules will be defined separately.

## 10. Redesign strategy

Redesign the existing icon pack from scratch.

Existing icons serve as semantic references, not mandatory geometric templates.

Do not limit the redesign to:

- Changing stroke widths.
- Rounding existing corners.
- Normalizing viewBox values.
- Reformatting SVG files.
- Copying equivalent icons from Lucide or Tabler.

Reconsider the construction, composition, silhouette, negative space, and visual hierarchy of every icon.

Preserve the intended meaning and existing identifiers unless a naming change is explicitly approved.

### Phase 1 — Audit

Inspect the existing icon pack, catalog, build scripts, and Android conversion pipeline.

Identify:

- Inconsistent geometry.
- Redundant containers.
- Incorrect visual weight.
- Excessive detail.
- Inconsistent brand adaptations.
- Duplicate or ambiguous concepts.
- Unsupported SVG features.

Do not modify the entire pack during the audit.

### Phase 2 — Reference collection

Create a reference collection of approximately 8–12 representative icons.

Include a mixture of:

- Basic interface symbols.
- Rounded objects.
- Rectangular objects.
- Communication icons.
- Organic shapes.
- Complex brand marks.

Use this collection to establish the visual language before redesigning the rest of the pack.

Keep all proposed icons in `icons/drafts/`.

Do not promote drafts into the production collection before approval.

### Phase 3 — Approval

Present the reference collection together at 16, 24, and 32 px on light and dark backgrounds.

Compare the icons side by side.

Evaluate their geometry, personality, spacing, stroke consistency, recognizability, and visual weight.

Refine the collection until the visual direction is approved.

Treat the approved reference collection as the canonical design standard for all subsequent icons.

Use `settings`, `folder`, `message`, and `shield` in `icons/outline/`
as the canonical geometry references. Match their continuous transitions,
silhouette, spacing, and optical weight across future outline batches.
Use the original `ghost` as the protected reference for warmth and curvature.

### Phase 4 — Full redesign

Redesign the remaining icons in logical groups.

Compare every new icon against the approved reference collection.

Do not introduce a new visual convention without reviewing its impact on the existing system.

Preserve existing production icons until their replacements are approved.

## 11. Naming and catalog

Use short, descriptive names without project-specific prefixes.

Examples:

- `ghost`
- `fonts`
- `chat-header`

Use lowercase Latin letters, numbers, and hyphens.

Assign exactly one semantic category to each icon:

`logos`, `chat`, `media`, `people`, `privacy`, `ai`, `network`, `files`, `settings`, `text`, `arrows`, `numbers`, `money`, `interface`.

Add new categories only when necessary. Update both `src/lib/catalog.js` and the corresponding category key in `catalog.json`.

Maintain each icon's name, keywords, category, and available styles in `catalog.json`.

Approved outline icons belong in `icons/outline/`.

Proposed icons belong in `icons/drafts/`.

Preserve the repository's existing filename and style-resolution conventions. Inspect the catalog and build scripts before changing naming conventions or introducing new style suffixes.

## 12. Android Vector Drawable compatibility

All icons must remain compatible with the project's `svg-to-vector` conversion pipeline.

The converter may silently discard unsupported SVG features.

Do not rely on browser rendering alone to determine whether an SVG is valid for the application.

### Supported elements

- `path`
- `rect`, including `rx` and `ry`
- `circle`
- `ellipse`
- `line`
- `polyline`
- `polygon`
- `g`, exclusively for attribute inheritance

Convert unsupported elements into compatible path geometry.

### Supported attributes

- `d`
- `fill`
- `stroke`
- `stroke-width`
- `stroke-linecap`
- `stroke-linejoin`
- `fill-rule="evenodd"`
- `fill-opacity`
- `stroke-opacity`
- `opacity`
- Geometry attributes required by supported primitive elements

Complex paths and SVG arc commands are allowed.

### Colors

Use only `currentColor` and `none`.

The application controls the final icon color.

Do not rely on multiple colors, opacity effects, or gradients to communicate essential information.

### Forbidden features

- `transform` on any element or group.
- `use`, `defs`, and `symbol`.
- Gradients and patterns.
- `clipPath`, `mask`, and `filter`.
- CSS, classes, and inline style attributes.
- `stroke-dasharray` and `stroke-dashoffset`.
- `stroke-miterlimit`.
- `vector-effect`.
- `mix-blend-mode`.
- `text` and `image`.
- Embedded fonts, raster images, and external resources.
- `clip-rule`.

Apply translation, rotation, and scaling directly to geometry coordinates.

For future filled variants, construct transparent cutouts using `fill-rule="evenodd"` or correctly oriented subpaths.

Always use `viewBox="0 0 24 24"`.

## 13. Visual quality assurance

Review every icon at:

- 16 px
- 24 px
- 32 px

Test on both light and dark backgrounds.

The primary evaluation size is 24 px.

Check:

- Immediate recognition.
- Semantic clarity.
- Optical centering.
- Safe-area compliance.
- Consistent stroke width.
- Balanced negative space.
- Natural proportions.
- Smooth and intentional curves.
- Absence of unnecessary containers.
- Absence of overlapping or visually merged strokes.
- Readability of small details.
- Consistency with the approved reference collection.
- Compatibility with monochrome Android rendering.

An icon is not complete simply because its SVG is technically valid.

Reject icons that feel generic, mechanically generated, excessively decorative, or visually disconnected from the pack.

## 14. Technical validation

Run `bun run check` after modifications.

Resolve all errors.

Resolve warnings related to transforms, gradients, hardcoded colors, and unsupported SVG features before delivery.

After approved changes, run `bun run build` to regenerate `icons.json`.

Commit the generated `icons.json` together with the corresponding approved icon files.

Verify the converted Android Vector Drawable output whenever the conversion pipeline is available.

If a required check cannot be performed, explicitly report it. Do not claim successful validation without executing the relevant check.

## 15. Final design principle

Design the symbol, not its decoration.

Use geometry to communicate meaning, curvature to create warmth, and negative space to maintain clarity.

An icon should be as simple as possible, but as expressive and recognizable as necessary.

The final collection must feel like one coherent, independent visual system — not a mixture of existing icon libraries.
