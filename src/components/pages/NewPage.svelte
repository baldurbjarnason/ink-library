<script>
  import Button from "../widgets/Button.svelte";
  import Closer from "../widgets/Closer.svelte";
  import WhiteButton from "../workspace/WhiteButton.svelte";
  import { send, receive } from "../../routes/_crossfade.js";
  import { tick } from "svelte";
  import { getToken } from "../../getToken";
  import { refreshNotebook, page } from "../../stores";
  import { goto } from "@sapper/app";
  export let notebook;

  let open = false;
  let newToggle;

  async function close() {
    open = false;
    //await tick();
    //newToggle.querySelector("button").focus();
  }
  let title;

  let newPage = {
    name: "",
    notebookId: "",
  };

  async function submit(event) {
    event.preventDefault();
    close();

    if (title) {
      try {
        const payload = Object.assign({}, newPage);
        payload.name = title;
        payload.notebookId = notebook.shortId;

        await window.fetch(`/api/pages`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "csrf-token": getToken(),
          },
        });

        goto($page.path); //To be fixed
        $refreshNotebook = { id: notebook.id, time: Date.now() };
      } catch (err) {
        console.error(err);
      }
    }
  }

  function click() {
    open = !open;
    title = "";
  }
</script>

<style>
  .NewBox {
    position: absolute;
    background-color: var(--workspace-color);
    color: #fff;
    left: 20px;
    width: calc(100% - 40px);
    top: 20px;
    z-index: 3;
    border-radius: 30px;
    padding: 30px 40px;
  }
  form {
    width: 100%;
    display: grid;
    grid-gap: 20px;
  }
  /* ------ Editor ------ */
  input {
    outline: none;
    float: left;
    width: 100%;
    border: none;
    border-radius: 10px;
    color: var(--workspace-color);
    height: 60px;
    font-size: 180%;
    padding: 0 20px;
  }
  input::placeholder {
    opacity: 0.6;
  }
  /* ------ Footer btns ------ */
  :global(.Button) {
    float: right;
  }
  .newNote :global(button.Closer) {
    width: 125px;
    height: 34px;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .newNote :global(.Closer::after) {
    content: "Cancel";
    color: var(--main-background-color);
  }
  :global(.Closer:hover::after) {
    text-decoration: underline;
  }
  :global(.Closer svg) {
    display: none;
  }
  @media (max-width: 720px) {
    .NewBox {
      left: 0;
      top: 0;
      border-radius: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      position: fixed;
      align-items: center;
      display: flex;
    }
    :global(button.Closer),
    :global(button.Submit) {
      width: 50%;
      padding: 15px 0 !important;
      margin: 0 !important;
      font-size: 0.9rem;
      border-radius: 20px !important;
    }
    form {
      grid-gap: 40px;
      grid-template-columns: 1fr;
    }
    .footer :global(button.Submit) {
      max-width: 150px;
    }
  }
  h5 {
    cursor: pointer;
    font-weight: 500;
    text-decoration: underline;
    color: var(--action);
  }
</style>

{#if open}
  <div
    class="NewBox newNote">
    <form id="newform" class="newForm" on:submit={submit}>
      <input
        type="text"
        required
        placeholder="Enter a new page tilte"
        bind:value={title} />
      <div class="footer">
        <WhiteButton>Create</WhiteButton>
        <Closer click={close} dark={true} />
      </div>
    </form>
  </div>
{:else}
  <h5 on:click={click}>New page</h5>
{/if}
