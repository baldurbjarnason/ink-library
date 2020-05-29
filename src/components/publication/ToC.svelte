<script>
  import {contents, chapterId} from "../../stores"
  import ContentsItem from "./ContentsItem.svelte"
  import Loading from "../widgets/Loading.svelte"
  $: if ($chapterId === null && $contents.children[0]) {
    $chapterId = $contents.children[0].url
  }
</script>

<style>
  .ToC {
    padding: 0 1rem;
  }
  .ToC :global(ol) {
    margin: 0;
    padding-left: var(--base);
  }
  .ToC :global(ol) {
    counter-reset: section;                
    list-style-type: none;
  }
  .ToC ol {
    padding: 0;
    margin-top: var(--base);
  }
  .ToC :global(li) {
    counter-increment: section;  
  }
  .ToC :global(li .Level::before) {          
    content: counters(section, ".") ". ";   
  }
  /* Level 1 */
  .ToC :global(ol > li) {
    font-size: var(--item-font-size);
    font-weight: 600;
  }
  /* Level 2 */
  .ToC :global(ol > li ol > li) {
    font-size: calc(var(--item-font-size) * 0.85);
    font-weight: 600;
    color: #444;
  }
  /* Level 3 */
  .ToC :global(ol > li ol > li  ol > li) {
    font-size: calc(var(--item-font-size) * 0.85);
    font-weight: 400;
    color: #666;
  }
  /* Level 4 */
  .ToC :global(ol > li ol > li  ol > li  ol > li) {
    font-size: calc(var(--item-font-size) * 0.85);
    font-weight: 400;
    color: #666;
    font-style: italic;
  }
  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }
</style>

<div class="ToC">
{#if $contents.type !== "loading"}
<h2>{$contents.heading || "Table of Contents"}</h2>
<ol>
  {#each $contents.children as item}
    <ContentsItem {item} />
  {/each}
</ol>
{:else}
  <Loading />
{/if}
</div>