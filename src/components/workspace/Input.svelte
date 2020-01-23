<script>
  export let name
  export let placeholder = ""
</script>

<style>
  .LabelText {
    font-weight: 600;
    font-size: 1rem;
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
  input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(104,214,212,.6);
  }
</style>

<label>
<div class="LabelText">
  <slot></slot>
</div>
<input type="text" name={name} id={name} {placeholder}></label>