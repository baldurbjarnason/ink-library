

<script>
  import Editor from './Editor.svelte'
  import DOMPurify from "dompurify";
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
  export let html = ""
  export let richtext = ""
  $: if (html) {
    richtext = DOMPurify.sanitize(html, commentConfig)
  }
</script>

<style>
  /* your styles go here */
</style>

<Editor bind:richtext>
<div>{@html DOMPurify.sanitize(html, commentConfig)}</div>
</Editor>