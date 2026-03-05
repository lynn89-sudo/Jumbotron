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
    List of features
    - Set the next event and its time
    - Announcements popup
    - Set a timer
    - Mode to view a google slides
    */
</script>

<svelte:head>
    <title>Control Window | Jumbotron</title>
</svelte:head>
<style>
    .config {
        margin: 20px;
        background-color: rgb(231, 231, 231);
        padding: 20px;
        border-radius: 30px;
        border: 5px grey solid;
    }
</style>
<h1>{proccessEventCity(city)}</h1>
<h2 style:font-size=20px style:font-weight=400 style:margin-bottom=30px>Jumbotron Control Panel</h2>
<p>You should keep this window open on your laptop or main sceen, and open the display window on another screen.</p>
<p style:margin-bottom=40px><button onclick={function() {window.location.href=base+"/" + city + "/control/guide"}}>How to use Jumbotron</button></p>
<div id="main" class="config">
    <h3>Main Configuration</h3>
    <p>The important stuff happens here.</p>
</div>
<div id="events" class="config">
    <h3>Announcements and Events</h3>
    <p>Utilize your display window to make announcements or show when events will be happening.</p>
</div>
<div id="presentations" class="config">
    <h3>Presentations</h3>
    <p>Seamlessly display a Google Slides or a PDF to your audience.</p>
</div>
<div id="timer" class="config">
    <h3>Timers</h3>
    <p>Set a timer and project it onto your display.</p>
</div>