<script>
  import { basicSetup, EditorView} from "codemirror"
  import { EditorState, Compartment} from "@codemirror/state"
  import { sql } from "@codemirror/lang-sql"
  import { onMount } from "svelte";

  let language = new Compartment()
  let tabSize = new Compartment()
  let view = $state();
  let editorElement = $state();

  onMount(() => {
    let state = EditorState.create({
      extensions: [
        basicSetup,
        language.of(sql()),
        tabSize.of(EditorState.tabSize.of(2))
      ]
    })

    view = new EditorView({
      state,
      parent: editorElement
    });
  });
</script>


<div bind:this={editorElement}></div>
