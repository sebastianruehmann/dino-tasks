<template>
  <div class="tasklist">
    <h2 class="tasklist-title">{{ title }}</h2>
    <p class="tasklist-description">{{ description }}</p>
    <div class="bar bar-right">
      <a @click.prevent="print" v-if="printDialog" class="button button-print"><img src="./../assets/print.svg"></a>
      <router-link :to="tasklistLink" class="button button-edit"><img src="./../assets/view.svg"></router-link>
    </div>
  </div>
</template>

<script>
  import Printer from './../plugins/print'
  export default {
    name: 'tasklist',
    props: ['tasklist'],
    data: function () {
      return {
        id: undefined,
        title: '',
        description: '',
        tasklistLink: {},
        printDialog: null
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

      document.addEventListener('deviceready', () => {
        this.printDialog = new Printer().$
      })
    },
    methods: {
      print: function () {
        this.printDialog.check((isAvailable) => {
          if (isAvailable) {
            const page = document.body.innerHTML
            this.printDialog.print(page)
          } else {
            window.modal('Service not available')
          }
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../scss/globals"

  .tasklist
    border-bottom: 1px solid $lightgrey;
    position: relative;

    &:first-child
      border-top: 1px solid $lightgrey;
    .tasklist-title
      border: none;
      margin: 0rem;
      font-size: 1.7rem;
      color: $grey;
      padding: 0.5rem;
    .tasklist-description
      display: none;
      margin: 0;
    .bar
      position: absolute;
      top: 0;
      &.bar-right
        right: 0;
      &.bar-left
        left: 0;
      .button
        float: left;
    .button
      color: white;
      font-size: 1.7rem;
      font-weight: bold;
      padding: 10px;
      text-decoration: none;
      &.button-print
        background: $purple;
      &.button-edit
        background: $orange;
      &.button-print,
      &.button-edit
        height: 33px;
        img
          height: 100%;
          width: auto;
</style>
