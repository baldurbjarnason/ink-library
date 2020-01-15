<script>
  import {send, receive} from '../_crossfade.js';
</script>
<style>
h1 {
  margin-left: 100px;
}
</style>
<h1 out:send="{{key: 'h1'}}" in:receive="{{key: 'h1'}}">Settings</h1>