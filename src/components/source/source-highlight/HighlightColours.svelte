<script>
  import { scale } from "svelte/transition";
  import { elasticInOut } from "svelte/easing";

  export let tags;
  export let colour;
  let availableColours;
  $: availableColours = [].concat(tags).filter((tag) => tag.type === "colour");
  const names = {
    colour1: "Orange",
    colour2: "Pink",
    colour3: "Blue",
    colour4: "Green",
  };
  function nameToName(name) {
    return names[name];
  }
</script>

<style>
  label {
    display: inline-flex;
  }
  input.colour1 {
    background: #fea95b;
  }
  input.colour1::after {
    background: #d86801;
  }
  input.colour2 {
    background: #ff8ebe;
  }
  input.colour2::after {
    background: #c0004e;
  }
  input.colour3 {
    background: #6fe1fa;
  }
  input.colour3::after {
    background: #0693b2;
  }
  input.colour4 {
    background: #9fe793;
  }
  input.colour4::after {
    background: #589b4c;
  }
  .colour1 > .MainCircle {
    fill: #fea95b;
    /* stroke: #d86801; */
  }
  .colour2 > .MainCircle {
    fill: #ff8ebe;
    /* stroke: #c0004e; */
  }
  .colour3 > .MainCircle {
    fill: #6fe1fa;
    /* stroke: #0693b2; */
  }
  .colour4 > .MainCircle {
    fill: #9fe793;
    /* stroke: #589b4c; */
  }
  .colour1 > .Mark {
    fill: #d86801;
  }
  .colour2 > .Mark {
    fill: #c0004e;
  }
  .colour3 > .Mark {
    fill: #0693b2;
  }
  .colour4 > .Mark {
    fill: #589b4c;
  }
  .colours label {
    position: relative;
  }
  .colours input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }
  .colours input:focus + svg {
    outline: 3px solid #e55360;
    outline-offset: 2px;
  }
  .colours input:focus:not(:focus-visible) + svg {
    outline: none;
  }
  .Mark {
    transition: fill ease-in-out 250ms;
  }
  label,
  input {
    pointer-events: all;
  }
  li {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
  }
</style>

<li class="colours" id="highlight-color">
  {#each availableColours as theColour}
    <label>
      <span class="visually-hidden">{nameToName(theColour.name)}</span>
      <input
        name="noteColour"
        type="radio"
        class={theColour.name}
        bind:group={colour}
        value={theColour} />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        class={theColour.name}>
        <!-- The background -->
        <circle
          class="MainCircle"
          stroke="none"
          fill="none"
          cx="12"
          cy="12"
          r="8" />
        {#if colour === theColour}
          <circle
            class="Mark"
            stroke="none"
            fill="black"
            cx="12"
            cy="12"
            r="4"
            transition:scale|local={{ duration: 500, opacity: 0.5, easing: elasticInOut }} />
        {/if}
        <!-- The checkmark-->
        <!-- <polyline class="checkbox__checkmark" points="4,14 12,23 28,5" stroke="transparent" stroke-width="4" fill="none"></polyline> -->
      </svg>
    </label>
  {/each}
</li>
