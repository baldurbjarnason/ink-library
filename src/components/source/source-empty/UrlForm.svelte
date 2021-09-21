<script>
    import Button from "../../widgets/Button.svelte";
    import { getToken } from "../../../getToken";
    import IcoGoBack from "../../img/IcoGoBack.svelte";
    import IcoEdit from "../../img/IcoEdit.svelte";
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

    input[type="submit"]:hover {
        background: var(--rc-dark);
    }

    .url-input {
      text-align: center;
      margin: 0 5%;
    }
    input {
        background: var(--main-background-color);
        border: auto;
        border-radius: 10px;
        padding: 0 20px;
        margin: 0 20px 10px 20px;
        color: var(--workspace-color);
        outline: none;
        height: 30px;
        
    }
    textarea {
        background: white;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        margin: 0 20px 10px 20px;
        color: var(--workspace-color);
        outline: none;
        width: 80%;
    }
  </style>
  
  <div class="Pane">
      <h3>Url</h3>
      <div class="url-input">
        {#if url && !editing}
        <a href={url}>{url}</a>
        <span on:click={openEdit}><IcoEdit /></span>
        {/if}
        {#if editing}
        <form on:submit={submit}>
        <textarea type=textarea bind:value={url}/>
        <br/>
        <input type="submit" value="save" />
        </form>
        {/if}
      </div>


  </div>
  