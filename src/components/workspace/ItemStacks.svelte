<script>
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
    margin: 0;
    padding: calc(var(--base) * 0.5) 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: inherit;
    max-height: 42px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
</style>

<ul>
  {#each item.tags.filter(tag => tag.type !== 'workspace') as tag}
    <!-- We need to figure out a way to check the workspace of a tag -->
    <li class:selected>
      <a href="/library/all/{encodeURIComponent(tag.name)}">
        <span class="hash {getWorkspace(tag.name)}">
          <svg
            width="12"
            height="12"
            viewBox="0 0 158 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M65.5251 31.7012C66.256 31.3148 67.1307 31.3148 67.8617
              31.7012L129.069 64.0553C130.626 64.8781 130.677 67.0892 129.16
              67.983L67.9625 104.044C67.1793 104.505 66.2074 104.505 65.4242
              104.044L4.22665 67.983C2.70979 67.0892 2.7609 64.8781 4.31744
              64.0553L65.5251 31.7012Z"
              fill="currentColor" />
            <rect
              x="8.41211"
              y="81.5928"
              width="76.4469"
              height="11.6562"
              rx="5.8281"
              transform="rotate(30 8.41211 81.5928)"
              fill="currentColor" />
            <rect
              width="76.4176"
              height="11.6562"
              rx="5.8281"
              transform="matrix(-0.866025 0.5 0.5 0.866025 124.974 81.5928)"
              fill="currentColor" />
            <rect
              x="8.41211"
              y="108.791"
              width="76.4469"
              height="11.6562"
              rx="5.8281"
              transform="rotate(30 8.41211 108.791)"
              fill="currentColor" />
            <rect
              width="76.4176"
              height="11.6562"
              rx="5.8281"
              transform="matrix(-0.866025 0.5 0.5 0.866025 124.974 108.791)"
              fill="currentColor" />
          </svg>
        </span>
        <span class="linkText">{getName(tag.name)}</span>
      </a>
    </li>
  {/each}
</ul>
