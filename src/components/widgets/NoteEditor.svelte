

<script>
  import Editor from './Editor.svelte'
  import DOMPurify from "dompurify";
  const commentConfig = {
    KEEP_CONTENT: false,
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
  let html = ""
  export let richtext = ""
</script>

<style>
  /* your styles go here */
</style>

<Editor bind:richtext>
{@html DOMPurify.sanitize(html, commentConfig)}
</Editor>