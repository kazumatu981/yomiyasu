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

$corner-radius: 0.5rem;
$icon-size: 1.75rem;

$labelTextColor: var(--vp-c-white);
$contentBackgroundColor: var( --vp-c-bg-alt);
$containerRed: var(--accent2-color);
$containerGreen: var(--accent1-color);
$containerYellow: var(--accent4-color);
$containerBlue: var(--accent3-color);
$containerGray: gray;


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
    $containerColor: $containerGray) {

    border-color: $containerColor !important;
    .labeled-container__label {
        color: $labelTextColor !important;
        background-color: $containerColor !important;
    }
    .labeled-container__content {
        background-color: $contentBackgroundColor !important;
    }
}

.red-container {
    @include colored-container($containerRed);
}
.green-container {
    @include colored-container($containerGreen);
}
.yellow-container {
    @include colored-container($containerYellow);
}
.blue-container {
    @include colored-container($containerBlue);
}
.gray-container {
    @include colored-container($containerGray);
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


