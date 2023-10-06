<template>
    <div class="trends">
        <div class="trends__bar">
            <div class="trends__bar-label">
                Кількість зʼїдених пташок за день
            </div>
            <div class="trends__bar-chart">
                <Chart type="bar" :data="dataBirds" :options="dataBirdsOptions" class="h-30rem"/>
            </div>
        </div>
        <div class="trends__bar">
            <div class="trends__bar-label">
                Активність за останню годину
            </div>
            <div class="trends__bar-chart">
                <Chart type="pie" :data="dataActive" class="w-full" />
            </div>
        </div>
    </div>
</template>

<script>
    import Chart from 'primevue/chart';
    import { chartDataBirds, chartOptionsBirds, chartDataActive } from "../../constants/charts";

    export default {
        name: "ProfileTrendsControl",

        components: {
            Chart
        },

        computed: {
            dataBirds() {
                return chartDataBirds;
            },

            dataBirdsOptions() {
                return chartOptionsBirds;
            },

            dataActive() {
                return chartDataActive;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .trends {
        padding: 15px;
        display: flex;

        &__bar {
            flex-basis: 50%;
            display: flex;
            flex-direction: column;
        }

        &__bar-label {
            font-size: 20px;
            margin-bottom: 16px;
        }

        &__bar {
            margin-right: 30px;
        }
    }
</style>

<style lang="scss">
    canvas {
        background: #F9F9F9;
        max-height: 380px;
    }
</style>