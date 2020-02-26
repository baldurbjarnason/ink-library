
<script>
  import {publication, workspaces, page} from '../../stores'
  export let form
  let languages
  if ($publication.inLanguage) {
    languages = [].concat($publication.inLanguage)
  } else {
    languages = []
  }
  function submit (event) {
    event.preventDefault();
  }
  const bookFormats = [
    'AudiobookFormat',
    'EBook',
    'GraphicNovel',
    'Hardcover',
    'Paperback'
  ]
  function validateLang (event) {
    const valid = event.target.checkValidity()
    if (!valid) {
      event.target.setCustomValidity("We don't recognise that as a language, sorry")
      event.target.reportValidity()
    }
  }
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

  <form id="newform" class="Metadata" action="/api/publication/{$publication.shortId}" on:submit={submit} bind:this={form}>
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
  {#each languages as language, index}
    <input name="inLanguage[{index}]" type="text" value="{language}">
  {/each}
    <input name="inLanguage[{languages.length + 1}]" type="text" minlength="2" maxlength="2" pattern="ab|aa|af|ak|sq|am|ar|an|hy|as|av|ae|ay|az|bm|ba|eu|be|bn|bh|bi|bs|br|bg|my|ca|km|ch|ce|ny|zh|cu|cv|kw|co|cr|hr|cs|da|dv|nl|dz|en|eo|et|ee|fo|fj|fi|fr|ff|gd|gl|lg|ka|de|ki|el|kl|gn|gu|ht|ha|he|hz|hi|ho|hu|is|io|ig|id|ia|ie|iu|ik|ga|it|ja|jv|kn|kr|ks|kk|rw|kv|kg|ko|kj|ku|ky|lo|la|lv|lb|li|ln|lt|lu|mk|mg|ms|ml|mt|gv|mi|mr|mh|ro|mn|na|nv|nd|ng|ne|se|no|nb|nn|ii|oc|oj|or|om|os|pi|pa|ps|fa|pl|pt|qu|rm|rn|ru|sm|sg|sa|sc|sr|sn|sd|si|sk|sl|so|st|nr|es|su|sw|ss|sv|tl|ty|tg|ta|tt|te|th|bo|ti|to|ts|tn|tr|tk|tw|ug|uk|ur|uz|ve|vi|vo|wa|cy|fy|wo|xh|yi|yo|za|zu" on:change={validateLang}>

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