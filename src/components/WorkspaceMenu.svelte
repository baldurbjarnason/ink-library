<script>
  import { stores } from "@sapper/app";
  const { page } = stores();
  export let workspace;
</script>

<style>
  .Menu {
    display: none;
  }
  @media (max-width: 720px) {
    .Menu {
      display: flex;
      background-color: var(--workspace-color);
      border-radius: 0px 0px 15px 15px;
      color: white;
      font-weight: 600;
      padding: calc(var(--base) * 1.5) calc(var(--base) * 2) var(--base);
      justify-content: space-between;
      top: 0;
      position: sticky;
      z-index: 3;
    }
  }
  .Button {
    flex: 0 1 100%;
  }
  .Menu a {
    color: white !important;
    text-decoration: none;
  }
</style>

<div class="Menu">
  <a
    href="/library/{encodeURIComponent(workspace)}/?returnTo={encodeURIComponent($page.path)}"
    class="Button">
    All workspaces
  </a>
  <a
    href="/library/{encodeURIComponent(workspace)}/?returnTo={encodeURIComponent($page.path)}">
    <svg
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="21" height="3" rx="1.5" fill="white" />
      <rect y="8" width="21" height="3" rx="1.5" fill="white" />
      <rect y="16" width="11" height="3" rx="1.5" fill="white" />
    </svg>
  </a>

</div>
