<script>
  let menu = ["About", "Metadata", "Related sources"];
  export let state;
  export let navState;
</script>

<style>
  section {
    display: grid;
    grid-template-columns: 10px 1fr;
    grid-gap: 20px;
    align-items: center;
  }
  p {
    font-size: 0.9rem;
    margin: 0 !important;
    font-weight: 500;
    cursor: pointer;
  }
  .active p {
    color: var(--action);
    cursor: default;
    font-weight: bolder;
  }
  .active span {
    width: 7px;
    height: 7px;
    border-radius: 2px;
    background: var(--action);
    float: left;
    transform: translateY(-2px) rotate(45deg);
  }

  @media (max-width: 720px) {
    nav {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 5px;
    }
    section {
      display: flex;
      flex-direction: column-reverse;
      grid-gap: 3px;
      margin: 0;
      text-align: center;
    }
    section > div {
      width: 100%;
    }
    .active span {
      width: 100%;
      height: 3px;
      border-radius: 10px;
      transform: inherit;
    }
  }
</style>

<nav>
  {#each menu as section}
    <section
      class={state === section ? 'active' : ''}
      on:click={navState(section)}>
      <div>
        {#if state === section}
          <span />
        {/if}
      </div>
      <p>{section}</p>
    </section>
  {/each}
</nav>
