<script>
  import { onMount } from "svelte";

  // import { tags } from "../../../stores";
  import { getToken } from "../../../getToken";
  export let plaintext;
  export let comment = "";
  $: if (comment) {
    window
      .fetch("/api/markdown", {
        method: "POST",
        headers: {
          "Content-Type": "text/html",
          "csrf-token": getToken(),
        },
        body: comment,
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return { content: "" };
        }
      })
      .then((json) => {
        plaintext = json.content;
      });
  } else {
    plaintext = "";
  }
  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }
  let textarea;
  onMount(() => {
    textarea.focus();
  });
</script>

<style>
  /* ------ Editor ------ */
  .Editor {
    display: grid;
    grid-column: 1/-1;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    color: #333;
  }
  .Editor textarea {
    background: transparent;
    display: grid;
    margin: 0.5rem 0;
    width: 100%;
    border: none;
    font-size: 0.85rem;
    grid-column: 1/-1;
    grid-row: 1/-1;
  }
  .Editor textarea:focus:not(:focus-visible) {
    outline: none;
  }
  .Editor .Sizer {
    background: transparent;
    display: grid;
    margin: 0.5rem 0;
    width: 100%;
    border: none;
    font-size: 0.85rem;
    grid-column: 1/-1;
    grid-row: 1/-1;
    visibility: hidden;
    white-space: pre-wrap;
    pointer-events: none;
  }
</style>

<div class="Editor">
  <textarea
    name="html"
    id="html"
    cols="40"
    rows="5"
    bind:this={textarea}
    bind:value={plaintext}
    placeholder="New note..." />
  <div class="Sizer" aria-hidden="true">{plaintext}</div>
</div>
