<template>
  <div class="dashboard">
    <router-link class="button button-add button-full-width" to="tasklist/add">
      +
    </router-link>
    <p class="wrapped notice">Here you find an overview of all your created Tasklist:</p>
    <div class="tasklist-overview">
      <tasklist v-for="tasklist in tasklists" :tasklist="tasklist"></tasklist>
    </div>
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
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function () {
      const self = this

      this.$http.get(window.apiRoot + '/tasklists').then((result) => {
        self.tasklists = result.body
      }, (response) => {
        return response.text()
      })
    }
  }
}
</script>

<style lang="sass">
@import "scss/globals"

.notice
  font-size: 0.8rem;

.wrapped
  padding: 0 0.5rem;

.button
  color: white;
  font-size: 1.7rem;
  font-weight: bold;
  padding: 10px;
  text-decoration: none;
  &.button-add
    background: $green;
  &.button-full-width
    display: block;
</style>
