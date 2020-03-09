
<script>
  import {striptags} from './striptags.js'
  export let note

  let bodies = []
  $: if (note.body && note.body.length) {
    bodies = note.body.filter(body => body.motivation === "commenting").map(body => striptags(body.content || '', true))
  }
</script>

<style>
.Note {
  position: relative;
  padding-left: calc(var(--base) * 1);
  padding-right: var(--base);
  font-size: var(--item-font-size);
  margin: var(--base) 0 0;
}
.Icon {
  position: absolute;
  top: 2px;
  left: 0;
}
</style>

<div class="Note">
  <svg class="Icon" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.2043 2.4682H3.24757C2.80914 2.4682 2.4519 2.82544 2.4519 3.26387V11.2206C2.4519 11.659 2.80914 12.0162 3.24757 12.0162H9.61293C9.82403 12.0162 10.0189 11.935 10.1813 11.7889L11.7726 10.1976C11.9187 10.0514 11.9999 9.84032 11.9999 9.62923V3.26387C11.9999 2.82544 11.6427 2.4682 11.2043 2.4682ZM3.32876 3.32882H11.1231V9.17456H10.1488C9.61293 9.17456 9.1745 9.61299 9.1745 10.1488V11.1231H3.32876V3.32882Z" fill="currentColor"/>
  <path d="M1.59134 8.67118H0.876861V0.876861H8.67118V1.60758H9.54804V0.79567C9.54804 0.35724 9.1908 0 8.75237 0H0.79567C0.35724 0 0 0.35724 0 0.79567V8.75237C0 9.1908 0.35724 9.54804 0.79567 9.54804H1.59134V8.67118Z" fill="currentColor"/>
  </svg>
{#each bodies as body}
  <div>
    {body}
  </div>
{/each}
</div>