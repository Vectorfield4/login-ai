---
title: "A Three.js 3D viewer: where the cost comes from"
description: "We break the cost of a 3D viewer on three.js into blocks: model preparation, the shell, rooms, materials, camera, hosting and device checks, with price anchors."
publishedAt: 2026-11-10
draft: false
category: research
excerpt: "Five blocks make a viewer estimate: model, shell, rooms, materials, camera. Price anchors, the causes of overrun, and where the apartment calculator stops."
tags: ["Three.js", "3D viewer", "Estimate", "WebGL"]
relatedServices: ["3d-design", "software-development"]
relatedSolutions: ["real-estate"]
relatedCases: ["construction-3d-sales"]
planNumber: 81
funnel: MoFu
persona: CTO
targetQuery: "3d viewer on three.js cost"
---

A viewer estimate arrives as one line, and the overrun is born before the first line of code: in polygons, material sets and room count. The question "3d viewer on three.js cost" breaks into five blocks: model preparation, the viewer shell, room switching, material switching, a camera sequence. A base model with viewing for a layout up to 80 sq m costs RUB 120,000-192,000. The interactive blocks add RUB 90,000-170,000: RUB 40,000-70,000 for room switching, RUB 20,000-40,000 for material switching, RUB 30,000-60,000 for camera motion. Each block carries its own unit of cost and its own reason to overrun.

For a CTO the bill reads through two numbers: time to first frame on the target phone and scene weight in megabytes. Those numbers set how much geometry and texture a scene can carry, and they define the volume of model preparation.

## Context: the sum is built from stages

The sum is built from stages with different units of account: polygons, hours of scene assembly, room count, material sets, seconds of animation, megabytes on the device. The five blocks do not overlap: each one covers its own piece of work.

The calculator on the service page counts the same blocks: format, layout count and interactive options. It does not count a site plan, a configurator with business logic or a CRM connection, and those need their own estimate.

| Block | Unit of account | Anchor | What moves the price |
| --- | --- | --- | --- |
| Model preparation | polygons, materials | part of the base model | complex geometry, texture weight |
| Shell | development hours | part of the base model | the target device list |
| Room switching | room, layout | +RUB 40,000-70,000 | room and layout count |
| Material switching | set | +RUB 20,000-40,000 | set and map count |
| Camera sequence | second, scene | +RUB 30,000-60,000 | duration and scene count |

The rows add up to one estimate. A polygon and a second of animation are counted differently, so those rows also grow for different reasons.

## Block 1. Model preparation

A browser model is a separate GLB or glTF file. It is prepared for the web from a 3ds Max or Blender scene: polygon counts come down, and normals, materials, UV coordinates and texture sizes are checked. The export is compared against the approved scene so doors, thin frames and finishes keep their silhouette.

The price of this block follows the geometry. Mouldings, spiral stairs, grilles and glass lose their silhouette first when polygons are cut, so they get a separate check. Every texture has weight, and its resolution follows the size of the frame on screen.

The unit of account is polygons and material count. A base model at RUB 120,000-192,000 includes this preparation for a layout up to 80 sq m.

A scene without transitions is one frame.

## Block 2. The viewer shell

The shell covers controls and loading. Rotation, zoom, return to the overview, mouse and finger input. A weak device gets a static image, and motion is reduced for visitors who asked for less animation in the system.

The main number in this block is time to first frame. While the model loads, the visitor sees the interface and a placeholder; the loading budget is agreed against target devices and a test page. The shell sets which devices enter the supported list.

The shell is part of the base model at RUB 120,000-192,000 and has no separate line. This is the first place where a saving returns as complaints about loading.

## Block 3. Room switching: +RUB 40,000-70,000

A transition is a point in the scene from which the camera flies into a room and back. The price follows the room count and the layout count: each apartment has its own set of points and its own path.

Nine catalogue layouts mean nine sets, even when the geometry is shared. The calculator takes up to nine layouts, and anything above moves to an individual quote.

## Block 4. Material switching: +RUB 20,000-40,000

Material switching means finish sets: floor, walls, kitchen fronts. Each set has its own materials and its own check at the final texture scale, because a UV seam shows at a wallpaper joint.

