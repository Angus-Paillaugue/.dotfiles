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
    let currentHeader = null; // Keep track of the current header object
    let headerCounter = 0;

    const generateId = (text, index) => {
      let id = text.toLowerCase().replace(/s+/g, '-');
      id = id.replace(/[^a-z0-9_-]/g, '');
      id = id.replace(/^[0-9-]/, '');
      id += `-${index}`;
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

    // Visit each heading node in the tree
    visit(tree, 'heading', (node) => {
      const headerText = getHeaderText(node);
      headerCounter++;
      const headerId = generateId(headerText, headerCounter); // Generate a unique ID for the header

      // Check if the heading is an h2 or higher level
      if (node.depth == 1) {
        currentHeader = {
          text: headerText,
          id: headerId,
          depth: node.depth,
          children: [] // Initialize an empty array for potential h3 children
        };

        file.data.headers.push(currentHeader); // Add the current header to the headers array
        addIdToNode(node, headerId); // Add the ID to the heading node
      } else if (currentHeader) {
        // Check if the heading is an h3 and there is a current header
        const childText = headerText;
        const childId = generateId(childText, headerCounter); // Generate a unique ID for the h3 header

        currentHeader.children.push({
          text: childText,
          id: childId,
          depth: node.depth
        });

        addIdToNode(node, childId); // Add the ID to the h3 node
      }
    });

    // Attach the headers to the `file` object
    if (!file.data.fm) file.data.fm = {};
    file.data.fm.headers = file.data.headers;
  };
}
