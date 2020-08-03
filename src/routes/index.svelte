<script>
  import { send, receive } from "./_crossfade.js";
</script>

<style>
  :root {
    --color: red;
  }

  h1 {
    color: var(--color);
  }
</style>

<h1 out:send={{ key: 'h1' }} in:receive={{ key: 'h1' }}>Front</h1>
