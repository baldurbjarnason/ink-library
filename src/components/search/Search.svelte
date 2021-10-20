<script>
  import { getToken } from "../../getToken";
  import { searchResults, notebooks } from "../../stores"
  import ArrowDropDown from "../img/ArrowDropDown.svelte"

     let notebookItems = [];
     $: if($notebooks.type !== "loading") {
         notebookItems = $notebooks.items
     }
//     $: notebookItems = $notebooks$ ? $notebooks$.items : [];
//     $: if (!notebookItems.length || notebookItems[0].id !== 'none') notebookItems.unshift({id: 'none', name: '--no notebook--'})

    let search = "";
    let includeNotes = true;
    let includeSources = true;
    let includeNotebooks = true;

    let includeHighlights = true;
    let includeComments = true;

    let name = true;
    let description = true;
    let abstract = true;
    let attributions = true;
    let keywords = true;

    let notebookName = true;
    let notebookDescription = true;

    let advancedOptions = false;
    let selectTypes = false;
    let selectedTypes = [];
    let selectedNotebook;

    let types = [
    "Article",
    "Blog",
    "Book",
    "Chapter",
    "Collection",
    "Comment",
    "Conversation",
    "Course",
    "Dataset",
    "Drawing",
    "Episode",
    "Manuscript",
    "Map",
    "MediaObject",
    "MusicRecordig",
    "Painting",
    "Photograph",
    "Play",
    "Poster",
    "PublicationIssue",
    "PublicationVolume",
    "Review",
    "ShortStory",
    "Thesis",
    "VisualArtwork",
    "WebContent"
  ];


    async function submit(e) {
        e.preventDefault();

        let requestBody = {
            search,
            includeNotes,
            includeSources,
            includeNotebooks
        }

        if (includeNotes) {
            requestBody.notes = {
                highlights: includeHighlights,
                comments: includeComments
            }
        }

        if (includeSources) {
            requestBody.sources = {
                name,
                description,
                abstract,
                attributions,
                keywords
            }

            if (selectTypes && selectedTypes.length) {
                requestBody.sources.types = selectedTypes
            }
        }

        if (selectedNotebook && includeNotes) {
            requestBody.notes.notebook = selectedNotebook.shortId
        }

        if (selectedNotebook && includeSources) {
            requestBody.sources.notebook = selectedNotebook.shortId
        }



        console.log(requestBody)

        const result = await window.fetch("/api/search", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(requestBody),
            headers: {
            "Content-Type": "application/json",
            "csrf-token": getToken(),
            },
        });
        $searchResults = await result.json()


    }

    function toggleAdvanced(e) {
        e.preventDefault();
        advancedOptions = !advancedOptions

    }

    function changeCheckbox(e) {
        let value = e.target.value;

        // notes
        if (value==="includeNotes" && includeNotes) {
            includeHighlights = true;
            includeComments = true;
        }
        if (value==="includeNotes" && !includeNotes) {
            includeHighlights = false;
            includeComments = false;
        }

        if (value==="includeHighlights" && includeHighlights) {
            includeNotes = true;
        }
        if (value==="includeComments" && includeComments) {
            includeNotes = true;
        }

        // sources
        if (value==="includeSources" && includeSources) {
            name = true;
            description = true;
            abstract = true;
            attributions = true;
            keywords = true;
            selectTypes = false;
        }
        if (value==="includeSources" && !includeSources) {
            name = false;
            description = false;
            abstract = false;
            attributions = false;
            keywords = false;
            selectTypes = false
        }
        if (
            (value==="name" && name) ||
            (value==="description" && description) ||
            (value==="abstract" && abstract) ||
            (value==="attributions" && attributions) ||
            (value==="keywords" && keywords)
        ) {
            includeSources = true;
        }

        if (value==="selectTypes" && selectTypes) {
            includeSources = true;
        }
        if(value==="selectTypes" && !selectTypes) {
            selectedTypes = [];

        }

        // notebooks
        if (value==="includeNotebooks" && includeNotebooks) {
            notebookName = true;
            notebookDescription = true;
        }
        if (value==="includeNotebooks" && !includeNotebooks) {
            notebookName = false;
            notebookDescription = false;
        }
        
    }

    function closeSearch(e) {
        e.preventDefault()
        search = "";
        includeNotes = true;
        includeSources = true;
        includeNotebooks = true;

        includeHighlights = true;
        includeComments = true;

        name = true;
        description = true;
        abstract = true;
        attributions = true;
        keywords = true;

        notebookName = true;
        notebookDescription = true;

        advancedOptions = false;
        $searchResults = null;
    }

    function selectType(e) {
        e.preventDefault()
        let type = e.target.value
        if(selectedTypes.indexOf(type) > -1) {
            selectedTypes = selectedTypes.filter(selected => selected !== type)
        } else {
            selectedTypes.push(type)
        }
    }



    function changeNotebook(input) {
      let value
      if (input && input.target) {
        value = input.target.value;
      }
      if (!value || value.label==="--no notebook--") {
        selectedNotebook = null;
      } else {
        const newNotebook = notebookItems.find(notebook => notebook.name === value)
        selectedNotebook = newNotebook
      }

    }

   
  </script>
  
  <style>
    .Button {
      background-color: var(--main-background-color);
      height: 34px;
      border-radius: 50px;
      width: 100px;
      position: relative;
      float: right;
      text-align: center;
      padding-left: 10px;
    }
    
    .Button:focus-within {
      background: #e5ecf2;
    }

    @media (max-width: 640px) {
      .Button {
        left: 0.5rem;
        right: 0.5rem;
        position: absolute;
        width: calc(100% - 80px);
        left: 40px;
        top: 0;
      }
    }

    .first-line {
        display: grid;
        padding: 20px 20px 0 0;
        grid-template-columns: 200px 110px 110px;
    }
    .second-line {
        display: grid;
        padding: 0 20px 20px 0;
        grid-template-columns: 150px 150px 150px;
    }

    .typesList {
        display: grid;
        grid-template-columns: 200px 200px 200px;
    }
    .type {
        padding: 0 10px;
    }

    h3 {
        padding-top: 10px;
        font-weight: 3;
    }

    form {
        padding-bottom: 40px;
    }
    .SelectNotebook {
        padding: 20px 0;
    }

  </style>
  
   <div>
       <form on:submit={submit}>
        <div class="first-line">
            <input 
                type="text" 
                placeholder="search"   
                bind:value={search} />
            <input 
                class="Button" 
                type="submit" 
                value="submit"/>
            <input class="Button close-button" on:click={closeSearch} value="close search"/>

            

        </div>
            <div class="second-line">
                <div>
                    Notes: <input 
                        type="checkbox"
                        bind:checked={includeNotes}
                        value="includeNotes"
                        on:change={changeCheckbox}
                    />
                </div>
                <div>
                    Sources: <input 
                        type="checkbox"
                        bind:checked={includeSources}
                        value="includeSources"
                        on:change={changeCheckbox}
                    />
                </div>
                <div>
                    Notebooks: <input 
                        type="checkbox"
                        bind:checked={includeNotebooks}
                        value="includeNotebooks"
                        on:change={changeCheckbox}
                    />
                </div>
            </div>

            <button on:click={toggleAdvanced}>Advanced options</button>
            {#if advancedOptions}

            <div class="advancedOptions">


                <div class="SelectNotebook">
                    <div>
                      <label>
                          Search in notebook: 
                        <ArrowDropDown />
                        <select name="pubType" on:blur={changeNotebook} id="select-defaultNotebook" value={selectedNotebook ? selectedNotebook.name : '--no notebook--'}>
                          {#each notebookItems as notebook}
                            <option value={notebook.name}>{notebook.name}</option>
                          {/each}
                        </select>
                      </label>
                    </div>
                </div>

                <h3>Notes</h3>
                    Highlights: <input 
                        type="checkbox"
                        bind:checked={includeHighlights}
                        value="includeHighlights"
                        on:change={changeCheckbox}
                    />
                    Comments: <input 
                        type="checkbox"
                        bind:checked={includeComments}
                        value="includeComments"
                        on:change={changeCheckbox}
                    />

                    
                    <h3>Sources</h3>
                    Title: <input 
                        type="checkbox"
                        bind:checked={name}
                        value="name"
                        on:change={changeCheckbox}
                    />
                    <br/>
                    Description: <input 
                        type="checkbox"
                        bind:checked={description}
                        value="description"
                        on:change={changeCheckbox}
                    />
                    <br/>
                    Abstract: <input 
                        type="checkbox"
                        bind:checked={abstract}
                        value="abstract"
                        on:change={changeCheckbox}
                    />
                    <br/>
                    Authors, Editors, etc. : <input 
                        type="checkbox"
                        bind:checked={attributions}
                        value="attributions"
                        on:change={changeCheckbox}
                    />
                    <br/>
                    Keywords: <input 
                        type="checkbox"
                        bind:checked={keywords}
                        value="keywords"
                        on:change={changeCheckbox}
                    />
                    <br/>
                    <input 
                        type="checkbox" 
                        bind:checked={selectTypes} 
                        value="selectTypes"
                        on:change={changeCheckbox}
                    /> Select types:
                    {#if selectTypes}
                    <div class="typesList">
                        {#each types as type}
                            <span class="type"> {type}:<input 
                                type="checkbox"
                                value={type}
                                on:change={selectType} />
                        
                            </span>

                        {/each}
                        </div>
                    {/if}

                    <h3>Notebooks:</h3>
                    Name: <input 
                        type="checkbox"
                        bind:checked={notebookName}
                        value="notebookName"
                        on:change={changeCheckbox}
                    />
                    <br/>
                    Description: <input 
                        type="checkbox"
                        bind:checked={notebookDescription}
                        value="notebookDescription"
                        on:change={changeCheckbox}
                    />


            </div>
            {/if}


        </form>
   </div>
  