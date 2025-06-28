<script setup lang="ts">
import { type ContainerType, safeIcon, safeLabel, safeColor } from './labeled-container-with-fa-icon';

defineProps({
    type: {
        type: String as () => ContainerType,
        required: false
    },
    label:{
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    colorClass: {
        type: String,
        required: false
    }
});
</script>

<style lang="scss" scoped>

$corner-radius: 0.5rem;
$icon-size: 1.2rem;
$border-width: 2px;

.labeled-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    border-style: solid;
    border-width: $border-width;
    border-radius: $corner-radius;

    margin: 1.75rem 1rem;
    
    .labeled-container__label {
        display: flex;
        align-items: center;

        margin-top: -$border-width;
        margin-left: -$border-width;
        margin-right: -$border-width;

        border-top-left-radius: $corner-radius;
        border-top-right-radius: $corner-radius;

        .labeled-container__label-icon {
            font-size: $icon-size;
            padding:  0.5rem 1rem;
        }
        
        .labeled-container__label-label {
            font-weight: bold;
            padding:  0.5rem 0rem;
        }
    }
    
    .labeled-container__content {

        border-bottom-left-radius: $corner-radius;
        border-bottom-right-radius: $corner-radius;

        .labeled-container__content-content {
            padding: 0.5rem 1rem 1.25rem 1rem;
        }
    }
}

</style>

<template>
    <div class="labeled-container"
        :class="`${safeColor(type, colorClass)}-border`">
        <div class="labeled-container__label"
        :class="`${safeColor(type, colorClass)}-bg white-text-b`">
            <div class="labeled-container__label-icon">
                <i class="fa-solid" :class="safeIcon(type, icon)"></i>
            </div>
            <div class="labeled-container__label-label">
                {{ safeLabel(type, label) }}
            </div>
        </div>
        <div class="labeled-container__content">
            <div class="labeled-container__content-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>


