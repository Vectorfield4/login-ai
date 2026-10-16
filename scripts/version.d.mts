export const ROOT: string;
export const PACKAGE_PATH: string;

export interface SemverParts {
  major: number;
  minor: number;
  patch: number;
}

export type BumpKind = "patch" | "minor" | "major";

export function parseVersion(version: string): SemverParts;
export function formatVersion(parts: SemverParts): string;
export function bumpVersion(version: string, kind: BumpKind): string;
export function readVersion(packagePath?: string): string;
export function writeVersion(version: string, packagePath?: string): string;
export function versionStaged(): boolean;
export function runHook(): void;
