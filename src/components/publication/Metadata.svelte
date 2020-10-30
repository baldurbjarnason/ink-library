<script>
  import {
    publication,
    refreshPublication,
    workspaces,
    page
  } from "../../stores";
  import { typeName } from "../typeName.js";
  import IcoEdit from "../img/IcoEdit.svelte";
  import ArrowDropDown from "../img/ArrowDropDown.svelte";
  import MetadataLists from "./SourceInfo/MetadataLists.svelte";
  // export let form;
  export let save = false;
  /*
  function submit(event) {
    event.preventDefault();
  }
  function languages(lang) {
    if (lang.english === "English") {
      return "English";
    }
    if (!lang.english && !lang.native && lang.code) {
      return lang.code;
    } else {
      return [lang.native, lang.english].filter(item => item).join(" / ");
    }
  }*/

  $: metaProps = [
    {
      type: "list",
      req: true,
      prop: "Type",
      key: "type",
      value: $publication.type
    },
    {
      type: "array",
      req: true,
      prop: "Author(s)",
      key: "_author",
      value: $publication.author
    },
    {
      type: "array",
      req: true,
      prop: "Editor(s)",
      key: "_editor",
      value: $publication.editor
    },
    {
      type: "number",
      req: true,
      prop: "Year of publication",
      key: "copyrightYear",
      value: $publication.copyrightYear
    },
    {
      type: "number",
      req: true,
      prop: "Pages",
      key: "numberOfPages",
      value: $publication.numberOfPages
    },
    {
      type: "array",
      req: true,
      prop: "Publisher(s)",
      key: "_publisher",
      value: $publication.publisher
    },
    {
      type: "string",
      req: false,
      prop: "Edition",
      key: "bookEdition",
      value: $publication.bookEdition
    },
    {
      type: "string",
      req: false,
      prop: "ISBN",
      key: "isbn",
      value: $publication.isbn
    },
    {
      type: "list",
      req: false,
      prop: "Format",
      key: "bookFormat",
      value: $publication.bookFormat
    },
    {
      type: "string",
      req: false,
      prop: "Genre",
      key: "genre",
      value: $publication.genre
    },
    {
      type: "list",
      req: false,
      prop: "Language(s)",
      key: "inLanguage",
      value: $publication.inLanguage ? $publication.inLanguage : []
    },
    {
      type: "array",
      req: false,
      prop: "Illustrator(s)",
      key: "_illustrator",
      value: $publication.illustrator
    },
    {
      type: "array",
      req: false,
      prop: "Translator(s)",
      key: "_translator",
      value: $publication.translator
    },
    {
      type: "array",
      req: false,
      prop: "Creator(s)",
      key: "_creator",
      value: $publication.creator
    },
    {
      type: "number",
      req: false,
      prop: "Words count",
      key: "wordCount",
      value: $publication.wordCount
    }
  ];

  $: editing = undefined;
  let sendValue;
  let test = (sendVal, prop) => {
    if (newArr.length < 1) {
      newArr = [prop];
    } else {
      if (
        !newArr.find(item => {
          if (item.key === prop.key) return item;
        })
      )
        newArr = [...newArr, prop];
    }

    newArr.find(item => {
      if (item.key === prop.key) item.value = sendVal;
    });
  };

  let created = (input, prop) => {
    input.focus();
    if (Array.isArray(prop.value)) {
      sendValue = [];
      prop.value.map(item => {
        sendValue.push(item.name);
      });
    } else {
      sendValue = prop.value ? prop.value : "";
    }
  };
  let newArr = [],
    langArr = [];

  let clearAll = () => {
    $refreshPublication = { id: $publication.shortId, time: Date.now() };
    editing = undefined;
    sendValue = undefined;
    newArr = [];
  };

  $: typeValue = $publication.type ? $publication.type : "";
  $: formatValue = $publication.bookFormat ? $publication.bookFormat : "";
  $: langValue = $publication.inLanguage ? $publication.inLanguage : [];
