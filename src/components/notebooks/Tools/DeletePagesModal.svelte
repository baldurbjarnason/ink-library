<script>
  import NoDeletion from "../../img/NoDeletion.svelte";
  import IcoNotebook from "../../img/IcoNotebook.svelte";
  import NavSource from "../../img/NavSource.svelte";

  export let remove;
  export let activeModal;
  export let items;
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
  .Modal section ul {
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    max-height: 35vh;
    display: grid;
    gap: 10px;
  }
  .Modal .Footer {
    display: grid;
    gap: 30px;
    grid-template-columns: max-content max-content;
    justify-content: flex-end;
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
  li.Page {
    display: grid;
    grid-template-columns: max-content 1fr;
    float: left;
    border-radius: 10px;
    align-items: center;
    grid-gap: 10px;
    padding: 10px 20px;
    background: #dde8ed;
  }
  li.Page p {
    text-overflow: ellipsis;
    font-size: 0.8rem;
    font-weight: 500;
    color: #333;
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: inherit;
  }
  li.Page span {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    float: left;
    position: relative;
    background: #ffffff;
  }
  li.Page :global(svg) {
    width: 8px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

<div class="Modal Remove">
  <section>
    <NoDeletion />
    <p>
      You are about to delete {items.length} page{items.length > 1 ? 's' : ''}.
      This operation cannot be undone.
      <br />
      <strong>Are you sure you want to continue?</strong>
    </p>
    <ul>
      {#each items as item}
        <li class="Page">
          <span>
            <NavSource />
          </span>
          <p>{item.name}</p>
        </li>
      {/each}
    </ul>
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
