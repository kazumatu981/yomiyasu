<script setup lang="ts">
import { type ContainerType, safeIcon, safeLabel, safeColorClass } from './labeled-container-with-fa-icon';

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

@use 'sass:color' as color;
$corner-radius: 0.5rem;
$icon-size: 1.2rem;

.labeled-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    border-style: solid;
    border-width: 1.5px;
    border-radius: $corner-radius;

    margin: 1.75rem 1rem;
    
    .labeled-container__label {
        display: flex;
        align-items: center;

        border-top-left-radius: $corner-radius;
        border-top-right-radius: $corner-radius;
        padding:  0.5rem 1rem;

        .labeled-container__label-icon {
            font-size: $icon-size;
        }
        
        .labeled-container__label-label {
            font-weight: bold;
            padding-left: 0.5rem;
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

@mixin colored-container(
    $containerColor: var(--yomiyasu-dark-gray),
    $labelTextColor: var(--yomiyasu-white),
    $contentBackgroundColor: var( --yomiyasu-x-light-gray),
    $contentTextColor: var(--yomiyasu-black)) {

    border-color: $containerColor !important;
    .labeled-container__label {
        color: $labelTextColor !important;
        background-color: $containerColor !important;
    }
    .labeled-container__content {
        color: $contentTextColor !important;
        background-color: $contentBackgroundColor !important;
    }
}


$colors: "red", "green", "yellow", "blue", "gray";

@each $color in $colors {
    .#{$color}-container {
        @include colored-container(var(--yomiyasu-dark-#{$color}),
            var(--yomiyasu-white),
            var(--yomiyasu-white),
            var(--yomiyasu-black));
    }
}

</style>

<template>
    <div class="labeled-container" :class="safeColorClass(type, colorClass)">
        <div class="labeled-container__label">
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


