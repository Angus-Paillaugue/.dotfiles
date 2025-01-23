<script>
  import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

  let { children, title, class: className, visible = $bindable(), ...props } = $props();

  let windowElement = $state();
  let windowInstance = $state();

  class Draggable {
    #element;
    #pos1 = 0;
    #pos2 = 0;
    #pos3 = 0;
    #pos4 = 0;
    #visible = $state("default");

    constructor(element) {
      this.#element = element;
      this.#element.querySelector(".closeBtn").onclick = () => {
        this.setState("closed");
      };
      this.#element.querySelector(".minimizeBtn").onclick = () => {
        this.setState("minimized");
      };
      this.#element.querySelector(".maximizeBtn").onclick = () => {
        if(this.#visible === "maximized") {
          this.setState("default");
        }else {
          this.setState("maximized");
        }
      };

      if (document.querySelector(".titleBar")) {
        document.querySelector(".titleBar").onmousedown = this.dragMouseDown.bind(this);
      } else {
        this.#element.onmousedown = this.dragMouseDown.bind(this);
      }
      this.#element.style.position = "absolute";
      this.setState("default");
    }

    dragMouseDown(e) {
      if(this.#visible === "maximized") return;
      e = e || window.event;
      e.preventDefault();
      this.#pos3 = e.clientX;
      this.#pos4 = e.clientY;
      document.onmouseup = this.closeDragElement.bind(this);
      document.onmousemove = this.elementDrag.bind(this);
    }

    elementDrag(e) {
      if(this.#visible === "maximized") return;
      e = e || window.event;
      e.preventDefault();
      this.#pos1 = this.#pos3 - e.clientX;
      this.#pos2 = this.#pos4 - e.clientY;
      this.#pos3 = e.clientX;
      this.#pos4 = e.clientY;
      const MAX_X = window.innerWidth - this.#element.offsetWidth;
      const MAX_Y = window.innerHeight - this.#element.offsetHeight;
      this.#element.style.top = Math.min(Math.max(this.#element.offsetTop - this.#pos2, 0), MAX_Y) + "px";
      this.#element.style.left = Math.min(Math.max(this.#element.offsetLeft - this.#pos1, 0), MAX_X) + "px";
    }

    closeDragElement() {
      if(this.#visible === "maximized") return;
      document.onmouseup = null;
      document.onmousemove = null;
    }

    get visible() {
      return this.#visible;
    }
    set visible(value) {
      this.#visible = value;
    }

    #show() {
      this.#element.style.scale = 1;
      this.#element.style.opacity = 1;
    }

    #hide() {
      this.#element.style.scale = 0;
      this.#element.style.opacity = 0;
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
          this.#element.style.width = window.innerWidth + "px";
          this.#element.style.height = window.innerHeight + "px";
          this.#element.style.top = "0px";
          this.#element.style.left = "0px";
          break;
        case "default":
          this.#show()
          this.#element.style.width = window.innerWidth / 2 + "px";
          this.#element.style.height = this.#element.offsetWidth * (9/16) + "px";
          this.#element.style.top = window.innerHeight / 2 - this.#element.offsetHeight / 2 + "px";
          this.#element.style.left = window.innerWidth / 2 - this.#element.offsetWidth / 2 + "px";
      }
      this.#visible = state;
    }
  }

  export function closeWindow() {
    windowInstance.setState("closed");
  }

  export function minimizeWindow() {
    windowInstance.setState("minimized");
  }

  export function maximizeWindow() {
    windowInstance.setState("maximized");
  }

  export function openWindow() {
    windowInstance.setState("default");
  }

  onMount(() => {
    windowInstance = new Draggable(windowElement);
  });

  $effect(() => {
    visible = windowInstance.visible;
  });
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