</script>

<style>
  .Metadata {
    font-size: var(--item-font-size);
    margin: 0;
    grid-gap: 15px 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: calc(100% - 40px);
    margin: 0 auto;
  }
  .Metadata * {
    margin: 0;
  }
  section {
    display: grid;
    grid-gap: 5px;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: max-content;
  }
  .ico {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-100%, -2px);
  }
  section:hover .ico,
  .active .ico {
    display: block;
  }
  p {
    font-size: 0.9rem;
    line-height: 1.1rem;
    position: relative;
    cursor: pointer;
    word-break: break-word;
  }
  .changed::after {
    content: "";
    border-bottom: 2px solid var(--action);
    border-right: 2px solid var(--action);
    width: 3px;
    height: 7px;
    display: block;
    position: absolute;
    top: 50%;
    left: -13px;
    transform: translateY(-50%) rotate(45deg);
  }
  p.changed {
    color: var(--action);
    font-weight: 500;
  }
  section .input {
    min-height: 17px;
  }
  section:hover .input::before,
  .active .input::before {
    content: "";
    border: 1px solid #ddd;
    display: block;
    position: absolute;
    width: calc(100% + 10px);
    height: calc(100% + 5px);
    top: 50%;
    left: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
  }
  section .input:empty::after {
    content: attr(aria-label);
    color: #888888;
    font-style: italic;
  }
  .active .input::before {
    background: #ffffff;
  }
  .input {
    height: min-content;
  }
  input {
    outline: none;
    border: none;
    color: var(--action);
    cursor: auto;
    z-index: 1;
    position: relative;
    width: 100%;
  }
  .submit span {
    padding: 5px 30px;
    float: left;
    border-radius: 13px;
    cursor: pointer;
  }
  .cancel {
    color: var(--workspace-color);
  }
  .save {
    background: var(--workspace-color);
    color: #ffffff;
  }
  .submit {
    float: left;
    width: 100%;
    display: flex;
    margin-top: 30px;
    justify-content: flex-end;
  }
  .newProp {
    position: relative;
    align-items: center;
    transform: translateY(16px);
  }
  .newProp > p {
    color: var(--action);
    font-weight: 600;
    text-decoration: underline;
    position: relative;
  }
  .newProp :global(svg) {
    position: absolute;
    top: 3px;
    left: 110px;
  }
  .newProp > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }
  .newProp:focus-within :global(ul),
  .newProp:active :global(ul),
  .input:focus-within :global(.inputList),
  .input:active :global(.inputList) {
    display: block;
  }
  .newProp ul {
    display: none;
    list-style: none;
    background: #ffffff;
    background-color: #fff;
    position: absolute;
    border: 1px solid #eee;
    border-radius: 15px;
    padding: 5px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.03);
    width: 100%;
    bottom: 0;
    transform: translateY(100%);
    max-height: 200px;
    overflow-y: scroll;
    max-height: 230px;
  }
  .newProp li {
    font-size: 0.9rem;
    cursor: pointer;
    color: var(--all-workspace);
    font-weight: 500;
    border-radius: 8px;
    padding: 10px 20px;
  }
  .newProp li:hover {
    background: var(--main-background-color);
  }
  section:nth-child(n + 16) {
    display: none;
  }
  @media (max-width: 640px) {
    .Metadata {
      grid-template-columns: 1fr;
      width: 100%;
    }
    section {
      grid-template-columns: 160px 1fr;
    }
  }
</style>

