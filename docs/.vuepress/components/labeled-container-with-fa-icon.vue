<script setup lang="ts">
defineProps([
    'label',
    'icon',
    'colorClass'
]);
</script>

<style lang="scss" scoped>
.labeled-container {
    display: flex;
    flex-direction: column;

    border-style: solid;
    border-width: 1.5px;
    border-color: gray;
    border-radius: 0.5rem;
    margin: 1.75rem 1rem;
    

    .labeled-container__label {
        display: flex;
        align-items: center;
        gap: 8px;
        color: white;
        background-color: gray;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        padding:  0.25rem 1rem;
    }
    
    .labeled-container__label-icon {
        font-size: 1.75em;
    }
    
    .labeled-container__label-label {
        font-weight: bold;
    }
    .labeled-container__content {
        background-color: ivory;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
    .labeled-container__content-content {
        padding: 0.5rem 1rem 1.25rem 1rem;
        
    }
}
</style>

<template>
    <div class="labeled-container" :class="colorClass">
        <div class="labeled-container__label">
            <div class="labeled-container__label-icon">
                <i class="fa-solid" :class="icon"></i>
            </div>
            <div class="labeled-container__label-label">
                {{ label }}
            </div>
        </div>
        <div class="labeled-container__content">
            <div class="labeled-container__content-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>


