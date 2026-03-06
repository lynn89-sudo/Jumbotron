<script>
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import { onMount } from "svelte";

    import { proccessEventCity } from "$lib/event.js";
    import { proccessCity } from "$lib/event.js";
    import { checkCity } from "$lib/event.js";

    onMount(async function() {
        console.log("Checking city name...")
       if (await checkCity(proccessCity(page.params.city)) == true) {
        console.log("City name is valid!")
       }
       else {
        window.location.href = base + "/" // this should eventually link to an error page
       }
    })

</script>

<svelte:head>
    <title>{proccessEventCity(page.params.city)}</title>
</svelte:head>

<h1>Display Window</h1>