<template>
  <div class="form">
    <form class="wrapped" v-on:submit.prevent="handleTasklistBlured">
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
    this.id = this.$route.params.id
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    handleTasklistBlured: function (e) {
      if (typeof this.id === 'undefined' && e.target.value.length > 0) {
        this.newTasklist()
      } else {
        this.editTasklist()
      }
    },
    fetchData: function () {
      const self = this

      if (typeof this.id !== 'undefined') {
        this.$http.get(window.apiRoot + '/tasklists/' + this.$route.params.id).then((response) => {
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

      this.$http.post(window.apiRoot + '/tasklists', { title: this.title, description: 'Lorem Ipsum' }).then((response) => {
        self.$router.replace({name: 'tasklist.edit', params: { id: response.body._id }})
        self.id = response.body._id
        document.getElementsByClassName('task-subject')[0].focus()
      }, (response) => {
        console.log(response)
      })
    },
    editTasklist: function () {
      this.$http.put(window.apiRoot + '/tasklists/' + this.id, { title: this.title, description: 'Lorem Ipsum' }).then((response) => {
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
    padding: 4px 0;
    width: 100%;

    &:focus
     outline: none;
</style>
