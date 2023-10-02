<script>
  import { createEventDispatcher } from 'svelte';
  import { scale } from "svelte/transition";
  export let open = false;
  const dispatch = createEventDispatcher();

  function handleCloseClick() {
    dispatch("close");
  }

  // action

  function modalAction(node) {
    let fns = [];
    if (document.body.style.overflow !== "hidden") {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      fns = [...fns, () => (document.body.style.overflow = original)];
    }
    return {
      destroy: () => fns.map((fn) => fn()),
    };
  }
</script>
{#if open}
<div use:modalAction on:click="{handleCloseClick}">
  <section on:click|stopPropagation>
    <aside in:scale out:scale={{duration:500}}>
      <!-- slot is like children -->
      <slot /> 
      <br />
      <button on:click|preventDefault="{handleCloseClick}">Close</button>
    </aside>
  </section>
</div>
{/if}
<style>
  section {
    height: 100%;
    display: grid;
    place-items: center;
  }
  aside {
    background-color: white;
  }
  div {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
</style>