<script>
  import InfoModal from "../source-info/InfoModal.svelte";
  import MainInfo from "../source-info/Info.svelte";
  import InfoToolBar from "../../publication/reader/InfoToolBar.svelte";
  import { source$ } from "../../../../state/state";
</script>

<style>
  /* your styles go here */
</style>

{#if $source$}
  <InfoModal let:modal>
    <InfoToolBar />
    <MainInfo />
  </InfoModal>
{/if}
