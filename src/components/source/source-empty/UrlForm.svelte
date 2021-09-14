<script>
    import Button from "../../widgets/Button.svelte";
    import { getToken } from "../../../getToken";
    import IcoGoBack from "../../img/IcoGoBack.svelte";
    import IcoEdit from "../../img/IcoEdit.svelte"
    export let source;
    export let resetDisplay;

    let url = source.links && source.links.length ? source.links[0].url : null;
    let editing = !url;
    async function submit(event) {
      event.preventDefault();
     let payload = source;
     payload.links = [{rel: "alternate", url: url}]
      try {
        await fetch(`/api/publication/${source.shortId}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "csrf-token": getToken(),
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error(err);
      }
      editing= false;

    }
    function close(event) {

        event.preventDefault();
        resetDisplay()
    }
    function openEdit(event) {
        event.preventDefault();
        editing = true;
    }
  </script>
  
  <style>
    .Pane {
        padding: 50px 10px;
    }
    h3 {
      padding: 40px 0;
      margin: 0;
      font-weight: bold;
      text-align: center;
    }

    .breadcrumbs {
        margin-bottom: 10px;
        padding: 0;
        border: none;
        background: transparent;
        display: flex;
        grid-template-columns: max-content 1fr;
        text-align: left;
        align-items: center;
        cursor: pointer;
        width: max-content;
        float: right;
    }
    .breadcrumbs h5 {
        color: #888888;
        font-weight: 500;
        margin: 0;
        margin-left: 5px;
    }
    @media (max-width: 720px) {
        .breadcrumbs {
        margin-bottom: 0;
        margin-top: 3px;
        grid-template-columns: max-content;
        }
        .breadcrumbs h5 {
        display: none;
        }
    }
    input[type="submit"]:hover {
        background: var(--rc-dark);
    }

    input {
        background: var(--main-background-color);
        border: none;
        border-radius: 10px;
        padding: 0 20px;
        margin: 0 20px 10px 20px;
        color: var(--workspace-color);
        outline: none;
        height: 30px;
        
    }
    textarea {
        background: var(--main-background-color);
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        margin: 0 20px 10px 20px;
        color: var(--workspace-color);
        outline: none;
        width: 250px;
    }
  </style>
  
  <div class="Pane">
    <button class="breadcrumbs" on:click={close}>
        <IcoGoBack />
        <h5>Back</h5>
      </button>        <h3>Url</h3>
        {#if url && !editing}
        <a href={url}>{url}</a>
        <span on:click={openEdit}><IcoEdit /></span>
        {/if}
        {#if editing}
        <form on:submit={submit}>
        <textarea type=textarea bind:value={url}/>
        <input type="submit" value="save" />
        </form>
        {/if}


  </div>
  