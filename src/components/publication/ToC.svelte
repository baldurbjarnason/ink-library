<script>
  // export let contents
</script>

<style>
  ol {
    margin: 0;
    padding-left: var(--base);
  }
  details {
    margin: 0;
    padding: 0;
  }
  details > summary {
    cursor: pointer;
    list-style: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22square%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M15%2018l-6-6%206-6%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%;
    background-size: 12px auto;
    border-radius: 8px;
    background-color: #f0f0f0;
  }
  details[open] > summary {
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22square%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%;
    background-size: 12px auto;
    background-color: transparent
  }
  details > summary::-webkit-details-marker {
    display: none;
  }
  li {
    padding: calc(var(--base) * 0.25) 0;
    margin: 0;
  }
  ol {
    counter-reset: section;                
    list-style-type: none;
  }
  li {
    counter-increment: section;  
  }
  .Level {
    display: block;
    padding: 0.25rem;
  }
  li .Level::before {          
    content: counters(section, ".") ". ";   
  }
  /* Level 1 */
  ol > li {
    font-size: var(--item-font-size);
    font-weight: 600;
  }
  /* Level 2 */
  ol > li ol > li {
    font-size: calc(var(--item-font-size) * 0.85);
    font-weight: 600;
    color: #444;
  }
  /* Level 3 */
  ol > li ol > li  ol > li {
    font-size: calc(var(--item-font-size) * 0.85);
    font-weight: 400;
    color: #666;
  }
  /* Level 4 */
  ol > li ol > li  ol > li  ol > li {
    font-size: calc(var(--item-font-size) * 0.85);
    font-weight: 400;
    color: #666;
    font-style: italic;
  }
</style>

<div class="ToC">
  <ol>
    <li>
    <details open>
      <summary><span class="Level">Level 1</span></summary>
      <ol>
        <li>
          <details open>
            <summary><span class="Level">Level 2</span></summary>
            <ol>
              <li><details open>
                <summary>
                  <span class="Level">Level 3</span>
                </summary>
                <ol>
                  <li><span class="Level">Level 4</span></li>
                  <li><span class="Level">Level 4</span></li>
                </ol>
              </details>
              </li>
              <li><span class="Level">Level 3</span></li>
            </ol>
          </details>
        </li>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
      </ol>
    </details>
    </li>
    <li>
      <span class="Level">Level 1</span>
      <ol>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
      </ol>
    </li>
    <li>
      <span class="Level">Level 1</span>
      <ol>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
      </ol>
    </li>
    <li>
      <span class="Level">Level 1</span>
      <ol>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
      </ol>
    </li>
    <li>
      <span class="Level">Level 1</span>
      <ol>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
      </ol>
    </li>
    <li>
      <span class="Level">Level 1</span>
      <ol>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
        <li>
          <span class="Level">Level 2</span>
          <ol>
            <li><span class="Level">Level 3</span></li>
            <li><span class="Level">Level 3</span></li>
          </ol>
        </li>
      </ol>
    </li>
  </ol>
</div>