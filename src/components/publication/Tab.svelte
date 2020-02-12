<script>
  import {send, receive} from './crossfade.js';
  export let workspace
</script>

<style>

  .Tab {
    background-color: var(--workspace-color);
    border-radius: 0 0 50px 50px;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .Curve {
    position: absolute;
    left: 37px;
    top: -5px;
  }
  .LeftCurve {
    position: absolute;
    right: 37px;
    top: -5px;
    transform: scaleX(-1)
  }
</style>

  {#if workspace === 'all'}
    <span class="Tab"  out:send="{{key: 'publication-tabs-marker'}}" in:receive="{{key: 'publication-tabs-marker'}}">
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="Curve">
        <path d="M12 4.96552C5.2 4.96552 3.16667 12.3218 3 16L0 0L12 4.96552Z" fill="#002230"/>
      </svg>
    </span>
  {/if}
  {#if workspace === 'Research'}
    <span class="Tab"  out:send="{{key: 'publication-tabs-marker'}}" in:receive="{{key: 'publication-tabs-marker'}}">
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="Curve">
        <path d="M12 4.96552C5.2 4.96552 3.16667 12.3218 3 16L0 0L12 4.96552Z" fill="#002230"/>
      </svg>
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="LeftCurve">
        <path d="M12 4.96552C5.2 4.96552 3.16667 12.3218 3 16L0 0L12 4.96552Z" fill="#002230"/>
      </svg>
    </span>
  {/if}
  {#if workspace === 'Personal'}
    <span class="Tab"  out:send="{{key: 'publication-tabs-marker'}}" in:receive="{{key: 'publication-tabs-marker'}}">
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="Curve">
        <path d="M12 4.96552C5.2 4.96552 3.16667 12.3218 3 16L0 0L12 4.96552Z" fill="#002230"/>
      </svg>
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="LeftCurve">
        <path d="M12 4.96552C5.2 4.96552 3.16667 12.3218 3 16L0 0L12 4.96552Z" fill="#002230"/>
      </svg>
    </span>
  {/if}
  {#if workspace === 'Teaching'}
    <span class="Tab"  out:send="{{key: 'publication-tabs-marker'}}" in:receive="{{key: 'publication-tabs-marker'}}">
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="Curve">
        <path d="M12 4.96552C5.2 4.96552 3.16667 12.3218 3 16L0 0L12 4.96552Z" fill="#002230"/>
      </svg>
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="LeftCurve">
        <path d="M12 4.96552C5.2 4.96552 3.16667 12.3218 3 16L0 0L12 4.96552Z" fill="#002230"/>
      </svg>
    </span>
  {/if}
  {#if workspace === 'Public_Scholarship'}
    <span class="Tab"  out:send="{{key: 'publication-tabs-marker'}}" in:receive="{{key: 'publication-tabs-marker'}}">
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="Curve">
        <path d="M12 4.96552C5.2 4.96552 3.16667 12.3218 3 16L0 0L12 4.96552Z" fill="#002230"/>
      </svg>
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="LeftCurve">
        <path d="M12 4.96552C5.2 4.96552 3.16667 12.3218 3 16L0 0L12 4.96552Z" fill="#002230"/>
      </svg>
    </span>
  {/if}