The price grows with the number of sets and with the number of materials per set. Geometry and UV must be ready at the model stage: a change after the shell is assembled rebuilds the export.

Every material switch is a separate check.

## Block 5. Camera sequence: +RUB 30,000-60,000

One short camera sequence is a separate block. Duration, scene count and a storyboard are agreed before work, and GSAP drives the motion on the web.

The price grows with duration and scene count. The sequence is checked on a phone, where a weak device gets a shorter version along with the rest of the animation.

## What one layout adds up to

The estimate is the sum of the anchors: RUB 120,000-192,000 for a model with viewing, RUB 40,000-70,000 for room switching, RUB 20,000-40,000 for materials, RUB 30,000-60,000 for the camera. A full set for one layout up to 80 sq m lands at RUB 210,000-362,000. Without the interactive blocks the same model costs RUB 120,000-192,000.

A catalogue is priced differently. Nine layouts with similar geometry are quoted together: the shell stays one line, while room switching and camera work are counted per layout. Geometry reuse for similar apartments is assessed separately, and one rate does not cover it.

## Hosting, weight and device checks

Hosting, licences, furniture libraries and external integrations are quoted as separate items and stay outside the apartment estimate.

Acceptance covers a phone and a computer: transitions, camera reset, loading. Scene weight is measured on a test page against the target device list.

## What drives the overrun

Four causes push a quote past the corridor.

1. **Complex geometry.** It moves two rows at once: model preparation and scene weight, so it is quoted by the number of distinct details, not by area.
2. **Many materials.** Each set has its own maps and a seam check; ten sets instead of three grow the material block and the scene weight.
3. **Large floor areas.** A layout above 80 sq m leaves the apartment corridor: the price is quoted after a source review.
4. **Configurator logic.** Compatibility rules, prices and limits are development work, not visualisation; those tasks get their own estimate.

## Where the apartment estimate ends

A site plan is quoted by territory area and building count, a configurator by the number of compatibility rules, a CRM by the number of integration points: those are three different estimates. The apartment calculator is not built for them.

A visualisation model does not replace a survey, an engineering calculation or a construction design: structural decisions and regulatory checks belong to the project engineers.

There is a technical boundary too. A site with ten scenes on one page needs its own loading budget. Each scene brings its own megabytes and its own first frame, and a visitor's phone does not hold all of them at once.

## What the case shows

In a [residential developer case](https://loginai.ru/en/cases/construction-3d-sales) the team assembled a set: a 2D plan, a 3D whitebox top view and interior views, five frames in three presentation formats. After the presentation launched, apartment sales grew by 20%; the case has no measurement window.

The growth belongs to the whole set and to the sales team. The set had no viewer and the case has no separate scene measurement, so 20% cannot be attributed to a viewer. The developer is not named in the case.

For an estimate the case is useful for another reason. The plan and the top view rested on the geometry of one apartment, the interiors were shot at a second site, so the estimate counts the formats separately. A scene is added to such a set when a card needs a tour, and it is quoted as a separate block.

## What to do

Start with one layout and one scene. The input artifact is a scene map.

1. **Input Artifact: a scene map.** A list of layouts, rooms, material sets and target devices. The document records what belongs to the base model and what belongs to the interactive blocks, and the estimate is built from it.
2. **Baseline Metric: four numbers before the shell is assembled.** Time to first frame on the target phone, scene weight in megabytes, polygon count and material count. The protocol is a measurement on a test page across three devices.
3. **Checkpoint Deadline: 14 days after the shell is assembled.** Our acceptance budget for the target phone is 3 seconds to first frame and 4 MB per scene; we take the same numbers again on day 14. A scene passes when both numbers stay inside the budget.
4. **Scale-or-Stop Condition.** Extend the scene to the whole catalogue when the model opens by itself on the target phone, with no static fallback, and the weight stays inside the budget. Return to debugging when the weight grows with every new material set.

[3D design](https://loginai.ru/en/services/3d-design) prepares the model and the scene from your drawing. [Software development](https://loginai.ru/en/services/software-development) places the viewer in the site and connects it to the catalogue. We compared the plan, the whitebox and the scene in a [separate breakdown](https://loginai.ru/en/news/3d-plan-whitebox-tour).
