import Definition from './ComponentDefinition.svelte';
import Name from './Name.svelte';
import Description from './Description.svelte';
import Group from './Group.svelte';
import GroupName from './Group.Name.svelte';
import PropGroup from './Prop.Group.svelte';
import PropColumn from './Prop.Column.svelte';
import PropHeading from './Prop.Heading.svelte';

Definition.Name = Name;
Definition.Description = Description;
Definition.Group = Group;
Definition.Group.Name = GroupName;
Definition.Prop.Group = PropGroup;
Definition.Prop.Column = PropColumn;
Definition.Prop.Heading = PropHeading;

export default Definition;
