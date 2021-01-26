<script>
  import {intersections, topmost} from "../../../../state/nodes.ts"
  import BookmarkButton from './BookmarkButton.svelte'
  export let root
  export let bookmarks
  const headings$ = intersections("h1:not([data-ink-page-title]):not([data-ink-private]),h2:not(#navigation-header):not(#toc-heading):not([data-ink-private]),h3,h4,h5")
</script>

<style>
  .Root {
    position: relative;
  }
</style>

<div class="Root">
{#if root}
    {#if $headings$}
      {#each Array.from($headings$) as entry}
        <BookmarkButton {entry} {bookmarks} />
      {/each}
    {/if}
{/if}
</div>
