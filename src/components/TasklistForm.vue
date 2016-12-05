<template>
  <div class="create-form">
    <h1>Create</h1>
    <form>
      <input type="text" v-model="title">
      <task v-for="taskItemData in taskItemsData" v-on:newTaskItem="addNewTaskItem" :subject="taskItemData.subject"></task>
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
      taskItemsData: [
        {
          subject: 'Hello'
        },
        {
          subject: 'Test'
        },
        {}
      ]
    }
  },
  methods: {
    addNewTaskItem: function () {
      this.taskItemsData.push({})
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
