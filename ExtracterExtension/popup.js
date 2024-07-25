// popup.js

// Function to send message to content script to fetch data
async function fetchResults(query) {
  const results = await Promise.all([
    fetchAmazon(query),
    fetchFlipkart(query),
    fetchEbay(query)
  ]);
  return {
    amazon: results[0],
    flipkart: results[1],
    ebay: results[2]
  };
}

// Function to fetch Amazon data
async function fetchAmazon(query) {
  let url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
  let response = await fetch(url);
  let text = await response.text();
  let doc = new DOMParser().parseFromString(text, 'text/html');
  return parseAmazon(doc);
}

// Function to fetch Flipkart data
async function fetchFlipkart(query) {
  let url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
  let response = await fetch(url);
  let text = await response.text();
  let doc = new DOMParser().parseFromString(text, 'text/html');
  return parseFlipkart(doc);
}

// Function to fetch eBay data
async function fetchEbay(query) {
  let url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}`;
  let response = await fetch(url);
  let text = await response.text();
  let doc = new DOMParser().parseFromString(text, 'text/html');
  return parseEbay(doc);
}

/// Function to parse Amazon results from 'doc'
function parseAmazon(doc) {
  let products = [];
  let results = doc.querySelectorAll('div[data-component-type="s-search-result"]');

  
  
  results.forEach(result => {
    let titleTag = result.querySelector('h2 a');
    let title = titleTag ? titleTag.textContent.trim() : 'Title not found';
    let link = titleTag ? 'https://www.amazon.in' + titleTag.getAttribute('href') : 'Link not available';

    let priceTag = result.querySelector('span.a-price-whole');
    let priceCurrencyTag = result.querySelector('span.a-price-symbol');
    let price = priceTag ? (priceCurrencyTag ? priceCurrencyTag.textContent.trim() + priceTag.textContent.trim() : 'Price not available') : 'Price not available';

    let ratingTag = result.querySelector('span.a-icon-alt');
    let rating = ratingTag ? ratingTag.textContent.trim() : 'Rating not available';

    let imageTag = result.querySelector('img.s-image');
    let imageUrl = imageTag ? imageTag.getAttribute('src') : 'Image not available';

    let reviewsTag = result.querySelector('span.a-size-base');
    let reviews = reviewsTag ? reviewsTag.textContent.trim() : 'Reviews not available';

    products.push({
      site: 'Amazon',
      title: title,
      link: link,
      price: price,
      image_url: imageUrl,
      rating: rating,
      reviews: reviews
    });
  });

  // console.log(products);

  return products;
}

// Function to parse Flipkart results from 'doc'
function parseFlipkart(doc) {
  let products = [];
  let results = doc.querySelectorAll('div.tUxRFH, div.slAVV4');
  
  results.forEach(result => {
    let titleTag = result.querySelector('div.KzDlHZ, a.wjcEIp');
    let title = titleTag ? titleTag.textContent.trim() : 'Title not found';

    let priceTag = result.querySelector('div.Nx9bqj._4b5DiR, div.Nx9bqj');
    let price = priceTag ? priceTag.textContent.trim() : 'Price not available';

    let imageTag = result.querySelector('img.DByuf4');
    let imageUrl = imageTag ? imageTag.getAttribute('src') : 'Image not available';

    let ratingTag = result.querySelector('div.XQDdHH');
    let rating = ratingTag ? ratingTag.textContent.trim() : 'Rating not available';

    let reviewsTag = result.querySelector('span.Wphh3N');
    let reviews = reviewsTag ? reviewsTag.textContent.trim() : 'Reviews not available';

    let linkTag = result.querySelector('a.CGtC98, a.wjcEIp');
    let link = linkTag ? 'https://www.flipkart.com' + linkTag.getAttribute('href') : 'Link not available';

    products.push({
      site: 'Flipkart',
      title: title,
      price: price,
      link: link,
      image_url: imageUrl,
      rating: rating,
      reviews: reviews
    });
  });

  // console.log(products);

  return products;
}

// // Function to parse eBay results from 'doc'
// function parseEbay(doc) {
//   let products = [];
//   let results = doc.querySelectorAll('div.s-item__info');
  
//   results.forEach(result => {
//     let titleTag = result.querySelector('div.s-item__title a');
//     let title = titleTag ? titleTag.textContent.trim() : 'Title not found';

//     let priceTag = result.querySelector('span.s-item__price');
//     let price = priceTag ? priceTag.textContent.trim() : 'Price not available';

//     let sellerTag = result.querySelector('span.s-item__seller-info-text');
//     let seller = sellerTag ? sellerTag.textContent.trim() : 'Seller not available';

//     let imageTag = result.querySelector('div.s-item__image-wrapper img');
//     let imageUrl = imageTag ? imageTag.getAttribute('src') : 'Image not available';

//     let linkTag = result.querySelector('a.s-item__link');
//     let link = linkTag ? linkTag.getAttribute('href') : 'Link not available';

//     products.push({
//       site: 'eBay',
//       title: title,
//       price: price,
//       seller: seller,
//       image_url: imageUrl,
//       link: link
//     });
//   });

//   console.log(products);

//   return products;
// }

function parseEbay(doc) {
  let products = [];
  let results = doc.querySelectorAll('div.s-item__info');

  // console.log("Results",results);
  
  results.forEach((result,index) => {

       if(index<2)
       {
        return ;
       }
      let titleSpan = result.querySelector('div.s-item__title span[role="heading"]');
      let title = titleSpan ? titleSpan.textContent.trim() : 'Title not found';

      let priceTag = result.querySelector('span.s-item__price');
      let price = priceTag ? priceTag.textContent.trim() : 'Price not available';

      let sellerTag = result.querySelector('span.s-item__seller-info-text');
      let seller = sellerTag ? sellerTag.textContent.trim() : 'Seller not available';

      let imageTag = result.querySelector('div.s-item__image-wrapper.image-treatment img');
      console.log("IMAGE TAG ",imageTag);
      let imageUrl = imageTag ? imageTag.getAttribute('src') : 'Image not available';

      let linkTag = result.querySelector('a.s-item__link');
      let link = linkTag ? linkTag.getAttribute('href') : 'Link not available';

      products.push({
          site: 'eBay',
          title: title,
          price: price,
          seller: seller,
          image_url: imageUrl,
          link: link
      });
  });

  return products;
}



// Handle form submission
document.getElementById('search-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  let query = document.getElementById('search-query').value.trim();
  if (query !== '') {
    
    let results = await fetchResults(query);
    displayResults(results);
  }
});

// Function to display results
function displayResults(results) {
  document.getElementById('amazon-results').innerHTML = formatResults(results.amazon);
  document.getElementById('flipkart-results').innerHTML = formatResults(results.flipkart);
  document.getElementById('ebay-results').innerHTML = formatResults(results.ebay);

  // Show columns that have results
  showColumns(results);
}

function formatResults(products) {
  let html = '';
  products.forEach(product => {
    html += `
      <div class="card">
        <img src="${product.image_url}" alt="Product Image">
        <div>
          <h3>${product.title}</h3>
          <p>Price: ${product.price}</p>
    `;

    // Conditionally add rating and reviews if available
    if (product.rating !== undefined) {
      html += `<p>Rating: ${product.rating}</p>`;
    }

    if (product.reviews !== undefined) {
      html += `<p>Reviews: ${product.reviews}</p>`;
    }

    html += `
          <a href="${product.link}" target="_blank">View on ${product.site}</a>
        </div>
      </div>
    `;
  });
  return html;
}



// // Function to show columns that have results
// function showColumns(results) {
//   document.querySelectorAll('.column').forEach(column => {
//     if (results[column.id] && results[column.id].length > 0) {
//       column.style.display = 'block';
//     } else {
//       column.style.display = 'none';
//     }
//   });
// }


// Function to show columns that have results
function showColumns(results) {
  // Determine the current URL
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentUrl = new URL(tabs[0].url);

    // Determine which columns to show based on the current URL
    if (currentUrl.hostname.includes('amazon')) {
      document.getElementById('amazon').style.display = 'none';
      document.getElementById('flipkart').style.display = 'block';
      document.getElementById('ebay').style.display = 'block';
    } else if (currentUrl.hostname.includes('flipkart')) {
      document.getElementById('amazon').style.display = 'block';
      document.getElementById('flipkart').style.display = 'none';
      document.getElementById('ebay').style.display = 'block';
    } else if (currentUrl.hostname.includes('ebay')) {
      document.getElementById('amazon').style.display = 'block';
      document.getElementById('flipkart').style.display = 'block';
      document.getElementById('ebay').style.display = 'none';
    } else {
      // Default: Show all columns
      document.getElementById('amazon').style.display = 'block';
      document.getElementById('flipkart').style.display = 'block';
      document.getElementById('ebay').style.display = 'block';
    }

   // Adjust column width based on number of visible columns
   let visibleColumns = ['amazon', 'flipkart', 'ebay'].filter(column => {
    return document.getElementById(column).style.display !== 'none';
  });

  if (visibleColumns.length === 2) {
    document.querySelectorAll('.column').forEach(column => {
      column.style.width = '49%'; // Adjust width for two columns
    });
  } else {
    document.querySelectorAll('.column').forEach(column => {
      column.style.width = '32%'; // Default width for three columns
    });
  }
  });
}