import Definition from './ComponentDefinition.svelte';
import Name from './Name.svelte';
import Prop from './Prop.svelte';
import Description from './Description.svelte';
import Group from './Group.svelte';
import GroupName from './Group.Name.svelte';
import PropGroup from './Prop.Group.svelte';
import PropColumn from './Prop.Column.svelte';

Definition.Prop = Prop;
Definition.Name = Name;
Definition.Description = Description;
Definition.Group = Group;
Definition.Group.Name = GroupName;
Definition.Prop.Group = PropGroup;
Definition.Prop.Column = PropColumn;

export default Definition;
