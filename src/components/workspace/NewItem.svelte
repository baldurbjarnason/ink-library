<script>
  import IcoNewSource from "../img/IcoNewSource.svelte";
  import Button from "../widgets/Button.svelte";
  import WhiteButton from "./WhiteButton.svelte";
  import Input from "./Input.svelte";
  import FileInput from "./FileInput.svelte";
  import TypeSelect from "./TypeSelect.svelte";
  import Closer from "../widgets/Closer.svelte";
  import AddCollections from "./AddCollections.svelte";
  import Loading from "../widgets/Loading.svelte"
  import { afterUpdate, tick } from "svelte";
  import {
    page,
    refreshDate,
    refreshInSource,
    refreshCollections,
    addedCollections,
    addedWorkspaces,
    refreshNotebook,
  } from "../../stores";
  import { getToken } from "../../getToken";
  export let workspace;
  export let ntbkClose;

  let open = false;
  let input;
  let newToggle;
  let selected;
  let searchResultsDisplay = false;
  let loading = false;

  function click() {
    open = !open;
    itemType = "source";
  }
  $: searchResults = []

  async function close() {
    if (atNotebook) {
      ntbkClose("cancel");
    } else {
      open = false;
      await tick();
      newToggle.querySelector("button").focus();
      loading = false;
    }
  }

  searchResultsDisplay = false;

  afterUpdate(() => {
    if (open) {
      input.focus();
    }
  });

  async function select(item) {
   // event.preventDefault()
    selected = item;
    searchResults = searchResults.map(result => {
      if (result.title === selected.title) {
        result.selected = true;
      } else {
        result.selected = false;
      }
      return result;
    })
  }

  async function submitSource(event) {
    close()
    event.preventDefault();
    if (selected.title) {
      selected.name = selected.title
    }
    if (selected.isPartOf && selected.isPartOf.title) selected.isPartOf.name = selected.isPartOf.title
    if (!selected.inLanguage) selected.inLanguage = null

    
       await fetch(`/api/create-publication`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "csrf-token": getToken(),
          },
          body: JSON.stringify(selected),
        });
        $refreshCollections = Date.now();
        $refreshInSource = Date.now();
        searchResults = []
        searchResultsDisplay = false;
  }

  async function submit(event) {
    event.preventDefault();
    if (!atNotebook) close();
    else ntbkClose();

    const { target } = event;
    const newInput = window.document.getElementById("new-input").value;
    //if (newInput[0] === "#") {
    if (itemType === "stack") {
      const value = workspace === "all" ? newInput : `${workspace}/${newInput}`;
      try {
        await fetch("/api/create-collection", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "csrf-token": getToken(),
          },
          body: JSON.stringify({
            type: "stack",
            name: value,
          }),
        });
        $refreshCollections = Date.now();
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const body = Object.fromEntries(
          new URLSearchParams(new FormData(target)).entries()
        );
        if (body.citation) body.citation = {default: body.citation}
        body.addedCollections = $addedCollections;
        body.addedWorkspaces = $addedWorkspaces;
        $addedWorkspaces = [];
        $addedCollections = [];

        let url = atNotebook
          ? `/api/notebooks/${$page.params.id}/sources/`
          : `/api/create-publication`;

        await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "csrf-token": getToken(),
          },
          body: JSON.stringify(body),
        });

        if ($page.path === "/") $refreshInSource = Date.now();
        else if (atNotebook)
          $refreshNotebook = { id: $page.params.id, time: Date.now() };
        else $refreshDate = Date.now();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function search(event) {
    event.preventDefault();
    loading = true;
    const newInput = window.document.getElementById("new-input").value;
    //if (newInput[0] === "#") {
      try {
        const response = await fetch(`/api/metadata?title=${newInput}&crossref=true&doaj=true&loc=true`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "csrf-token": getToken(),
          }
        });
        loading = false;
        searchResultsDisplay = true;
        const json = await response.json();
        if (json.crossref && json.crossref.length>0) {
          searchResults = searchResults.concat(json.crossref)
          
        }
        if (json.doaj && json.doaj.length>0) {
          searchResults = searchResults.concat(json.doaj)
        }
        if (json.loc && json.loc.length>0) {
          searchResults = searchResults.concat(json.loc)
        }
        searchResults = searchResults.map(result => {
          result.selected = false;
          return result;
        })
      } catch (err) {
        loading = false;
        console.error(err);
      }
      
  }


  let itemType = "source";
  function changeType(value) {
    itemType = value;
  }

  $: atNotebook = $page.path.startsWith("/notebooks/") ? true : false;
</script>

