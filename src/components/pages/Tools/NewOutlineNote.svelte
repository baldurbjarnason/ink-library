<script>
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import NoteEditor from "../../widgets/NoteEditor.svelte";

  export let addNewNote;
  const flipDurationMs = 300;
  const dropFromOthersDisabled = true;
  let isDragging = false;

  function handleSort(e) {
    items = e.detail.items;
    isDragging = true;
  }

  function handleDrop(e) {
    addNewNote = items.length ? true : false;
    items = e.detail.items;
    isDragging = false;
  }

  $: text = "";
  let textType = "note",
    noteType = ["note", "header"];

  $: items = [
    {
      body: [
        {
          motivation: "commenting",
          language: null,
          content: text,
        },
      ],
      id: "12345",
      shortId: "12345",
      fresh: true,
      json: {
        type: textType,
      },
    },
  ];
  //$: console.log(items[0]);
</script>

<style>
  .NewNoteForm * {
    box-sizing: border-box;
  }
  .NewNoteForm {
    background: var(--all-workspace);
    z-index: 5;
    margin: 0 auto;
    width: calc(100% - 60px);
    padding: 40px;
    position: fixed;
    right: 30px;
    top: 30px;
    border-radius: 30px;
    transition: all 0.2s ease-out;
  }
  .NewNoteForm.isDragging {
    opacity: 0.7;
    width: max-content;
  }
  div.Header {
    padding: 0;
    margin: 6px 35px 0 0;
    display: grid;
    gap: 20px;
    float: left;
    grid-template-columns: repeat(2, max-content);
  }
  div.Header label {
    display: grid;
    gap: 5px;
    cursor: pointer;
    grid-template-columns: repeat(2, max-content);
  }
  div.Header label input[type="radio"] {
    float: left;
    width: 15px;
    height: 15px;
    -webkit-appearance: none;
    border-radius: 50%;
    position: relative;
    padding: 0;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--main-background-color);
  }
  div.Header label input[type="radio"]:checked:after {
    content: "";
    display: block;
    background: var(--main-background-color);
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
  div.Header label p {
    float: left;
    margin: 0 0 0 5px;
    line-height: 15px;
    font-size: 0.9rem;
    color: #ffffff;
    text-transform: capitalize;
  }
  .NewHeader ~ :global(.ql-toolbar.ql-snow),
  .NewHeader ~ :global(.Editor.ql-container.ql-snow) {
    display: none;
  }
  /* ------ Editor ------ */
  .NewNoteForm :global(.ql-toolbar) {
    padding: 0 !important;
  }
  .NewNoteForm :global(.ql-toolbar *),
  .NewNoteForm :global(.ql-toolbar.ql-snow .ql-formats),
  .NewNoteForm :global(.ql-toolbar) {
    border: none !important;
    margin: 0;
  }
  .NewNoteForm :global(#sapper button.ql-active) {
    background: var(--main-background-color);
  }
  .NewNoteForm :global(.ql-snow.ql-toolbar button.ql-active .ql-stroke) {
    stroke: var(--workspace-color);
  }
  .NewNoteForm :global(.ql-snow.ql-toolbar button.ql-active .ql-fill),
  .NewNoteForm
    :global(.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill) {
    fill: var(--workspace-color);
  }
  .NewNoteForm
    :global(.ql-snow.ql-toolbar
      button:not(.ql-active):hover
      .ql-stroke.ql-fill),
  .NewNoteForm :global(.ql-snow .ql-fill),
  .NewNoteForm :global(.ql-snow .ql-stroke.ql-fill),
  .NewNoteForm
    :global(.ql-snow.ql-toolbar button:not(.ql-active):hover .ql-fill) {
    fill: var(--main-background-color);
  }
  .NewNoteForm
    :global(.ql-snow.ql-toolbar button:not(.ql-active):hover .ql-stroke),
  .NewNoteForm :global(.ql-snow .ql-stroke) {
    stroke: var(--main-background-color);
  }
  .NewNoteForm :global(.Editor.hasFocus.svelte-27mrhh .ql-editor) {
    background-color: transparent;
  }
  .NewNoteForm :global(#sapper .ql-snow.ql-toolbar button) {
    margin-right: 10px !important;
  }
  .NewNoteForm :global(.Editor) {
    background: var(--main-background-color);
    overflow: hidden;
    min-height: 20vh;
    display: grid;
    border-radius: 10px;
    margin-top: 20px;
  }
  .NewNoteForm :global(.Editor p),
  .NewNoteForm :global(.Editor span) {
    background: transparent !important;
  }
  /* ------ Drag & Drop ------ */
  .DragEle,
  .NewNote {
    padding-right: 16px;
    border-radius: 10px;
    position: absolute;
    right: 40px;
    top: 40px;
    margin: 0;
    display: grid;
    align-items: center;
    gap: 15px;
    grid-template-columns: max-content max-content;
  }
  .DragEle.unDraggable ~ .NewNote {
    display: none;
  }
  .DragEle p {
    color: #ffffff;
    font-size: 0.9rem;
    margin: 0;
    float: left;
  }
  .DragEle div {
    display: grid;
    gap: 4px;
  }
  .DragEle div span {
    background: #ffffff;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    position: relative;
  }
  .DragEle div span::before,
  .DragEle div span::after {
    content: "";
    position: absolute;
    top: 0;
    left: 8px;
    background: #ffffff;
    width: 4px;
    height: 4px;
    display: block;
    border-radius: 50%;
  }
  .DragEle div span::after {
    left: 16px;
  }
  .NewNote {
    width: 100px;
    padding: 0;
    height: 25px;
    display: block;
    z-index: 1;
  }
  .NewNote .Card {
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    float: right;
  }
  .NewNote .Card :global(*),
  .WillBeDragged :global(*) {
    margin: 0;
    padding: 0;
    font-size: 0.75rem;
    color: #333333;
    font-weight: 500;
    background: transparent;
  }
  .NewHeader {
    width: 100%;
    border-radius: 15px;
    height: 60px;
    border: none;
    margin-top: 20px;
    color: var(--workspace-color);
    font-size: 180%;
    padding: 0 20px;
  }
  .NewNote .Card:active {
    background: #ffffff;
    border-radius: 10px;
    padding: 16px;
    opacity: 1;
    height: max-content;
    width: calc((100vw - 350px) * 0.5);
    max-width: calc((100vw - 350px) * 0.5) !important;
    max-height: max-content !important;
  }
  .NewNoteForm.isDragging .NewNote ~ :global(*:not(.DragEle)),
  .NewNote:active ~ :global(*:not(.DragEle)),
  .Hidding {
    display: none;
  }
  .NewNoteForm.isDragging .DragEle,
  .NewNote:active ~ .DragEle {
    position: relative;
    right: 0;
    top: 0;
  }
  .CancelBtn {
    border: 2px solid var(--main-background-color);
    color: var(--main-background-color);
    padding: 5px 30px;
    margin-top: 20px;
    border-radius: 10px;
    float: right;
    cursor: pointer;
  }
  .CancelBtn:hover {
    background: var(--main-background-color);
    color: var(--workspace-color);
  }
  .Counter {
    color: #ffffff;
    font-size: 0.9rem;
    opacity: 0.6;
    margin: 20px 0 0;
    float: left;
    font-style: italic;
  }
</style>

<main class="NewNoteForm" class:isDragging>
  <section
    class="NewNote {text ? '' : 'Hidding'}"
    use:dndzone={{ items, flipDurationMs, dropFromOthersDisabled }}
    on:consider={handleSort}
    on:finalize={handleDrop}>
    {#each items as item (item.id)}
      <div
        class="Card WillBeDragged"
        animate:flip={{ duration: flipDurationMs }}>
        {#if textType === 'header'}
          <h4>{text}</h4>
        {:else}
          {@html text}
        {/if}
      </div>
    {/each}
  </section>
  <div class="DragEle {text ? '' : 'unDraggable'}">
    <p>Drag {textType}</p>
    <div>
      <span />
      <span />
    </div>
  </div>
  <div class="Header">
    {#each noteType as type}
      <label for={type}>
        <input
          id={type}
          aria-label="Type of text"
          name="typeOfText"
          type="radio"
          value={type}
          bind:group={textType}
          on:change={() => {
            text = '';
          }} />
        <p>{type}</p>
      </label>
    {/each}
  </div>
  {#if textType === 'header'}
    <input type="text" maxlength="100" class="NewHeader" bind:value={text} />
    <p class="Counter">
      {text ? 100 - text.length : 100} character{text && text.length === 99 ? '' : 's'}
      left
    </p>
  {/if}
  <NoteEditor bind:richtext={text} />
  <span
    class="CancelBtn"
    on:click={() => {
      addNewNote = false;
    }}>
    Cancel
  </span>
</main>
