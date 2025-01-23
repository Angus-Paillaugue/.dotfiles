export const cards = [
	{
		name: 'Ollama',
		description: 'The locally hosted AI server',
		url: { Global: 'https://chat-gpt.paillaugue.fr/' },
		icon: '/cards-assets/ollama.png'
	},
	{
		name: 'Jellyfin',
		description: 'The locally hosted AI server',
		url: {
			Global: 'https://jellyfin.paillaugue.fr/',
			Local: 'http://server.local:8096/web/'
		},
		icon: '/cards-assets/Jellyfin.svg'
	},
	{
		name: "Transmission",
		description: 'Torrent downloading',
		url: {
			Global: "https://transmission.paillaugue.fr/",
			Local: 'http://server.local:9091'
		},
		icon: '/cards-assets/Transmission.png'
	}
];
