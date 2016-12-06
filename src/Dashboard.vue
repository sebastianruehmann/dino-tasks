<template>
  <div id="app">
    <h1>Dashboard</h1>
    <tasklist v-for="tasklist in tasklists" :tasklist="tasklist"></tasklist>
  </div>
</template>

<script>
import Tasklist from './components/Tasklist'

export default {
  name: 'dashboard',
  components: {
    Tasklist
  },
  data: function () {
    return {
      tasklists: null
    }
  },
  created: function () {
    this.fetchData()
  },
  updated: function (val) {
    console.log(val)
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function () {
      const self = this

      this.$http.get(window.location.protocol + '//' + window.location.hostname + ':5000/api/v1/tasklists').then((result) => {
        self.tasklists = result.body
      }, (response) => {
        return response.text()
      })
    }
  }
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: left;
</style>
