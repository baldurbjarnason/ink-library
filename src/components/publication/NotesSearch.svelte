<script>
  import { notesSearch } from "../../stores";
  let search;
  function input() {
    if (search && search.value) {
      $notesSearch = search.value;
    } else {
      $notesSearch = "";
    }
  }
</script>

<style>
  label {
    position: relative;
  }
  input {
    border-radius: 50px;
    background-color: #f5f7fd;
    border: 1px solid #cccccc;
    width: 100%;
    height: 2rem;
    padding: 1rem;
    display: block;
    font-size: 0.85rem;
  }
  input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(104, 214, 212, 0.6);
  }
  svg {
    position: absolute;
    top: 10px;
    right: 1.5rem;
    pointer-events: none;
  }
</style>

<label>
  <span class="visually-hidden">Search</span>
  <input
    type="text"
    name="notes-search"
    id="notes-search"
    autocomplete="off"
    bind:this={search}
    on:input={input}
    placeholder="Search notes..." />
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="SVGicon">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.9706 14C12.6971 14 12.4377 13.8936 12.2459 13.6987L8.40195
      9.8592L8.23498 9.96556C7.38235 10.4973 6.39827 10.7774 5.38933
      10.7774C2.41934 10.7774 0 8.35958 0 5.38871C0 2.41783 2.41934 0 5.38933
      0C8.35932 0 10.7787 2.41783 10.7787 5.38871C10.7787 6.39554 10.498 7.38111
      9.96511 8.2355L9.86208 8.40213L13.6989 12.238C14.1004 12.6422 14.1004
      13.2945 13.6989 13.6987C13.5035 13.8936 13.2477 14 12.9706 14ZM5.38933
      1.11319C3.03039 1.11319 1.11197 3.03115 1.11197 5.38871C1.11197 7.74626
      3.03039 9.66422 5.38933 9.66422C7.74827 9.66422 9.66669 7.74626 9.66669
      5.38871C9.66669 3.03115 7.74827 1.11319 5.38933 1.11319Z"
      fill="#002230" />
  </svg>
</label>
