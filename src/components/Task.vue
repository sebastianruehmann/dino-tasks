<template>
  <div class="todo-item">
    <input type="text" name="subject" v-on:keyup.enter="newTaskItem" v-on:blur="newTaskItem" :value="subject" v-model="subject" class="todo-item-subject" maxlength="140">
    <select v-model="state">
      <option v-for="state in states" :value="state.key">
        {{ state.text }}
      </option>
    </select>
    <textarea v-model="summary"></textarea>
    <p>Write a summary for this Task. You can use @mention, dates and states. As well as Links and Embeds</p>
  </div>
</template>

<script>
export default {
  name: 'task-item',
  props: {
    subject: {
      type: String
    }
  },
  data: function () {
    return {
      summary: '',
      state: 'todo',
      states: [
        {text: 'To Do', key: 'todo'},
        {text: 'In-Progress', key: 'progress'},
        {text: 'Complete', key: 'complete'},
        {text: 'Canceled', key: 'canceled'}
      ]
    }
  },
  methods: {
    newTaskItem: function () {
      this.$emit('newTaskItem')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.todo-item
  .todo-item-subject
    border: none;
    font-size: 2rem;
    color: #333;

    &:focus
      outline: none;
</style>
