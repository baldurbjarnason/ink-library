<script>
  import { Bookmark } from "../../../../state/models/Bookmark";
  import { intersections } from "../../../../state/nodes";
  import BookmarkButton from "./BookmarkButton.svelte";
  export let root;
  export let bookmarks;
  const headings$ = intersections(
    "h1:not([data-ink-page-title]):not([data-ink-private]),h2:not(#navigation-header):not(#toc-heading):not([data-ink-private]),h3,h4"
  );
  function findMark(entry) {
    const mark = bookmarks.find((mark) => {
      if (mark.id === entry.element.dataset.annotationId) return mark;
    });
    return mark || new Bookmark({});
  }
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
        {#if findMark(entry)}
          <BookmarkButton {entry} bookmark={findMark(entry)} />
        {/if}
      {/each}
    {/if}
    <!-- {#if $topmostNotBookmarked$}
      {#each Array.from($topmostNotBookmarked$) as entry}
        {#if entry.element.offsetParent !== null}
          <BookmarkButton {entry} bookmark={new Bookmark({})} />
        {/if}
      {/each}
    {/if} -->
  {/if}
</div>
