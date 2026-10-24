# Design services · 24 October 2026

## Scope

Two bilingual service pages: UI/UX and 3D design. The 3D page covers 2D/SVG plans, whiteboxes, native 3ds Max and Blender scenes, browser exports, Three.js interactions and animation, and site-plan review.

## Design reference lock

Primary target: existing Login AI service page and StyleX tokens. Preserve the current light/dark surfaces, red actions, typography, container width and service sections. Add a quiet two-column image block with uncropped plans and original interior aspect ratios. Sources: user-provided supplied apartment examples and existing Login AI pages; Refero copywriting/craft guidance for concrete labels, keyboard access and image context. Live Refero research was unavailable (subscription inactive). This is an addition to the existing design, not a visual redesign.

## Content evidence

Service scope derives from the user's archviz-3dsmax skill, the reviewed supplied apartment files and the explicit request for Blender and Three.js. No invented sales lift or client metrics. Static renders are identified as static. A 3D viewer, a 360 tour and a construction drawing are distinct deliverables.

## Pricing assumptions

The user requested our own RUB estimate. These are authored planning rates, not a claimed market average or binding quote. The existing calculator shows a non-binding range. Standard scope includes two consolidated review rounds; source quality and unique layouts affect the final quote.

- UI/UX: structure/concept RUB 20,000–35,000 + RUB 8,000–12,000 per unique screen, minimum five screens (RUB 60,000–95,000). Product complexity scales screen effort by 1.5. Interview research +20,000–40,000; an extended design system +30,000–60,000.
- 2D: RUB 5,000–8,000 per unique apartment layout up to 80 m².
- 3D whitebox with top view and editable source: RUB 25,000–40,000. Two interior views for one object +14,000–24,000.
- Model plus a base Three.js viewer: RUB 120,000–192,000. Room navigation +40,000–70,000; material switching +20,000–40,000; one short camera sequence +30,000–60,000.
- Complex geometry/larger apartments: separate quote after source review. Several similar units may share geometry and viewer code; bulk quotes are reviewed individually. Site plans and configurators with business logic are outside this apartment estimator.
- Development hosting, third-party licences, furniture libraries and external integrations are separate. One-time calculators disable the platform's support subscription option.

The calculator starts with five UI/UX screens or one apartment layout included; the quantity field adds screens/layouts beyond that base. Selecting another 3D format ignores add-ons that belong to the previous format.

## Public comparisons consulted

Accessed 24 October 2026. Prices describe different scopes and are not directly interchangeable.

- [PIXONA UX/UI](https://pixona-studio.ru/uslugi/ux-ui): from RUB 9,000 per screen.
- [YuSMP](https://yusmpgroup.ru/services/ui-ux-dizayn): landing design from RUB 60,000; larger websites and products priced separately.
- [Webmotor 3D plans](https://webmotor.ru/services/flat-plan-3d): apartment top-view examples around RUB 18,000–28,000 depending on room count.
- [Romapa configurators](https://it.romapa.ru/uslugi/konfigurator): RUB 100,000–300,000 with a different source-code delivery policy.
- [Ilya Kolesov Three.js](https://ilyakolesov.ru/razrabotka-saytov/immersivnye-sayty/3d-sayty): interactive scene work from RUB 120,000.

## Portfolio sources and placeholders

The 3D examples use resized copies of user-supplied apartment plans, whitebox top view and three interior renders. Public captions and filenames omit project names.

The UI/UX section deliberately contains a text placeholder: real interface work will be provided later. The UI/UX cover is a neutral wireframe illustration, not a claimed client project.

## Responsive checks

The hero uses an in-flow grid overlay, stronger mobile contrast and an icon above the heading on phones. The calculator result stays in flow on small screens and remains sticky on desktop; it no longer covers the gallery or form controls. Stepper fields expose their included-scope hints.

All implementation lives in the separate Desktop/login-ai-services checkout. Source apartment files remain unchanged.
