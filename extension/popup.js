document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchQueryInput = document.getElementById('search-query');
    const amazonResults = document.getElementById('amazon-results');
    const flipkartResults = document.getElementById('flipkart-results');
    const ebayResults = document.getElementById('ebay-results');
    
    // Fetch data from the API
    function fetchResults(query, site) {
      let apiUrl = `http://localhost:8000/api/compare?q=${encodeURIComponent(query)}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Clear existing results
          amazonResults.innerHTML = '';
          flipkartResults.innerHTML = '';
          ebayResults.innerHTML = '';
          
          // Populate results
          data.forEach(product => {
            const card = `<div class="card">
              <img src="${product.image_url}" class="card-img-top" alt="Product Image">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">Price: ${product.price}</p>
                <p class="card-text">Rating: ${product.rating || 'N/A'}</p>
                <p class="card-text">Reviews: ${product.reviews || 'N/A'}</p>
                <a href="${product.link}" class="btn btn-primary" target="_blank">View on ${product.site}</a>
              </div>
            </div>`;
            
            if (product.site === 'Amazon') {
              amazonResults.innerHTML += card;
            } else if (product.site === 'Flipkart') {
              flipkartResults.innerHTML += card;
            } else if (product.site === 'eBay') {
              ebayResults.innerHTML += card;
            }
          });
        });
    }
  
    // Handle form submission
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const query = searchQueryInput.value.trim();
      if (query) {
        // Determine current site
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          const currentUrl = new URL(tabs[0].url);
          const hostname = currentUrl.hostname;
          let hideAmazon = false, hideFlipkart = false, hideEbay = false;
          
          if (hostname.includes('amazon.in')) {
            hideAmazon = true;
          } else if (hostname.includes('flipkart.com')) {
            hideFlipkart = true;
          } else if (hostname.includes('ebay.com')) {
            hideEbay = true;
          }
  
          // Hide/show columns based on current site
          document.getElementById('amazon').style.display = hideAmazon ? 'none' : 'block';
          document.getElementById('flipkart').style.display = hideFlipkart ? 'none' : 'block';
          document.getElementById('ebay').style.display = hideEbay ? 'none' : 'block';
          
          // Fetch results
          fetchResults(query);
        });
      }
    });
  
    // Initialize the popup
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const currentUrl = new URL(tabs[0].url);
      const hostname = currentUrl.hostname;
      let hideAmazon = false, hideFlipkart = false, hideEbay = false;
      
      if (hostname.includes('amazon.in')) {
        hideAmazon = true;
      } else if (hostname.includes('flipkart.com')) {
        hideFlipkart = true;
      } else if (hostname.includes('ebay.com')) {
        hideEbay = true;
      }
  
      // Hide/show columns based on current site
      document.getElementById('amazon').style.display = hideAmazon ? 'none' : 'block';
      document.getElementById('flipkart').style.display = hideFlipkart ? 'none' : 'block';
      document.getElementById('ebay').style.display = hideEbay ? 'none' : 'block';
    });
  });
  