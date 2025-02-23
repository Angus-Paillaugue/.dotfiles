/**
 * Formats a given date using the specified date style and locale.
 * @param {Date} date - The date to format.
 * @param {string} [dateStyle='medium'] - The style of the date. Defaults to 'medium'.
 * @param {string} [locales='en'] - The locale to use for formatting. Defaults to 'en'.
 * @returns {string} The formatted date.
 */
export function formatDate(date, dateStyle = 'medium', locales = 'en') {
	if (!(date instanceof Date)) {
		date = new Date(date);
	}
	// Safari is mad about dashes in the date
	const dateFormatter = new Intl.DateTimeFormat(locales, {
		dateStyle,
		timezone: 'UTC'
	});
	return dateFormatter.format(date);
}

/**
 * Creates an accordion effect on the specified node.
 * @param {HTMLElement} node - The HTML element to apply the accordion effect to.
 * @param {boolean} isOpen - Specifies whether the accordion is initially open or closed.
 * @returns {Object} - An object with an `update` method to control the accordion state.
 */
export function accordion(node, isOpen) {
	node.style.overflow = 'hidden';
	node.style.height = isOpen ? 'auto' : '0';
	node.classList.add('accordion');
	return {
		update(isOpen) {
			let animation = node.animate(
				[
					{
						height: node.scrollHeight + 'px'
					},
					{
						height: 0
					}
				],
				{ duration: Math.max(node.scrollHeight, 150), fill: 'both' }
			);
			animation.pause();
			if (!isOpen) {
				animation.play();
			} else {
				animation.reverse();
			}
			// Used for nested accordions
			animation.onfinish = () => {
				animation.cancel();
				node.style.height = isOpen ? 'auto' : '0';
			};
		}
	};
}

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Appends strings of classes. If non-truthy values are passed, they are ignored.
 * Uses tailwind-merge to merge tailwind classes.
 */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/**
 * Converts a string into a slug by replacing spaces with hyphens.
 *
 * @param {string} path - The string to be slugified.
 * @returns {string} - The slugified string.
 */
export function slugify(path) {
	return path.replace(/ /g, '-');
}

/**
 * Reveal the specified node with the given options.
 *
 * @param {Node} node - The node to reveal.
 * @param {Object} options - The options for revealing the node.
 */
export function reveal(node, options) {
  // Set the default options
  const baseOptions = {
    y: 8, // The y translation value in pixels
    duration: 300, // The duration of the transition in milliseconds
    bottomMargin: 100, // The bottom margin in pixels
    once: false, // Whether to only reveal once
    threshold: 0.5, // The threshold for the IntersectionObserver
		delay: 0 // The delay in milliseconds
  };

  // Merge the base options with the provided options
  options = { ...baseOptions, ...options };

  // Create the observer options object
  const observerOptions = {
    rootMargin: `0px 0px -${options.bottomMargin}px 0px`,
    threshold: options.threshold
  };

  // Set the initial styles
  node.style.willChange = 'transform, opacity';

  /**
   * Toggles the appear/disappear styles of the node.
   */
  const toggleStyles = (visible) => {
    node.style.transition = `transform ${options.duration}ms, opacity ${options.duration}ms`;
    if (visible) {
      node.style.opacity = 1;
      node.style.transform = 'translateY(0)';
    } else {
      node.style.opacity = 0;
      node.style.transform = `translateY(${options.y}px)`;
    }
    setTimeout(() => {
      node.style.transition = '';
    }, options.duration);
  };

  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(intersect);
  }, observerOptions);

  // Observe the node
  observer.observe(node);

  /**
   * Function to handle the intersection of the node.
   * @param {IntersectionObserverEntry} entry
   */
  function intersect(entry) {
		setTimeout(() => {
			toggleStyles(entry.isIntersecting);
		}, options.delay);
    // Unobserve the node if the once option is true
    if (entry.isIntersecting && options.once) observer.unobserve(entry.target);
  }

  // Return the destroy function
  return {
    destroy() {
      observer.disconnect();
    }
  };
}
