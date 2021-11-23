<script>
    export let url;
  
  
    </script>
    
    <style>
      /* your styles go here */
  
      iframe {
          display: block;
          margin: 30px auto 0 auto;

      }
  
    </style>
  
    <div>
  
        {#if url}
        <iframe src={url} width="420" height="315"></iframe>
        {/if}
  
    </div>
    