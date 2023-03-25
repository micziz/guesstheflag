<script lang="ts">
    import Flag from "./flag.svelte";
    import { playing, theFourStore, flag, winningCountryStore, regen, startPlaying } from "./country.js";
    import shuffle from 'shuffle-array'
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    let win = false;
    let lose = false;

    async function handle(country){
        if (country === regionNames.of($winningCountryStore)){
            win = true            
        } else {
            lose = true            
        }
        $playing = false
        await sleep(2000)
        await regen()
        win = false;
        lose = false;
        $playing = true
    }

</script>

<main>
    {#if $playing}
        <div>
            <Flag src={$flag}/>
        </div>
        <div id="btns">
            {#each shuffle($theFourStore) as country}
                <button class="button is-link is-outlined" style="margin-right: 2rem;" on:click={async () => {
                    await handle(country) 
                }}>
                    {country.replace("amp;", "")}
                </button>
            {/each}
        </div>            
    {:else}
        {#if win}
            <h1>Correct</h1>
        {:else if lose}
            <h1>Incorrect it was {regionNames.of($winningCountryStore)}</h1>
            
            <div>
                <Flag src={$flag}/>
            </div>
        {/if}

        <div>
            <button class="button is-link is-outlined" on:click={() => {playing.set(true)}}>Play again</button>
        </div>
        
        {/if}
    
    <div>
        <button class="button is-link is-outlined" on:click={async () => {
            startPlaying.set(false)
            await regen()
        }}>Exit</button>
    </div>


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
        margin-top: 2rem;
    }
    #btns{
        display: flex;
        justify-content: center;
        flex-direction: row;
        margin-top: 2rem;
    }
</style>