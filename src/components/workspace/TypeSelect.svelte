<script>
  const types = [
  'Publication',
  'Article',
  'Blog',
  'Book',
  'Chapter',
  'Collection',
  'Comment',
  'Conversation',
  'Course',
  'Dataset',
  'Drawing',
  'Episode',
  'Manuscript',
  'Map',
  'MediaObject',
  'MusicRecordig',
  'Painting',
  'Photograph',
  'Play',
  'Poster',
  'PublicationIssue',
  'PublicationVolume',
  'Review',
  'ShortStory',
  'Thesis',
  'VisualArtwork',
  'WebContent']
  export let dark = false
</script>

<style>
  
  label,
  select,
  option {
    font-size: 0.85rem;
  }
  select {
    display: inline-block;
    color: var(--dark);
    box-sizing: border-box;
    border: none;
    border-radius: 2px;
    padding-right: 1.5rem;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2213%22%20height%3D%228%22%20viewBox%3D%220%200%2013%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6.5%208L0.00480908%200.5L12.9952%200.500001L6.5%208Z%22%20fill%3D%22%23002230%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, transparent 0%, transparent 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 8px auto, 100%;
    width: 100%;
    padding: calc(var(--base) * 0.5);
    margin: calc(var(--base) * 0.25) 0;
    border-radius: 15px;
    border: 1px solid #EEEEEE;
    font-size: 0.85rem;
  }
  select::-ms-expand {
    display: none;
  }
  select:hover {
    border-color: var(--rc-main);
    cursor: pointer;
  }
  .LabelText {
    font-weight: 600;
    font-size: 1rem;
  }
  .dark select {
    border-color: transparent;
    color: #fff;
    background-color: rgba(255,255,255, 0.125);
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2213%22%20height%3D%228%22%20viewBox%3D%220%200%2013%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6.5%208L0.00480908%200.5L12.9952%200.500001L6.5%208Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, transparent 0%, transparent 100%);
  }
</style>

<label class:dark>
<div class="LabelText">
  <slot></slot>
</div>
<select name="pubType" id="select-pubType">
{#each types as type}
  <option value="{type}">{type}</option>
{/each}
</select></label>