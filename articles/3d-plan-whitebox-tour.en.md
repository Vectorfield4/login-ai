---
title: "3D plan or 3D tour: three products buyers confuse at the start"
description: "We compare a vector plan, a whitebox and a Three.js scene on five axes: what the buyer sees, what sales does, the inputs, the price of a layout and the scope of a change."
publishedAt: 2026-11-05
draft: false
category: industry
excerpt: "\"3d plan or 3d tour\" - three different products: a 2D SVG plan, a 3D whitebox and a Three.js scene; a 360 tour on panoramas is quoted as its own line. Five axes with named edges, a matrix of price and rework, a verdict by catalogue task."
tags: ["3D plan", "3D tour", "Whitebox", "Archviz"]
relatedServices: ["3d-design", "corporate-websites"]
relatedSolutions: ["real-estate"]
relatedCases: ["construction-3d-sales"]
planNumber: 80
funnel: ToFu
persona: CMO
targetQuery: "3d plan or 3d tour"
---

A buyer opens an apartment card, sees a plan, and calls to find out what the kitchen looks like. The question "3d plan or 3d tour" comes down to three products. The first is a 2D SVG plan, the second a 3D whitebox with a top view and an editable source scene, and the third a browser scene on Three.js. The plan answers "where is the room", the whitebox answers "how much volume", the scene answers "what does it look like from inside". The comparison sits on five axes with both edges named, and the matrix turns them into a verdict by task.

For a CMO the bill comes down to two numbers: the price of one layout in the card and the share of cards with an enquiry. Both are measured before the format is chosen. One layout costs RUB 5,000-8,000 as a 2D plan and up to RUB 192,000 as a model with browser viewing.

## Five axes and their edges

A score appears only where both edges are named: one and five. An axis without edges turns the comparison into a ranking by taste.

1. **What the buyer sees.** Five is a free camera and a material change without a manager; one is a flat plan where rooms read through labels and furniture symbols.
2. **What sales does.** Five is a manager running a tour in the browser and switching a room and a material on the call; one is a picture sent to a messenger and a wait for a reply.
3. **What the job needs as input.** Five is a dimensioned plan and floor areas from the client's schedule; one is that same plan plus a finish schedule, a kitchen and bathroom specification, a material set and a loading budget for target devices.
4. **The price of one layout up to 80 sq m.** Five is RUB 5,000-8,000 for 2D; one is RUB 120,000-192,000 for a model with browser viewing, before add-ons for room switching, material changes and camera movement.
5. **The scope of a change after handover.** Five is a new contour or label in the same vector file; one is a material or camera change that rebuilds materials, the GLB export and the phone check. A vector edit is part of the layout price. The two consolidated rounds are part of the estimate; a paid re-render is a new view or a new camera setup, not a change within the rounds.

The matrix scores the three formats on these edges, one column per format.

## Matrix: plan, whitebox, scene

| Axis | 2D plan | 3D whitebox | Three.js scene |
| --- | --- | --- | --- |
| What the buyer sees | 1 - layout, openings, furniture symbols | 4 - volume, finishes and light from an approved camera | 5 - free camera and material switching |
| Sales | 2 - a picture for chat, deck and print | 4 - top view, cutaway, interior view | 5 - a tour on the call and in the card |
| Input | 5 - a dimensioned plan | 3 - plan and agreed finish scope | 1 - plan, finishes, materials, loading budget |
| Price up to 80 sq m | 5 - RUB 5,000-8,000 | 3 - RUB 25,000-40,000 | 1 - RUB 120,000-192,000 |
| Scope of a change | 5 - a new SVG from the same source | 4 - a re-render of the approved camera | 2 - a rebuild of materials and export |

The input row drives the price spread: a plan and a whitebox are built from a drawing, while a scene also needs a material specification and a loading budget.

## 2D plan: reading the layout

A 2D plan is a vector SVG with readable walls, openings and furniture symbols. You get the source file and a PNG, and you agree which versions carry floor areas and which drop the labels for the website and print. Floor areas come from the client's schedule. The price is RUB 5,000-8,000 for one layout up to 80 sq m.

The plan carries a catalogue: thirty cards on one page, and each one shows where the bedroom is and which way the door opens. A colour change for the site stays a vector edit, so one source file travels to the web, the deck and the brochure.

Volume, light and finishes stay outside the plan. The question "what does the kitchen look like" remains open, and the buyer calls.

## Whitebox: volume and finishes from one camera

