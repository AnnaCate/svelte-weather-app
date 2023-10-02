<script>
  import { fahrenheitToCelsius, celsiusToFahrenheit } from "temperature";
  import Weather from '../components/Weather.svelte'
  import { getJSON } from "../lib/async.js";
  import { store } from '../store.js'
  import { fade } from "svelte/transition";

  let temp = 21.7;
  let unit = "c";
  let displayTemp = "";

  // $: is a reactive indicator (specific to svelte)
  $: {
    displayTemp = `${Math.floor(temp)} &deg; ${unit.toUpperCase()}`;
    console.log(displayTemp);
  }
  function convertToF(temp) {
    const tempF = celsiusToFahrenheit(temp);
    temp = tempF
    unit = "f";
    return Math.ceil(tempF, 1)
  }

  function convertToC() {
    temp = fahrenheitToCelsius(temp);
    unit = "c";
  }
  
  const getWeather = async () => {
    // $store returns all of store
    const current = $store.current.toLowerCase().replace(
      ', ', ','
    )
    return getJSON(`/api/weather?city=${current}&country=us`).then(
      (results) => ({
        temp: `${convertToF(results.temp)} &deg; F`,
        icon: results.weather.icon,
        description: results.weather.description,
        city: `${results.city_name} ${results.state_code}`,
      })
    );
  }
</script>
<nav>
  <div>
    <a href="" on:click|preventDefault="{convertToF}">F</a>
    |
    <a href="" on:click|preventDefault="{convertToC}">C</a>
  </div>
  <a href="/favorites">Favorites</a>
</nav>
<main transition:fade={{duration:1000}}>
  <!-- <div>{@html displayTemp}</div> -->
  {#await getWeather()} Loading... 
  {:then weather}
  <Weather {...weather} />
  {:catch error}
  <div class="error">oopsie {error}</div>
  {/await}
</main>
<style>
  nav {
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }


</style>