<style>
  .NewBox {
    position: absolute;
    background-color: var(--workspace-color);
    color: #fff;
    left: 20px;
    width: calc(100% - 40px);
    top: 20px;
    z-index: 3;
    border-radius: 30px;
  }
  .header {
    padding: 40px;
    margin: 0;
    display: grid;
    grid-gap: 15px;
  }
  .typeOfItem {
    float: left;
    margin: 0;
    width: 100%;
  }
  .typeOfItem label {
    margin-right: 25px;
    float: left;
    cursor: pointer;
  }
  .typeOfItem p {
    margin: 0;
    float: left;
    margin-left: 5px;
    line-height: 15px;
    font-size: 0.9rem;
  }
  input[type="radio"] {
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
  input[type="radio"]:checked::after {
    content: "";
    display: block;
    background: var(--main-background-color);
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
  #new-input {
    background: var(--main-background-color);
    border: none;
    border-radius: 10px;
    font-size: 180%;
    padding: 0 20px;
    color: var(--workspace-color);
    outline: none;
    height: 60px;
  }
  #new-input::placeholder {
    color: rgba(0, 34, 48, 0.3);
    font-weight: lighter;
  }
  .MoreItems {
    padding: 0 40px 40px;
    display: grid;
    grid-gap: 20px 40px;
    grid-template-columns: 1fr 1fr;
  }
  .Source {
    display: grid;
    grid-template-columns: 1fr 15px minmax(100px, 0.5fr);
    grid-gap: 10px;
    align-items: center;
  }
  .Source p {
    margin: 0;
    font-size: 0.9rem;
    transform: translateY(7px);
  }
  /*-----------------------*/
  .new-button {
    justify-content: center;
    flex-direction: column;
    display: flex;
  }
  .new-button :global(.Button) {
    padding: 0.65rem 1.95rem 0.6rem;
  }
  .NewButtonLabel {
    float: left;
    margin-top: 2px;
    margin-left: 10px;
  }
  .new-button :global(svg) {
    float: left;
  }
  /* ------ Footer btns ------ */
  .footer {
    align-self: self-end;
  }
  .newForm > .footer {
    float: left;
    width: 100%;
    padding: 0 40px;
  }
  :global(.Button) {
    float: right;
  }
  .NewBox .footer :global(button.Closer) {
    width: 125px;
    padding: 0.65rem 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .NewBox .footer :global(.Closer::after) {
    content: "Cancel";
    color: var(--main-background-color);
  }
  .footer :global(.Closer:hover::after) {
    text-decoration: underline;
  }
  .footer :global(.Closer svg) {
    display: none;
  }
  .MoreItems :global(input),
  .MoreItems :global(select) {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: none;
  }
  .MoreItems :global(input::placeholder),
  .MoreItems :global(select) {
    color: #ffffff;
  }
  @media (max-width: 720px) {
    .new-button {
      position: fixed;
      right: var(--base);
      bottom: 50px;
    }
    .new-button :global(.Button) {
      box-shadow: 3px 1px 7px rgba(0, 0, 0, 0.2);
      padding: 0.65rem;
      border-radius: 100%;
      height: 60px;
      width: 60px;
      justify-content: center;
      align-items: center;
      display: flex;
    }
    .new-button :global(svg) {
      float: inherit;
      width: 25px;
      height: 25px;
    }
    .NewButtonLabel {
      display: none;
    }
    .NewBox .footer :global(button.Closer) {
      width: 50%;
    }
    :global(button.Closer),
    :global(button.Submit) {
      width: 50%;
      margin: 0 !important;
      font-size: 0.9rem;
      border-radius: 20px;
    }
    .NewBox {
      left: 0;
      top: 0;
      border-radius: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      align-items: center;
      display: flex;
    }
    .footer.stack {
      width: 100%;
      padding: 0 40px;
      float: left;
    }
    form,
    #new-input {
      width: 100%;
    }
    .MoreItems {
      grid-template-columns: 1fr;
    }
  }
  .author div {
    font-size: 0.8rem;
  }
  .author input {
    width: 100%;
    padding: calc(var(--base) * 0.5);
    margin: calc(var(--base) * 0.25) 0;
    border-radius: 10px;
  }

  .citation div {
    font-size: 0.8rem;
  }
  .citation input {
    width: 100%;
    padding: calc(var(--base) * 0.5);
    margin: calc(var(--base) * 0.25) 0;
    border-radius: 10px;
  }
  .typeDiv {
    position: relative;
  }
  .searchResultList {
    background: white;
    border-radius: 10px;
    height: 200px;
    overflow: auto;
    color: black;
  }
  .searchResultItem {
    border-bottom: rgba(0, 0, 0, 0.2) 1px solid;
    padding: 15px;
  }
  .searchResultItem:hover {
    background:rgba(0, 0, 0, 0.2);
  }
  .searchResultItemSelected {
    background:rgba(0, 34, 48, 0.3) !important;
  }
  
