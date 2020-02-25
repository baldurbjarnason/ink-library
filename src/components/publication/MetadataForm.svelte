
<script>
  import {publication, workspaces, page} from '../../stores'
  export let form
  function languages (lang) {
    if (lang.english === "English") {
      return 'English'
    } if (!lang.english && !lang.native && lang.code) {
      return lang.code
    } else {
      return [lang.native, lang.english].filter(item => item).join(' / ')
    }
  }
  async function submit (event) {
    event.preventDefault();
  }
  const bookFormats = [
    'AudiobookFormat',
    'EBook',
    'GraphicNovel',
    'Hardcover',
    'Paperback'
  ]
</script>

<style>
  .Metadata {
    font-size:  var(--item-font-size);
    margin: 0;
  }
  .Metadata label {
    color: #333;
    font-weight: bold;
    margin: var(--base) 0 0;
    display: block;
  }
  .Metadata input {
    margin: 0.5rem 0;
    padding: .25rem .5rem;
    border: 1px solid #eee;
    background-color: #f6f6f6;
    display: block;
    width: 100%;
  }
</style>

  <form id="newform" class="Metadata" action="/api/create-publication" on:submit={submit} bind:this={form}>
  <label for="numberOfPages">Pages</label>
  <input name="numberOfPages" type="text" value="{$publication.numberOfPages || ''}">
  <label for="wordCount">Word Count</label>
  <input name="wordCount" type="text" value="{$publication.wordCount || ''}">
  <label for="bookFormat">Format</label>
  <input name="bookFormat" type="text" value="{$publication.bookFormat || ''}" list="formats-list">

  <datalist id="formats-list">
  {#each bookFormats as format}
    <option value="{format}">
  {/each}
  </datalist>
  <label for="isbn">ISBN</label>
  <input name="isbn" type="text" value="{$publication.isbn || ''}">
  <label for="bookEdition">Edition</label>
  <input name="bookEdition" type="text" value="{$publication.bookEdition || ''}">
  <label for="copyrightYear">Year of Publication</label>
  <input name="copyrightYear" type="text" value="{$publication.copyrightYear || ''}">
  <label for="genre">Genre</label>
  <input name="genre" type="text" value="{$publication.genre || ''}">

{#if $publication.type !== 'loading'}

  {#if $publication._inLanguage && $publication._inLanguage.length === 1}
      <label>Language</label>
     {:else if  $publication._inLanguage}
      <label>Languages</label>
  {/if}
  {#each $publication._inLanguage as language}
    <dd>{languages(language)}</dd>
    {:else}
      Unknown
  {/each}

  {#if $publication.author && $publication.author.length === 1}
      <label>Author</label>
     {:else if  $publication.author && $publication.author.length !== 0}
      <label>Authors</label>
  {/if}
  {#each $publication.author as author}
    <dd>{author.name}</dd>
  {/each}

  {#if $publication.editor && $publication.editor.length === 1}
      <label>Editor</label>
     {:else if  $publication.editor && $publication.editor.length !== 0}
      <label>Editors</label>
  {/if}
  {#each $publication.editor as editor}
    <dd>{editor.name}</dd>
  {/each}


  {#if $publication.illustrator && $publication.illustrator.length === 1}
      <label>Illustrator</label>
     {:else if  $publication.illustrator && $publication.illustrator.length !== 0}
      <label>Illustrators</label>
  {/if}
  {#each $publication.illustrator as illustrator}
    <dd>{illustrator.name}</dd>
  {/each}


  {#if $publication.publisher && $publication.publisher.length === 1}
      <label>Publisher</label>
     {:else if  $publication.publisher && $publication.publisher.length !== 0}
      <label>Publishers</label>
  {/if}
  {#each $publication.publisher as publisher}
    <dd>{publisher.name}</dd>
  {/each}

  {#if $publication.translator && $publication.translator.length === 1}
      <label>Translator</label>
     {:else if $publication.translator && $publication.translator.length !== 0}
      <label>Translators</label>
  {/if}
  {#each $publication.translator as translator}
    <dd>{translator.name}</dd>
  {/each}

  {#if ($publication.creator && $publication.creator.length !== 0) || ($publication.contributor && $publication.contributor.length !== 0)}
      <label>Other contributions</label>
  {/if}
  {#each $publication.creator as creator}
    <dd>{creator.name}</dd>
  {/each}
  {#each $publication.contributor as contributor}
    <dd>{contributor.name}</dd>
  {/each}

  <label>Type</label>
  <dd>{$publication.type.split(/(?=[A-Z])/).join(' ')}</dd>
{/if}
</form>