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

import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

export function remarkExtractHeaders() {
  return (tree, file) => {
    file.data.headers = [];
    let headerCounter = 0; // keep track of number of headers passed

    const generateId = (text, index) => {
      // Convert to lowercase and replace spaces with hyphens
      let id = text.toLowerCase().replace(/s+/g, '-');

      // Remove any characters that are not alphanumeric, underscore, or hyphen
      id = id.replace(/[^a-z0-9_-]/g, '');

      // Ensure the ID doesn't start with a number or hyphen
      id = id.replace(/^[0-9-]/, '');

      // Add the index
      id += `-${index}`;

      // Ensure the ID is not empty
      if (id === '') {
        id = `header-${index}`;
      }

      return id;
    };

    const getHeaderText = (node) => {
      return toString(node);
    };

    // Function to add an ID to a node
    const addIdToNode = (node, id) => {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.id = id;
    };

    visit(tree, 'heading', (node) => {
      if (node.depth === 2) {
        const headerText = getHeaderText(node);
        headerCounter++;

        const headerId = generateId(headerText, headerCounter);
        // Add an `id` property to the heading node
        addIdToNode(node, headerId);
      }
    });

    // Attach the headers to the `file` object
    if (!file.data.fm) file.data.fm = {};
    file.data.fm.headers = file.data.headers;
  };
}
