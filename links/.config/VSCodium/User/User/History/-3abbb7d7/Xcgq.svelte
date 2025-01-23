<script lang="ts">
 import * as Form from "$lib/components/ui/form/index.js";
 import { Input } from "$lib/components/ui/input/index.js";
 import { formSchema, type FormSchema } from "./schema";
 import {
  type SuperValidated,
  type Infer,
  superForm,
 } from "sveltekit-superforms";
 import { zodClient } from "sveltekit-superforms/adapters";

 export let data: SuperValidated<Infer<FormSchema>>;

 const form = superForm(data, {
  validators: zodClient(formSchema),
 });

 const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
 <Form.Field {form} name="name">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Server name</Form.Label>
        <Input {...props} bind:value={$formData.name} />
      {/snippet}
    </Form.Control>
 </Form.Field>
 <Form.Button>Add</Form.Button>
</form>
