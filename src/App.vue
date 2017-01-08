<template>
  <section>
    <div id="main">
      <header>
        <router-link to="/">
          <img class="logo" src="./assets/logo.svg">
          <h1 class="title">{{ title }}</h1>
        </router-link>
        <router-link to="/scanner">
          Scanner
        </router-link>
      </header>
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
    </div>
    <footer>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      title: ''
    }
  },
  mounted: function () {
    this.setTitle()
  },
  watch: {
    '$route': 'setTitle'
  },
  methods: {
    setTitle: function () {
      this.title = this.getTitle()
    },
    getTitle: function () {
      let title = 'Dashboard'
      switch (this.$route.name) {
        case 'tasklist.add':
          title = 'Create Tasklist'
          break
        case 'tasklist.edit':
          title = 'Edit Tasklist'
          break
      }
      return title
    }
  }
}
</script>

<style lang="sass">
@import "scss/globals"

body, html
  margin: 0;
  padding: 0;

.logo
  width: 40vw;

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $grey;
  text-align: left;

header a
  text-decoration: none;

.title
  color: $lightgrey;
  margin: -25px 0 0 18vw;
  font-size: 1.3rem;

footer
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0.8rem;
  font-style: italic;
  text-align: center;

header
  padding: 0.2rem;
</style>
