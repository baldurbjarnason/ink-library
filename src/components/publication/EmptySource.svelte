<script>
  import UploadIcon from './UploadIcon.svelte'
  import Button from '../widgets/Button.svelte'
  import EmptySourcePasteForm from './EmptySource/EmptySourcePasteForm.svelte'
  import EmptySourcePaster from './EmptySource/EmptySourcePaster.svelte'
  import EmptySourceUploader from './EmptySource/EmptySourceUploader.svelte'
  import EmptySourceUploadForm from './EmptySource/EmptySourceUploadForm.svelte'
  let uploading = false
  let pasting = false
</script>

<style>
  /* your styles go here */
  .NoSource {
    grid-column: 1 / -1;
    grid-row: 2 / -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: repeat(auto-fit,minmax(300px,1fr));
  }
</style>

<div class="NoSource">
  <EmptySourceUploadForm bind:uploading />
  <EmptySourcePasteForm bind:pasting />
</div>