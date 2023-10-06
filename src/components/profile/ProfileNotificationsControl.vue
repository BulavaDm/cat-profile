<template>
    <div class="notifications">
        <div v-for="notification in notifications" :key="notification.id" class="notifications__card">
            <app-notification-card
                :id="notification.id"
                :date-time-text="notification.dateTimeText"
                :text="notification.text"
                :status="notification.status"
            />
        </div>
    </div>
</template>

<script>
    import { notificationsItems } from "../../constants/notifications";
    import AppNotificationCard from "../local/AppNotificationCard";

    export default {
        name: "ProfileNotificationsControl",

        components: {
            AppNotificationCard
        },

        computed: {
            notifications() {
                return notificationsItems;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .notifications {
        display: flex;
        flex-direction: column;
        padding: 15px;

        &__card {
            padding: 10px;
        }
    }
</style>