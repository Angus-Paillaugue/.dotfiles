import { toasts } from "./toasts";
import Toaster from "./Toaster.svelte";
import Action from "./Action.svelte";

Toaster.Action = Action;
Toaster.toasts = toasts;

export const obj = {
	Toaster,
	Action,
	toasts
};
