# AI Agent Rules for /src/entities/

You are working inside the **Entities** layer of Feature-Sliced Design (FSD).
This layer contains strictly isolated business logic and domain models.

## CRITICAL RESTRICTIONS:
1. **NO INFRASTRUCTURE IMPORTS:** 
   - NEVER import anything from `"astro"`, `"vite"`, or any framework-specific packages inside this directory.
   - This layer must remain completely framework-agnostic.
2. **NO TYPING IMAGES VIA ASTRO METADATA:**
   - NEVER use `ImageMetadata` from Astro for model properties.
   - If a model needs an image asset, use generic primitive types: `string` (for remote URLs) or an abstract placeholder type like `any` / `Record<string, unknown>` for local static assets managed by bundling tools.
3. **NO STRING HOISTING FOR GENERATED PATHS:**
   - Do not try to guess asset paths (`../../assets/*`) or absolute environment URLs inside `.ts` files here.
4. **VIOLATION POLICY:**
   - If a task asks you to pass Astro image metadata into an entity model, REFUSE and instruct the user to handle asset mapping at the higher layers (`widgets`, `pages`, or `app`).

*Failure to follow these rules will break FSD boundaries and crash compilation.*
