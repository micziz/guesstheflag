<script lang="ts">
  import { startPlaying } from "./components/country";
  import Game from "./components/game.svelte";
</script>

<main>
  <h1 class="title is-1">Guess The flag!</h1>

  {#if $startPlaying}
    <Game/>
  {:else}
    <div>
      <button class="button is-link is-outlined" on:click={() => startPlaying.set(true)}>
        Play    
      </button>
    </div>
  {/if}
</main>

<style>
  @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma-rtl.min.css";

  div{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1{
        text-align: center;
  }
</style>