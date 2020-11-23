<script>
  import IcoEdit from "../../img/IcoEdit.svelte";
  import Closer from "../../widgets/Closer.svelte";
  import WhiteButton from "../../workspace/WhiteButton.svelte";
  import { send, receive } from "../../../routes/_crossfade.js";
  import { getToken } from "../../../getToken";
  import { refreshNotebook } from "../../../stores";

  export let notebook;
  let colours = ["colour1", "colour2", "colour3", "colour4"];
  let modal = false;
  let open = false;
  let noteColour, title, description, coverImg, selection;

  function click() {
    open = true;
    noteColour = notebook.settings.colour;
    coverImg =
      notebook.settings.coverImg ||
      coverImgs[~~(Math.random() * coverImgs.length)];
    title = notebook.name;
    description = notebook.description || "";
  }

  async function close() {
    open = false;
  }

  $: characters = description ? 150 - description.length : 150;

  let coverImgs = [
    "andrew-buchanan-s6GmUf009os",
    "ashkan-forouzani-B8j1vlRod0s",
    "ashkan-forouzani-JaWG0bWG8qM",
    "dustin-humes-SaWLpkDK_AI",
    "guillaume-lebelt-GNyy-D-SNN8",
    "henrik-donnestad-HO1Evlp1p1o",
    "jason-leung-UHR-NVbzBSA",
    "josep-martins-9lGNHu1FMvM",
    "mika-baumeister-MnUiMZ2fr7U",
    "mike-c-s-7HlJkjH3k60",
    "pawel-czerwinski-jJi1bjfBWYo",
    "photos-hobby-F7X3ADFWeNM",
    "steve-johnson-4ZD1g5oxwTo",
    "tools-for-motivation-KvTOwKoji7g",
    "wengang-zhai-ywfKB54yidY",
  ];

  async function submit(event) {
    event.preventDefault();
    close();

    if (title) {
      try {
        const payload = Object.assign({}, notebook);
        payload.name = title;
        payload.description = description;
        payload.settings.colour = noteColour;
        payload.settings.coverImg = coverImg;

        await window.fetch(`/api/notebooks/${notebook.shortId}`, {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "csrf-token": getToken(),
          },
        });

        $refreshNotebook = Date.now();
      } catch (err) {
        console.error(err);
      }
    }
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
    grid-template-columns: 1fr minmax(150px, 250px);
  }
  .left,
  .right {
    display: grid;
    grid-gap: 20px;
    position: relative;
  }
  .right {
    grid-template-rows: 15px 1fr;
  }
  .right .cover :global(svg) {
    float: left;
    transform: translateY(-4px);
  }
  .right .cover h5 {
    float: left;
    margin: 0;
    transform: translateX(3px);
  }
  .right .img {
    border: 2px solid var(--main-background-color);
    border-radius: 10px;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .right .img:hover {
    opacity: 0.5;
  }
  .footer {
    grid-column: 1/3;
  }
  .Characters {
    position: absolute;
    bottom: -25px;
    left: 0px;
    font-style: italic;
    opacity: 0.7;
    color: #ffffff;
    margin: 0;
    font-size: 0.9rem;
  }
  /* ------ Colours ------ */
  .colours {
    float: left;
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 15px);
    grid-column-gap: 20px;
  }
  .colours input {
    width: 15px;
    height: 15px;
    -webkit-appearance: none;
    border-radius: 50%;
    position: relative;
    padding: 0;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  .colours input:checked::after {
    content: "";
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
  input.colour1 {
    background: #fe5b5b;
  }
  input.colour1::after {
    background: #a43939;
  }
  input.colour2 {
    background: #b28eff;
  }
  input.colour2::after {
    background: #6f4c9b;
  }
  input.colour3 {
    background: #f7e482;
  }
  input.colour3::after {
    background: #8f7000;
  }
  input.colour4 {
    background: #7bdbc4;
  }
  input.colour4::after {
    background: #4c9b92;
  }
  /* ------ Editor ------ */
  input,
  textarea {
    outline: none;
    float: left;
    width: 100%;
    border: none;
    border-radius: 10px;
    color: var(--workspace-color);
  }
  input::placeholder,
  textarea::placeholder {
    opacity: 0.6;
  }
  input {
    height: 60px;
    font-size: 180%;
    padding: 0 20px;
  }
  textarea {
    height: 120px;
    resize: none;
    padding: 20px;
    font-size: var(--reader-font-size, 0.85rem);
  }
  .colour1 input::placeholder,
  .colour1 textarea::placeholder {
    color: #a43939;
  }
  .colour2 input::placeholder,
  .colour2 textarea::placeholder {
    color: #6f4c9b;
  }
  .colour3 input::placeholder,
  .colour3 textarea::placeholder {
    color: #8f7000;
  }
  .colour4 input::placeholder,
  .colour4 textarea::placeholder {
    color: #4c9b92;
  }
  /* ------ Footer btns ------ */
  :global(.Button) {
    float: right;
  }
  .newNote :global(button.Closer),
  .footer .Closer {
    width: 125px;
    height: 34px;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .newNote .Cancel :global(.Closer::after) {
    content: "Cancel";
    color: var(--main-background-color);
  }
  :global(.Closer:hover::after),
  .footer .Closer:hover {
    text-decoration: underline;
  }
  .NotebookModal :global(.Closer svg) {
    display: none;
  }
  /* ------ Modal ------ */
  .NotebookModal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    top: 0;
    left: 0;
    z-index: 5;
  }
  .NotebookModal section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .NotebookModal section {
    background: var(--main-background-color);
    border-radius: 10px;
    width: 50vw;
    height: 60vh;
    margin: 0;
    padding: 40px;
    overflow-y: scroll;
  }
  .NotebookModal ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0;
    padding: 0;
    grid-gap: 20px;
  }
  .NotebookModal li {
    height: 70px;
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.25s ease;
  }
  .NotebookModal li:hover:not(.active) {
    opacity: 0.6;
  }
  .NotebookModal li.active::after {
    content: "";
    position: absolute;
    border: 2px solid var(--workspace-color);
    top: -7px;
    left: -7px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 15px;
  }
  .NotebookModal p {
    margin: 0;
    font-size: 0.9rem;
    margin-bottom: 30px;
  }
  .NotebookModal .footer {
    float: left;
    position: fixed;
    left: 50%;
    width: 50vw;
    transform: translateX(-50%);
    top: calc(80vh + 20px);
  }
  .NotebookModal .Closer {
    float: right;
    cursor: pointer;
    color: var(--main-background-color);
  }
  .NotebookModal .Accept {
    background: var(--main-background-color);
    color: var(--workspace-color);
    border-radius: 10px;
  }
  .NotebookModal .Accept:hover {
    text-decoration: inherit;
  }
  .Edition {
    color: var(--action);
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.8rem;
    margin: 0;
    font-weight: 500;
    width: max-content;
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
    .colours {
      margin: 0 0 15px 0;
      width: 100%;
    }
    .left,
    .right {
      grid-column: 1/3;
    }
    .right {
      height: 150px;
    }
    .Characters {
      right: 0;
      left: inherit;
    }
    form {
      grid-gap: 40px;
      grid-template-columns: 1fr;
    }
    .footer :global(button.Submit) {
      max-width: 150px;
    }
    .NotebookModal section {
      width: 80vw;
      height: 70vh;
    }
    .NotebookModal .footer {
      top: calc(85vh + 20px);
      width: 80vw;
    }
    .NotebookModal ul {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    }
    .NotebookModal li {
      height: 90px;
    }
    .Edition {
      text-align: right;
    }
  }
</style>

{#if open}
  {#if modal}
    <div class="NotebookModal">
      <section>
        <p>Assign a coverture for you notebook :</p>
        <ul>
          {#each coverImgs as img}
            <li
              on:click={() => {
                selection = img;
              }}
              class={img === selection ? 'active' : ''}
              alt={img}
              style={`background-image: url("/img/NotebookImg/${img}.jpg")`} />
          {/each}
        </ul>
      </section>
      <div class="footer">
        <h5
          class="Closer Accept"
          on:click={() => {
            coverImg = selection;
            modal = false;
            document.querySelector('nav').classList.remove('ntbkModal');
          }}>
          Accept
        </h5>
        <h5
          class="Closer"
          on:click={() => {
            modal = false;
            document.querySelector('nav').classList.remove('ntbkModal');
          }}>
          Cancel
        </h5>
      </div>
    </div>
  {/if}
  <div
    class="NewBox newNote {noteColour}"
    out:send|local={{ key: 'new-box' }}
    in:receive|local={{ key: 'new-box' }}>
    <form
      id="newform"
      class="newForm"
      action="/api/create-publication"
      on:submit={submit}>
      <div class="left">
        <ul class="colours">
          {#each colours as colour}
            <li>
              <input
                name="noteColour"
                type="radio"
                class={colour}
                bind:group={noteColour}
                value={colour} />
            </li>
          {/each}
        </ul>
        <input
          required
          type="text"
          placeholder="Enter a new notebook tilte"
          bind:value={title} />
        <textarea
          placeholder="Add a descruption to your notebook (optional)"
          bind:value={description}
          maxlength="150" />
        <p class="Characters">{characters} characters left</p>
      </div>
      <div class="right">
        <div class="cover">
          <IcoEdit />
          <h5>Cover image</h5>
        </div>
        <div
          class="img"
          on:click={() => {
            modal = true;
            selection = coverImg;
            document.querySelector('nav').classList.add('ntbkModal');
          }}
          style={`background-image: url("/img/NotebookImg/${coverImg}.jpg")`} />
      </div>
      <div class="footer Cancel">
        <WhiteButton>Save</WhiteButton>
        <Closer click={close} dark={true} />
      </div>
    </form>
  </div>
  <span />
{:else}
  <p class="Edition" on:click={() => click()}>Edit notebook</p>
{/if}
