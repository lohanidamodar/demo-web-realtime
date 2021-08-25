<script>
  import Column from './lib/components/Column.svelte'
  import TaskTray from './lib/components/TaskTray.svelte'
  import './lib/TailwindCSS.svelte'

  let projects
  let columns = [
    {
      id: 'todo',
      title: 'To do',
    },
    {
      title: 'Doing',
      id: 'doing',
    },
    {
      title: 'Done',
      id: 'done',
    },
  ]

  function save(event, callback) {}

  function addTask(event) {
    const { column, task } = event.detail
  }

  let selection
  const selectTask = (event) => (selection = event.detail)
  const deselectTask = (event) => (selection = null)

  function updateTask(event) {
    const { column, task } = event.detail
  }

  function removeTask(event) {
    const { column, id } = event.detail
  }

  function moveTask(event) {
    const { column, previousColumn, task } = event.detail
  }
</script>

<div class="h-screen flex flex-row">
  {#each columns as column, id}
    <Column
      {id}
      {...column}
      on:taskSelected={selectTask}
      on:taskAdded={(event) => save(event, addTask)}
      on:taskDropped={(event) => save(event, moveTask)} />
  {/each}
</div>
{#if selection}
  <TaskTray
    on:trayClosed={deselectTask}
    on:taskUpdated={(event) => save(event, updateTask)}
    on:taskRemoved={(event) => save(event, removeTask)}
    {...selection}
    {columns} />
{/if}
