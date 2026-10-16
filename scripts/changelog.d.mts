import type { Group } from "./commit-convention.mjs";

export interface Commit {
  type: string;
  scope: string | null;
  breaking: boolean;
  description: string;
}

export interface GroupBucket extends Group {
  items: Commit[];
}

export function parseCommit(subject: string): Commit | null;
export function isSkippable(subject: string): boolean;
export function groupCommits(commits: Array<string | { subject: string }>): GroupBucket[];
export function renderChangelog(input: {
  version: string;
  date: string;
  commits: Array<string | { subject: string }>;
}): string;
export function lastReleaseTag(): string | null;
export function commitSubjectsSince(tag: string | null): string[];
export function todayLocal(): string;
