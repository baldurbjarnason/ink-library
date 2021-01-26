<script>
  import { getContext } from "svelte";
  export let item
  let chapter
  $: if ($item) {
    chapter = $item.target.source.replace(`${$item.source.shortId}/`, "")
  } else {
    chapter = ""
  }
  const url = getContext("url")
</script>

<style>
  li {
    list-style: none;
    padding: 0 0.5rem 0 0.75rem;
    margin: 0;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }
  svg {
    min-width: 14px;
    margin-right: 0.25rem;
  }
</style>

<li>
  <svg width="17" height="17" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20.8067" y="9" width="1.5" height="16" rx="0.75" fill="currentColor"/>
    <rect x="11.3067" y="9" width="1.5" height="16" rx="0.75" fill="currentColor"/>
    <rect x="16.8033" y="18.4534" width="1.5" height="8.20707" rx="0.75" transform="rotate(45 16.8033 18.4534)" fill="currentColor"/>
    <rect width="1.5" height="8.20556" rx="0.75" transform="matrix(-0.707107 0.707107 0.707107 0.707107 16.8067 18.45)" fill="currentColor"/>
    <rect x="22.3067" y="9" width="1.5" height="11" rx="0.75" transform="rotate(90 22.3067 9)" fill="currentColor"/>
    </svg> <a href="{url(chapter)}#{$item.target.selector.value}">{$item.body[0].value || $item.body[0].content}</a>
</li>