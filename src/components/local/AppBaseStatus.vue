<template>
    <div class="status"
         :style="{
            'backgroundColor': notificationStatus.color,
        }"
    >
        {{ notificationStatus.name }}
    </div>
</template>

<script>
    import { notificationsStatuses } from "../../constants/notifications";

    export default {
        name: "AppBaseStatus",

        props: {
            status: {
                type: Number,
                required: true
            }
        },

        computed: {
            notificationStatus() {
                return notificationsStatuses.find((status) => status.id === this.status);
            }
        }
    }
</script>

<style scoped>
    .status {
        width: 100%;
        max-width: 120px;
        border-radius: 100px;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>