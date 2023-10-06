<template>
    <div class="notification-card">
        <div class="notification-card__date">
            {{ dateTimeText }}
        </div>
        <div class="notification-card__text">
            {{ text }}
        </div>
        <app-base-status
            :status="status"
        />
    </div>
</template>

<script>
    import AppBaseStatus from "./AppBaseStatus";

    export default {
        name: "AppNotificationCard",

        components: {
            AppBaseStatus
        },

        props: {
            id: {
                type: Number,
                required: true
            },
            dateTimeText: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            status: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .notification-card {
        padding: 15px;
        border-radius: 6px;
        max-width: 400px;
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #F9F9F9;
        border: 2px solid #797572;

        &__date {
            font-size: 14px;
            font-weight: 500;
        }

        &__text {
            margin-bottom: 8px;
        }
    }
</style>