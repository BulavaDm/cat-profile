<template>
    <div class="loader"></div>
</template>

<script>
    export default {
        name: "AppLoader",
    }
</script>

<style lang="scss" scoped>
    .loader {
        border-radius: 50%;
        background: conic-gradient(#0000 10%, #CD5700);
        animation: spinner-zp9dbg 1.2s infinite linear;
        width: 60px;
        height: 60px;
        -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 6.4px),#000 0);
    }

    @keyframes spinner-zp9dbg {
        to {
            transform: rotate(1turn);
        }
    }
</style>