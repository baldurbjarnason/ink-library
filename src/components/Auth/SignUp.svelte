<script>
import {getToken} from '../../getToken'
  let token
  $: if (token && process.browser) {
    token.value = getToken()
  }
let confirmInput
let passwordInput
function change () {
  if (confirmInput.value !== passwordInput.value) {
    confirmInput.setCustomValidity("Both passwords must match")
    confirmInput.reportValidity()
  }
}
</script>

<style>
.SignUp {
    height: 90vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
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
  label {
    display: flex;
    flex-direction: column;
  }
  .LabelText {
    font-weight: 600;
    font-size: 1rem;
  }
  form {

    width: 100%;
    max-width: 300px;
    display: grid;
    margin-top: 2rem;
    grid-gap: 1rem;
  }
  button {
    margin-top: 2rem;
  }
</style>

<div class="SignUp">
<h1>Sign Up for Rebus Ink</h1>
<form action="/api/signup" method="POST">
<input type="hidden" name="_csrf" bind:this={token}>
<label>
  <div class="LabelText">
    Email:
  </div>
  <input type="email" name="email" placeholder="example.email@example.com" autocomplete="username" required>
</label>
<label>
  <div class="LabelText">
    Password:
  </div>
  <input type="password" name="password" autocomplete="new-password" required  bind:this={passwordInput}>
</label>
<label>
  <div class="LabelText">
    Confirm Password:
  </div>
  <input type="password" name="passwordConfirm" autocomplete="new-password" required bind:this={confirmInput} on:change={change}>
</label>
<button class="GenericButton">Sign Up</button></form>
</div>