<script>
export let path = '/'
</script>

<style>
.SignIn {
    height: 90vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.SignIn form {
  display: flex;
  flex-direction: column;
}
.SignIn label {
  margin: 1rem 0;
}
</style>

<div class="SignIn">
<h1>Sign In to Rebus Ink</h1>
<form action="/login?returnTo={encodeURIComponent(path)}" method="POST">

<label>
Beta Sign In Code <em>(required)</em><br>
<input type="password" name="betaCode" required /></label>

<button class="GenericButton">Login</button></form>
<!-- 
<p>Or, if you have never used Ink before:</p>
<p>
  <a href="/sign-up" class="GenericButton">Sign Up</a>
</p> -->
</div>