<script>
  import ToC from '../../components/source/source-sidebar/ToC.svelte'
  export let contents
</script>

<style>
</style>

<div id="ToCtest"><ToC media="/media" base="/base" path="chapters/chapter1.html" {contents}  /></div>