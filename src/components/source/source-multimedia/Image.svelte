<script>
  export let url;


  </script>
  
  <style>
    /* your styles go here */

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
  