<script>
  import Button from './Button.svelte'
  import Search from './Search.svelte'
</script>

<style>

.Toolbar {
  display: flex;
}
.new-button {
  margin: 0 auto 0 0;
}
  
</style>

<div class="Toolbar">
  <span class="new-button"><Button>+ New</Button></span>
  <Search>Search...</Search>
  <Button>UI Toggle</Button>
</div>