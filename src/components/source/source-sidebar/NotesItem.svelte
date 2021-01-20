<script>
  export let item
</script>

<style>
  li {
    list-style: none;
    padding: 0 0.5rem 0 0.75rem;
    margin: 0;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }
  svg {
    min-width: 14px;
    margin-right: 0.25rem;
  }
</style>

<li>
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.25" y="0.75" width="11.5" height="14.5" rx="1.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M9.49994 1H10.9999V7.25C10.9999 7.66421 10.6642 8 10.2499 8C9.83573 8 9.49994 7.66421 9.49994 7.25V1Z" fill="currentColor"/>
    <path d="M4.49994 1H5.99994V7.25C5.99994 7.66421 5.66415 8 5.24994 8C4.83573 8 4.49994 7.66421 4.49994 7.25V1Z" fill="currentColor"/>
    <rect x="7.75677" y="3.74329" width="1.5" height="4.93031" rx="0.75" transform="rotate(45 7.75677 3.74329)" fill="currentColor"/>
    <rect width="1.5" height="4.9404" rx="0.75" transform="matrix(-0.707107 0.707107 0.707107 0.707107 7.76141 3.73615)" fill="currentColor"/>
    </svg> <span>{item.body[0].content}</span>
</li>