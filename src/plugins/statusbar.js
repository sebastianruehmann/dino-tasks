export default class {
  constructor () {
    if (window.cordova) {
      this.$ = window.StatusBar
    }
  }
}
