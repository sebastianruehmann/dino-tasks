<template>

    <div class="tasklist">
      <h2 class="tasklist-title">{{ title }}</h2>
      <p class="tasklist-description">{{ description }}</p>
      <router-link :to="tasklistPrint" class="tasklist-print">Print</router-link>
      <router-link :to="tasklistLink" class="tasklist-edit">Show</router-link>
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
        tasklistLink: {}
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
      this.tasklistPrint = {
        name: 'tasklist.edit',
        params: {id: this.id}
      }
    }
  }
</script>
<style lang="sass" scoped>
  a
    text-decoration: none;
  .tasklist
    background: #efefef;
    padding: 0.3rem;
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
      right: 0.5rem;
      background: #333;
      color: white;
      text-decoration: none;
      padding: 0.3rem;
    .tasklist-print
      position: absolute;
      bottom: 0.5rem;
      right: 4.5rem;
      background: #333;
      color: white;
      text-decoration: none;
      padding: 0.3rem;
</style>
