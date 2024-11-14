<template>
  <div class="buttons">
    <button>Sales Report</button>
    <button>Product Usage Report</button>
    <button>X-Report</button>
    <button>Z-Report</button>
  </div>
  <div style="padding-top: 20px">
    <barchart />
  </div>
  <div class="buttons"><button>Toggle Chart Style</button></div>
</template>

<script>
import barchart from '../charts/barchart.vue'
export default {
  name: 'Reports',
  components: {
    barchart,
  },
  data() {
    return {}
  },
  methods: {},
  mounted: {},
}
</script>

<style scoped>
.buttons {
  padding-top: 25px;
  display: flex;
  justify-content: space-around;
}

button {
  font-size: medium;
  border: 2px solid #080808;
  border-radius: 30px;
  background-color: #e7e4d7;
  color: #080808;
  font: Arial;
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
}

button:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
