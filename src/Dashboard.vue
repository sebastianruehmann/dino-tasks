<template>
  <div class="dashboard">
    <header>
      <router-link to="/">
        <img class="logo" src="./assets/logo.svg">
      </router-link>
    </header>
    <a class="button button-add button-full-width" href="/#/tasklist/add">
      +
    </a>
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
@import "scss/globals"

body, html
  margin: 0;
  padding: 0;

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $grey;
  text-align: left;

header
  padding: 0.2rem;


.notice
  font-size: 0.8rem;

.logo
  width: 40vw;

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
