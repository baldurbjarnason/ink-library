<script>
  export let item = {
    tags: []
  }
  export let selected = false
  const spaces = ['Research', 'Public_Scholarships', 'Teaching', 'Personal']
  function getWorkspace (name) {
    const space = name.split('/')[0].replace(' ', '_')
    if (spaces.includes(space)) {
      return space
    } else {
      return 'all'
    }
  }
  function getName (name) {
    const space = name.split('/')[0].replace(' ', '_')
    if (spaces.includes(space)) {
      return name.replace(space + '/', '')
    } else {
      return name
    }
  }
</script>

<style>
.hash {
  font-size:  var(--item-font-size);
  color: black;
}
.hash.Teaching {
  color: var(--teaching-workspace);
}
.hash.Personal {
  color: var(--personal-workspace);
}
.hash.Public_Scholarships {
  color: var(--public-workspace);
}
.hash.Research {
  color: var(--research-workspace);
}
ul {
  margin: 0;
  padding: calc(var(--base) * 0.5) 0;
}
li {
  list-style: none;
  font-size:  var(--item-font-size);
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
.selected .linkText {
  color: white;
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
  <li class:selected><a href="/library/{getWorkspace(tag.name)}/{encodeURIComponent(tag.name)}/{item.shortId}"><span class="hash {getWorkspace(tag.name)}">#</span> <span class="linkText">
    {getName(tag.name)}
  </span></a></li>
{/each}
</ul>