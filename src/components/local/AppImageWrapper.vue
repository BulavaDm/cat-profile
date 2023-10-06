<template>
    <div class="image-wrapper">
        <img :src="url" alt="'Image'"/>
    </div>
</template>

<script>
    export default {
        name: "AppImageWrapper",

        props: {
            id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .image-wrapper {
        img {
            max-width: 100%;
            object-fit: cover;
            border-radius: 20px;
            border: 1px solid transparent;
            transition: border 0.2s;
        }
    }
</style>