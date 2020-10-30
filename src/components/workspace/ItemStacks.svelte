<script>
  import IcoStack from "../img/IcoStack.svelte";
  export let item = {
    tags: []
  };
  export let selected = false;
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
  $: stackLength = item.tags.filter(tag => {
    if (tag.type === "stack") return tag;
  });
</script>

<style>
  .hash {
    font-size: var(--item-font-size);
    color: black;
  }
  .hash.teaching {
    color: var(--teaching-workspace);
  }
  .hash.personal {
    color: var(--personal-workspace);
  }
  .hash.public_scholarships {
    color: var(--public-workspace);
  }
  .hash.research {
    color: var(--research-workspace);
  }
  ul {
    position: relative;
    display: grid;
  }
  li {
    list-style: none;
    font-size: var(--item-font-size);
    padding: 0;
  }
  a:link {
    display: block;
    padding: 0;
    text-decoration: none;
    font-weight: 600;
    border-radius: 0px 50px 50px 0px;
  }
  .linkText {
    color: #333;
  }

  li a:hover {
    color: #333;
  }
  li a:hover .linkText {
    color: var(--link);
  }
  .More {
    font-weight: 400;
    color: #888888;
    font-size: 0.75rem;
  }
</style>

<ul>
  {#each item.tags.filter(tag => tag.type !== 'workspace') as tag, i}
    <!-- We need to figure out a way to check the workspace of a tag -->
    {#if i < 1}
      <li class:selected>
        <a href="/library/all/{encodeURIComponent(tag.name)}">
          <span class="hash {getWorkspace(tag.name)}">
            <IcoStack />
          </span>
          <span class="linkText">{getName(tag.name)}</span>
        </a>
      </li>
    {:else if i === 1}
      <span class="More">+{stackLength.length - 1} more stacks</span>
    {/if}
  {/each}
</ul>
