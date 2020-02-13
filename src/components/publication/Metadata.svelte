
<script>
  import {publication, workspaces, page} from '../../stores'
  let cover = {}
  $: if ($publication.resources) {
    cover = $publication.resources.find(resource => resource.rel.indexOf('cover') !== -1)
    if (!cover) {
      cover = {
        href: "/img/placeholder-cover.jpg",
        rel: ["cover"]
      }
    }
  } else {
    cover = {
      href: "/img/placeholder-cover.jpg",
      rel: ["cover"]
    }
  }
  function languages (lang) {
    if (lang.english === "English") {
      return 'English'
    } if (!lang.english && !lang.native) {
      return lang.code
    } else {
      return [lang.native, lang.english].filter(item => item).join(' / ')
    }
  }
</script>

<style>
  .Image {
    max-width: 100%;
    height: auto;
    box-shadow: 3px 3px 10px rgba(192, 192, 192, 0.3);
    border-radius: 15px;
    margin: var(--base) 0;
  }
  .Metadata {
    font-size:  var(--item-font-size);
    margin: 0;
  }
  .Metadata dt {
    color: #999;
    font-weight: bold;
    margin: var(--base) 0 0;
  }
  .Metadata dd {
    font-weight: bold;
    margin: 0;
    padding: 0;
  }
</style>

<h2>Information</h2>
<img src="{cover.href}" alt="Cover for {$publication.name}" class="Image">
<dl class="Metadata">
  {#if $publication.numberOfPages}
    <dt>Pages</dt>
    <dd>{$publication.numberOfPages}</dd>
  {/if}
  {#if $publication.wordCount}
    <dt>Word Count</dt>
    <dd>{$publication.wordCount}</dd>
  {/if}
  {#if $publication.bookFormat}
    <dt>Format</dt>
    <dd>{$publication.bookFormat}</dd>
  {/if}
  {#if $publication.isbn}
    <dt>ISBN</dt>
    <dd>{$publication.isbn}</dd>
  {/if}
  {#if $publication.bookEdition}
    <dt>Edition</dt>
    <dd>{$publication.bookEdition}</dd>
  {/if}
  {#if $publication.copyrightYear}
    <dt>Year of Publicaiton</dt>
    <dd>{$publication.copyrightYear}</dd>
  {/if}
  {#if $publication.genre}
    <dt>Genre</dt>
    <dd>{$publication.genre}</dd>
  {/if}


  {#if $publication.inLanguage && $publication.inLanguage.length === 1}
      <dt>Language</dt>
     {:else if  $publication.inLanguage}
      <dt>Languages</dt>
  {/if}
  {#each $publication.inLanguage as language}
    <dd>{languages(language)}</dd>
  {/each}

  {#if $publication.author && $publication.author.length === 1}
      <dt>Author</dt>
     {:else if  $publication.author && $publication.author.length !== 0}
      <dt>Authors</dt>
  {/if}
  {#each $publication.author as author}
    <dd>{author.name}</dd>
  {/each}

  {#if $publication.editor && $publication.editor.length === 1}
      <dt>Editor</dt>
     {:else if  $publication.editor && $publication.editor.length !== 0}
      <dt>Editors</dt>
  {/if}
  {#each $publication.editor as editor}
    <dd>{editor.name}</dd>
  {/each}


  {#if $publication.illustrator && $publication.illustrator.length === 1}
      <dt>Illustrator</dt>
     {:else if  $publication.illustrator && $publication.illustrator.length !== 0}
      <dt>Illustrators</dt>
  {/if}
  {#each $publication.illustrator as illustrator}
    <dd>{illustrator.name}</dd>
  {/each}


  {#if $publication.publisher && $publication.publisher.length === 1}
      <dt>Publisher</dt>
     {:else if  $publication.publisher && $publication.publisher.length !== 0}
      <dt>Publishers</dt>
  {/if}
  {#each $publication.publisher as publisher}
    <dd>{publisher.name}</dd>
  {/each}

  {#if $publication.translator && $publication.translator.length === 1}
      <dt>Translator</dt>
     {:else if $publication.translator && $publication.translator.length !== 0}
      <dt>Translators</dt>
  {/if}
  {#each $publication.translator as translator}
    <dd>{translator.name}</dd>
  {/each}

  {#if ($publication.creator && $publication.creator.length !== 0) || ($publication.contributor && $publication.contributor.length !== 0)}
      <dt>Other contributions</dt>
  {/if}
  {#each $publication.creator as creator}
    <dd>{creator.name}</dd>
  {/each}
  {#each $publication.contributor as contributor}
    <dd>{contributor.name}</dd>
  {/each}

  <dt>Type</dt>
  <dd>{$publication.type.split(/(?=[A-Z])/).join(' ')}</dd>
</dl>