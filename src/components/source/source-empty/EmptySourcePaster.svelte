<script lang="ts">
  import Editor from "../../widgets/Editor.svelte";
  import DOMPurify from "dompurify";
  import { onMount } from "svelte";
  const commentConfig = {
    ALLOWED_TAGS: [
      "p",
      "i",
      "em",
      "strong",
      "a",
      "b",
      "ul",
      "li",
      "ol",
      "blockquote",
      "img",
      "pre",
      "code"
    ],
    FORBID_ATTR: ["style"]
  };
  export let html = "";
  export let richtext = "";
  $: if (html) {
    richtext = clean(html);
  }
  let clean = (html: string) => ""
  onMount(() => {
    clean = function clean(html) {
      return DOMPurify.sanitize(html, commentConfig);
    }
  })
  

</script>
<style>
  /* your styles go here */
</style>

<Editor bind:richtext autofocus={true}>
  <div>
    {@html clean(html)}
  </div>
</Editor>
