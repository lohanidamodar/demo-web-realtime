<script>
  import { createEventDispatcher } from 'svelte'
  import { drag } from '../../data/drag'
  import TaskAdder from './TaskAdder.svelte'
  import Task from './Task.svelte'

  export let id
  export let title
  export let tasks = []

  const dispatch = createEventDispatcher()

  let addingTask = false

  function add(event) {
    addingTask = false
    const { task } = event.detail
    dispatch('taskAdded', {
      column: id,
      ...task,
    })
  }

  function drop(event) {
    dispatch('taskDropped', { ...$drag.task, column: id })
    $drag = {}
  }
</script>

<div class="w-80 h-full pb-4 bg-gray-100 overflow-hidden ml-4 mt-2 rounded-lg">
  <div class="p-4 flex flex-row justify-between font-bold bg-gray-200 mb-5">
    <div>{title} ({tasks.length})</div>
    <button class="rounded-full hover:bg-red-600 bg-red-400 w-8 h-8 text-white text-2xl" on:click={() => (addingTask = true)}>+</button>
  </div>
  <div
    on:drop={drop}
    on:dragenter|preventDefault={() => {}}
    on:dragover|preventDefault={() => {}}
    class="h-full px-4 flex flex-col space-y-3">
    {#if addingTask}
      <TaskAdder on:add={add} on:cancel={() => (addingTask = false)} />
    {/if}
    {#each tasks as task}
      {#if task.column === id}
        <Task on:taskSelected column={id} {task} />
      {/if}
    {/each}
  </div>
</div>
