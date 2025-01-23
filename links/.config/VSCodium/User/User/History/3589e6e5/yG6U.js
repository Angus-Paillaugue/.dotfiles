import Definition from './ComponentDefinition.svelte';
import Name from './Name.svelte';
import Prop from './Prop.svelte';
import Description from './Description.svelte';
import Group from './Group.svelte';
import GroupName from './Group.name.svelte';

Definition.Prop = Prop;
Definition.Name = Name;
Definition.Description = Description;
Definition.Group = Group;
Definition.Group.Name = GroupName;

export default Definition;
