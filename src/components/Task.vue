<template>
  <div class="todo-item">
    <input type="text" name="subject" v-on:keyup.enter="blurredTaskItem" v-on:blur="blurredTaskItem" v-model="subject" class="todo-item-subject" maxlength="140">
    <select v-model="state">
      <option v-for="state in states" :value="state.key">
        {{ state.text }}
      </option>
    </select>
    <textarea v-model="description"></textarea>
    <p>Write a summary for this Task. You can use @mention, dates and states. As well as Links and Embeds</p>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: ['task', 'tasklistId'],
  data: function () {
    return {
      id: undefined,
      tasklistId: undefined,
      subject: '',
      description: '',
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
    this.id = this.task._id
    this.subject = this.task.subject
    this.description = this.task.description
    this.state = this.task.state ? this.task.state : 'todo'
  },
  watch: {

  },
  methods: {
    blurredTaskItem: function (e) {
      if (e.target.value.length > 0) {
        if (typeof this.id !== 'undefined') {
          this.editTask()
        } else {
          this.saveTask()
        }
        this.$emit('newTaskItem')
      }
    },
    saveTask: function () {
      const self = this
      this.$http.post(window.location.protocol + '//' + window.location.hostname + ':5000/api/v1/tasks', {_tasklistId: this.tasklistId, subject: this.subject, description: this.description, state: this.state}).then((response) => {
        console.log('created: ' + response.body._id)
        self.id = response.body._id
      }, (response) => {
        console.log(response)
      })
    },
    editTask: function () {
      this.$http.put(window.location.protocol + '//' + window.location.hostname + ':5000/api/v1/task/' + this.id, {_tasklistId: this.tasklistId, subject: this.subject, description: this.description, state: this.state}).then((response) => {
        console.log('saved: ' + response.body._id)
      }, (response) => {
        console.log(response)
      })
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
