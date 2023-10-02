<script>
  import { createEventDispatcher } from "svelte";
  export let city;
  const dispatch = createEventDispatcher();

  function handleClick() {
    // "click" is the chosen word, but you can choose any word you want
    dispatch("click", { city });
  }
</script>
<!-- you need the on:click handleclick dispatch here in order
to be able to define it in Favorites -->
<aside on:click="{handleClick}">
  <h3>{city}</h3>
</aside>
<style>
  aside:hover {
    background-color: whitesmoke;
  }
</style>