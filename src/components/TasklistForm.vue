<template>
  <div class="create-form">
    <h1>Create</h1>
    <form>
      <input type="text" :value="title" v-model="title">
      <task v-for="task in tasks" v-on:newTaskItem="addNewTaskItem" :subject="task.subject"></task>
      <input @click="newTasklist" @click.prevent.submit type="submit" value="Merken">
    </form>
  </div>
</template>

<script>
import Task from './Task'

export default {
  name: 'tasklist-form',
  components: {
    Task
  },
  data: function () {
    return {
      title: '',
      tasks: null
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      this.resource = this.$resource(window.location.protocol + '//' + window.location.hostname + ':5000/api/v1/tasklist{/id}')

      const self = this

      this.resource.get({id: '58455deef2934c118bd9a4cf'}).then((response) => {
        return response.json()
      }, (response) => {
        return response.text()
      }).then(result => {
        self.title = result.title
        self.tasks = result.tasks
        self.tasks.push({})
      })
    },
    addNewTaskItem: function () {
      this.tasks.push({})
    },
    newTasklist: function () {
      this.$http.post(window.location.protocol + '//' + window.location.hostname + ':5000/api/v1/tasklists', { title: 'Hello', description: 'Lorem Ipsum' }).then((response) => {
        console.log(response)
      }, (response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
