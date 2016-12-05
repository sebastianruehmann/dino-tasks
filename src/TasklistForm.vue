<template>
  <div class="create-form">
    <h1>Create</h1>
    <form>
      <input type="text" :value="title" v-model="title">
      <task v-for="task in tasks" v-on:newTaskItem="addNewTaskItem" :subject="task.subject"></task>
      <input v-if="form.add" @click="newTasklist" @click.prevent.submit type="submit" value="Speichern">
      <input v-else @click="editTasklist" @click.prevent.submit type="submit" value="Bearbeiten">
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
      form: {
        add: true,
        id: ''
      },
      title: '',
      tasks: [{}]
    }
  },
  created: function () {
    this.resource = this.$resource(window.location.protocol + '//' + window.location.hostname + ':5000/api/v1/tasklist{/id}')

    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    formMode: function () {
      this.form.add = typeof this.$route.params.id === 'undefined'
    },
    fetchData: function () {
      const self = this

      this.formMode()

      if (!this.form.add) {
        this.resource.get({id: this.$route.params.id}).then((response) => {
          return response.json()
        }, (response) => {
          return response.text()
        }).then(result => {
          self.title = result.title
          self.tasks = result.tasks
          self.tasks.push({})
          self.form.id = self.$route.params.id
        })
      } else {
        self.title = ''
        self.tasks = [{}]
      }
    },
    addNewTaskItem: function () {
      this.tasks.push({})
    },
    newTasklist: function () {
      this.resource.save({ title: 'Hello', description: 'Lorem Ipsum' }).then((response) => {
        console.log(response)
      }, (response) => {
        console.log(response)
      })
    },
    editTasklist: function () {
      this.resource.update({id: this.form.id}, { title: 'Hello', description: 'Lorem Ipsum' }).then((response) => {
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
