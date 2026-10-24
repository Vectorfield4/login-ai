import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { ExamplesBlock } from "@/shared/types/content";

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../../../assets/images/portfolio/*.{png,jpg,jpeg,webp}",
  { eager: true },
);
const images = new Map(
  Object.entries(modules).map(([path, module]) => [
    path.slice(path.lastIndexOf("/") + 1).replace(/\.[^.]+$/, ""),
    module.default,
  ]),
);

/** Resolve asset keys here so the entity remains independent of Astro. */
export async function getServiceExamples(examples: ExamplesBlock | undefined) {
  if (!examples) return undefined;
  const items = await Promise.all(
    examples.items.map(async (item) => {
      const image = images.get(item.asset);
      if (!image) throw new Error(`Missing service example: ${item.asset}`);
      const widths = [480, 960, image.width].filter(
        (width, index, all) => width <= image.width && all.indexOf(width) === index,
      );
      const variants = await Promise.all(
        widths.map(async (width) => ({
          width,
          ...(await getImage({ src: image, width, format: "webp", quality: 84 })),
        })),
      );
      return {
        ...item,
        src: variants[variants.length - 1].src,
        srcSet: variants.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
        width: image.width,
        height: image.height,
      };
    }),
  );
  return { ...examples, items };
}
