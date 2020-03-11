<script>
import { stores } from "@sapper/app"
const {session} = stores()
</script>
<style>
h1 {
  margin-left: 100px;
}
dt {
  font-weight: bold;
}
.Profile {
  grid-column: 1 / -1;
}
</style>
<h1>Profile</h1>

<div class="Profile">
  
  <dl>
  <dt>Auth0 ID</dt>
  <dd>{$session.user.id}</dd>
  {#each Object.keys($session.user.profile) as prop}
  <dt>API Server: {prop}</dt>
  <dd>{$session.user.profile[prop]}</dd>
  {/each}
  </dl>

</div>