export interface Group {
  key: string;
  emoji: string;
  title: string;
  types: string[];
}

export const GROUPS: Group[];
export const ALL_TYPES: string[];
export function groupOf(type: string): Group;
