<script>
  export let url;
  export let publication


  </script>
  
  <style>

    img {
        display: block;
        margin: 30px auto 0 auto;
    }

  </style>

  <div>

      {#if url}
      <img src={url} alt="linked" />
      {/if}

  </div>
  