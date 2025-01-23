// See https://svelte.dev/docs/kit/types#app.d.ts

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
    interface Locals {
      // Add your custom properties here
    }

    interface Page {
      name: string;
      description: string;
      component: any;
      url: string;
      lastModified: string;
      slug?: string;
    }
  }
}

export {};
