<script>
  import { contents, page } from "../../stores";
  import ContentsItem from "./ContentsItem.svelte";
  import PagedContentsItem from "./PagedContentsItem.svelte";
  import Loading from "../widgets/Loading.svelte";
</script>

<style>
  .ToC {
    padding: 0 1rem;
    position: sticky;
    top: 3rem;
    max-height: calc(100vh - 3rem);
    overflow-y: auto;
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
  .ToC :global(ol > li ol > li ol > li) {
    font-size: calc(var(--item-font-size) * 0.85);
    font-weight: 400;
    color: #666;
  }
  /* Level 4 */
  .ToC :global(ol > li ol > li ol > li ol > li) {
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
  .PDF ol,
  .PDF.ToC {
    padding: 0;
    margin: 0;
  }
</style>

<div class="ToC {$contents.type}">
  {#if $contents.type !== 'loading'}
    {#if $contents.type === 'PDF'}
      <ol>
        {#each $contents.children as item}
          <PagedContentsItem {item} storageId={$contents.storageId} />
        {/each}
      </ol>
    {:else}
      <h2>{$contents.heading || 'Table of Contents'}</h2>
      <ol>
        {#each $contents.children as item}
          <ContentsItem {item} />
        {/each}
      </ol>
    {/if}
  {:else}
    <Loading />
  {/if}
</div>
