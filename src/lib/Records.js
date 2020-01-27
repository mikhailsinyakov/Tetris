class Records {
  constructor() {
    this.records = { personal: [], overall: [] };
  }

  get() {
    return this.records;
  }

  async init() {
    let personal;
    try {
      personal = JSON.parse(localStorage.getItem("records"));
      if (!(personal instanceof Array)) personal = [];
    } catch (e) {
      personal = [];
    }

    const overall = await this.updateOverallRecords();
    this.records = { personal, overall };
  }

  async updateOverallRecords(attempt = 1) {
    if (attempt === 4) return [];
    try {
      const res = await fetch("/api/records");
      const data = await res.json();
      if (data instanceof Array) {
        return data.map(({ username, record }) => ({
          username,
          points: record
        }));
      }
      return [];
    } catch (e) {
      console.log(e);
      return await this.updateOverallRecords(attempt + 1);
    }
  }

  async add(result, username) {
    let personal = [...this.records.personal, { points: result }];
    personal.sort((a, b) => b.points - a.points);
    personal = personal.slice(0, 10);
    localStorage.setItem("records", JSON.stringify(personal));
    let overall = [];
    if (username) {
      const res = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ record: result, username })
      });
      if (res.status === 204) {
        overall = await this.updateOverallRecords();
      }
    }
    this.records = { personal, overall };
    return this.records;
  }
}

export default Records;
