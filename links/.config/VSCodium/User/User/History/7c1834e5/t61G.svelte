<script lang="ts">
  import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

  let { children, title, class: className, visible = $bindable(), ...props } = $props();

  let windowElement = $state();
  let windowInstance = $state();

  export interface WindowProps {
    title: string;
    class?: string;
    visible?: string;
  }

  class Draggable {
    private _element: HTMLElement | undefined;
    private _pos1 = 0;
    private _pos2 = 0;
    private _pos3 = 0;
    private _pos4 = 0;
    private _visible = $state("default");

    constructor(element: HTMLElement) {
      this._element = element;
      this._element.querySelector(".closeBtn").onclick = () => {
        this.setState("closed");
      };
      this._element.querySelector(".minimizeBtn").onclick = () => {
        this.setState("minimized");
      };
      this._element.querySelector(".maximizeBtn").onclick = () => {
        if(this._visible === "maximized") {
          this.setState("default");
        }else {
          this.setState("maximized");
        }
      };

      if (document.querySelector(".titleBar")) {
        document.querySelector(".titleBar").onmousedown = this.dragMouseDown.bind(this);
      } else {
        this._element.onmousedown = this.dragMouseDown.bind(this);
      }
      this._element.style.position = "absolute";
      this.setState("default");
    }

    dragMouseDown(e) {
      if(this._visible === "maximized") return;
      e = e || window.event;
      e.preventDefault();
      this._pos3 = e.clientX;
      this._pos4 = e.clientY;
      document.onmouseup = this.closeDragElement.bind(this);
      document.onmousemove = this.elementDrag.bind(this);
    }

    elementDrag(e) {
      if(this._visible === "maximized") return;
      e = e || window.event;
      e.preventDefault();
      this._pos1 = this._pos3 - e.clientX;
      this._pos2 = this._pos4 - e.clientY;
      this._pos3 = e.clientX;
      this._pos4 = e.clientY;
      const MAX_X = window.innerWidth - this._element.offsetWidth;
      const MAX_Y = window.innerHeight - this._element.offsetHeight;
      this._element.style.top = Math.min(Math.max(this._element.offsetTop - this._pos2, 0), MAX_Y) + "px";
      this._element.style.left = Math.min(Math.max(this._element.offsetLeft - this._pos1, 0), MAX_X) + "px";
    }

    closeDragElement() {
      if(this._visible === "maximized") return;
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
        case "closed":
          this.#hide();
          break;
        case "minimized":
          this.#hide();
          break;
        case "maximized":
          this.#show()
          this._element.style.width = window.innerWidth + "px";
          this._element.style.height = window.innerHeight + "px";
          this._element.style.top = "0px";
          this._element.style.left = "0px";
          break;
        case "default":
          this.#show()
          this._element.style.width = window.innerWidth / 2 + "px";
          this._element.style.height = this._element.offsetWidth * (9/16) + "px";
          this._element.style.top = window.innerHeight / 2 - this._element.offsetHeight / 2 + "px";
          this._element.style.left = window.innerWidth / 2 - this._element.offsetWidth / 2 + "px";
      }
      this._visible = state;
    }
  }

  onMount(() => {
    windowInstance = new Draggable(windowElement);
    visible = windowInstance.visible;
  });

  // Update the visible prop when the window is closed or minimized
  $effect(() => {
    visible = windowInstance.visible;
  });
  // Set the window to the correct state when the visible prop changes
  $effect(() => {
    windowInstance.setState(visible);
  })
</script>

<div id={title+"Window"} class={cn("flex absolute flex-col rounded-lg overflow-hidden border transition-[scale,opacity] border-neutral-700/50", className)} bind:this={windowElement}>
  <div class="flex flex-row shrink-0 items-center w-full bg-neutral-800 p-2 gap-2 titleBar">
    <div class="size-4 rounded-full flex flex-col items-center bg-[#d62736] border border-[#d62032] text-[#9f1b29] hover:bg-[#f34e57] transition-all group justify-center closeBtn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </div>
    <div class="size-4 rounded-full flex flex-col items-center bg-[#fac537] border border-[#fac537] hover:border-[#db9c15] text-[#965911] transition-all group justify-center minimizeBtn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M5 12h14"/></svg>
    </div>
    <div class="size-4 rounded-full flex flex-col items-center bg-[#14c01e] border border-[#10c20c] text-[#097402] hover:bg-[#3aea49] transition-all group justify-center maximizeBtn">
      <svg viewBox="0 0 59.999996 60" version="1.1" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" xmlns:svg="http://www.w3.org/2000/svg" class="size-2 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M 0,0 V 43.632743 A 6.3672573,6.3672573 45 0 0 6.3672573,50 H 50 Z" transform="translate(0,10)" /><path d="M 0,0 V 43.632743 A 6.3672573,6.3672573 45 0 0 6.3672573,50 H 50 Z" transform="rotate(180,30,25)" /></svg>
    </div>
  </div>
  <div class="w-full flex flex-col grow overflow-y-auto p-2">
    {@render children()}
  </div>
</div>
