<script>
  import {contents} from '../../stores'
  export let text
  let textarea
  $: if (textarea) {
    textarea.focus()
  }
  if ($contents) {
    text = $contents.children.map(child => child.label).join('\n')
  }
</script>

<style>
  textarea {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #f6f6f6;
    padding: 1rem;
  }
  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }
</style>


<label>
  <h2>Edit the Table of Contents</h2>
    <textarea name="ContentsEdit" id="PublicationContentsEdit" cols="30" rows="30" bind:value={text} bind:this={textarea}></textarea>
</label>