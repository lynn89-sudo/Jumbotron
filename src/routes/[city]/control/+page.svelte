<script>
    import { base } from "$app/paths";
    import { page } from "$app/state";

    import { proccessCity } from "$lib/event.js";
    import { eventName } from "$lib/event.js";

    let city = page.params.city;
    console.log(eventName + " " + proccessCity(city));
</script>

<svelte:head>
    <title>Control Window | Jumbotron</title>
</svelte:head>