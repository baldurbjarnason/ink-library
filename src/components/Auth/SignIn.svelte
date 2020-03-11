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
</style>

<div class="SignIn">
<h1>Sign In to Rebus Ink</h1>
<form action="/login?returnTo={encodeURIComponent(path)}" method="POST"><button class="GenericButton">Login</button></form>
<!-- 
<p>Or, if you have never used Ink before:</p>
<p>
  <a href="/sign-up" class="GenericButton">Sign Up</a>
</p> -->
</div>