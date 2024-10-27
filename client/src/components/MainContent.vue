<template>
    <div class="main-content">
        <h2>{{ item }} Menu</h2>
        <!-- Add more code here to display the menu items for the selected category -->
    </div>
</template>

<script>
export default {
    name: 'MainContent',
    props: {
        item: String,
    },
};
</script>

<style scoped></style>