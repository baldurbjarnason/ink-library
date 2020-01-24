<script>
  // your script goes here
</script>

<style>
  /* Based on https://codepen.io/jensimmons/pen/KKPzxJa */
  @supports(-webkit-appearance: none) {
    input[type="radio"] {
      -webkit-appearance: none;
      width: 15px;
      height: 15px;
      background-color: var(--workspace-color);
      border-radius: 100%;
      margin: 0;
    }
    input[value="research"] {
      background-color: var(--research-workspace);
      color: var(--research-workspace);
      box-shadow: 0 0 0 2px var(--research-workspace), 1px 1px 5px #C32324;
    }
    input[value="public"] {
      background-color: var(--public-workspace);
      color: var(--public-workspace);
      box-shadow: 0 0 0 2px var(--public-workspace), 1px 1px 5px #316FB7;;
    }
    input[value="teaching"] {
      background-color: var(--teaching-workspace);
      color: var(--teaching-workspace);
      box-shadow: 0 0 0 2px var(--teaching-workspace), 1px 1px 5px rgba(147, 99, 210, 0.6);
    }
    input[value="personal"] {
      background-color: var(--personal-workspace);
      color: var(--personal-workspace);
      box-shadow: 0 0 0 2px var(--personal-workspace), 1px 1px 5px #00A56A;
    }
    .selected input[type="radio"] {
      border-color: white;
    }
    input[type="radio"]:checked {
      position: relative;
      /* Do a bug fix to keep iOS from adding dark background. */
      background-color: white;
      box-shadow: 0 0 0 3px currentColor, inset 0 0 0 1px currentColor;
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
    background-color: #193C4A;
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