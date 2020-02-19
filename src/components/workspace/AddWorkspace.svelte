<script>
  // your script goes here
  import {workspaces, addingWorkspace} from '../../stores'
  function change (event) {
    $addingWorkspace = event.target.dataset.name
  }
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
    input[value="all"] {
      background-color: var(--all-workspace);
      color: var(--all-workspace);
      /* box-shadow: 0 0 0 2px var(--research-workspace); */
    }
    input.Research {
      background-color: var(--research-workspace);
      color: var(--research-workspace);
      /* box-shadow: 0 0 0 2px var(--research-workspace); */
    }
    input.Public {
      background-color: var(--public-workspace);
      color: var(--public-workspace);
      /* box-shadow: 0 0 0 2px var(--public-workspace); */
    }
    input.Teaching {
      background-color: var(--teaching-workspace);
      color: var(--teaching-workspace);
      /* box-shadow: 0 0 0 2px var(--teaching-workspace); */
    }
    input.Personal {
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
@media (max-width: 720px) {
  .LabelText {
    font-size: 0.85rem;
  }
}
</style>
  <div class="LabelText">
    <slot></slot>
  </div>
<div class="Checks">
  <label><span class="visually-hidden">No Workspace</span><input type="radio" class="All" value="all" name="addWorkspace" checked data-name="all" on:change={change}></label>
  <label><span class="visually-hidden">Research</span><input type="radio" class="Research" value="{$workspaces.find(space => space.name === 'Research').id}" name="addWorkspace" data-name="Research" on:change={change}></label>
  <label><span class="visually-hidden">Teaching</span><input type="radio" class="Teaching" value="{$workspaces.find(space => space.name === 'Teaching').id}" name="addWorkspace" data-name="Teaching" on:change={change}></label>
  <label><span class="visually-hidden">Public</span><input type="radio" class="Public" value="{$workspaces.find(space => space.name === 'Public Scholarships').id}" name="addWorkspace" data-name="Public Scholarships" on:change={change}></label>
  <label><span class="visually-hidden">Personal</span><input type="radio" class="Personal" value="{$workspaces.find(space => space.name === 'Personal').id}" name="addWorkspace" data-name="Personal" on:change={change}></label>
</div>