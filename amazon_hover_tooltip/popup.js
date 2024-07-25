document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let query = document.getElementById('search-query').value;
  
    if (query) {
      // Send request to your backend API
      fetch(`http://localhost:8000/api/compare?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          displayResults(data);
        })
        .catch(error => console.error('Error fetching results:', error));
    }
  });
  
  function displayResults(data) {
    // Clear previous results
    document.getElementById('flipkart-results').innerHTML = '<div class="column-heading"><h3>Flipkart</h3></div>';
    document.getElementById('ebay-results').innerHTML = '<div class="column-heading"><h3>Ebay</h3></div>';
  
    // Filter and display Flipkart results
    let flipkartResults = data.filter(item => item.site === 'Flipkart');
    flipkartResults.forEach(product => {
      let card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.image_url}" alt="Product Image">
        <div class="card-content">
          <h5>${product.title}</h5>
          <p>Price: ${product.price}</p>
          <a href="${product.link}" target="_blank">View on Flipkart</a>
        </div>
      `;
      document.getElementById('flipkart-results').appendChild(card);
    });
  
    // Filter and display eBay results
    let ebayResults = data.filter(item => item.site === 'eBay');
    ebayResults.forEach(product => {
      let card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.image_url}" alt="Product Image">
        <div class="card-content">
          <h5>${product.title}</h5>
          <p>Price: ${product.price}</p>
          <a href="${product.link}" target="_blank">View on eBay</a>
        </div>
      `;
      document.getElementById('ebay-results').appendChild(card);
    });
  }
  