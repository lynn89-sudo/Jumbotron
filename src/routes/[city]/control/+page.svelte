<script>

    import { base } from "$app/paths";
    import { page } from "$app/state";
    import { onMount } from "svelte";

    import { proccessEventCity } from "$lib/event.js";
    import { proccessCity } from "$lib/event.js";
    import { checkCity } from "$lib/event.js";

    let city = page.params.city;
    onMount(async function() {
    //console.log(checkCity(proccessCity(city)))
       if (await checkCity(proccessCity(city)) == true) {
        console.log("Event Name Valid")
       }
       else {
        window.location.href = base + "/" // this should eventually link to an error page
       }
    })
    function openDisplay() {
        
    }

    /*
    List of all features
    - Change the styling 
    - Set the next event
    - View google slides
    */
</script>

<svelte:head>
    <title>Control Window | Jumbotron</title>
</svelte:head>
<h1>{proccessEventCity(city)}</h1>
<h2 style:font-size=20px style:font-weight=400 style:margin-bottom=30px>Jumbotron Control Panel</h2>
<p>You should keep this window open on your laptop or main sceen, and open the display window on another screen.</p>
<p style:margin-bottom=40px><button onclick={function() {window.location.href=base+"/" + city + "/control/guide"}}>How to use Jumbotron</button></p>
