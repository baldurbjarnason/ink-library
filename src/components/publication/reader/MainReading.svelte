<script>
  import {publication, workspaces, page} from '../../../stores'
</script>

<style>
.Reader {
  background-color: var(--reader-main-background);
  display: grid;
  grid-template-columns: 0.3fr 1fr 0.3fr;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.Body {
  height: 100%;
  background-color: white;
  border: 1px solid #DDDDDD;
}
</style>

<div class="Reader">
  <div class="LeftSidebar"></div>
  <div class="Body"></div>
  <div class="RightSidebar"></div>
</div>