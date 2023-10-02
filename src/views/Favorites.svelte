<script>
  import CityCard from "../components/CityCard.svelte";
  import {dispatch} from '../store.js'
  import {router} from 'tinro'
  import { blur } from 'svelte/transition'
  import Modal from '../components/Modal.svelte'
  import Add from './Add.svelte'

  let cities = ["Summerville, SC", "Black Mountain, NC", "Atlanta, GA"];
  let open = false

  function changeCurrentCity(city) {
    return () => {
      dispatch({type: 'SET_CURRENT', payload: city}).then(() => router.goto('/'))
    };
  }

  function openModal() {
    open = true
  }

  function addCity({detail}) {
    cities = [...cities, detail.city]
    open = false
  }

</script>
<div in:blur={{delay: 1000, duration: 1000}}>
<nav>
  <div>Favorites</div>
  <a href="#" on:click={openModal}>Add</a>
</nav>
<main>
  <section>
    {#each cities as city}
    <CityCard {city} 
      on:click={changeCurrentCity(city)} 
    />
    {/each}
  </section>
</main>
</div>
<Modal {open} on:close={_ => open = false}>
  <Add on:add={addCity} />
</Modal>
<style>
 nav {
   height: 24px;
   margin-bottom: 0;
   margin-left: 8px;
   margin-right: 8px;
 }
</style>
