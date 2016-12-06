<template>
  <div class="tasklist">
    <h2 class="tasklist-title">{{ title }}</h2>
    <p class="tasklist-description">{{ description }}</p>
    <router-link class="tasklist-edit" :to="tasklistLink">Show</router-link>
  </div>
</template>

<script>
  export default {
    name: 'tasklist',
    props: ['tasklist'],
    data: function () {
      return {
        id: undefined,
        title: '',
        description: '',
        tasklistLink: {},
        tasklist: {}
      }
    },
    created: function () {
      this.id = this.tasklist._id
      this.title = this.tasklist.title
      this.description = this.tasklist.description
      this.tasklistLink = {
        name: 'tasklist.edit',
        params: {id: this.id}
      }
    }
  }
</script>
<style lang="sass">
  .tasklist
    border-bottom: 1px solid #333;
    padding: 0.3rem 0;
    margin: 0.1rem 0;
    position: relative;
  .tasklist-title
    border: none;
    margin: 0rem;
    font-size: 1.7rem;
    color: #333;
    width: 100%;
  .tasklist-description
    display: none;
    margin: 0;
  .tasklist-edit
    position: absolute;
    bottom: 0.5rem;
    right: 0;
    background: #333;
    color: white;
    text-decoration: none;
    padding: 0.3rem;
</style>
