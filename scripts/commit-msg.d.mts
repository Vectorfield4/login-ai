export const CONVENTIONAL_TYPES: string[];
export function loadConvention(cwd?: string): string[];
export function firstMeaningfulLine(text: string): string;
export function validateSubject(subject: string, allowed?: string[]): string | null;
