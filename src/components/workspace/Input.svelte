<script>
  export let name
  export let placeholder = ""
  export let dark = false
  export let type = "text"
</script>

<style>
  .LabelText {
    font-weight: 600;
    font-size: 1rem;
  }
  .dark {
    color: white
  }
  input {
    width: 100%;
    font-size: 0.85rem;
    padding: calc(var(--base) * 0.5);
    margin: calc(var(--base) * 0.25) 0;
    border-radius: 15px;
    border: 1px solid #EEEEEE;
    background-color: white;
  }
  .dark input {
    border-color: transparent;
    color: #fff;
    background-color: rgba(255,255,255, 0.125);
  }
  input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(104,214,212,.6);
  }
  .dark input:focus {
    box-shadow: 0 0 2px 2px white;
  }
  .dark input::placeholder {
    color: rgba(255,255,255,0.8);
  }
</style>

<label class:dark>
<div class="LabelText">
  <slot></slot>
</div>
<input {type} name={name} id="input-{name}" {placeholder}></label>