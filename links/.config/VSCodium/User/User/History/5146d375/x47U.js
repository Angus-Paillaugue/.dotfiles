import Collapsible from './Collapsible.svelte';
import Group from './Group.svelte';

Collapsible.Group = Group;

// Add type declaration for Collapsible component
Collapsible.Group: typeof Group;

export default Collapsible;
