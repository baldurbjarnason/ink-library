<script>
  import { collections } from "../../stores";
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  let workspace;
  let tags;
  let collection;
  $: if ($page.params && $collections) {
    if ($page.params.publicationId) {
      workspace = null;
    } else if ($page.params.workspace) {
      workspace = $page.params.workspace;
    } else if ($page.params.segment === "library") {
      workspace = "all";
    } else {
      workspace = null;
    }
    collection = $page.query.collection;
    // Need to figure out a better way to filter collections by workspace
    if (workspace !== "all") {
      tags = $collections.filter(tag => tag.name.split("/")[0] === workspace);
    } else {
      tags = $collections;
    }
  }
  const spaces = ["Research", "Public_Scholarships", "Teaching", "Personal"];
  function getWorkspace(name) {
    const space = name.split("/")[0].replace(" ", "_");
    if (spaces.includes(space)) {
      return space.toLowerCase();
    } else {
      return "";
    }
  }
  function getName(name) {
    const space = name.split("/")[0].replace(" ", "_");
    if (spaces.includes(space)) {
      return name.replace(space + "/", "");
    } else {
      return name;
    }
  }
</script>

<style>
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .MenuCollections a {
    color: white !important;
    text-decoration: none;
    padding-left: 10rem;
    font-size: 1rem;
  }
</style>

<ol class="MenuCollections">
  {#each tags as tag}
    <li>
      <a
        href="/library/{workspace}/{encodeURIComponent(tag.name)}"
        class:selected={collection === tag.name}>
        <span class="hash {getWorkspace(tag.name)}">#</span>
        <span class="linkText">{getName(tag.name)}</span>
      </a>
    </li>
  {/each}
</ol>
