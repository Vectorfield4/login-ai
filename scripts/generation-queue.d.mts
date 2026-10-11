export type QueueKind = "article" | "service" | "solution";

export interface QueueEntry {
  kind: QueueKind;
  slug: string;
  title: string;
  keywords: string[];
  story: string;
}

export const ROOT: string;
export const QUEUE_PATH: string;
export const KIND_DIRS: Record<QueueKind, string>;
export const KINDS: QueueKind[];

export function targetRel(kind: QueueKind, slug: string): string;
export function targetPath(kind: QueueKind, slug: string): string;
export function readQueue(): QueueEntry[];
export function getEntry(kind: QueueKind, slug: string): QueueEntry | undefined;
export function pendingSlugs(kind?: QueueKind): string[];
export function removeEntry(kind: QueueKind, slug: string): number;
export function setStory(kind: QueueKind, slug: string, story: string): QueueEntry;
export function addEntry(entry: QueueEntry): QueueEntry;
