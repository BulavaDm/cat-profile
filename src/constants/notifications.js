const notificationsItems = [
    {
        id: 1,
        dateTimeText: '05.10.23 - 08:15',
        text: 'Гарно сьогодні поспав',
        status: 0
    },
    {
        id: 2,
        dateTimeText: '05.10.23 - 09:30',
        text: 'Сьгодні на ранок була смачнюча кілька',
        status: 1
    },
    {
        id: 3,
        dateTimeText: '05.10.23 - 11:30',
        text: 'Знайшов якусь обгортку. Зараз буде весело',
        status: 2
    },
    {
        id: 4,
        dateTimeText: '05.10.23 - 13:30',
        text: 'Куди вони усі поспішають?...Не розумію',
        status: 3
    },
    {
        id: 5,
        dateTimeText: '05.10.23 - 14:30',
        text: 'Втомився, треба трохи відпочити',
        status: 4
    }
]

const notificationsStatuses = [
    {
        id: 0,
        name: 'Прокинувся',
        color: 'lightgrey'
    },
    {
        id: 1,
        name: 'Поїв',
        color: 'coral'
    },
    {
        id: 2,
        name: 'Граюся',
        color: 'orangered'
    },
    {
        id: 3,
        name: 'Спостерігаю',
        color: 'darksalmon'
    },
    {
        id: 4,
        name: 'Відпочиваю',
        color: 'antiquewhite'
    }
]

export {
    notificationsItems,
    notificationsStatuses
}