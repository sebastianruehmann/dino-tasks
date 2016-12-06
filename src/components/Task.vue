<template>
  <div class="task">
    <input type="text" :placeholder="placeholder" name="subject" @change="handleDataChanged" @keyup.enter="blurredTaskHeadline" v-on:blur="blurredTaskHeadline" v-model="subject" class="task-subject" maxlength="140">
    <div class="task-expand">
      <select @change="handleDataChanged" v-model="state" class="task-expand-state">
        <option v-for="state in states" :value="state.key">
          {{ state.text }}
        </option>
      </select>
      <div class="task-expand-description">
        <textarea @change="handleDataChanged" placeholder="Description.." v-model="description"></textarea>
        <p class="task-expand-description-notice">Write a summary for this Task. You can use @mention, dates and states. As well as Links and Embeds</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: ['task', 'tasklistId'],
  data: function () {
    return {
      id: undefined,
      subject: '',
      description: '',
      state: 'todo',
      states: [
        {text: 'To Do', key: 'todo'},
        {text: 'In-Progress', key: 'progress'},
        {text: 'Complete', key: 'complete'},
        {text: 'Canceled', key: 'canceled'}
      ],
      editRunning: false,
      placeholder: '',
      placeholders: [
        'What to do?', 'Type..', 'Everything ready?', 'Roaw..'
      ]
    }
  },
  created: function () {
    this.id = this.task._id
    this.subject = this.task.subject
    this.description = this.task.description
    this.state = this.task.state ? this.task.state : 'todo'
    this.placeholder = this.placeholders[Math.floor(Math.random() * this.placeholders.length)]
  },
  methods: {
    blurredTaskHeadline: function (e) {
      if (e.target.value.length > 0) {
        if (typeof this.id === 'undefined') {
          this.saveTask()
          this.$emit('editBlurredNewTask')
        }
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
    handleDataChanged: function () {
      const self = this
      if (!this.editRunning) {
        this.editRunning = true
        setTimeout(function () {
          self.editRunning = false
          self.editTask()
        }, 1000)
      }
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
.task
  width: 100%;

  .task-subject
    border: none;
    font-size: 2rem;
    color: #333;
    width: 100%;

    &:focus
      outline: none;

  .task-expand
    .task-expand-state
      border: none;
      border-radius: 0;
      border-bottom: 3px solid #333;
      float: right;
      font-size: 1rem;
      margin: 0.5rem 0 1rem 0;
      padding: 0.2rem;
      -webkit-appearance: none;

      &:focus
       outline: none;
    .task-expand-description
      textarea
        background: #efefef;
        border: none;
        box-sizing: border-box;
        font-size: 0.8rem;
        min-height: 100px;
        padding: 0.4rem 0;
        resize: none;
        width: 100%;

        &:focus
         outline: none;
      .task-expand-description-notice
        font-size: 0.4rem;
</style>
