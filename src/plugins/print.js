export default class {
  constructor () {
    if (window.cordova) {
      this.$ = window.cordova.plugins.printer
    }
  }
}
