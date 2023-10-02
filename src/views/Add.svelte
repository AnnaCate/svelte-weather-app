<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let city = "";
  let selected = "";

  function submitCity() {
    dispatch("add", { city });
    selected = city;
    city = "";
  }
</script>
<main>
  <section>
    <h3>Add Location</h3>
    {#if selected !== ''}
    <div id="selected">selected: {selected}</div>
    {/if}
    <form on:submit|preventDefault="{submitCity}">
      <div>
        <label for="city">City</label>
        <input type="text" id="city" bind:value="{city}" />
      </div>
      <!--
      <div>
        <label for="country">Country</label>
        <select id="country">
          <option>-- select --</option>
        </select>
      </div>
      -->
      <div>
        <button id="add-btn">Add</button>
        <a href="">Cancel</a>
      </div>
    </form>
  </section>
</main>