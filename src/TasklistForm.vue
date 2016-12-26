<template>
  <div class="form wrapped">
    <header>
      <router-link to="/">
        <img class="logo" src="./assets/logo.svg">
      </router-link>
    </header>
    <form v-on:submit.prevent="handleTasklistBlured">
      <input placeholder="List Title" type="text" class="tasklist-title" v-model="title" @keyup.enter="handleTasklistBlured" @blur="handleTasklistBlured">
      <task v-for="task in tasks" v-on:editBlurredNewTask="addNewTask" :tasklistId="id" :task="task"></task>
    </form>
  </div>
</template>

<script>
import Task from './components/Task'

export default {
  name: 'tasklist-form',
  components: {
    Task
  },
  data: function () {
    return {
      id: undefined,
      title: '',
      tasks: null
    }
  },
  created: function () {
    this.resource = this.$resource(window.location.protocol + '//' + window.location.hostname + ':5000/api/v1/tasklist{/id}')

    this.id = this.$route.params.id
    this.fetchData()
  },
  updated: function () {

  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    handleTasklistBlured: function (e) {
      if (typeof this.id === 'undefined' && e.target.value.length > 0) {
        this.newTasklist()
      }
    },
    fetchData: function () {
      const self = this

      if (typeof this.id !== 'undefined') {
        this.resource.get({id: this.$route.params.id}).then((response) => {
          return response.json()
        }, (response) => {
          return response.text()
        }).then(result => {
          self.title = result.title
          self.tasks = result.tasks
          self.tasks.push({})
        })
      } else {
        self.title = ''
      }
    },
    addNewTask: function () {
      this.tasks.push({})
    },
    newTasklist: function () {
      const self = this

      this.$http.post(window.location.protocol + '//' + window.location.hostname + ':5000/api/v1/tasklists', { title: this.title, description: 'Lorem Ipsum' }).then((response) => {
        self.$router.replace({name: 'tasklist.edit', params: { id: response.body._id }})
        self.id = response.body._id
        document.getElementsByClassName('task-subject')[0].focus()
      }, (response) => {
        console.log(response)
      })
    },
    editTasklist: function () {
      this.resource.update({id: this.form.id}, { title: this.title, description: 'Lorem Ipsum' }).then((response) => {
        console.log(response)
      }, (response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "scss/globals";

  .tasklist-title
    border: none;
    border-bottom: 1px solid $lightgrey;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    color: $grey;
    width: 100%;

    &:focus
     outline: none;
</style>
