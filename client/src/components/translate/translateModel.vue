<template>
  <div class="translate">
    <div id="google_translate_element"></div>
  </div>
</template>

<script>
export default {
  name: 'TranslateModel',
  mounted() {
    if (!document.getElementById('google-translate-script')) {
      const translateScript = document.createElement('script')
      translateScript.id = 'google-translate-script'
      translateScript.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.head.appendChild(translateScript)

      // Add initialization script
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element',
        )
      }
    }
  },
  unmounted() {
    delete window.googleTranslateElementInit
  },
}
</script>

<style scoped>
.translate {
  color: green;
}
</style>
