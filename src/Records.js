class Records {
    constructor() {
        let personal;
        try {
            personal = JSON.parse(localStorage.getItem('records'));
            if (!(personal instanceof Array)) personal = [];
        } catch(e) {
            personal = [];
        }
        this.records = { personal, overall: [] };
    }

    get() {
        return this.records;
    }

    add(result) {
        const personal = [...this.records.personal, {points: result}];
        personal.sort((a, b) => b.points - a.points);
        this.records = { personal, overall: this.records.overall };
        localStorage.setItem('records', JSON.stringify(personal));
    }
}

export default Records;