<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    icon: {
        type: String,
        default: 'fa-user-tie'
    },
    userName: {
        type: String,
        required: true
    },
    iconColor: {
        type: String,
        default: 'blue'
    }
    
})
</script>


<style lang="scss" scoped>

// チャットの文字色
$messageTextColor: var(--vp-c-text);
// チャットの背景色
$messageBackgroundColor: var( --vp-c-bg-alt);
// チャットのボーダー色
$messageBorderColor: var(--vp-c-border-hard);

// チャットテキストの角の半径
$corner-radius: 0.5rem;

// 吹き出し三角のサイズ
$triangle-size: 8px;

@mixin left-triangle(
    $size,
    $color,
    $offsetFromLeft: 0px,
    $verticalOffset: 0px
) {
    content: "";
    position: absolute;
    border: $size solid transparent;
    border-right: $size solid $color;
    top: 50%;
    left: -$size * 2 + $offsetFromLeft;
    margin-top: $verticalOffset;
}

.chat {
    display: flex;
    flex-direction: row;
    margin: 1rem;

    .chat_user {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 1rem;
        .chat_user_icon {
            color: var(--accent1-color);
            font-size: 2rem;
        }
        .chat_user_name {
            font-size: 0.5rem;
            font-weight: bold;
        }       
    }

    .chat_message {
        position: relative;
        display: inline-block;
        padding: 7px 10px;
        box-sizing: border-box;

        border: solid 1px $messageBorderColor;
        border-radius: $corner-radius;
        
        color: $messageTextColor;
        background:$messageBackgroundColor;
        

        &::before {
            @include left-triangle($triangle-size, $messageBackgroundColor, 1.154px, -1.25rem);
            z-index: 2;
        }
        &::after {
            @include left-triangle($triangle-size, $messageBorderColor, 0px, -1.25rem);
            z-index: 1;
        }
    }

}

</style>

<template>
    <div class="chat">
        <div class="chat_user">
            <div class="chat_user_icon">
                <i class="fa-solid" :class="`${icon} ${iconColor}-dark-20-text`"></i>
            </div>
            <div class="chat_user_name">
                {{ userName }}
            </div>
        </div>
        <div class="chat_message">
            <slot></slot>
        </div>
    </div>
</template>