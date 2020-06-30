<script>
import { stores } from "@sapper/app"
const {session} = stores()
</script>
<style>
h1 {
  margin-left: 100px;
  margin-top: 4rem;
}
dt {
  font-weight: bold;
}
.Profile {
  grid-column: 1 / -1;
  padding-top: 2rem;
  max-width: 600px;
  margin: 0 auto;
}
form {
  display: flex;
  justify-content: center;
}
</style>

<div class="Profile">

<form action="/logout" method="POST"><button class="GenericButton">Logout</button></form>


<h1>Profile</h1>
  
  <dl>
  <dt>Auth0 ID</dt>
  <dd>{$session.user.id}</dd>
  {#each Object.keys($session.user.profile) as prop}
  <dt>API Server: {prop}</dt>
  <dd>{$session.user.profile[prop]}</dd>
  {/each}
  </dl>

</div>