<div class="Metadata">
  {#each metaProps as prop, i}
    {#if prop.req || (!prop.req && !Array.isArray(prop.value) && prop.value) || (!prop.req && Array.isArray(prop.value) && prop.value.length)}
      {#if editing === prop.key}
        <section class="active">
          <div class="ico">
            <IcoEdit />
          </div>
          <p>
            <strong>{prop.prop}</strong>
          </p>
          <p class="input">
            {#if prop.type === 'number'}
              <input
                type="number"
                name={prop.key}
                min="0"
                bind:value={sendValue}
                use:created={(this, prop)}
                on:input={test(sendValue, prop)} />
            {:else if prop.type === 'list'}
              <MetadataLists
                {prop}
                {test}
                itemValue={prop.prop === 'Type' ? typeValue : prop.prop === 'Format' ? formatValue : langValue} />
            {:else}
              <input
                type="text"
                name={prop.key}
                use:created={(this, prop)}
                bind:value={sendValue}
                on:input={test(sendValue, prop)} />
            {/if}
          </p>
        </section>
      {:else}
        <section on:click={() => (editing = prop.key)}>
          <div class="ico">
            <IcoEdit />
          </div>
          <p>
            <strong>{prop.prop}</strong>
          </p>
          <p
            class="input {newArr.find(item => item.key === prop.key) ? 'changed' : ''}"
            aria-label="{prop.prop}...">
            {#if Array.isArray(prop.value)}
              {prop.value.map(item => {
                return prop.key === 'inLanguage' ? ' ' + item : ' ' + item.name;
              })}
            {:else}{prop.value ? prop.value : ''}{/if}
          </p>
        </section>
      {/if}
    {/if}
  {/each}
  <section class="newProp">
    <p>
      Add more info
      <ArrowDropDown />
    </p>
    <input type="text" />
    <ul>
      {#each metaProps as prop, i}
        {#if !prop.req && ((!Array.isArray(prop.value) && !prop.value) || (Array.isArray(prop.value) && !prop.value.length))}
          <li on:click={() => ((prop.req = true), (editing = prop.key))}>
            {prop.prop}
          </li>
        {/if}
      {/each}
    </ul>
  </section>
</div>
{#if newArr.length}
  <div class="submit">
    <span class="cancel" on:click={() => clearAll()}>Cancel</span>
    <span class="save" on:click={() => save(newArr).then(clearAll())}>
      Save
    </span>
  </div>
{/if}
<!--

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
    <dt>Year of Publication</dt>
    <dd>{$publication.copyrightYear}</dd>
  {/if}
  {#if $publication.genre}
    <dt>Genre</dt>
    <dd>{$publication.genre}</dd>
  {/if}

  {#if $publication.type !== 'loading'}
    {#if $publication._inLanguage && $publication._inLanguage.length === 1}
      <dt>Language</dt>
    {:else if $publication._inLanguage}
      <dt>Languages</dt>
    {/if}
    {#each $publication._inLanguage as language}
      <dd>{languages(language)}</dd>
    {:else}Unknown{/each}

    {#if $publication.author && $publication.author.length === 1}
      <dt>Author</dt>
    {:else if $publication.author && $publication.author.length !== 0}
      <dt>Authors</dt>
    {/if}
    {#each $publication.author as author}
      <dd>{author.name}</dd>
    {/each}

    {#if $publication.editor && $publication.editor.length === 1}
      <dt>Editor</dt>
    {:else if $publication.editor && $publication.editor.length !== 0}
      <dt>Editors</dt>
    {/if}
    {#each $publication.editor as editor}
      <dd>{editor.name}</dd>
    {/each}

    {#if $publication.illustrator && $publication.illustrator.length === 1}
      <dt>Illustrator</dt>
    {:else if $publication.illustrator && $publication.illustrator.length !== 0}
      <dt>Illustrators</dt>
    {/if}
    {#each $publication.illustrator as illustrator}
      <dd>{illustrator.name}</dd>
    {/each}

    {#if $publication.publisher && $publication.publisher.length === 1}
      <dt>Publisher</dt>
    {:else if $publication.publisher && $publication.publisher.length !== 0}
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
    <dd>
      {typeName($publication.type)
        .split(/(?=[A-Z])/)
        .join(' ')}
    </dd>
  {/if}
</dl>-->
