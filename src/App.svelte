<script>
  import { onMount } from 'svelte'
  import Column from './lib/components/Column.svelte'
  import TaskTray from './lib/components/TaskTray.svelte'
  import './lib/TailwindCSS.svelte'
  import { user } from './data/user'
  import Login from './lib/Login.svelte'
  import appwrite from './service/appwrite'

  onMount(async () => {
    const us = await appwrite.getUser()
    $user = us
    if ($user.$id !== undefined) {
      listTasks()
      subscribe()
    }
  })

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
  let tasks = []

  function subscribe() {
    // update to subscribe to realtime updates
  }

  async function listTasks() {
    const res = await appwrite.getTasks()
    if (res.sum > 0) {
      tasks = res.documents
    }
  }

  function addTask(event) {
    const task = event.detail
    appwrite.addTask(task, $user)
  }

  let selection
  const selectTask = (event) => (selection = event.detail)
  const deselectTask = (event) => (selection = null)

  async function updateTask(event) {
    const task = event.detail
    await appwrite.updateTask(task.$id, task, $user)
  }

  async function removeTask(event) {
    appwrite.deleteTask(event.detail)
    selection = null
  }

  async function login(event) {
    const us = await appwrite.login()
    $user = us
    subscribe()
    listTasks()
  }

  async function logout() {
    await appwrite.logout()
    $user = {}
  }
</script>

{#if $user.$id !== undefined}
  <div class="bg-gray-700 h-20 flex items-center justify-end">
    <button
      class="bg-gray-900 hover:bg-gray-400 hover:text-gray-900 text-white pl-5 pr-5 p-2 rounded-md mr-10"
      on:click={logout}>
      Logout
    </button>
  </div>
  <div class="h-screen flex flex-row">
    {#each columns as column}
      <Column
        {...column}
        tasks={tasks.filter((task) => task.column === column.id)}
        on:taskSelected={selectTask}
        on:taskAdded={addTask}
        on:taskDropped={updateTask} />
    {/each}
  </div>
  {#if selection}
    <TaskTray
      on:trayClosed={deselectTask}
      on:taskUpdated={updateTask}
      on:taskRemoved={removeTask}
      {...selection}
      {columns} />
  {/if}
{:else}
  <Login on:click={login} />
{/if}
