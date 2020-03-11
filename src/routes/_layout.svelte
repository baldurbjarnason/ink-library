<script>
  import { library as libraryStore, page as pageStore, error } from '../stores';
	import Nav from '../components/Nav.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import SignIn from '../components/Auth/SignIn.svelte'
  import SignUp from '../components/Auth/SignUp.svelte'
  import SignInPage from '../components/Auth/SignInPage.svelte'
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  export let segment;
  let query
  let params
  let publication = false
  $: if ($page) {
    pageStore.set($page)
    query = $page.query;
    params = Object.assign({}, $page.params);
    if (segment) {
      params.segment = segment
    } else {
      params.segment = 'front'
    }
  }
  $: if ($page.params && $page.params.publicationId) {
      publication = true
    } else {
      publication = false
    }
  let menu = true
  $: if (segment === 'library' && $page.query && $page.query.returnTo) {
    menu = true
  } else {
    menu = false
  }
</script>

<style global>
  @import '../../styles/**/*.css';
  @import 'quill/dist/quill.snow.css';
	main, .content {
		position: relative;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
  }
  .content {
    padding: calc(var(--base) * 2);
    padding-top: 0;
  }
  .grid {
    display: grid;
    grid-template-columns: calc(var(--base) * 4) calc(var(--base) * 14) 1fr;
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
  .content.publication, .content.unfinished {
    grid-column: 2 / -1;
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
  <meta name="csrftoken" content={$session.csrfToken}>
  <title>Library – {params.workspace || 'all'} – Rebus Ink</title>
</svelte:head>

{#if $error}
  {#if $error.response.body}
  <h1>Something went wrong.</h1>
  <p>See the error object below.</p>
  <p><a href="/logout">Signing out</a> and then signing back in might help.</p>
    <pre><code>{JSON.stringify($error, null, 2)}</code></pre>
  {:else}
    <pre><code>{JSON.stringify($error, null, 2)}</code></pre>
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
  <main class="grid" class:publication>
  {#if !menu}
    <Nav {params} />
    <Sidebar {params} />
  {/if}

  <div class="content {params.workspace || "unfinished"}" class:publication>
    <slot></slot>
  </div>
  </main>
{/if}