import { toasts, removeToast, addToast } from './toasts';
import Toaster from "./Toaster.svelte";
import Action from "./Action.svelte";

Toaster.Action = Action;

export { Toaster, toasts, removeToast, addToast };
