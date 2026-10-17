import { stack } from "./fixtures";
import type { StackCategory, StackItem, StackKind } from "./stack";

/** The whole stack in fixture order. */
export const getStackItems = (): StackItem[] => stack;

/** One stack item by its stable slug. */
export const getStackItemBySlug = (slug?: string): StackItem | undefined =>
  stack.find((item) => item.slug === slug);

/** Stack items of one implementation kind. */
export const getStackItemsByKind = (kind: StackKind): StackItem[] =>
  stack.filter((item) => item.kind === kind);

/** Stack items of one global bucket. */
export const getStackItemsByCategory = (category: StackCategory): StackItem[] =>
  stack.filter((item) => item.category === category);

/** Resolves a service stack name (`PostgreSQL`, `PyTorch`) to its record. */
export const getStackItemByName = (name: string): StackItem | undefined => {
  const normalized = name.trim().toLowerCase();
  return stack.find((item) => item.name.trim().toLowerCase() === normalized);
};
