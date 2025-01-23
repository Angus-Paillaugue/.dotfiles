<script>
  import { basicSetup, EditorView} from "codemirror"
  import { EditorState, Compartment} from "@codemirror/state"
  import { sql } from "@codemirror/lang-sql"
  import { onMount } from "svelte";

  let language = new Compartment()
  let tabSize = new Compartment()
  let view = $state();
  let editorElement = $state();
  let { value = $bindable() } = $props();

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

    return () => {
      view.destroy();
    }
  });

  $effect(() => {
    if(!view) return;
    console.log(view.state.doc.toString())
    if (view) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: value
        }
      });
    }
  });
</script>


<div bind:this={editorElement}></div>
