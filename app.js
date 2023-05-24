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
    for (let hour = 6; hour <= 19; hour++) {
      const cust = this.getRandomCust();
      const cookies = Math.round(cust * this.avgCookieSale);
      this.hourlyCookies.push(cookies);
    }
  }

  calculateDailyCookies() {
    this.dailyCookies = this.hourlyCookies.reduce((sum, cookies) => sum + cookies);
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

function createAndRenderStand(name, minCust, maxCust, avgCookieSale) {
  const newStand = new CookieStand(name, minCust, maxCust, avgCookieSale);
  newStand.simulateHourlyCookies();
  newStand.calculateDailyCookies();

  newStand.render(document.getElementById('output'));

  return newStand;
}

window.onload = function() {
  const cookieStands = [
    createAndRenderStand('Seattle', 23, 65, 6.3, document.getElementById('output')),
    createAndRenderStand('Tokyo', 3, 24, 1.2, document.getElementById('output')),
    createAndRenderStand('Dubai', 11, 38, 3.7, document.getElementById('output')),
    createAndRenderStand('Paris', 20, 38, 2.3, document.getElementById('output')),
    createAndRenderStand('Lima', 2, 16, 4.6, document.getElementById('output'))
  ];

  document.getElementById('new-stand-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('location').value;
    const minCust = document.getElementById('min-customers').value;
    const maxCust = document.getElementById('max-customers').value;
    const avgCookieSale = document.getElementById('average-cookies').value;

    cookieStands.push(createAndRenderStand(name, minCust, maxCust, avgCookieSale, document.getElementById('output')));

    event.target.reset();
  });
};