</style>

{#if open || atNotebook}
  <div class="NewBox">
    <form
      id="newform"
      class="newForm"
      action="/api/create-publication"
      on:submit={itemType === 'search' ? search : submit}>
      <section class="header">
        {#if !atNotebook}
          <section class="typeOfItem">
            <label>
              <input
                aria-label="source"
                name="typeOfItem"
                type="radio"
                checked
                on:click={() => changeType('source')} />
              <p>New source</p>
            </label>
            <label>
              <input
                aria-label="stack"
                name="typeOfItem"
                type="radio"
                on:click={() => changeType('stack')} />
              <p>New stack</p>
            </label>
            <label>
              <input
                aria-label="search metadata"
                name="typeOfItem"
                type="radio"
                on:click={() => changeType('search')} />
              <p>Search for a Source</p>
            </label>
          </section>
        {/if}
        <label class="visually-hidden" id="new-label" for="new-input">
          New item:
        </label>
        <input type="hidden" name="type" value="Publication" />
        {#if itemType === 'source'}
        <input
          type="title"
          required
          name="name"
          id="new-input"
          class="title-field"
          value=""
          placeholder='Enter a new Source Title'
          bind:this={input}
          autocomplete="off" />
          {/if}
          {#if itemType === 'stack'}
          <input
            type="title"
            required
            name="name"
            id="new-input"
            class="title-field"
            value=""
            placeholder='Enter a new stack name'
            bind:this={input}
            autocomplete="off" />
            {/if}
            {#if itemType === 'search'}
            <input
              type="title"
              required
              name="name"
              id="new-input"
              class="title-field"
              value=""
              placeholder='Enter a title to search'
              bind:this={input}
              autocomplete="off" />

              {#if searchResults}  
              <form on:submit={submitSource}>  
                {#if loading}
                 <Loading/>
                {/if}
                {#if searchResultsDisplay}
                  <div class="searchResultList">
                  {#each searchResults as item}
                  <div class={item.selected ? "searchResultItem searchResultItemSelected" : "searchResultItem"} on:click={select(item)}>
                  <!--<label>
                  <input type=radio class="searchResultRadio" group="metadata" bind:value={item.title} on:change={select} >
                  -->
                    <strong>{item.title}</strong><br/>
                    {#if item.author}
                    authors: {item.author}
                    {/if}
                    {#if item.isPartOf && item.isPartOf.title}
                      <br/>
                    {item.isPartOf.title}
                    {/if}
                    <br/>

                <!--</label>-->
                </div>
                {/each}

                </div>
                <br/>
                <WhiteButton>Create Source</WhiteButton>

                {/if}

            </form>

              {/if}
  
              {/if}
      </section>
      {#if itemType === 'source'}
        <div class="MoreItems">
          <div class="Source">
            <Input placeholder="Enter a URL" name="newURL" type="url">
              Source
            </Input>
            <p>or</p>
            <FileInput dark={true} name="newFile" type="file" />
          </div>
          <div class="typeDiv">
            <TypeSelect dark={true}>Type</TypeSelect>
          </div>
          <AddCollections dark={true} />
          <div class="author">
            <label for="input-author">
              <div>Authors (comma separated)</div>
              <input
                id="input-author"
                name="author"
                type="text"
                placeholder="First Author, Second Author" />
            </label>
          </div>
          <div class="citation">
            <label for="input-citation">
              <div>Citation</div>
              <input
                id="input-citation"
                name="citation"
                type="text"
                placeholder="Citation" />
            </label>
          </div>

          <div class="footer">
            <WhiteButton>Create</WhiteButton>
            <Closer click={close} dark={true} />
          </div>
        </div>
      {:else if itemType === 'stack'}
        <section class="footer stack">
          <WhiteButton>Create</WhiteButton>
          <Closer click={close} dark={true} />
        </section>
      {:else if !searchResultsDisplay}
      <section class="footer search">
        <WhiteButton>Search</WhiteButton>
        <Closer click={close} dark={true} />
      </section>
      {/if}
    </form>
  </div>
  <span />
{:else}
  <span class="new-button" bind:this={newToggle}>
    <Button {click}>
      <IcoNewSource />
      <span class="NewButtonLabel">Source</span>
    </Button>
  </span>
{/if}
