/**
 * Formats a given date using the specified date style and locale.
 * @param {Date} date - The date to format.
 * @param {string} [dateStyle='medium'] - The style of the date. Defaults to 'medium'.
 * @param {string} [locales='en'] - The locale to use for formatting. Defaults to 'en'.
 * @returns {string} The formatted date.
 */
export function formatDate(date, dateStyle = 'medium', locales = 'en') {
  // Safari is mad about dashes in the date
  const dateFormatter = new Intl.DateTimeFormat(locales, {
    dateStyle
  });
  return dateFormatter.format(date);
}

/**
 * A collection of utility functions for working with URLs.
 */
export const urlHealer = {
  /**
   * Separates the identifier and slug from a given URL.
   * @param {string} url - The URL to separate.
   * @returns {Object} An object containing the separated identifier and slug.
   * - id: The identifier extracted from the URL.
   * - slug: The slug extracted from the URL.
   */
  identifier: {
    separate: (url) => {
      const regex = /(\d+)$/;
      const [, id] = url.match(regex) || [];
      const rest = url
        .replace(regex, '')
        .split('-')
        .filter((e) => e);

      return {
        id: Number(id),
        slug: rest.join('-')
      };
    },
    /**
     * Joins the slug and identifier to form a URL.
     * @param {string} slug - The slug part of the URL.
     * @param {string} id - The identifier part of the URL.
     * @returns {string} The joined URL.
     */
    join: (slug, id) => `${slug}-${id}`
  },
  /**
   * Sanitizes a given URL by removing special characters and converting it to lowercase.
   * @param {string} url - The URL to sanitize.
   * @returns {string} The sanitized URL.
   */
  sanitize: (url) =>
    url
      .trim()
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\W/g, (m) => (/[À-ž]/.test(m) ? m : '-'))
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-')
      .toLowerCase()
};

/**
   * Adds functionality to the copy code button.
   */
  function addCopyCodeButtonFunctionality() {
    const copyCodeButtons = document.querySelectorAll('.copy-code-button');
    copyCodeButtons.forEach((copyButton) => {
      // On copy code button click
      copyButton.onclick = () => {
        // Change the button icon to a checkmark
        copyButton.querySelector('.copy').classList.add('hidden');
        copyButton.querySelector('.copied').classList.remove('hidden');
        const textToCopy = copyButton.parentElement.querySelector('code').innerText;
        // Write the code to clipboard
        navigator.clipboard.writeText(textToCopy);
        // Show toast
        newToast({
          title: 'Copied to clipboard',
          message: 'The code has been copied to your clipboard',
          type: 'green'
        });
        setTimeout(() => {
          // Reset the button icon back to default
          copyButton.querySelector('.copy').classList.remove('hidden');
          copyButton.querySelector('.copied').classList.add('hidden');
        }, 2000);
      };
    });
  }
