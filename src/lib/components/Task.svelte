<script>
    import { createEventDispatcher } from "svelte";
    import { drag } from "../../data/drag";

    export let column;
    export let task;

    const dispatch = createEventDispatcher();

    function select() {
        dispatch('taskSelected', {
            column: column,
            task: task
        });
    }

    function follow() {
        setTimeout(() => {
            this.style.display = 'none';
        }, 0);

        $drag = {
            column: column,
            task: task
        };
    }

    function drop(event) {
        setTimeout(() => {
            this.style.display = 'block';
        }, 0);
    }
</script>

<div
    draggable="true"
    on:click={select}
    on:dragstart={follow}
    on:dragend={drop}
    class="bg-white rounded box-border border-2 border-gray-200 hover:border-black text-gray-600 hover:text-black hover:shadow p-2 select-none cursor-move">
    <div class="font-bold">{task.title}</div>
</div>