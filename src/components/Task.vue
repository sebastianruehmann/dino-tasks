<template>
  <div class="task">
    <input type="text" :placeholder="placeholder" name="subject" @change="handleDataChanged" @keyup.enter="blurredTaskHeadline" v-on:blur="blurredTaskHeadline" v-model="subject" class="task-subject" maxlength="140">
    <div class="task-expand">
      <select @change="handleStateDataChanged" v-model="state" class="task-expand-state">
        <option v-for="state in states" :value="state.key">
          {{ state.text }}
        </option>
      </select>
      <div class="task-expand-description">
        <textarea @change="handleDataChanged" @keyup="handleChangeCursorPosition" @focus="handleChangeCursorPosition" @blur="handleBlur" @click="handleChangeCursorPosition" placeholder="Description.." v-model="description"></textarea>
        <Modal v-if="currentFocusedWordType !== null">
          <Suggestions slot="content" :commandWord="currentFocusedWord" :type="currentFocusedWordType"></Suggestions>
        </Modal>
        <p class="task-expand-description-notice notice">Write a summary for this Task. You can use @mention, dates and states. As well as Links and Embeds</p>
      </div>
      <div class="task-expand-deadline">
        Deadline: {{ deadlineDate }}
      </div>
    </div>
  </div>
</template>

<script>
import textSensibleCommands from './../mixins/textSensibleCommands'
import Modal from './Modal'
import Suggestions from './suggestions'
import moment from 'moment'

export default {
  name: 'task',
  props: ['task', 'tasklistId'],
  data: function () {
    return {
      id: this.task._id,
      subject: this.task.subject,
      description: this.task.description,
      state: this.task.state ? this.task.state : 'todo',
      deadline: this.task.deadline ? moment(this.task.deadline) : null,
      states: [
        {text: 'To Do', key: 'todo', color: '#769FE1'},
        {text: 'In-Progress', key: 'progress', color: '#EC3668'},
        {text: 'Complete', key: 'complete', color: '#5ACA78'},
        {text: 'Canceled', key: 'canceled', color: '#FF0009'}
      ],
      editRunning: false,
      placeholders: ['What to do?', 'Type..', 'Everything ready? No..?', 'Roaw..'],
      placeholder: ''
    }
  },
  computed: {
    deadlineDate: function () {
      if (this.deadline != null) {
        return moment(this.deadline).format('DD.MM.YYYY')
      }
      return ''
    }
  },
  created: function () {
    this.placeholder = this.placeholders[Math.floor(Math.random() * this.placeholders.length)]
  },
  mounted: function () {
    this.changeColor(this.$el.querySelector('.task-expand-state'))
  },
  components: {
    Modal,
    Suggestions
  },
  mixins: [textSensibleCommands],
  methods: {
    blurredTaskHeadline: function (ev) {
      if (ev.target.value.length > 0) {
        if (typeof this.id === 'undefined') {
          this.saveTask()
          this.$emit('editBlurredNewTask')
        }
      }
    },
    changeColor: function (el) {
      const options = this.states
      let option = ''

      for (var i = 0; i < options.length; i++) {
        if (options[i].key === el.value) {
          option = options[i]
        }
      }

      el.style.color = option.color
      el.style.borderColor = option.color
    },
    handleStateDataChanged: function (ev) {
      this.changeColor(ev.target)
      this.handleDataChanged()
    },
    handleDataChanged: function () {
      const self = this
      if (!this.editRunning) {
        this.editRunning = true
        setTimeout(function () {
          self.editRunning = false
          self.updateTask()
        }, 1000)
      }
    },
    saveTask: function () {
      const self = this
      this.$http.post(window.apiRoot + '/tasks', {_tasklistId: this.tasklistId, subject: this.subject, description: this.description, state: this.state, deadline: this.deadline}).then((response) => {
        console.log('created: ' + response.body._id)
        self.id = response.body._id
      }, (response) => {
        console.log(response)
      })
    },
    updateTask: function () {
      this.$http.put(window.apiRoot + 'tasks/' + this.id, {_tasklistId: this.tasklistId, subject: this.subject, description: this.description, state: this.state, deadline: this.deadline}).then((response) => {
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
      padding: 4px 0;
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
