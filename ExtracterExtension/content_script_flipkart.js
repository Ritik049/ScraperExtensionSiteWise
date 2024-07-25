// content_script_flipkart.js

// Listen for message from background script to fetch data
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    if (message.action === 'fetchFlipkartData') {
      let data = await fetchFlipkartData();
      sendResponse(data);
    }
  });
  
  // Function to fetch Flipkart data
  async function fetchFlipkartData() {
    let results = document.querySelectorAll('div.tUxRFH');
  
    let data = [];
    results.forEach(function(result) {
      let title = result.querySelector('div.KzDlHZ').innerText.trim();
      let price = result.querySelector('div.Nx9bqj._4b5DiR').innerText.trim();
  
      let image = result.querySelector('img.DByuf4');
      let image_url = image ? image.getAttribute('src') : "Image not available";
  
      let rating = result.querySelector('div.XQDdHH').innerText.trim();
      let reviews = result.querySelector('span.Wphh3N').innerText.trim();
  
      let link_tag = result.querySelector('a.CGtC98');
      let link = link_tag ? "https://www.flipkart.com" + link_tag.getAttribute('href') : "Link not available";
  
      data.push({
        'site': 'Flipkart',
        'title': title,
        'price': price,
        'link': link,
        'image_url': image_url,
        'rating': rating,
        'reviews': reviews
      });
    });
  
    return data;
  }
  