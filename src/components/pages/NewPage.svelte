<script>
  import Button from "../widgets/Button.svelte";
  import Closer from "../widgets/Closer.svelte";
  import WhiteButton from "../workspace/WhiteButton.svelte";
  import { send, receive } from "../../routes/_crossfade.js";
  import { tick } from "svelte";
  import { getToken } from "../../getToken";
  import { refreshNotebook } from "../../stores";
  export let notebook;

  let open = false;
  let newToggle;

  async function close() {
    open = false;
    await tick();
    newToggle.querySelector("button").focus();
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

        $refreshNotebook = Date.now();
        console.log(payload);
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
  .new-button {
    justify-content: center;
    flex-direction: column;
    display: flex;
  }
  .new-button :global(.Button) {
    padding: 0.65rem 1.95rem 0.6rem;
  }
  .new-button :global(svg) {
    float: left;
  }
  .new-button :global(span) {
    float: left;
    margin-top: 2px;
    margin-left: 10px;
  }
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
    .new-button {
      position: fixed;
      right: var(--base);
      bottom: 50px;
    }
    .new-button :global(.Button) {
      box-shadow: 3px 1px 7px rgba(0, 0, 0, 0.2);
      padding: 0.65rem;
      border-radius: 100%;
      height: 60px;
      width: 60px;
      justify-content: center;
      align-items: center;
      display: flex;
    }
    .new-button :global(svg) {
      float: inherit;
      width: 25px;
      height: 25px;
    }
    .NewButtonLabel {
      display: none;
    }
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
</style>

{#if open}
  <div
    class="NewBox newNote"
    out:send|local={{ key: 'new-box' }}
    in:receive|local={{ key: 'new-box' }}>
    <form id="newform" class="newForm" on:submit={submit}>
      <input
        type="text"
        required
        placeholder="Enter a new notebook tilte"
        bind:value={title} />
      <div class="footer">
        <WhiteButton>Create</WhiteButton>
        <Closer click={close} dark={true} />
      </div>
    </form>
  </div>
{:else}
  <!--
  <span
    class="new-button"
    out:send|local={{ key: 'new-box' }}
    in:receive|local={{ key: 'new-box' }}
    bind:this={newToggle}>
    <Button {click}>
      <span class="NewButtonLabel">New page</span>
    </Button>
  </span>-->
  <h5 on:click={click}>New page</h5>
{/if}
