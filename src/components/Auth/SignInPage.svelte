<script>
  import { stores } from "@sapper/app";
  import { getToken } from "../../getToken";
  const { page } = stores();
  let token;
  $: if (token && process.browser) {
    token.value = getToken();
  }
  let confirmInput;
  let passwordInput;
  function change() {
    if (confirmInput.value !== passwordInput.value) {
      confirmInput.setCustomValidity("Both passwords must match");
      confirmInput.reportValidity();
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
    border: 1px solid #eeeeee;
    background-color: white;
  }
  input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(104, 214, 212, 0.6);
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
  <h1>Sign In to Rebus Ink</h1>
  {#if $page.query.newUser === 'true'}
    <p>Use your new password to sign in.</p>
  {/if}
  <form action="/login" method="POST">
    <input type="hidden" name="_csrf" bind:this={token} />
    <label>
      <div class="LabelText">Email:</div>
      <input
        type="email"
        name="username"
        placeholder="example.email@example.com"
        autocomplete="username"
        required />
    </label>
    <label>
      <div class="LabelText">Password:</div>
      <input
        type="password"
        name="password"
        autocomplete="current-password"
        required
        bind:this={passwordInput} />
    </label>
    <button class="GenericButton">Sign In</button>
  </form>
</div>
