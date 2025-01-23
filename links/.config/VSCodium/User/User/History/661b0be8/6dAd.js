export const cards = [
	{
		name: 'Jellyfin',
		description: 'Media server',
		port: 8096,
		url: {
			Global: 'https://jellyfin.paillaugue.fr/',
			Local: 'http://server.local:8096/web/'
		},
		icon: '/cards-assets/Jellyfin.svg'
	},
	{
		name: 'Immich',
		description: 'A self-hosted google photos alternative',
		port: 2283,
		url: {
			Global: 'https://immich.paillaugue.fr/',
			Local: 'http://server.local:2283/'
		},
		icon: '/cards-assets/Immich.svg'
	},
	{
		name: 'Transmission',
		description: 'Torrent downloading',
		port: 9091,
		url: {
			Global: 'https://transmission.paillaugue.fr/',
			Local: 'http://server.local:9091'
		},
		icon: '/cards-assets/Transmission.png'
	},
	{
		name: 'Ollama',
		description: 'The locally hosted AI server',
		port: 8080,
		url: { Global: 'https://chat-gpt.paillaugue.fr/' },
		icon: '/cards-assets/ollama.png'
	},
	{
		name: 'Portainer',
		description: 'A simple management solution for Docker',
		port: 9443,
		url: {
			Local: 'https://server.local:9443/'
		},
		icon: '/cards-assets/Portainer.svg'
	},
	{
		name: 'File browser',
		description: 'A simple web-based file browser',
		port: 3000,
		url: {
			Global: 'https://file-browser.paillaugue.fr/',
			Local: 'http://server.local:3000/'
		},
		icon: '/cards-assets/Filebrowser.png'
	},
	{
		name: 'scrutiny',
		description: 'A SMART hard drive monitoring tool',
		port: 8085,
		url: {
			Global: 'https://scrutiny.paillaugue.fr/',
			Local: 'http://server.local:8085/'
		},
		icon: '/cards-assets/Scrutiny.svg'
	}
];
