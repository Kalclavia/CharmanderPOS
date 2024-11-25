<template>
  <div class="launch-page">
    <img src="@/assets/panda-logo.png" alt="Panda Express Logo" class="logo" />
    <Text>MANAGER HOMEPAGE</Text>
  </div>
</template>

<script>
export default {
  methods: {
    startOrder() {
      this.$router.push('/home')
    },
  },
}
</script>

<style scoped>
.launch-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #9b150b;
  color: white;
}

.logo {
  width: 80vw;
  height: auto;
  max-width: 300px;
  margin-bottom: 20px;
}

.tap-to-order {
  margin-top: 20px;
  padding: 0.9375em;
  width: 320px;
  height: 60px;
  font-size: 1.125em;
  background-color: #e7e4d7;
  color: #080808;
  border: 2px solid #080808;
  border-radius: 30px;
  box-shadow: 0 4px 8px #080808;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}

button:hover {
  background-color: #d2ceb8; /* Darker background on hover */
}
</style>
