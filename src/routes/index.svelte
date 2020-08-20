<script>
  import { send, receive } from "./_crossfade.js";
  import { innote, clearSelected, insource } from "../stores";
  import NotesCard from "../components/notes/NotesCard.svelte";
  import NotesList from "../components/notes/NotesList.svelte";
  import NewNote from "../components/notes/NewNote.svelte";
  import NoteEdit from "../components/notes/NoteEdit.svelte";
  import NewItem from "../components/workspace/NewItem.svelte";
  import NoNotes from "../components/img/NoNotes.svelte";
  import NoNotebooks from "../components/img/NoNotebooks.svelte";
  import NoSources from "../components/img/NoSources.svelte";
  import Item from "../components/workspace/Item.svelte";
  export let id = false;
  export let workspace = "all";

  let items, itemsNotes;
  $: if ($innote) itemsNotes = $innote.items;
  $: if ($insource) items = $insource.items;
</script>

<style>
  :root {
    --color: var(--workspace-color);
  }
  h1 {
    color: var(--color);
    float: left;
    margin-bottom: 0;
  }
  .index {
    display: grid;
    grid-template-columns: 1fr calc(var(--base) * 14);
    height: 100vh;
    padding: 20px;
    grid-gap: 30px;
  }
  .Toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Toolbar div :global(span.new-button) {
    margin-right: 20px;
    float: left;
  }
  .Toolbar div :global(span:last-child) {
    margin-right: 0;
  }
  .Cards:not(.align) {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 1fr; /*repeat(auto-fit, minmax(200px, 227px));*/
    grid-gap: var(--base);
    grid-auto-rows: max-content;
  }
  h5 {
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--workspace-color);
  }
  .Sources h5 {
    margin-bottom: 0;
  }
  .Sources {
    background: #ffffff;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 20px;
  }
  .Body {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-top: 20px;
    height: calc(100% - 40px);
  }
  .contNotes {
    height: 400px;
  }
  .align {
    background: #f9fbfc;
    border-radius: 30px;
    min-height: 165px;
    position: relative;
  }
  .align :global(svg) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .index .left {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .indexNotes {
    height: 375px;
  }
  .indexNotes :global(.Top) {
    height: 147px;
    grid-gap: 7px;
  }
  .indexNotes :global(.Highlight) {
    -webkit-line-clamp: 1;
    max-height: 15px;
  }
  .Sources :global(.Item:nth-last-of-type(-n + 1)) {
    display: none;
  }
  @media (max-width: 1289px) {
    .Cards:not(.align) {
      position: relative;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }
  @media (min-width: 1070px) and (max-width: 1289px) {
    .indexNotes :global(.Item:nth-last-of-type(-n + 2)) {
      display: none;
    }
  }
  @media (min-width: 850px) and (max-width: 1069px) {
    .indexNotes :global(.Item:nth-last-of-type(-n + 4)) {
      display: none;
    }
  }
  @media (max-width: 849px) {
    .index .Toolbar :global(.new-button) {
      position: inherit;
    }
    .index {
      grid-template-columns: 1fr;
      grid-gap: 50px;
      height: inherit;
    }
    .Cards:not(.align) {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
    .indexNotes :global(.Item:nth-last-of-type(-n + 2)) {
      display: none;
    }
    .contNotebooks {
      margin-top: 30px;
    }
    .Sources :global(.Item:nth-last-of-type(-n + 1)) {
      display: block;
    }
    .Sources {
      display: grid;
      grid-gap: var(--base);
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      position: relative;
      background: transparent;
      padding: 0;
    }
    .Sources h5 {
      margin-bottom: 0;
      position: absolute;
      top: -25px;
    }
  }
</style>

<div class="index">
  <div class="left">
    <nav class="Toolbar">
      <h1 out:send={{ key: 'h1' }} in:receive={{ key: 'h1' }}>Welcome</h1>
      <div>
        <NewNote {workspace} />
        <NewItem {workspace} />
      </div>
    </nav>
    <!--
    <div class="Body" class:NotesEditor={id}>-->
    <div class="contNotes">
      <h5>Recent notes</h5>
      <div class="Cards indexNotes {!itemsNotes.length ? 'align' : null}">
        {#if itemsNotes}
          {#each itemsNotes as note, i}
            {#if i < 8}
              <NotesCard {note} />
            {/if}
          {:else}
            <NoNotes />
          {/each}
        {/if}
      </div>
    </div>
    <div class="contNotebooks">
      <h5>Recent notebooks</h5>
      <div class="notebooks align">
        <NoNotebooks />
      </div>
    </div>
  </div>
  <div class="Sources">
    <h5>Recent sources</h5>
    {#each items as item, i}
      {#if i < 6}
        <Item {item} />
      {/if}
    {:else}
      <NoSources />
      <span />
    {/each}
  </div>
</div>
