<script>
  import Card from "./Card.svelte";
  import { publication, refreshPublication } from "../../stores";
  import { getToken } from "../../getToken";
  let editing = false;
  let citation;
  $: if ($publication.json) {
    citation = $publication.json.citation;
  }
  async function save() {
    const pub = Object.assign({}, $publication, { json: { citation } });
    await window.fetch(`/api/publication/${$publication.shortId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "csrf-token": getToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pub)
    });
    editing = false;
    $refreshPublication = { id: $publication.shortId, time: Date.now() };
  }
  let textarea;
  $: if (editing && textarea) {
    textarea.focus();
  }
</script>

<style>
  .Citation {
    font-size: var(--item-font-size);
  }
  textarea {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #f6f6f6;
    padding: 1rem;
  }
  :global(#CitationCard) {
    grid-area: Citation;
    height: min-content;
  }
</style>

<Card id="Citation" tab="About" bind:editing {save}>
  <h2>Citation</h2>
  <div class="Citation">
    {#if editing}
      <textarea
        name="CitationEdit"
        id="PublicationCitationEdit"
        cols="30"
        rows="2"
        bind:value={citation}
        bind:this={textarea} />
    {:else}{citation || ''}{/if}
  </div>
</Card>
