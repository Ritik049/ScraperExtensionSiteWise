// content_script_ebay.js

// Listen for message from background script to fetch data
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    if (message.action === 'fetchEbayData') {
      let data = await fetchEbayData();
      sendResponse(data);
    }
  });
  
  // Function to fetch eBay data
  async function fetchEbayData() {
    let results = document.querySelectorAll('div.s-item__info');
  
    let data = [];
    results.forEach(function(result) {
      let title = result.querySelector('div.s-item__title').innerText.trim();
  
      let price_tag = result.querySelector('span.s-item__price');
      let price = price_tag ? price_tag.innerText.trim() : "Price not available";
  
      let seller_tag = result.querySelector('span.s-item__seller-info-text');
      let seller = seller_tag ? seller_tag.innerText.trim() : "Seller not available";
  
      let image_tag = result.querySelector('div.s-item__image-wrapper.image-treatment img');
      let image_url = image_tag ? image_tag.getAttribute('src') : "Image not available";
  
      let link_tag = result.querySelector('a.s-item__link');
      let link = link_tag ? link_tag.getAttribute('href') : "Link not available";
  
      data.push({
        'site': 'eBay',
        'title': title,
        'price': price,
        'image_url': image_url,
        'link': link,
        'seller': seller
      });
    });
  
    return data;
  }
  