export interface WindowProps {
	title: string;
	class?: string;
	visible?: string;
}

export class Draggable {
	private _element: HTMLElement | undefined;
	private _pos1 = 0;
	private _pos2 = 0;
	private _pos3 = 0;
	private _pos4 = 0;
	private _visible = $state('default');

	constructor(element: HTMLElement) {
		this._element = element;
		this._element.querySelector('.closeBtn').onclick = () => {
			this.setState('closed');
		};
		this._element.querySelector('.minimizeBtn').onclick = () => {
			this.setState('minimized');
		};
		this._element.querySelector('.maximizeBtn').onclick = () => {
			if (this._visible === 'maximized') {
				this.setState('default');
			} else {
				this.setState('maximized');
			}
		};

		if (document.querySelector('.titleBar')) {
			document.querySelector('.titleBar').onmousedown = this.dragMouseDown.bind(this);
		} else {
			this._element.onmousedown = this.dragMouseDown.bind(this);
		}
		this._element.style.position = 'absolute';
		this.setState('default');
	}

	dragMouseDown(e) {
		if (this._visible === 'maximized') return;
		e = e || window.event;
		e.preventDefault();
		this._pos3 = e.clientX;
		this._pos4 = e.clientY;
		document.onmouseup = this.closeDragElement.bind(this);
		document.onmousemove = this.elementDrag.bind(this);
	}

	elementDrag(e) {
		if (this._visible === 'maximized') return;
		e = e || window.event;
		e.preventDefault();
		this._pos1 = this._pos3 - e.clientX;
		this._pos2 = this._pos4 - e.clientY;
		this._pos3 = e.clientX;
		this._pos4 = e.clientY;
		const MAX_X = window.innerWidth - this._element.offsetWidth;
		const MAX_Y = window.innerHeight - this._element.offsetHeight;
		this._element.style.top =
			Math.min(Math.max(this._element.offsetTop - this._pos2, 0), MAX_Y) + 'px';
		this._element.style.left =
			Math.min(Math.max(this._element.offsetLeft - this._pos1, 0), MAX_X) + 'px';
	}

	closeDragElement() {
		if (this._visible === 'maximized') return;
		document.onmouseup = null;
		document.onmousemove = null;
	}

	get visible() {
		return this._visible;
	}
	set visible(value) {
		this._visible = value;
	}

	#show() {
		this._element.style.scale = 1;
		this._element.style.opacity = 1;
	}

	#hide() {
		this._element.style.scale = 0;
		this._element.style.opacity = 0;
	}

	setState(state) {
		switch (state) {
			case 'closed':
				this.#hide();
				break;
			case 'minimized':
				this.#hide();
				break;
			case 'maximized':
				this.#show();
				this._element.style.width = window.innerWidth + 'px';
				this._element.style.height = window.innerHeight + 'px';
				this._element.style.top = '0px';
				this._element.style.left = '0px';
				break;
			case 'default':
				this.#show();
				this._element.style.width = window.innerWidth / 2 + 'px';
				this._element.style.height = this._element.offsetWidth * (9 / 16) + 'px';
				this._element.style.top = window.innerHeight / 2 - this._element.offsetHeight / 2 + 'px';
				this._element.style.left = window.innerWidth / 2 - this._element.offsetWidth / 2 + 'px';
		}
		this._visible = state;
	}
}
