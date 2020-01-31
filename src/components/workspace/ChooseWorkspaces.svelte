<script>
  import {workspaces} from '../../stores'
</script>

<style>
  /* Based on https://codepen.io/jensimmons/pen/KKPzxJa */
  @supports(-webkit-appearance: none) {
    input[type="checkbox"] {
      -webkit-appearance: none;
      width: 15px;
      height: 15px;
      background-color: var(--workspace-color);
      border-radius: 100%;
      margin: 0;
    }
    input.Research {
      background-color: var(--research-workspace);
      box-shadow: 0 0 0 2px var(--research-workspace), 1px 1px 5px #C32324;
    }
    input.Public {
      background-color: var(--public-workspace);
      box-shadow: 0 0 0 2px var(--public-workspace), 1px 1px 5px #316FB7;;
    }
    input.Teaching {
      background-color: var(--teaching-workspace);
      box-shadow: 0 0 0 2px var(--teaching-workspace), 1px 1px 5px rgba(147, 99, 210, 0.6);
    }
    input.Personal {
      background-color: var(--personal-workspace);
      box-shadow: 0 0 0 2px var(--personal-workspace), 1px 1px 5px #00A56A;
    }
    .selected input[type="checkbox"] {
      border-color: white;
    }
    input[type="checkbox"]:checked {
      position: relative;
      /* Do a bug fix to keep iOS from adding dark background. */
    }
    input[type="checkbox"]:checked::after {
      position: absolute;
      top: 4px;
      left: 3px;
      content: "";
      width: 7px;
      height: 3px;
      border: 2px solid white;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
    }
    .selected input[type="checkbox"]:checked::after {
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
    border: 1px solid #EEEEEE;
    background-color: #fff;
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
  <label><span class="visually-hidden">Research</span><input name="chooseWorkspace-research" class="Research" type="checkbox" value="{$workspaces.find(space => space.name === 'Research').id}"></label>
  <label><span class="visually-hidden">Teaching</span><input name="chooseWorkspace-teaching" class="Teaching" type="checkbox" value="{$workspaces.find(space => space.name === 'Teaching').id}"></label>
  <label><span class="visually-hidden">Public</span><input name="chooseWorkspace-public" class="Public" type="checkbox" value="{$workspaces.find(space => space.name === 'Public Scholarships').id}"></label>
  <label><span class="visually-hidden">Personal</span><input name="chooseWorkspace-personal" class="Personal" type="checkbox" value="{$workspaces.find(space => space.name === 'Personal').id}"></label>
</div>