The base set is one layout up to 80 sq m, the architectural shell, openings, basic finishes, one top view and an editable scene in MAX or BLEND. Finishes, the kitchen and the bathroom fittings follow the agreed scope, and that same scope limits the two consolidated feedback rounds. The price is RUB 25,000-40,000, and two interior views add RUB 14,000-24,000.

Both rounds are part of the estimate. The camera is approved before the final render: after handover the view is not reshot within the rounds, and that sets the scope of a change.

Sales takes three frames from the whitebox: the top view for the card, the cutaway for the deck, an interior view for the mailing. The showing script on the call stays with the manager because the image is static.

For the browser the whitebox is prepared for export as a separate stage: polygon counts come down, and normals, materials, UV coordinates and texture sizes are checked. A MAX file does not open in a browser, and this preparation belongs to the model block, not to the render.

## Browser scene: a tour and a material change

A browser scene is a separate GLB or glTF model and a viewer on Three.js. A base model with viewing costs RUB 120,000-192,000 for one layout up to 80 sq m. Room switching adds RUB 40,000-70,000, material switching RUB 20,000-40,000, one short camera sequence RUB 30,000-60,000.

The buyer rotates the model, enters a room, changes the finish and the time of day. Zoom and the return to the overview are checked with a mouse and with fingers. The manager runs the same scene on the call and shows the apartment without a site visit.

The article does not set a numeric loading budget: it depends on the devices and is agreed at acceptance. A device below the agreed threshold gets a static image, and motion is reduced by the system setting.

## 360 tour: a different input and a different limit

A single view stays a picture: a tour is rendered as spherical panoramas, and that is a separate stage of the estimate. A tour shows light from fixed capture points, a scene shows geometry with a free camera.

When the panoramas already exist, the tour costs less than a new scene. When they do not, the work starts with panorama rendering, and the estimate grows by that stage.

## Verdict by task

The question the card leaves open decides the format.

A 2D plan covers print and a catalogue of thirty layouts at RUB 5,000-8,000 per drawing: the source is edited without a model. Volume and finishes in a deck come from a whitebox at RUB 25,000-40,000 plus RUB 14,000-24,000 for two views. A self-serve tour and a material change on the site come from a scene at RUB 120,000-192,000 plus RUB 40,000-70,000 for room switching and RUB 20,000-40,000 for material switching. Light from fixed capture points with ready panoramas comes from a 360 tour.

For a CMO the verdict reads through two numbers: the price of one layout and the share of cards with an enquiry. A format that answers the buyer's question lifts that share, while calls stay a follow-up and are counted separately.

## Case: three presentations from one drawing

The formats work together. In a [residential developer case](https://loginai.ru/en/cases/construction-3d-sales) the team assembled a set: a 2D apartment plan, a 3D whitebox top view and interior views, five frames in three presentation formats. After the set launched, apartment sales grew by 20%; the case does not fix the measurement window, so the figure reads as the result of the set, not as a growth rate.

The growth belongs to the whole set and to the sales team. The set shipped in one revision: the plan and the top view show one apartment, the interior views another, and the manager works from the same frames. The case has no separate measurement for the viewer, so 20% cannot be derived from one format. The developer is not named in the case.

The set is worth pricing as one line: the plan, the whitebox and the views come from one drawing, so the second and third formats rest on geometry that is already approved. A scene is added to them when a card needs a tour.

## What to do

Start with one layout and one card.

1. **Input Artifact: a format table.** Rows are layouts, columns are the card, the deck, print and the site. Each cell names a format and its price, so the table shows where 2D is enough and where a scene is needed.
2. **Baseline Metric: three numbers before launch.** The price of one layout, the share of cards with an enquiry, and the number of calls per hundred cards. The protocol is a measurement two weeks before launch on the same cards.
3. **Checkpoint Deadline: 14 days after launch.** The same three numbers are taken again. The corridor is set before launch: the layout price stays within RUB 5,000-8,000 for 2D, RUB 25,000-40,000 for a whitebox plus RUB 14,000-24,000 for two views, or RUB 180,000-302,000 for a scene with room switching and material changes.
4. **Scale-or-Stop Condition.** Extend the format to the whole catalogue when the share of cards with an enquiry grows and the price of one layout stays in the corridor. Return the format to debugging when the share of cards with an enquiry has not grown in 14 days.

[3D design](https://loginai.ru/en/services/3d-design) builds a plan, a whitebox and a scene from one drawing. [Corporate websites](https://loginai.ru/en/services/corporate-websites) place the viewer in the card. We broke the viewer estimate down by block in a [separate analysis](https://loginai.ru/en/news/threejs-viewer-cost).
