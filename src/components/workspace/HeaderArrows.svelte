<script>
  // your script goes here
  export let arrow;
</script>

<style>
  span {
      width: 9px;
      height: 9px;
      float: left;
      margin-top: 2px;
      position: relative;
      margin-right: .25rem;
  }
  span::before {
      content: '';
      width: 1px;
      height: 7px;
      background: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  span::after {
      content: '';
      width: 0; 
      height: 0; 
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
  }
  span.desc::after {
      border-bottom: 3px solid white;
      top: 0;
  }
  span.asc::after {
      border-top: 3px solid white;
      bottom: 0;
  }
  svg {
    margin-right: 0.25rem;
  }
</style>
{#if arrow}
    <span class={arrow}></span>
{:else}
    <svg width="9" height="9" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="1" height="8" fill="currentColor"/>
        <path d="M2.5 0L4.66506 3.75H0.334936L2.5 0Z" fill="currentColor"/>
        <rect x="8" y="8" width="1" height="8" transform="rotate(-180 8 8)" fill="currentColor"/>
        <path d="M7.5 11L5.33494 7.25L9.66506 7.25L7.5 11Z" fill="currentColor"/>
    </svg>
{/if} 