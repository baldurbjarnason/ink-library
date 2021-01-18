<script>
  import NoDeletion from "../../img/NoDeletion.svelte";

  export let remove;
  export let activeModal;
  export let pageInfo;
</script>

<style>
  .Modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    top: 0;
    left: 0;
    z-index: 5;
  }
  .Modal section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--main-background-color);
    border-radius: 30px;
    margin: 0;
    padding: 40px;
    width: 60vw;
    display: grid;
    gap: 30px;
  }
  .Modal section :global(svg) {
    margin: 0 auto;
  }
  .Modal p {
    margin: 0;
    font-size: 0.9rem;
  }
  .Modal .Footer {
    display: grid;
    gap: 30px;
    grid-template-columns: max-content max-content;
    justify-content: center;
  }
  .Modal .Footer .Button {
    width: 130px;
    max-height: 40px;
    padding: 10px 0;
    text-align: center;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 0;
  }
  .Modal .Footer .Button.Deletion {
    color: #ffffff;
    background: #f05657;
  }
  .Modal .Footer .Button.Deletion:hover {
    background: #dd3d3d;
  }
  .Modal .Footer .Button.Cancel {
    padding: 8px 0;
    color: var(--workspace-color);
    border: 2px solid var(--workspace-color);
    background: var(--main-background-color);
  }
  .Modal .Footer .Button.Cancel:hover {
    color: var(--main-background-color);
    background: var(--workspace-color);
  }
  .Modal :global(li.Found p) {
    font-size: 0.75rem;
  }
  @media (max-width: 640px) {
    .Modal section {
      top: 0;
      left: 0;
      transform: translate(0, 0);
      border-radius: 0;
      width: 100vw;
      height: 100vh;
      grid-template-rows: repeat(4, max-content);
    }
  }
</style>

<div class="Modal">
  <section>
    <NoDeletion />
    <p>
      You are about to delete
      <strong>"{pageInfo.name}"</strong>
      page. This operation cannot be undone.
      <br />
      <strong>Are you sure you want to continue?</strong>
    </p>
    <div class="Footer">
      <h5
        class="Button Cancel"
        on:click={() => {
          activeModal = false;
        }}>
        Cancel
      </h5>
      <h5 class="Button Deletion" on:click={() => remove()}>Delete</h5>
    </div>
  </section>
</div>
