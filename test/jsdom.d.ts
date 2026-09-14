declare module "jsdom" {
  export interface JSDOMOptions {
    url?: string;
    fakeUserAgent?: string;
    pretendToBeVisual?: boolean;
    runScripts?: "outside-only" | "dangerously";
  }

  export class JSDOM {
    constructor(html: string, options?: JSDOMOptions);
    window: Window & typeof globalThis;
  }
}
