<script>
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";

    export let columns;
    export let column;
    export let task;

    let taskTitle = task.title;

    const dispatch = createEventDispatcher();

    function save() {
        if (!taskTitle) {
            alert("A task must have a title.");
            return;
        }

        dispatch('taskUpdated', {
            column: column,
            task: {
                _id: task._id,
                title: taskTitle
            }
        });
    }

    function remove() {
        dispatch('taskRemoved', {
            column: column,
            id: task._id
        })
    }

    function close() {
        dispatch('trayClosed', null);
    }
</script>

<aside class="h-screen w-96 p-4 flex flex-col space-y-4 fixed top-0 right-0 bg-gray-100 shadow-lg z-50">
    <div class="font-bold text-xl">{taskTitle || "Task"}</div>
    <div class="flex flex-col space-y-1">
        <label for="title" class="text-sm">Title</label>
        <input
            id="title"
            bind:value={taskTitle} 
            class="p-2 rounded" />
    </div>
    <div class="flex flex-col space-y-1">
        <label for="status" class="text-sm">Status</label>
        <select id="status" bind:value={column} class="p-2 rounded">
            {#each columns as column, id}
                <option value={id}>{column.title}</option>
            {/each}
        </select>
    </div>
    <div class="flex flex-row space-x-3">
        <Button on:click={save} color="green" class="flex-1">Save</Button>
        <Button on:click={close} color="yellow" class="flex-1">Cancel</Button>
        <Button on:click={remove} color="red" class="flex-1">Delete</Button>
    </div>
</aside>