<script>
  import Card from "./Card.svelte";
  import Cover from "./Cover.svelte";
  import Keyword from "./Keyword.svelte";
  import KeywordInput from "./KeywordInput.svelte";
  import { publication, refreshPublication } from "../../stores";
  import { getToken } from "../../getToken";
  let editing = false;
  let form;
  async function save() {
    const entries = Array.from(
      new URLSearchParams(new FormData(form)).entries()
    )
      .filter(entry => entry[0] !== "input-new-keyword")
      .map(entry => entry[1]);
    if (entries.length !== 0) {
      const pub = Object.assign({}, $publication, { keywords: entries });
      await window.fetch(`/api/publication/${$publication.shortId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "csrf-token": getToken(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pub)
      });
    }
    editing = false;
    $refreshPublication = { id: $publication.shortId, time: Date.now() };
  }
  let keywords;
  $: if ($publication.keywords) {
    keywords = [].concat($publication.keywords);
  }
  let keywordInput = {};
  function submit(event) {
    event.preventDefault();
    const newKeyword = keywordInput.value;
    if (newKeyword) {
      keywords = keywords.concat(newKeyword);
      keywordInput.value = "";
    }
  }
</script>

<style>
  .KeywordsForm {
    width: 100%;
  }
  .KeywordsForm .KeywordsItems,
  .Keywords {
    display: flex;
    flex-wrap: wrap;
  }
  .KeywordsForm .Adding {
    display: grid;
    grid-template-columns: 1fr 3rem;
    margin: 0 0 1rem;
  }
  .Adding label {
    grid-column: 1 / -1;
    margin: 0 0 0.25rem;
    font-size: var(--item-font-size);
    color: #333;
    font-weight: bold;
    display: block;
  }
  .Adding input {
    margin: 0;
    padding: 0.5rem 0.5rem;
    border: 1px solid #eee;
    background-color: #f6f6f6;
    display: block;
    width: 100%;
  }
  button {
    font-family: var(--sans-fonts);
    font-size: var(--item-font-size);
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

    padding: 0;

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    font-weight: 500;
    color: white;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    /* transition: box-shadow 0.15s ease-in-out; */
    background-color: var(--workspace-color);
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: none;
  }

  button:hover {
    color: white !important;
    background-color: var(--rc-dark);
    box-shadow: none;
    text-decoration: none;
  }

  button:active {
    background-color: var(--active);
  }
  button:focus {
    outline: none;
    box-shadow: 0 0 0 3px #68d6d499;
  }
</style>

<Card id="Keywords" tab="About" bind:editing {save}>
  <h2>Keywords</h2>
  <div class="Keywords">
    {#if !editing}
      {#each keywords as keyword}
        <Keyword {keyword} />
      {:else}No Keywords{/each}
    {:else}
      <form
        id="keywordsform"
        class="KeywordsForm"
        on:submit={submit}
        bind:this={form}>
        <div class="Adding">
          <label for="input-new-keyword">Add Keyword:</label>
          <input
            type="text"
            name="input-new-keyword"
            id="input-new-keyword"
            bind:this={keywordInput} />
          <button>Add</button>
        </div>
        <div class="KeywordsItems">
          {#each keywords as keyword, index}
            <KeywordInput {keyword} {index} />
          {:else}No Keywords{/each}
        </div>
      </form>
    {/if}
  </div>
</Card>
