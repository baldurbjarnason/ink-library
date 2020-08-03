<script>
  import { publication, workspaces, page } from "../../../stores";
  let returnLink;
  $: if ($page.path.endsWith("info") && $page.query.path) {
    returnLink = `/library/${$page.params.workspace}/${$page.params.collection}/${$page.params.publicationId}/${$page.query.path}`;
  } else if ($page.path.endsWith("info")) {
    returnLink = `/library/${$page.params.workspace}/${$page.params.collection}/${$page.params.publicationId}`;
  } else {
    returnLink = `/library/${$page.params.workspace}/${$page.params.collection}`;
  }
  let infoLink;
  $: if (!$page.path.endsWith("info") && $page.params.path) {
    infoLink = `/library/${$page.params.workspace}/${$page.params.collection}/${
      $page.params.publicationId
    }/info?path=${$page.params.path.join("/")}`;
  } else if (!$page.path.endsWith("info")) {
    infoLink = `/library/${$page.params.workspace}/${$page.params.collection}/${$page.params.publicationId}/info`;
  }
</script>

<style>
  .TitleBar {
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: var(--reader-titlebar-background);
    color: var(--reader-titlebar-color);
    position: sticky;
    top: 0;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 1rem 0.5rem;
  }
  .TitleBar ol li a,
  .TitleBar ol li button {
    color: var(--reader-titlebar-color);
  }
</style>

<nav class="TitleBar" aria-label="Publication">
  <ol>
    <li>
      <a href={returnLink}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            x="1.70688"
            y="5.29285"
            width="9"
            height="2"
            rx="0.999999"
            transform="rotate(45 1.70688 5.29285)"
            fill="currentColor"
            fill-opacity="0.8" />
          <rect
            x="1.99985"
            y="5.50012"
            width="12"
            height="2"
            rx="1"
            fill="currentColor"
            fill-opacity="0.8" />
          <rect
            x="7.77817"
            y="1.41418"
            width="9"
            height="2"
            rx="0.999999"
            transform="rotate(135 7.77817 1.41418)"
            fill="currentColor"
            fill-opacity="0.8" />
        </svg>
      </a>
    </li>
    <li>
      <span class="Title">{$publication.name || ''}</span>
    </li>
    <li>
      <a
        href={infoLink}
        aria-current={$page.path.endsWith('info') ? 'page' : null}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="8"
            cy="8"
            r="7.25"
            stroke="currentColor"
            stroke-opacity="0.8"
            stroke-width="1.5" />
          <rect
            x="7"
            y="6.5"
            width="2"
            height="6.5"
            rx="1"
            fill="currentColor"
            fill-opacity="0.8" />
          <circle
            cx="8"
            cy="4.5"
            r="1"
            fill="currentColor"
            fill-opacity="0.8" />
        </svg>
      </a>
    </li>
  </ol>
</nav>
