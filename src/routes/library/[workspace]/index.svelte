<script>
  import { stores } from "@sapper/app";
  import { scale } from "svelte/transition";
  import { expoInOut } from "svelte/easing";
  import MenuCollections from "../../../components/workspace/MenuCollections.svelte";
  const { page } = stores();
  let returnTo = $page.query.returnTo;
</script>

<style>
  .Menu {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
    background-color: var(--workspace-color);
    color: white;
    display: flex;
    z-index: 10;
  }
  a.Closer {
    text-decoration: none;
    color: white !important;
    position: absolute;
    top: calc(var(--base) * 2);
    right: calc(var(--base) * 2);
  }
  ol {
    list-style: none;
    padding: 0 0 calc(var(--base) * 4);
    width: 100%;
    margin: auto;
  }
  .Menu a {
    text-decoration: none;
    color: white !important;
  }
  li.MainItem > a {
    padding: 1rem 2rem 1rem 7rem;
    display: block;
    font-size: 1.5rem;
    transition: font-size 125ms ease-in-out;
  }
  li.MainItem > .selected {
    font-size: 2.5rem;
    padding-left: 3rem;
    display: flex;
    align-items: center;
  }

  li.MainItem > .selected::before {
    display: block;
    content: "";
    border-bottom: 3px solid white;
    width: 5rem;
    height: 1px;
    margin-right: 2rem;
  }
  @media (max-width: 500px) {
    li.MainItem > a {
      font-size: 1.25rem;
    }
    li.MainItem > .selected {
      font-size: 2rem;
    }
  }
</style>

<nav
  aria-label="Ink Sections"
  class="Menu"
  transition:scale|local={{ delay: 250, duration: 350, easing: expoInOut }}>
  <a href={returnTo} class="Closer" aria-label="Return to Library">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="17.5"
        width="3"
        height="24.7487"
        rx="1.5"
        transform="rotate(45 17.5 0)"
        fill="currentColor" />
      <rect
        x="20.0001"
        y="17.5"
        width="3"
        height="24.7487"
        rx="1.5"
        transform="rotate(135 20.0001 17.5)"
        fill="currentColor" />
    </svg>
  </a>

  <ol>
    <li class="MainItem">
      <a
        href="/library/all/all"
        class:selected={$page.params.workspace === 'all'}>
        All Workspaces
      </a>
      {#if $page.params.workspace === 'all'}
        <MenuCollections workspace={$page.params.workspace} />
      {/if}
    </li>
    <li class="MainItem">
      <a
        href="/library/Research/all"
        class:selected={$page.params.workspace === 'Research'}>
        Research
      </a>
      {#if $page.params.workspace === 'Research'}
        <MenuCollections workspace={$page.params.workspace} />
      {/if}
    </li>
    <li class="MainItem">
      <a
        href="/library/Teaching/all"
        class:selected={$page.params.workspace === 'Teaching'}>
        Teaching
      </a>
      {#if $page.params.workspace === 'Teaching'}
        <MenuCollections workspace={$page.params.workspace} />
      {/if}
    </li>
    <li class="MainItem">
      <a
        href="/library/Public_Scholarship/all"
        class:selected={$page.params.workspace === 'Public_Scholarship'}>
        Public Scholarship
      </a>
      {#if $page.params.workspace === 'Public_Scholarship'}
        <MenuCollections workspace={$page.params.workspace} />
      {/if}
    </li>
    <li class="MainItem">
      <a
        href="/library/Personal/all"
        class:selected={$page.params.workspace === 'Personal'}>
        Personal
      </a>
      {#if $page.params.workspace === 'Personal'}
        <MenuCollections workspace={$page.params.workspace} />
      {/if}
    </li>
  </ol>
</nav>
