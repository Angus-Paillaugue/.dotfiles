// Generate or retrieve a unique visitor ID
const visitorId = localStorage.getItem('visitorId') || crypto.randomUUID();
localStorage.setItem('visitorId', visitorId);

// Collect device, browser, and OS details
const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
const browser = navigator.userAgentData?.brands[0].brand || navigator.userAgent.split(' ')[0];
const operatingSystem = navigator.userAgentData?.platform || navigator.platform;

function trackEvent(eventType, additionalData = {}) {
	const data = {
		propertyId: '<PROPERTY_ID>', // Set this dynamically for each website
		eventType: eventType,
		url: window.location.href,
		referrer: document.referrer || null,
		userId: visitorId,
		deviceType: deviceType,
		browser: browser,
		operatingSystem: operatingSystem,
		timestamp: new Date().toISOString(),
		...additionalData
	};

	// Send data to your SvelteKit endpoint
	fetch('/e', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
}

// Track page view on load
window.addEventListener('load', () => trackEvent('page_view'));

// Optional: Track other events like clicks, scroll depth, etc.
// Example for scroll depth:
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
	const scrollDepth = Math.floor((window.scrollY / document.body.scrollHeight) * 100);
	maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
});
window.addEventListener('beforeunload', () =>
	trackEvent('scroll_depth', { scroll_depth: maxScrollDepth })
);
