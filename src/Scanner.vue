<template>
  <div>
    <button @click.prevent="scanner">Scanner</button>
  </div>
</template>

<script>
import Scanner from './plugins/scanner'

export default {
  data: function () {
    return {
    }
  },
  created: function () {
  },
  methods: {
    scanner: function () {
      const barcodeScanner = new Scanner().$
      if (!barcodeScanner) {
        window.alert('Vue.cordova.barcodeScanner not found')
        return
      }

      barcodeScanner.scan(
        function (result) {
          window.alert('We got a barcode\n' +
          'Result: ' + result.text + '\n' +
          'Format: ' + result.format + '\n' +
          'Cancelled: ' + result.cancelled)
        },
        function (error) {
          window.alert('Scanning failed: ' + error)
        },
        {
          preferFrontCamera: true, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          prompt: 'Place a barcode inside the scan area', // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: 'QR_CODE', // default: all but PDF_417 and RSS_EXPANDED
          orientation: 'landscape', // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true // iOS
        }
      )
    }
  }
}
</script>

<style lang='sass' scoped>
  @import 'scss/globals';

</style>
