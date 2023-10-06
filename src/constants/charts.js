const chartDataBirds = {
    datasets: [{
        data: [3, 4, 7, 10, 11, 2, 7],
        backgroundColor: 'coral'
    }],
    labels: ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця', 'Субота', 'Неділя']
};

const chartOptionsBirds = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    tension: 1,
    plugins: {
        legend: {
            display: false,
        }
    },
    chartArea: {
        backgroundColor: 'rgba(251, 85, 85, 0.4)'
    }
};

const chartDataActive = {
    datasets: [{
        data: [20, 40],
        backgroundColor: [
            'coral',
            'grey'
        ]
    }],
    labels: ['Активні хвилини', 'Не активні хвилини']
};

export {
    chartDataBirds,
    chartOptionsBirds,
    chartDataActive
}