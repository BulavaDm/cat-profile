<template>
    <div class="gallery">
        <div v-for="image in images" :key="image.id" class="gallery__photo">
            <app-image-wrapper
                :id="image.id"
                :url="image.url"
            />
        </div>
    </div>
</template>

<script>
    import AppImageWrapper from "../local/AppImageWrapper";

    export default {
        name: "ProfileGalleryControl",

        components: {
            AppImageWrapper
        },

        data() {
            return {
                images: []
            }
        },

        created() {
            this.getCatImages();
        },

        methods: {
            getCatImages() {
                fetch('https://api.thecatapi.com/v1/images/search?limit=10')
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        this.images = data;
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .gallery {
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        max-height: 100vh;
        overflow-y: scroll;

        &__photo {
            padding: 10px;
        }
    }
</style>