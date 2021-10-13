<script>
  import { getToken } from "../../getToken";
  import { searchResults } from "../../stores"

    let search = ""
  
    async function submit(e) {
        e.preventDefault();
        console.log(search)

        const result = await window.fetch("/api/search", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                search,
                includeNotes: true,
                includeSources: true,
                includeNotebooks: true
            }),
            headers: {
            "Content-Type": "application/json",
            "csrf-token": getToken(),
            },
        });
        $searchResults = await result.json()
    }

  
   
  </script>
  
  <style>
    .Button {
      background-color: var(--main-background-color);
      height: 34px;
      border-radius: 50px;
      width: 225px;
      position: relative;
      float: left;
    }
    .Button input {
      font-family: var(--sans-fonts);
      font-size: var(--item-font-size);
      border: none;
      font-weight: 700;
      background: transparent;
      position: absolute;
      top: 50%;
      left: 40px;
      width: calc(100% - 50px);
      height: 100%;
      transform: translateY(-50%);
      color: var(--action);
      transition: all 0.25s ease-out;
    }
    .Button input:focus {
      outline: none;
    }
    .Button:focus-within {
      background: #e5ecf2;
    }
    .Button input::placeholder {
      color: var(--action);
      opacity: 0.5;
      font-weight: 500;
    }
    .Button svg {
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
      margin: 0;
      width: 15px;
      height: 15px;
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
  </style>
  
   <div>
       <form on:submit={submit}>
            <input 
                type="text" 
                placeholder="search"   
                bind:value={search} />
            <input 
                class="Button" 
                type="submit" 
                value="submit"/>
        </form>
   </div>
  