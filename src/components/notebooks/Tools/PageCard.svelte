<script>
  import PageIcoOutline from "../../img/PageIcoOutline.svelte";
  export let item = {};
  let cover = { href: "/img/placeholder-cover.jpg" };
</script>

<style>
  .Item,
  .Item * {
    transition: all 0.25s ease-out;
  }
  a.Item {
    text-decoration: none;
    background-color: #fff;
    position: relative;
    border: 1px solid #eeeeee;
    border-radius: 15px;
    padding: 20px 30px;
    text-align: center;
    display: grid;
    align-items: center;
    grid-template-rows: 116px repeat(2, max-content);
    -webkit-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
    -moz-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
  }
  .circle {
    width: 102px;
    height: 102px;
    background: var(--third-blue);
    border-radius: 50%;
    opacity: 0.6;
    margin: 0 auto;
  }
  footer *,
  footer :global(ul) {
    margin: 0;
    padding: 0;
  }
  footer {
    display: grid;
    grid-gap: 5px;
    text-align: left;
    margin-top: 10px;
    grid-template-rows: max-content 35px;
  }
  .Title {
    font-weight: 600;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .Project {
    width: 35px;
    height: 100%;
    border-radius: 5px;
    display: grid;
    align-items: center;
    position: relative;
    border: 1px solid #eee;
  }
  .Project:hover {
    border: 1px solid #dde8ed;
    background: var(--main-background-color);
  }
  .Project :global(svg) {
    height: 15px;
    width: auto;
    margin: 0 auto;
    color: var(--workspace-color);
  }
  .Project p {
    display: none;
    background: rgba(0, 34, 48, 0.9);
    font-size: 0.7rem;
    color: #fff;
    padding: 3px 10px;
    font-weight: 500;
    bottom: 0;
    margin: 0;
    left: 50%;
    text-transform: capitalize;
    position: absolute;
    border-radius: 5px;
    transform: translate(-50%, calc(100% + 5px));
  }
  .Project:hover p {
    display: block;
  }
  .Project p::after {
    content: "";
    top: -9px;
    left: 50%;
    width: 0px;
    height: 0px;
    border-radius: 3px;
    position: absolute;
    border-style: solid;
    border-width: 6px;
    transform: translate(-50%, 3px) rotate(45deg);
    border-color: rgba(0, 34, 48, 0.9) transparent transparent
      rgba(0, 34, 48, 0.9);
  }
  .Empty {
    color: #888888;
    font-size: 0.75rem;
    font-weight: 500;
    transform: translateY(-3px);
  }
</style>

<a href="pages/{item.shortId}" class="Item">
  <span class="circle" />
  <footer>
    <h5 class="Title">{item.name}</h5>
    <div class="Projects">
      {#if item.noteContexts.length}
        {#each item.noteContexts as project}
          <a
            href={`pages/${item.shortId}/${project.type}s/${project.shortId}`}
            class="Project">
            <PageIcoOutline />
            <p>{project.type}</p>
          </a>
        {/each}
      {:else}
        <p class="Empty">Empty page...</p>
      {/if}
    </div>
  </footer>
</a>
