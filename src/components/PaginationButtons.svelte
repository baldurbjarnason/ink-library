<script>
  import { page } from "../stores";
  import { goto } from "@sapper/app";
  export let itemsLenght;

  let changePage = (e) => {
    let queries = Object.assign({}, $page.query);
    let dir = e.target.ariaLabel === "Next" ? 1 : -1;

    if (!queries.page) queries["page"] = 2;
    else if (dir < 1 && parseInt(queries.page) < 3) delete queries.page;
    else queries.page = parseInt(queries.page) + dir;

    let mark = Object.keys(queries).length ? "?" : "";
    goto(`${$page.path}${mark}${new URLSearchParams(queries).toString()}`);
  };

  $: nextDisabled = itemsLenght === 10 ? false : true;
  $: prevDisabled =
    $page.query.page || parseInt($page.query.page) < 2 ? false : true;
</script>

<style>
  .Pagination {
    text-align: center;
    display: grid;
    gap: 70px;
    justify-content: center;
    padding-bottom: calc(var(--base) * 2);
    grid-template-columns: repeat(3, max-content);
  }
  .Pagination button {
    background: var(--action);
    border: none;
    width: 30px;
    height: 30px;
    display: grid;
    text-align: center;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 300;
    cursor: pointer;
    border-radius: 5px;
    padding: 0;
  }
  .Pagination button[aria-label="Prev"] {
    transform: rotate(180deg);
  }
  .Pagination button.nextDisabled,
  .Pagination button.prevDisabled {
    opacity: 0.3;
    cursor: default;
  }
  .Pagination p {
    margin: 0;
    line-height: 30px;
    font-weight: 500;
  }
</style>

<div class="Pagination">
  <button
    class:prevDisabled
    on:click={prevDisabled ? '' : changePage}
    aria-label="Prev">
    ›
  </button>
  <p>{$page.query.page || 1}</p>
  <button
    class:nextDisabled
    on:click={nextDisabled ? '' : changePage}
    aria-label="Next">
    ›
  </button>
</div>
