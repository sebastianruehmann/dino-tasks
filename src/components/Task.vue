<template>
  <div class="task">
    <input type="text" :placeholder="placeholder" name="subject" @change="handleDataChanged" @keyup.enter="blurredTaskHeadline" v-on:blur="blurredTaskHeadline" v-model="subject" class="task-subject" maxlength="140">
    <div class="task-expand">
      <select @change="handleStateDataChanged" @blur="changeState" v-model="state" class="task-expand-state">
        <option v-for="state in states" :value="state.key">
          {{ state.text }}
        </option>
      </select>
      <div class="task-expand-description">
        <textarea @change="handleDataChanged" @keyup="handleChangeCursorPosition" @focus="handleChangeCursorPosition" @click="handleChangeCursorPosition" placeholder="Description.." v-model="description"></textarea>
        <Modal v-if="suggestions.length > 0">
          <ul slot="content" class="suggestions">
            <li class="suggestions-item" v-for="suggestion in suggestions">
              <a href="">{{ suggestion }}</a>
            </li>
          </ul>
        </Modal>
        <p class="task-expand-description-notice notice">Write a summary for this Task. You can use @mention, dates and states. As well as Links and Embeds</p>
      </div>
    </div>
  </div>
</template>

<script>
import RichMediaDescription from './../mixins/RichMediaDescription'
import Modal from './Modal'

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
        {text: 'To Do', key: 'todo', color: '#769FE1'},
        {text: 'In-Progress', key: 'progress', color: '#EC3668'},
        {text: 'Complete', key: 'complete', color: '#5ACA78'},
        {text: 'Canceled', key: 'canceled', color: '#FF0009'}
      ],
      editRunning: false,
      placeholder: '',
      placeholders: [
        'What to do?', 'Type..', 'Everything ready? No..?', 'Roaw..'
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
  components: {
    Modal
  },
  mixins: [RichMediaDescription],
  mounted: function () {
    this.changeState()
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
    changeState: function (event) {
      const stateDropdown = this.$el.querySelector('.task-expand-state')
      const state = this.getState(stateDropdown.value)

      stateDropdown.style.color = state.color
      stateDropdown.style.borderColor = state.color
    },
    getState: function (stateKey) {
      for (var i = 0; i < this.states.length; i++) {
        if (this.states[i].key === stateKey) {
          return this.states[i]
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
    handleStateDataChanged: function () {
      this.changeState()
      this.handleDataChanged()
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
  @import "../scss/globals"

  .suggestions
    border-radius: 3px;
    border: 1px solid $lightgrey;
    margin: 0;
    padding: 0;
    list-style: none;
    .suggestions-item
      &:first-child a
        padding-top: 0.7rem;
      a
        color: $grey;
        display: block;
        font-size: 0.9rem;
        padding: 0 0.4rem 0.7rem;
        text-decoration: none;

  .task
    border-bottom: 5px solid $lightgrey;
    padding: 1rem 0;
    position: relative;
    width: 100%;

    .task-subject
      border: none;
      border-bottom: 1px solid $lightgrey;
      font-size: 1.1rem;
      color: $grey;
      width: 100%;

      &:focus
        outline: none;

    .task-expand
      .task-expand-state
        border: 1px solid $lightgrey;
        border-radius: 0;
        background: white;
        color: $grey;
        width: 100%;
        margin: 1rem 0;
        font-size: 1rem;
        padding: 0.4rem;
        text-align: center;
        text-align-last: center;
        -webkit-appearance: none;
        &:focus
          outline: none;
      .task-expand-description
        textarea
          background: lighten($lightgrey, 7%);
          border: none;
          box-sizing: border-box;
          font-size: 1rem;
          color: $grey;
          min-height: 100px;
          padding: 0.4rem;
          resize: none;
          width: 100%;

          &:focus
            background: #fbfbfb;
            outline: none;
        .modal
          width: 100%;
        .task-expand-description-notice
          margin-bottom: 0;
</style>
