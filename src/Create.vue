<template>
  <div id="tasklist-create">
    <tasklistForm></tasklistForm>
  </div>
</template>

<script>
import TasklistForm from './components/TasklistForm'

export default {
  name: 'create',
  components: {
    TasklistForm
  }
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ff0000;
  margin-top: 60px;
  text-align: left;
</style>
