<script>
  import {publication, workspaces, page} from '../../../stores'
  import Metadata from '../Metadata.svelte'
  import Cover from '../Cover.svelte'
</script>

<style>
.Reader {
  background-color: var(--reader-info-background);
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  grid-gap: 2rem;
  padding: 2rem;
}
.Body {
  height: 100%;
  background-color: transparent;
}
</style>

<div class="Reader">
  <div class="LeftSidebar"><Cover /></div>
  <div class="Body"><Metadata /></div>
</div>