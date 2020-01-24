<script>
  // your script goes here
</script>

<style>
  /* Based on https://codepen.io/jensimmons/pen/KKPzxJa */
  @supports(-webkit-appearance: none) {
    input[type="radio"] {
      -webkit-appearance: none;
      width: 17px;
      height: 17px;
      border:1px solid rgba(255,255,255, 0.75);
      background-color: var(--workspace-color);
      border-radius: 100%;
      margin: 0;
    }
    input[value="research"] {
      background-color: var(--research-workspace);
      color: var(--research-workspace);
      /* box-shadow: 0 0 0 2px var(--research-workspace); */
    }
    input[value="public"] {
      background-color: var(--public-workspace);
      color: var(--public-workspace);
      /* box-shadow: 0 0 0 2px var(--public-workspace); */
    }
    input[value="teaching"] {
      background-color: var(--teaching-workspace);
      color: var(--teaching-workspace);
      /* box-shadow: 0 0 0 2px var(--teaching-workspace); */
    }
    input[value="personal"] {
      background-color: var(--personal-workspace);
      color: var(--personal-workspace);
      /* box-shadow: 0 0 0 2px var(--personal-workspace); */
    }
    .selected input[type="radio"] {
      border-color: white;
    }
    input[type="radio"]:checked {
      position: relative;
      /* Do a bug fix to keep iOS from adding dark background. */
      background-color: white;
      border-color: white;
      box-shadow: inset 0 0 0 3px currentColor;
    }
    /* input[type="radio"]:checked::after {
      content: " ";
      position: absolute;
      border-radius: 100%;
      background-color: white;
      width: 11px;
      height: 11px;
      top: 2px;
      left: 2px;
      border: none;
      border-right: none;
    } */
    .selected input[type="radio"]:checked::after {
      background-color: white;
    }
    input:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(104,214,212,.6);
    }
}
  .LabelText {
    font-weight: 600;
    font-size: 1rem;
  }
  .Checks {
    display: flex;
    padding: calc(var(--base)*0.5) calc(var(--base)*1.5);
    width: 100%;
    font-size: 0.85rem;
    margin: calc(var(--base) * 0.25) 0;
    border-radius: 15px;
    border-color: transparent;
    color: #fff;
    background-color: rgba(255,255,255, 0.125);
    justify-content: space-between;
  }
  label {
    display: flex;
  }
</style>
  <div class="LabelText">
    <slot></slot>
  </div>
<div class="Checks">
  <label><span class="visually-hidden">Research</span><input type="radio" value="research" name="add-workspace"></label>
  <label><span class="visually-hidden">Teaching</span><input type="radio" value="teaching" name="add-workspace"></label>
  <label><span class="visually-hidden">Public</span><input type="radio" value="public" name="add-workspace"></label>
  <label><span class="visually-hidden">Personal</span><input type="radio" value="personal" name="add-workspace"></label>
</div>