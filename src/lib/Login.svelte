<script>

import Info from "./components/Info.svelte";

</script>
<div class="bg-gray-100 h-screen w-full flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold mb-5">Realtime Kanban Board</h1>
    <button on:click class="text-white rounded-md p-4 font-bold">Login Anonymously</button>
    <p class="mt-4">Powered by <br /><span class="brand">Appwrite</span></p>
    <Info />
</div>

<style>
    button {
        background-color: #f02e65;
    }
    .brand {
        color: #f02e65;
    }
</style>