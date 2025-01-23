<script>
  import { basicSetup, EditorView} from "codemirror"
  import { EditorState, Compartment} from "@codemirror/state"
  import { sql } from "@codemirror/lang-sql"

  let language = new Compartment, tabSize = new Compartment

  let state = EditorState.create({
    extensions: [
      basicSetup,
      language.of(sql()),
      tabSize.of(EditorState.tabSize.of(2))
    ]
  })

  let view = new EditorView({
    state,
    parent: document.body
  })
</script>
