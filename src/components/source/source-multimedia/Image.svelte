<script>
    import {publication, page} from "../../../stores"
    import EmptySourceNotes from "../source-empty/EmptySourceNotes.svelte"
    import TitleBar from "../source-titlebar/TitleBar.svelte";

  let url;
  let source = {};
  $: if ($publication && $publication.json) {
    source = $publication
    const readerId = $publication.readerId.split('/').pop();
    url = `https://storage.cloud.google.com/ink-frontend-server-dev-uploads/readers/${readerId}/${$publication.json.storageId}?authuser=1`
  }

  </script>
  
  <style>
    /* your styles go here */
    .NoSource {
      grid-column: 1 / -1;
      grid-row: 2 / -1;
      display: grid;
      grid-template-columns: 600px auto;
      grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
      min-height: 100vh;
      padding-top: 30px;
    }

    .left-menu {
      background: lightgrey;
    }

    img {
        display: block;
        margin: 30px auto 0 auto;
    }
    .TitleBar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  
  </style>

  <div>
      <div class="TitleBar">
        <TitleBar name={source ? source.name : ""} {source} />
      </div>
  <div class="NoSource">

    <div class="left-menu">
      {#if url}
      <img src={url} alt="linked" />
      {/if}

    </div>
    <div>

      <EmptySourceNotes {source} pages={false} />
  
    </div>
  </div>
  </div>
  