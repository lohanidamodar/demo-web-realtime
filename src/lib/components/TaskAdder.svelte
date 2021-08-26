<script>
  import { createEventDispatcher } from 'svelte'
  import Button from './Button.svelte'

  const dispatch = createEventDispatcher()

  let title = ''

  function add() {
    const task = {
      // _id: uuid(),
      title: title,
    }

    dispatch('add', { task: task })
  }

  function cancel() {
    dispatch('cancel')
  }

  const onKeyPress = (e) => {
    if (e.charCode === 13) add()
  }
</script>

<div class="flex flex-col space-y-3">
  <input
    bind:value={title}
    class="rounded p-2"
    on:keypress={onKeyPress}
    placeholder="Give it a title..." />
  <div class="flex flex-row space-x-3">
    <Button color="green" class="flex-1" on:click={add}>Add</Button>
    <Button color="yellow" class="flex-1" on:click={cancel}>Cancel</Button>
  </div>
</div>
