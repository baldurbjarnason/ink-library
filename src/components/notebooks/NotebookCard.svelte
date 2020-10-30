<script>
  import { page } from "../../stores";
  import IcoNotebook from "../img/IcoNotebook.svelte";
  export let notebook = {};

  let created = notebook.updated ? notebook.updated : "0000-00-00";
  let replyYear = Number(created.substr(0, 4));
  let replyMonth = Number(created.substr(5, 2));
  let replyDay = Number(created.substr(8, 2));

  let currentDate = new Date();
  let oldDate = new Date(replyYear, replyMonth - 1, replyDay);
  let oneDay = 1000 * 60 * 60 * 24;
  let daysSince = Math.floor(
    (currentDate.getTime() - oldDate.getTime()) / oneDay
  );

  let display =
    daysSince <= 0
      ? "today"
      : daysSince === 1
      ? "yesterday"
      : daysSince > 1 && daysSince < 32
      ? `${daysSince} days ago`
      : daysSince > 31 && daysSince < 63
      ? "a month ago"
      : daysSince > 62 && daysSince < 366
      ? `${Math.floor(daysSince / 30)} months ago`
      : daysSince > 365 && daysSince < 730
      ? `1 year ago`
      : `${Math.floor(daysSince / 365)} years ago`;

  //console.log(notebook);
</script>

<style>
  a {
    text-decoration: inherit !important;
    color: inherit;
  }
  .Item {
    display: grid;
    grid-template-rows: 150px auto;
    background-color: #fff;
    border: 1px solid #eeeeee;
    overflow: hidden;
    border-radius: 15px;
    -webkit-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
    -moz-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
  }
  .Img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .Info {
    display: grid;
    grid-template-columns: 34px 1fr;
    padding: 20px;
    grid-gap: 10px;
    min-width: 0;
  }
  .Icon {
    border-radius: 50%;
    width: 34px;
    height: 34px;
    position: relative;
  }
  h5 {
    font-weight: 600;
    margin: 0;
  }
  p {
    color: #888888;
    font-size: var(--item-font-size);
    margin: 0;
  }
  .Icon :global(svg) {
    width: 15px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .name,
  .Date {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .InfoContent {
    overflow: hidden;
  }
  /*----- Colours -----*/
  .Icon.colour1 {
    background: #f5e7e6;
  }
  .Icon.colour1 :global(svg) {
    color: #a43939;
  }
  .Icon.colour2 {
    background: #ede6f5;
  }
  .Icon.colour2 :global(svg) {
    color: #6f4c9b;
  }
  .Icon.colour3 {
    background: #fae59b;
  }
  .Icon.colour3 :global(svg) {
    color: #8f7000;
  }
  .Icon.colour4 {
    background: #dcf3f0;
  }
  .Icon.colour4 :global(svg) {
    color: #4c9b92;
  }
  @media (min-width: 721px) {
    a:only-child {
      width: calc(50% - var(--base) / 2);
    }
  }
</style>

<a href={`notebooks/${notebook.shortId}`}>
  <div class="Item">
    {#if notebook.settings.coverImg}
      <div
        class="Img"
        style={`background-image: url("/img/NotebookImg/${notebook.settings.coverImg}.jpg")`} />
    {:else}
      <div class="Img" style={'background-color: red'} />
    {/if}
    <div class="Info">
      <div class="Icon {notebook.settings.colour}">
        <IcoNotebook />
      </div>
      <div class="InfoContent">
        <h5 class="name">{notebook.name}</h5>
        <p class="Date">
          <strong>
            {notebook.published.substring(0, 16) === notebook.updated.substring(0, 16) ? 'Created' : 'Updated'}
          </strong>
          {display}
        </p>
      </div>
    </div>
  </div>
</a>
