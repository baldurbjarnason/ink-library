<script>
  let modal;
</script>

<style>
  :global(.modal),
  :global(.modal_screen) {
    position: fixed;
    z-index: 1000;
  }

  .Modal + :global(.modal_screen) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.125);
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

  :global(.Modal.modal-open) {
    z-index: 1001;
    background: #fff;
    box-sizing: border-box;
    padding: 0;
    top: calc(2.5rem + 1px);
    left: 2.5vw;
    height: 90vh;
    width: 93vw;
    overflow: auto;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    box-shadow: 0 9px 13px 0 #ccc;
  }

  .Modal :global(.modal_close) {
    position: absolute;
    top: 1rem;
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

<fg-modal id="id-source-info" bind:this={modal} class="Modal">
  <slot {modal} />
</fg-modal>
