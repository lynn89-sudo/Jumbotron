<script>
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    import { eventName } from "$lib/event.js";

    import { sync } from "$lib/sync.svelte.js";
    import { tutorial } from "$lib/sync.svelte.js";
    import Peer from "peerjs";

    let liveshareEnabled = $state(false);

    let peer;
    let tries = 3;
    let peerInfo = {};

    function enableLiveshare() {
        let code = codeGen();
        peer = new Peer("hackclub" + eventName + code);
        peer.on("error", function(err) {
            if (err.type = "peer-unavailable" && tries > 0) {
                tries--;
                peer.destroy();
                enableLiveshare();
            }
        })
        peer.on("open", () => {
            console.log("Peer has connected");
            //console.log(peer);
            liveshareEnabled = true;
            peerInfo.code = code;
            console.log(peerInfo);
        })
    }
    function destroyLiveshare() {
        peer.destroy();
        peer = null;
        console.log("Peer destroyed");
        liveshareEnabled = false;
    }
    /*
    onMount(() => {
        enableLiveshare();
    })
        */
    
    function codeGen() {
        let code = "";
        for (let i = 0; i < 5; i++) {
            let rand = Math.random()*10
            rand  = Math.floor(rand);
            code += "" + rand;
        }
        return code;
    }

    async function copyCode() {
        await navigator.clipboard.writeText(peerInfo.code);   
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

    button.copy:active {
        background-color: white;
        transform: scale(1.04);
        span {
            color: rgb(85, 85, 85);
        }
    }
</style>

<div>
    {#if tutorial.enabled}
    <p>Liveshare allows you to share information displayed on Jumbotron to your participants through their own screens.</p>
    {/if}
    {#if !liveshareEnabled}
    <p><button onclick={enableLiveshare}>Enable Liveshare</button></p>
    <p><i>If you are using a low performance device, Liveshare is not recomended.</i></p>
    {:else}
    <p><button onclick={destroyLiveshare}>Disable Liveshare</button></p>
    <h4>Participant Code</h4>
    <h5 style:font-size=30px>{peerInfo.code} <button onclick={copyCode} class="copy"><span translate="no" class="material-symbols-outlined">file_copy</span></button></h5>
    <p>Participants should use this code to view information on their device; you might want to copy this code into an announcement. If your liveshare restarts, this code will likely change.</p>
    {/if}
</div>
