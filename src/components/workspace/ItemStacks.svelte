<script>
  export let item = {
    tags: []
  }
  export let selected
</script>

<style>
.hash {
  font-size:  var(--item-font-size);
  color: white;
}
.hash.teaching {
  color: var(--teaching-workspace);
}
.hash.personal {
  color: var(--personal-workspace);
}
.hash.public {
  color: var(--public-workspace);
}
.hash.research {
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
{#each item.tags.filter(tag => tag.tagType !== 'mode') as tag}
<!-- We need to figure out a way to check the workspace of a tag -->
  <li class:selected><a href="/library/all/{encodeURIComponent(tag.name)}"><span class="hash">#</span> <span class="linkText">
    {tag.name}
  </span></a></li>
{/each}
</ul>