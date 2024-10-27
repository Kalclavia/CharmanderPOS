<template>
    <div class="main-content">
        <h2>{{ item }} Menu</h2>
        <component v-if="item === 'A La Carte'" :is="'ALaCarte'" @selectItem="selectItem" />
        <component v-if="item === 'Appetizers'" :is="'Appetizer'" @selectItem="selectItem" />
    </div>
</template>

<script>
import Appetizer from './menu/Appetizers.vue'
import ALaCarte from './menu/ALaCarte.vue';

export default {
    name: 'MainContent',
    props: {
        item: String,
    },
    methods: {
        selectItem(item) {
            // Handle the selected item here
            console.log('Selected item:', item);
        }
    },
    components: {
        Appetizer,
        ALaCarte,
    },
};
</script>

<style scoped>
.main-content {
    margin-left: 450px;
}
</style>