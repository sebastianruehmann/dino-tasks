import moment from 'moment'

export default {
  name: 'textSensibleCommands',
  data: function () {
    return {
      currentFocusedWord: null,
      cursorPosition: 0,
      currentFocusedWordType: null
    }
  },
  methods: {
    handleChangeCursorPosition: function (event) {
      const elem = event.target
      this.cursorPosition = elem.selectionStart

      this.currentFocusedWord = this.getCurrentFocusedWord(elem.value)
      this.detectKeyword(this.currentFocusedWord)
    },
    handleBlur: function () {
      this.currentFocusedWord = null
      this.cursorPosition = null
      this.currentFocusedWordType = null
    },
    getCurrentFocusedWord: function (val) {
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
      const currentFocusedWord = val.substring(j + 1, i)

      return currentFocusedWord
    },
    detectKeyword: function (val) {
      if (this.isMention(val)) {
        this.currentFocusedWordType = 'username'
      } else if (this.isLink(val)) {
        this.currentFocusedWordType = 'link'
      } else if (this.isDate(val)) {
        this.currentFocusedWordType = 'date'
      } else {
        this.currentFocusedWordType = null
      }
    },
    getAllKeywords: function (val) {
      const dates = this.getDates(val)
      const mentions = this.getMentions(val)
      const links = this.getLinks(val)

      return dates + mentions + links
    },
    isMention: function (val) {
      // eslint-disable-next-line
      return val.match(/^(?!.*\bRT\b)(?:.+\s)?@\w+/i)
    },
    isLink: function (val) {
      // eslint-disable-next-line
      return val.match(/(?:(?:(?:[A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)(?:(?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/i)
    },
    isDate: function (val) {
      return moment(val, ['DD.MM.YYYY', 'DD.MM.YY', 'DD.M.YY', 'DD.M.YYYY'], true).isValid()
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
      if (moment(val, ['DD.MM.YYYY', 'DD.MM.YY'], true).isValid()) {
        return moment(val, ['DD.MM.YYYY', 'DD.MM.YY']).format('DD.MM.YYYY')
      }
      return null
    }
  }
}
