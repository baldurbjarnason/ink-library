<script>
    import {publication} from "../../../stores"
    import EmptySourceNotes from "../source-empty/EmptySourceNotes.svelte"
    import TitleBar from "../source-titlebar/TitleBar.svelte";
    import Image from "./Image.svelte"
    import Audio from "./Audio.svelte"

  let url, type;
  let source = {};
  $: if ($publication && $publication.json) {

    if ($publication.links && $publication.links[0] && $publication.links[0].encodingFormat) {
        if ($publication.links[0].encodingFormat.startsWith('image')) {
            type = "image"
        } else if ($publication.links[0].encodingFormat.startsWith('audio')) {
            type = "audio"
        }
    }

    source = $publication
    const readerId = $publication.readerId.split('/').pop();
    url = `https://storage.googleapis.com/ink-frontend-server-dev-uploads/readers/${readerId}/${$publication.json.storageId}`
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
      {#if url && type==="image"}
      <Image {url} publication={$publication} />
      {:else if url && type==="audio"}
      <Audio {url} />
      {/if}

    </div>
    <div>

      <EmptySourceNotes {source} pages={false} />
  
    </div>
  </div>
  </div>
  