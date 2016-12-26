export default {
  name: 'richMediaDescription',
  data: function () {
    return {
      suggestions: [],
      cursorPosition: 0
    }
  },
  methods: {
    handleChangeCursorPosition: function (event) {
      const elem = event.target
      this.setCursorPosition(elem)

      this.suggestions = []
      this.detectKeywords(this.getCurrentWord(elem.value))
    },
    getCurrentWord: function (val) {
      let i = 0
      let j = 0
      for (i = this.cursorPosition; i <= val.length; i++) {
        if (/\s/.test(val.charAt(i))) {
          break
        }
      }
      for (j = this.cursorPosition - 1; j >= 0; j--) {
        if (/\s/.test(val.charAt(j))) {
          break
        }
      }
      const currentWord = val.substring(j + 1, i)

      console.log(currentWord)
      return currentWord
    },
    setCursorPosition: function (elem) {
      this.cursorPosition = elem.selectionStart
    },
    detectKeywords: function (val) {
      const dates = this.getDates(val)
      const mentions = this.getMentions(val)
      const links = this.getLinks(val)

      if (dates != null) {
        for (let i = 0; i < dates.length; i++) {
          this.date(dates[i])
        }
      }

      if (mentions != null) {
        for (let i = 0; i < mentions.length; i++) {
          this.mention(mentions[i])
        }
      }

      if (links != null) {
        for (let i = 0; i < links.length; i++) {
          this.link(links[i])
        }
      }
    },
    getMentions: function (val) {
      // eslint-disable-next-line
      return val.match(/^(?!.*\bRT\b)(?:.+\s)?@\w+/ig)
    },
    getLinks: function (val) {
      // eslint-disable-next-line
      return val.match(/(?:(?:(?:[A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)(?:(?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/gi)
    },
    getDates: function (val) {
      // eslint-disable-next-line
      return val.match(/\d{2}(?:\.)\d{2}(?:\.)\d{4}(?!\S)/ig)
    },
    mention: function (mention) {
      this.suggestions = [
        'Mention ' + mention,
        'Give ' + mention + ' access'
      ]
    },
    date: function (date) {
      this.suggestions = [
        'Add ' + date + ' as deadline',
        'Add ' + date + ' as milestone date'
      ]
    },
    link: function (link) {
      this.suggestions = [
        'Embed ' + link
      ]
    }
  }
}
