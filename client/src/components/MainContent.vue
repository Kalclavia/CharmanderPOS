<template>
    <div class="main-content">
        <h2>{{ item }} Menu</h2>
        <component v-if="item === 'Appetizers'" :is="'Appetizer'" @selectItem="selectItem" />
        <component v-if="item === 'Bowl'" :is="'Bowl'" @selectItem="selectItem" />
        <component v-if="item === 'Plate'" :is="'Plate'" @selectItem="selectItem" />
        <component v-if="item === 'Bigger Plate'" :is="'BiggerPlate'" @selectItem="selectItem" />
        <component v-if="item === 'Drinks'" :is="'Drink'" @selectItem="selectItem" />
        <component v-if="item === 'A La Carte'" :is="'ALaCarte'" @selectItem="selectItem" />
    </div>
</template>

<script>
import Appetizer from './menu/Appetizers.vue'
import Bowl from './menu/Bowl.vue'
import Plate from './menu/Plate.vue'
import BiggerPlate from './menu/BiggerPlate.vue'
import Drink from './menu/Drinks.vue'
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
        Bowl,
        Plate,
        BiggerPlate,
        Drink,
        ALaCarte,
    },
};
</script>

<style scoped>
.main-content {
    position: fixed;
    top: 0;
    left: 450px;
    right: 0;
    bottom: 0;
    background-color: #9b150b;
    color: #e7e4d7;
    padding: 40px;
}
</style>