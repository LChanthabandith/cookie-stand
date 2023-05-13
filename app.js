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

  render(parentElement) {
    const locationDiv = document.createElement('div');
    const locationTitle = document.createElement('h2');
    locationTitle.textContent = this.name;
    locationDiv.appendChild(locationTitle);

    const hourlyCookiesList = document.createElement('ul');

    for (let i = 0; i < this.hourlyCookies.length; i++) {
      const listItem = document.createElement('li');
      const hour = i + 6 <= 12 ? `${i + 6}am` : `${(i + 6) - 12}pm`;
      listItem.textContent = `${hour}: ${this.hourlyCookies[i]} cookies`;
      hourlyCookiesList.appendChild(listItem);
    }

    locationDiv.appendChild(hourlyCookiesList);

    const totalCookiesItem = document.createElement('li');
    totalCookiesItem.textContent = `Daily Location Total: ${this.dailyCookies} cookies`;
    hourlyCookiesList.appendChild(totalCookiesItem);

    parentElement.appendChild(locationDiv);
  }
}

window.onload = function() {
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

  const outputDiv = document.getElementById('output');

  for (const cookieStand of cookieStands) {
    cookieStand.render(outputDiv);
  }
};

/*
OLD ORIGINAL CODE IN TABLE FORMAT. KEEP JUST IN CASE!
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

const totalsRow = document.createElement('tr');
const totalsLabelCell = document.createElement('td');
totalsLabelCell.textContent = 'Hourly Totals';
totalsRow.appendChild(totalsLabelCell);

let grandTotal = 0;

for (let hour = 0; hour < 14; hour++) {
  let hourlyTotal = 0;

  for (const cookieStand of cookieStands) {
    hourlyTotal += cookieStand.hourlyCookies[hour];
  }

  const totalCell = document.createElement('td');
  totalCell.textContent = hourlyTotal;
  totalsRow.appendChild(totalCell);

  grandTotal += hourlyTotal;
}

const grandTotalCell = document.createElement('td');
grandTotalCell.textContent = grandTotal;
totalsRow.appendChild(grandTotalCell);

table.appendChild(totalsRow);
*/