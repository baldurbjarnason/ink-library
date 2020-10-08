<script>
  import {
    library as libraryStore,
    page as pageStore,
    error,
    params as paramsStore
  } from "../stores";
  import { publicationStores } from "../stores/utilities/publicationStores.js";
  import Nav from "../components/Nav.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import NotesSidebar from "../components/NotesSidebar.svelte";
  import SignIn from "../components/Auth/SignIn.svelte";
  import SignUp from "../components/Auth/SignUp.svelte";
  import SignInPage from "../components/Auth/SignInPage.svelte";
  import NoteEditDialog from "../components/notes/NoteEditDialog.svelte";
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  export let segment;
  let query;
  let params;
  let publication = false;
  let betaNotice = true;
  $: if ($page) {
    pageStore.set($page);
    query = $page.query;
    params = Object.assign({}, $page.params);
    if (segment) {
      params.segment = segment;
    } else {
      params.segment = "front";
    }
  }
  const { chapter } = publicationStores(page);
  $: if ($page.params && $page.params.publicationId) {
    publication = true;
  } else {
    publication = false;
  }
  let menu = true;
  $: if (segment === "library" && $page.query && $page.query.returnTo) {
    menu = true;
  } else {
    menu = false;
  }
</script>

<style global>
  @import "../../styles/**/*.css";
  @import "quill/dist/quill.snow.css";
  main,
  .content {
    position: relative;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  /* .content {
  } */
  .grid {
    display: grid;
    grid-template-columns: calc(var(--base) * 4) 1fr;
    min-height: 100vh;
  }
  @media (max-width: 720px) {
    .grid {
      display: flex;
      flex-direction: column;
    }
  }
  :root {
    --workspace-color: var(--all-workspace);
  }
  .content.Personal {
    --workspace-color: var(--personal-workspace);
  }
  .content.Public_Scholarships {
    --workspace-color: var(--public-workspace);
  }
  .content.Teaching {
    --workspace-color: var(--teaching-workspace);
  }
  .content.Research {
    --workspace-color: var(--research-workspace);
  }
  .content.publication,
  .content.unfinished {
    grid-column: 2 / -1;
    padding: 0;
  }

  .BetaNotice {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr min-content;
    z-index: 10;
    background-color: #e0f5f5;
    padding: 1rem 2rem;
    grid-column-gap: 1rem;
    backdrop-filter: blur(10px);
  }
  .BetaNotice span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 720px) {
    .grid {
      display: flex;
      flex-direction: column;
    }
    .content {
      padding: 0;
    }
    .grid.publication .content {
      background-color: var(--workspace-color);
    }
  }
</style>

<svelte:head>
  <meta name="csrftoken" content={$session.csrfToken} />
  <title>Library – {params.workspace || 'all'} – Rebus Ink</title>
</svelte:head>

{#if $error}
  {#if $error.response.body}
    <h1>Something went wrong.</h1>
    <p>See the error object below.</p>
    <p>
      <a href="/logout">Signing out</a>
      and then signing back in might help.
    </p>
    <pre>
      <code>{JSON.stringify($error, null, 2)}</code>
    </pre>
  {:else}
    <pre>
      <code>{JSON.stringify($error, null, 2)}</code>
    </pre>
  {/if}
{:else if !$session.user && !$page.path.startsWith('/sign-')}
  <div class="content unfinished">
    <SignIn path={$page.path} />
  </div>
  <!-- {:else if !$session.user && $page.path === '/sign-up'}
  <div class="content unfinished">
  <SignUp />
  </div>
{:else if !$session.user && $page.path === '/sign-in'}
  <div class="content unfinished">
  <SignInPage />
  </div> -->
{:else}
  {#if betaNotice}
    <div class="BetaNotice">
      <p>
        <strong>NOTE: This is a beta version of Rebus Ink.</strong>
        There will be bugs and changes, both expected and unexpected! To ask for
        help, stay up to date with new features, provide feedback and keep in
        touch with the team, please go to
        <a href="https://support.rebus.ink/">support.rebus.ink</a>
      </p>
      <span>
        <button
          class="GenericButton"
          on:click={() => {
            betaNotice = false;
          }}>
          Dismiss
        </button>
      </span>
    </div>
  {/if}
  <main class="grid" class:publication class:inChapter={$chapter.id}>
    <Nav {params} />
    <div class="content {params.workspace || 'unfinished'}" class:publication>
      <slot />
    </div>
  </main>
  <NoteEditDialog />
{/if}
