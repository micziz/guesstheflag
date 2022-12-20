<script lang="ts">
    import Flag from "./flag.svelte";
    import randomCountry from 'random-country'
    import { currentCountry, playing } from "./country.js";

    let flagGuess;
    let win = false;
    let lost = false;

    async function getCountries() {
        let country = randomCountry({ full: true })
        return country.toLowerCase()
    }

    async function getFlag(){
        let country = await getCountries()
        let data = await fetch(`https://restcountries.com/v3.1/name/${country}`)
        let json = await data.json()
        let val;
        Object.keys(json).forEach(function (key) {
          val = json[key];
          currentCountry.set(val.name.common.toLowerCase())
          return val;
        });
        return val;
    }

    function check(){
        playing.set(false)
        if ($currentCountry == flagGuess){
            win = true;
        } else {
            lost = true;
        }
    }

    let promise = getFlag()
</script>

<main>
    {#if $playing}
        {#await promise}
            <h1>Loading</h1>
        {:then data} 
            <div>
                <Flag src={data.flags.png}/>
    
            </div>
            <div>
                <form on:submit|preventDefault={check}>
                    <input type="text" bind:value={flagGuess} style="width: 24rem; font-size: 14pt;">
                </form>
            </div>
        {/await}
    {:else}

            {#if win}
                <h1 class="title is-2">You win</h1>
                <div>
                    <button class="button is-primary is-light" on:click={() => {
                        location.reload()
                    }}>
                        Play again
                    </button>
                </div>
            {:else if lost}
                <h1 class="title is-2">You lose! It was {$currentCountry}</h1>
                <div>
                    <button class="button is-primary is-light" on:click={() => {
                        location.reload()
                    }}>
                        Play again
                    </button>
                </div>
            {/if}
    {/if}


</main>

<style>
    @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma-rtl.min.css";

    h1{
        text-align: center;
    }

    div{
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>