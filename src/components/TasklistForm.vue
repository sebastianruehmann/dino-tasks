<template>
  <div class="create-form">
    <h1>Create</h1>
    <form>
      <input type="text" v-model="title">
      <taskItem v-for="taskItemData in taskItemsData" v-on:newTaskItem="addNewTaskItem" :subject="taskItemData.subject"></taskItem>
      <input type="submit" value="Merken">
    </form>
  </div>
</template>

<script>
import TaskItem from './TaskItem'

export default {
  name: 'tasklist-form',
  components: {
    TaskItem
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
