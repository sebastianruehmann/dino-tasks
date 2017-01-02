<template>
  <ul class="suggestions">
    <li class="suggestions-item" v-for="link in links">
      <a @click.stop.prevent="handleSuggestionClicked(link.handler)" href="" v-html="link.text"></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'suggestions',
  data: function () {
    return {
      links: []
    }
  },
  props: [
    'commandWord',
    'type'
  ],
  created: function () {
    this.createSuggestions(this.type)
  },
  watch: {
    'commandWord': function (val) {
      this.createSuggestions(this.type)
    }
  },
  methods: {
    createSuggestions: function (type) {
      switch (type) {
        case 'username':
          this.links = [
            {
              'handler': 'mention',
              'text': 'Mention <strong>' + this.commandWord + '</strong>'
            }
          ]
          break
        case 'date':
          this.links = [
            {
              'handler': 'deadline',
              'text': 'Add <strong>' + this.commandWord + '</strong> as deadline'
            }, {
              'handler': 'created',
              'text': 'Add <strong>' + this.commandWord + '</strong> as created date'
            }
          ]
          break
        case 'link':
          this.links = [
            {
              'handler': 'embed',
              'text': 'Embed <strong>' + this.commandWord + '</strong>'
            },
            {
              'handler': 'link',
              'text': 'Create link to <strong>' + this.commandWord + '</strong>'
            }
          ]
          break
      }
    },
    handleSuggestionClicked: function (handler) {
      switch (handler) {
        case 'mention':
          // get User with username XX
          // get Mail of User
          // send mention Mail
          break
        case 'access':
          // will be implemented later
          break
        case 'deadline':
          // this.deadline = moment(this.commandWord, 'DD.MM.YYYY')
          // this.$emit('updateTask')
          // save Task
          // remove commandWord
          break
        case 'created':
          // this.created = moment(this.commandWord, 'DD.MM.YYYY')
          // this.$emit('updateTask')
          // save Task
          // remove commandWord
          break
        case 'embed':
          // pull rich media informations
          // cache 'em
          // this.embeds.push(referenceToMediaInformations)
          break
        case 'link':
          // use document.getElementById("box").contentEditable='true';
          // convert textarea to div
          // transform commandWord to link on-the-fly
          // needs reference to commandWord (start + end)
          // remove commandWord
          break
      }

      this.links = []
    },
    dateSuggestions: function () {

    },
    linkSuggestions: function () {

    }
  }
}
</script>

<style lang="sass">
  @import "../scss/globals"

  .suggestions
    border-radius: 3px;
    border: 1px solid $lightgrey;
    margin: 0;
    padding: 0;
    list-style: none;
    .suggestions-item
      &:first-child a
        padding-top: 0.7rem;
      a
        color: $grey;
        display: block;
        font-size: 0.9rem;
        padding: 0 0.4rem 0.7rem;
        text-decoration: none;
</style>
