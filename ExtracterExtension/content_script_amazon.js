// content_script_amazon.js

// Listen for message from background script to fetch data
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    if (message.action === 'fetchAmazonData') {
      let data = await fetchAmazonData();
      sendResponse(data);
    }
  });
  
  // Function to fetch Amazon data
  async function fetchAmazonData() {
    let results = document.querySelectorAll('div[data-component-type="s-search-result"]');
  
    let data = [];
    results.forEach(function(result) {
      let title = result.querySelector('h2 a').innerText.trim();
      let link = "https://www.amazon.in" + result.querySelector('h2 a').getAttribute('href');
  
      let priceWhole = result.querySelector('span.a-price-whole');
      let priceSymbol = result.querySelector('span.a-price-symbol');
      let price = priceWhole ? (priceSymbol ? priceSymbol.innerText.trim() + priceWhole.innerText.trim() : priceWhole.innerText.trim()) : "Price not available";
  
      let rating = result.querySelector('span.a-icon-alt');
      rating = rating ? rating.innerText.trim() : "Rating not available";
  
      let image = result.querySelector('img.s-image');
      let image_url = image ? image.getAttribute('src') : "Image not available";
  
      let reviews = result.querySelector('span.a-size-base');
      reviews = reviews ? reviews.innerText.trim() : "Reviews not available";
  
      data.push({
        'site': 'Amazon',
        'title': title,
        'link': link,
        'price': price,
        'image_url': image_url,
        'rating': rating,
        'reviews': reviews
      });
    });
  
    console.log("DATA ",data)
    return data;
  }
  