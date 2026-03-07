<script>
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    import { sync } from "$lib/sync.svelte.js";
    import { tutorial } from "$lib/sync.svelte.js";

    let googleLink = $state("");
    let pdfLink = $state("");
    let mountedEnabled = $state(false);

    onMount(function() {
        localStorage.setItem("jumbotron.googleLink", null);
        localStorage.setItem("jumbotron.pdfLink", null);
    })

    //https://docs.google.com/viewer?url=YOUR_PUBLIC_FILE_URL&embedded=true

    /*
    $effect(function() {
        if (sync.enabled == true) {

            localStorage.setItem("jumbotron.announcement.title", announcementTitle);
            localStorage.setItem("jumbotron.announcement.message", announcementMessage);
            localStorage.setItem("jumbotron.event.title", eventsTitle);
            localStorage.setItem("jumbotron.event.time", eventsTime);

        }
    })
    */

    /*
    function syncAnnouncements() {
        sync.announcements = true;
        document.getElementById("sync").disabled = true;
        localStorage.setItem("jumbotron.announcement.title", announcementTitle);
        localStorage.setItem("jumbotron.announcement.message", announcementMessage);
        localStorage.setItem("jumbotron.event.title", eventsTitle);
        localStorage.setItem("jumbotron.event.time", eventsTime);
        setTimeout(function() {localStorage.setItem("jumbotron.sync", true)}, 2000);
        setTimeout(function() {sync.announcements = false; localStorage.setItem("jumbotron.sync", false); document.getElementById("sync").disabled = false}, 3000)
    }
        */

    function enableGoogle() {
        sync.slides = true;
        document.getElementById("google").disabled = true;
        localStorage.setItem("jumbotron.googleLink", googleLink);
        localStorage.setItem("jumbotron.pdfLink", null);
        setTimeout(function() {localStorage.setItem("jumbotron.sync", true)}, 2000);
        setTimeout(function() {sync.slides = false; localStorage.setItem("jumbotron.sync", false); document.getElementById("google").disabled = false; mountedEnabled = true;}, 3000)
        
    }

    function enablePdf() {
        sync.slides = true;
        document.getElementById("pdf").disabled = true;
        localStorage.setItem("jumbotron.googleLink", null);
        localStorage.setItem("jumbotron.pdfLink", pdfLink);
        setTimeout(function() {localStorage.setItem("jumbotron.sync", true)}, 2000);
        setTimeout(function() {sync.slides = false; localStorage.setItem("jumbotron.sync", false); document.getElementById("pdf").disabled = false; mountedEnabled = true;}, 3000)
    }

    function unmountDisplay() {
        sync.slides = true;
        localStorage.setItem("jumbotron.googleLink", null);
        localStorage.setItem("jumbotron.pdfLink", null);
        mountedEnabled = false;
        setTimeout(function() {localStorage.setItem("jumbotron.sync", true);}, 2000);
        setTimeout(function() {localStorage.setItem("jumbotron.sync", false); sync.slides = false;}, 3000)
    }
</script>

<style>
    form {
        input {
            margin: 8px;
            border-radius: 15px;
            padding: 10px; 
        }
    }
    button {
        background-color: rgb(92, 89, 89);
    }
    button.disabled {
        cursor: progress;
    }
</style>
{#if !mountedEnabled}
<div transition:slide>
    <h4>Google Slides</h4>
    {#if tutorial.enabled}<p>To display a Google Slides Presentation on your display windows, go to your Google Slides Presentation, find <i>Publish to Web</i>, copy the link and then paste the link below.</p>{/if}
    <form> 
        <input bind:value={googleLink} class="bigInput" type="url" placeholder="https://docs.google.com/presentation...">
    </form>
    <p><button onclick={enableGoogle} id="google" class:disabled={sync.slides}>Display Google Slides on Display Windows</button></p>
    {#if tutorial.enabled}<p>Note that your progression through the slides are individual to the display window. Multiple display windows will not progress through the slides together.</p>{/if}
    <h4 style:margin-top=10px>PDFs</h4>
    {#if tutorial.enabled}<p>To display a PDF on your display window, you will need to create a public link to the content. The best way to do this is upload your document to a GitHub repo and copy the raw content link. Once you have the link, past it below.</p>{/if}
    <form> 
        <input bind:value={pdfLink} class="bigInput" type="url" placeholder="https://raw.githubusercontent.com/...">
    </form>
    {#if tutorial.enabled}<p>Note that your progression through the document is individual to the display window, and you will need to use scroll or arrow keys to navigate the document. Multiple display windows will not progress through the document together.</p>{/if}
    <p><button onclick={enablePdf} id="pdf" class:disabled={sync.slides}>Display PDF on Display Windows</button></p>
</div>
{:else}
<div transition:slide>
    <p>Your content should now be mounted on your display windows. Use the button below to unmount your content. Content can neither be changed to another link nor swapped between Google Slides and PDF until unmounted.</p>
    <p><button onclick={unmountDisplay}>Unmount Content from Display Windows</button></p>
</div>
{/if}