<script lang="ts">

    import EmptySourceNotes from "../source-empty/EmptySourceNotes.svelte"
    export let source;
  
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
    }

    .left-menu {
      background: lightgrey;
    }

    img {
        display: block;
        margin: 30px auto 0 auto;
    }
    
  
  </style>
  
  <div class="NoSource">
    <div class="left-menu">
      <img src={source.links[0].url} alt="linked" />
    </div>
    <div>

      <EmptySourceNotes {source} />
  
    </div>
  </div>
  