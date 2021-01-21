<script>
  export let id = "";
  let modal;
</script>

<style>
  :global(.modal),
  :global(.modal_screen) {
    position: fixed;
    z-index: 1000;
  }

  :global(.modal_screen) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
  }
  :global(.modal) {
    visibility: hidden;
  }
  :global(.modal-open) {
    visibility: visible;
  }
  :global(.modal-open + .modal_screen) {
    display: block;
  }

  :global(.modal-open) {
    z-index: 1001;
    box-sizing: border-box;
    padding: 0;
    top: 10vh;
    left: 10vw;
    height: 84vh;
    width: 80vw;
  }

  :global(.modal_close) {
    position: absolute;
    top: 2rem;
  right: 1rem;
    border: none;
    cursor: pointer;
    background: transparent;
    margin: 0;
    font-size: 1.4rem;
    width: 1.4em;
    height: 1.4em;
    line-height: 1;
    overflow: hidden;
    text-indent: -999px;
  }
  :global(.modal_close:before),
  :global(.modal_close:after) {
    content: "";
    height: 1em;
    width: 0.1em;
    top: 0.2em;
    left: 0.65em;
    background: #777;
    position: absolute;
    transform: rotate(-45deg);
  }
  :global(.modal_close:after) {
    transform: rotate(45deg);
  }
</style>

<fg-modal id="id-{id}" bind:this={modal}>
  <slot {modal} />
</fg-modal>
