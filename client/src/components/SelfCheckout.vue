<template>
    <div class="self-checkout">
        <aside class="menu-bar">
            <button v-for="meal in mealTypes" :key="meal" @click="fetchMenuItems(meal)">
                {{ meal }}
            </button>
        </aside>

        <section class="menu-display">
            <h2>{{ selectedMealType }} Options</h2>
            <ul>
                <li v-for="item in menuItems" :key="item">{{ item }}</li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mealTypes: ['Appetizers', 'Sides', 'Entrees', 'Drinks'],
            selectedMealType: '',
            menuItems: []
        };
    },
    methods: {
        async fetchMenuItems(type) {
            this.selectedMealType = type;
            try {
                const response = await fetch('/menu/${type.toLowerCase()}');
                const data = await response.json();
                this.menuItems = data;
            } catch (error) {
                console.error("Error fetching menu items: ", error);
            }
        }
    }
};
</script>

<style scoped>
.self-checkout {
    display: flex;
}

.menu-bar {
    width: 200px;
    display: flex;
    flex-direction: column;
}

.menu-bar button {
    margin: 5px 0;
    padding: 10px;
}

.menu-display {
    margin-left: 20px;
}
</style>