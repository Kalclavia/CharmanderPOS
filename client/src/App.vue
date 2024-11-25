<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Accessibility } from 'accessibility';
window.addEventListener('load', function() { new Accessibility(); }, false);


</script>

<style scoped></style>
