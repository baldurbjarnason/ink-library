<script>
  import { publication } from "../../stores";
  let cover = {};
  $: if ($publication.resources) {
    cover = $publication.resources.find(
      resource => resource.rel.indexOf("cover") !== -1
    );
    if (!cover) {
      cover = {
        href: "/img/placeholder-cover.jpg",
        rel: ["cover"]
      };
    }
  } else {
    cover = {
      href: "/img/placeholder-cover.jpg",
      rel: ["cover"]
    };
  }
</script>

<style>
  .Image {
    width: 100%;
    height: auto;
    margin: auto;
    margin-bottom: var(--base);
    border: 1px solid #bdbdbd;
    max-width: 320px;
  }
</style>

<img src={cover.href} alt="Cover for {$publication.name}" class="Image Cover" />
