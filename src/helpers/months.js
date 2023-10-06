function getAgeWithMonths() {
    const ages = [];

    for (let i = 1; i < 241; i++) {
        let months = 0;
        let years = 0;
        let monthText = '';
        let yearText = '';
        let text = '';

        if ( i < 12 ) {
            months = i;
        } else {
            years = Math.floor(i/12);

            if (i % 12 !== 0) {
                months = i % 12;
            }
        }

        switch (months) {
            case 0:
                monthText = '';
                break;
            case 1:
                monthText = 'місяць';
                break;
            case 2:
            case 3:
            case 4:
                monthText = 'місяці';
                break;
            default:
                monthText = 'місяців';
                break;
        }

        switch (years) {
            case 1:
                yearText = 'рік';
                break;
            case 2:
            case 3:
            case 4:
                yearText = 'роки';
                break;
            default:
                yearText = 'років';
                break;
        }

        if (years === 0) {
            text = `${months} ${monthText}`;
        } else {
            if (months === 0) {
                text = `${years} ${yearText}`;
            } else {
                text = `${years} ${yearText} ${months} ${monthText}`;
            }
        }

        ages.push({
            id: i,
            name: text
        })
    }

    return ages;
}

export {
    getAgeWithMonths
}