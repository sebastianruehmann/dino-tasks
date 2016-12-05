<template>
  <div class="todo-item">
    <input type="text" name="subject" v-on:keyup.enter="newTaskItem" v-on:blur="newTaskItem" v-model="subject" class="todo-item-subject" maxlength="140">
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
  props: ['task'],
  data: function () {
    return {
      subject: '',
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
  created: function () {
    this.subject = this.task.subject
  },
  watch: {
    'subject': function (val, oldVal) {
      console.log(val, oldVal)
    }
  },
  methods: {
    newTaskItem: function () {
      this.$emit('newTaskItem')
    },
    saveTask: function () {
      this.resource = this.$resource(window.location.protocol + '//' + window.location.hostname + ':5000/api/v1/tasklist{/id}/task')
    },
    editTask: function () {

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
