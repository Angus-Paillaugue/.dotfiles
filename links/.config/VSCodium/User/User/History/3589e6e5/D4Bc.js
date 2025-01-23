import Definition from './ComponentDefinition.svelte';
import Name from './Name.svelte';
import Prop from './Prop.svelte';
import Description from './Description.svelte';

Definition.Prop = Prop;
Definition.Name = Name;
Definition.Description = Description;

export default Definition;
