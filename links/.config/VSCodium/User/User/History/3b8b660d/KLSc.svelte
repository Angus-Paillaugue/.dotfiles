<script>
  import { homepage, siteName, siteAuthor } from '$conf';

  const { catchphrase } = homepage;
</script>

<footer
  class="sticky w-full px-6 pb-6 pt-14 text-neutral-100 dark:text-neutral-950 md:bottom-0 md:-z-10"
>
  <div
    class="mx-auto flex max-w-screen-lg gap-8 max-md:flex-col-reverse md:grid md:grid-cols-[auto,400px]"
  >
    <div class="flex flex-col gap-8">
      <p class="m-0 text-neutral-100 dark:text-neutral-950">{siteName}, {catchphrase}</p>
      <p class="m-0 mt-auto text-neutral-100 dark:text-neutral-950">
        Made with <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 128 128"
          viewBox="0 0 128 128"
          class="inline-block size-6"
          ><path
            d="m93.99 8.97c-21.91 0-29.96 22.39-29.96 22.39s-7.94-22.39-30-22.39c-16.58 0-35.48 13.14-28.5 43.01s58.56 67.08 58.56 67.08 51.39-37.21 58.38-67.08c6.98-29.87-10.56-43.01-28.48-43.01z"
            fill="#f44336"
          /><path
            d="m30.65 11.2c17.2 0 25.74 18.49 28.5 25.98.39 1.07 1.88 1.1 2.33.06l2.52-5.89c-3.55-11.34-13.31-22.38-29.97-22.38-6.9 0-14.19 2.28-19.86 7.09 5.01-3.29 10.88-4.86 16.48-4.86z"
            fill="#c33"
          /><path
            d="m93.99 8.97c-5.29 0-10.11 1.15-13.87 3.47 2.64-1.02 5.91-1.24 9.15-1.24 16.21 0 30.72 12.29 24.17 40.7-5.62 24.39-38.46 53.98-48.49 65.27-.64.72-.86 1.88-.86 1.88s51.39-37.21 58.38-67.08c6.98-29.86-10.53-43-28.48-43z"
            fill="#c33"
          /><g fill="#ff8a80"
            ><path
              d="m17.04 24.82c3.75-4.68 10.45-8.55 16.13-4.09 3.07 2.41 1.73 7.35-1.02 9.43-4 3.04-7.48 4.87-9.92 9.63-1.46 2.86-2.34 5.99-2.79 9.18-.18 1.26-1.83 1.57-2.45.46-4.22-7.48-5.42-17.78.05-24.61z"
            /><path
              d="m77.16 34.66c-1.76 0-3-1.7-2.36-3.34 1.19-3.02 2.73-5.94 4.58-8.54 2.74-3.84 7.95-6.08 11.25-3.75 3.38 2.38 2.94 7.14.57 9.44-5.09 4.93-11.51 6.19-14.04 6.19z"
            /></g
          ></svg
        >
        by {siteAuthor}
      </p>
    </div>

    <div class="grid grid-cols-2">
      <ul>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="#pricing"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Pricing</a
          >
        </li>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="/changelog"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Changelog</a
          >
        </li>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="/blog"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Blog</a
          >
        </li>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="/contact"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Contact</a
          >
        </li>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="/help"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Help-center</a
          >
        </li>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="/careers"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Careers</a
          >
        </li>
      </ul>
      <ul>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="#pricing"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Pricing</a
          >
        </li>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="/changelog"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Changelog</a
          >
        </li>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="/blog"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Blog</a
          >
        </li>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="/contact"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Contact</a
          >
        </li>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="/help"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Help-center</a
          >
        </li>
        <li class="m-0 mb-1 list-none text-base font-semibold">
          <a
            href="/careers"
            class="text-text-heading transition-colors hover:text-text-body dark:text-text-heading-dark dark:hover:text-text-body-dark"
            >Careers</a
          >
        </li>
      </ul>
    </div>
  </div>
</footer>
