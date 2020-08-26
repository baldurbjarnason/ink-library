<script>
  import Button from '../../widgets/Button.svelte'
  export let uploading = false
</script>

<style>
  .Wrapper {
    grid-column: 1 / -1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding-top: 35%;
  }
</style>



   <div class="Wrapper">Uploading
   
  <Button click={() => uploading = false}>Toggle</Button>
   
   </div>