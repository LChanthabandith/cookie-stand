// Define an object to represent each location
const locations = [
  { name: 'Seattle', minCust: 23, maxCust: 65, avgCookieSale: 6.3, hourlyCookies: [] },
  { name: 'Tokyo', minCust: 3, maxCust: 24, avgCookieSale: 1.2, hourlyCookies: [] },
  { name: 'Dubai', minCust: 11, maxCust: 38, avgCookieSale: 3.7, hourlyCookies: [] },
  { name: 'Paris', minCust: 20, maxCust: 38, avgCookieSale: 2.3, hourlyCookies: [] },
  { name: 'Lima', minCust: 2, maxCust: 16, avgCookieSale: 4.6, hourlyCookies: [] }
];

// Generating a random number of customers per hour
for (const location of locations) {
  location.getRandomCust = function () {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  };
}

// Creating a function to calculate and store the simulated amounts of cookies purchased for each hour at each location
function simulateHourlyCookies() {
  for (const location of locations) {
    const hourlyCookies = [];

    for (let hour = 6; hour <= 19; hour++) {
      const cust = location.getRandomCust();
      const cookies = Math.round(cust * location.avgCookieSale);
      hourlyCookies.push(cookies);
    }

    location.hourlyCookies = hourlyCookies;
  }
}

// Making a function to calculate the total cookies sold in a day for each location
function calculateDailyCookies() {
  for (const location of locations) {
    const dailyCookies = location.hourlyCookies.reduce((sum, cookies) => sum + cookies);
    location.dailyCookies = dailyCookies;
  }
}

// Making and calculating the cookies for each location
simulateHourlyCookies();
calculateDailyCookies();

// Displaying the results in unordered lists on sales.html
for (const location of locations) {
  const list = document.createElement('ul');
  const header = document.createElement('h2');
  header.textContent = location.name;
  list.appendChild(header);

  for (let hour = 6; hour <= 19; hour++) {
    const hourStr = hour <= 12 ? `${hour}am` : `${hour - 12}pm`;
    const listItem = document.createElement('li');
    const cookies = location.hourlyCookies[hour - 6];
    listItem.textContent = `${hourStr}: ${cookies} cookies`;
    list.appendChild(listItem);
  }

  const totalItem = document.createElement('li');
  totalItem.textContent = `Total: ${location.dailyCookies} cookies`;
  list.appendChild(totalItem);

  document.body.appendChild(list);
}
