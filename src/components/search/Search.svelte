<script>
  import { getToken } from "../../getToken";
  import { searchResults } from "../../stores"

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
        }

        const result = await window.fetch("/api/search", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(requestBody),
            headers: {
            "Content-Type": "application/json",
            "csrf-token": getToken(),
            },
        });
        console.log(result)
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
        }
        if (value==="includeSources" && !includeSources) {
            name = false;
            description = false;
            abstract = false;
            attributions = false;
            keywords = false;
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

   
  </script>
  
  <style>
    .Button {
      background-color: var(--main-background-color);
      height: 34px;
      border-radius: 50px;
      width: 100px;
      position: relative;
      float: right;
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
        grid-template-columns: 200px 100px;
    }
    .second-line {
        display: grid;
        padding: 0 20px 20px 0;
        grid-template-columns: 150px 150px 150px;
    }

    h3 {
        padding-top: 10px;
        font-weight: 3;
    }

    form {
        padding-bottom: 40px;
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
                <div class="collection-selector">
                    </div>
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

                    <h3>Notebooks:</h3>
                    Name: <input 
                        type="checkbox"
                        bind:checked={notebookName}
                    />
                    <br/>
                    Description: <input 
                        type="checkbox"
                        bind:checked={notebookDescription}
                    />

            </div>
            {/if}


        </form>
   </div>
  