<script>
  import { pageItem, page, refreshPageItem } from "../../../stores";
  import { goto } from "@sapper/app";
  import { getToken } from "../../../getToken";
  import IcoGoBack from "../../img/IcoGoBack.svelte";
  import PageIcoOutline from "../../img/PageIcoOutline.svelte";
  import PageIcoMindmap from "../../img/PageIcoMindmap.svelte";
  import IcoStartArrow from "../../img/IcoStartArrow.svelte";
  import PageIcoGrouping from "../../img/PageIcoGrouping.svelte";
  import PageTitle from "./PageTitle.svelte";
  import Loader from "../../Loader.svelte";

  export let type;
  export let context;
  export let pageInfo;
  let loadItem = false;

  async function newEle() {
    loadItem = true;
    const payload = {};
    payload.canvasId = $page.params.pageId;
    payload.name = `${type.charAt(0).toUpperCase()}${type.slice(1)}-${
      pageInfo.name
    }`;

    try {
      await fetch(`/api/pages/${$pageItem.shortId}/${type}s`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "csrf-token": getToken(),
        },
      });

      $refreshPageItem = { id: $page.params.pageId, time: Date.now() };
      setTimeout(() => {
        loadItem = false;
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  }

  let assignIco = (icon) => {
    switch (icon) {
      case "outline":
        return PageIcoOutline;
      case "mindmap":
        return PageIcoMindmap;
      case "grouping":
        return PageIcoGrouping;
    }
  };

  let handleClick = () => {
    if (context) {
      goto(
        `${$page.path}/${type}s/${context.shortId}?notebook=${pageInfo.notebookId}`
      );
    } else {
      if (type === "outline" && !loadItem) newEle();
    }
  };
</script>

<style>
  .PageCard {
    background: #ffffff;
    border-radius: 20px;
    width: 100%;
    padding: 22px 0px;
    display: grid;
    gap: 3px;
    cursor: pointer;
    position: relative;
    border: 1px solid #eeeeee;
    grid-template-rows: repeat(3, max-content);
    transition: all 0.2s ease-out;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.05);
  }
  .PageCard .Icon {
    background: var(--main-background-color);
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin: 0 auto 20px;
    display: grid;
    align-items: center;
    justify-content: center;
  }
  .PageCard .Icon :global(svg) {
    color: var(--workspace-color);
  }
  .PageCard.outline .Icon :global(svg) {
    height: auto;
    width: 35px;
  }
  .PageCard h4,
  .PageCard p:not(.Unable) {
    margin: 0;
    font-weight: 600;
  }
  .PageCard h4 {
    color: var(--action);
    text-transform: capitalize;
  }
  .PageCard p:not(.Unable) {
    color: #333;
    font-size: 0.8rem;
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    gap: 8px;
    margin: 0 auto;
  }
  /*---- Empty ----*/
  .PageCard.Empty {
    box-shadow: inherit;
    border: 1px solid #dde8ed;
    background: var(--main-background-color);
  }
  .PageCard.Empty .Icon {
    background: #ffffff;
  }
  .PageCard.Empty .Icon :global(svg) {
    color: var(--action);
  }
  .PageCard.Empty p:not(.Unable) {
    color: var(--action);
  }
  .PageCard.Empty p span {
    width: 7px;
    height: 7px;
    position: relative;
  }
  .PageCard.Empty p span::before,
  .PageCard.Empty p span::after {
    content: "";
    width: 2px;
    height: 100%;
    background: var(--action);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .PageCard.Empty p span::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  .PageCard .Unable {
    display: none;
    background: rgba(0, 34, 48, 0.9);
    font-size: 0.75rem;
    color: #fff;
    padding: 7px;
    z-index: 1;
    font-weight: 500;
    bottom: 0;
    margin: 0;
    width: 80%;
    left: 50%;
    position: absolute;
    border-radius: 10px;
    transform: translate(-50%, calc(100% + 5px));
  }
  .PageCard .Unable::after {
    content: "";
    top: -10px;
    left: 50%;
    width: 0px;
    height: 0px;
    border-radius: 3px;
    position: absolute;
    border-style: solid;
    border-width: 7px;
    transform: translate(-50%, 3px) rotate(45deg);
    border-color: rgba(0, 34, 48, 0.9) transparent transparent
      rgba(0, 34, 48, 0.9);
  }
  .PageCard:hover .Unable {
    display: block;
  }
  .PageCard.Loader {
    overflow: hidden;
    height: 199px;
    padding: 0;
  }
  .PageCard.Loader :global(div.Loading) {
    margin: 5.5rem auto;
  }
</style>

{#if loadItem}
  <div class="PageCard Loader">
    <Loader />
  </div>
{:else}
  <div
    class={`PageCard ${type} ${context ? '' : 'Empty'}`}
    on:click={handleClick}>
    <div class="Icon">
      <svelte:component this={assignIco(type)} />
    </div>
    <h4>{type}</h4>
    {#if context}
      <p>
        Continue to work
        <IcoStartArrow />
      </p>
    {:else}
      <p>
        <span />
        New
      </p>
    {/if}
    {#if type !== 'outline'}
      <p class="Unable">Not available for the moment!</p>
    {/if}
  </div>
{/if}
