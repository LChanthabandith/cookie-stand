class CookieStand {
  constructor(name, minCust, maxCust, avgCookieSale) {
    this.name = name;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookieSale = avgCookieSale;
    this.hourlyCookies = [];
    this.dailyCookies = 0;
  }

  getRandomCust() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  }

  simulateHourlyCookies() {
    const hourlyCookies = [];

    for (let hour = 6; hour <= 19; hour++) {
      const cust = this.getRandomCust();
      const cookies = Math.round(cust * this.avgCookieSale);
      hourlyCookies.push(cookies);
    }

    this.hourlyCookies = hourlyCookies;
  }

  calculateDailyCookies() {
    const dailyCookies = this.hourlyCookies.reduce((sum, cookies) => sum + cookies);
    this.dailyCookies = dailyCookies;
  }

  render(table) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = this.name;
    row.appendChild(nameCell);

    for (const cookies of this.hourlyCookies) {
      const cell = document.createElement('td');
      cell.textContent = cookies;
      row.appendChild(cell);
    }

    const totalCell = document.createElement('td');
    totalCell.textContent = this.dailyCookies;
    row.appendChild(totalCell);

    table.appendChild(row);
  }
}

const cookieStands = [
  new CookieStand('Seattle', 23, 65, 6.3),
  new CookieStand('Tokyo', 3, 24, 1.2),
  new CookieStand('Dubai', 11, 38, 3.7),
  new CookieStand('Paris', 20, 38, 2.3),
  new CookieStand('Lima', 2, 16, 4.6)
];

for (const cookieStand of cookieStands) {
  cookieStand.simulateHourlyCookies();
  cookieStand.calculateDailyCookies();
}

const table = document.createElement('table');

const headerRow = document.createElement('tr');
const emptyHeader = document.createElement('th');
headerRow.appendChild(emptyHeader);

for (let hour = 6; hour <= 19; hour++) {
  const hourStr = hour <= 12 ? `${hour}am` : `${hour - 12}pm`;
  const header = document.createElement('th');
  header.textContent = hourStr;
  headerRow.appendChild(header);
}

const totalHeader = document.createElement('th');
totalHeader.textContent = 'Daily Location Total';
headerRow.appendChild(totalHeader);

table.appendChild(headerRow);

for (const cookieStand of cookieStands) {
  cookieStand.render(table);
}
