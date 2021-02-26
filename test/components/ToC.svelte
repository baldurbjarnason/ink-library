<script>
  import { setContext } from "svelte";
  import ToC from "../../src/components/source/source-sidebar/ToC.svelte";
  function url(path) {
    return `/base/${path}`;
  }
  setContext("url", url);
  export let contents;
</script>

<style>
  #ToCtest {
    color: black;
  }
</style>

<div id="ToCtest">
  <ToC media="/media" base="/base" path="chapters/chapter1.html" {contents} />
</div>
