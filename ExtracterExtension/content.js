// content.js

// // Listen for messages from the popup
// chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
//     if (message.action === 'fetchAmazonData') {
//       let doc = document.documentElement.outerHTML;
//       let products = parseAmazon(doc);
//       sendResponse(products);
//     } else if (message.action === 'fetchFlipkartData') {
//       let doc = document.documentElement.outerHTML;
//       let products = parseFlipkart(doc);
//       sendResponse(products);
//     } else if (message.action === 'fetchEbayData') {
//       let doc = document.documentElement.outerHTML;
//       let products = parseEbay(doc);
//       sendResponse(products);
//     }
//   });
  
//   /// Function to parse Amazon results from 'doc'
// function parseAmazon(doc) {
//     let products = [];
//     let results = doc.querySelectorAll('div[data-component-type="s-search-result"]');
    
//     results.forEach(result => {
//       let titleTag = result.querySelector('h2 a');
//       let title = titleTag ? titleTag.textContent.trim() : 'Title not found';
//       let link = titleTag ? 'https://www.amazon.in' + titleTag.getAttribute('href') : 'Link not available';
  
//       let priceTag = result.querySelector('span.a-price-whole');
//       let priceCurrencyTag = result.querySelector('span.a-price-symbol');
//       let price = priceTag ? (priceCurrencyTag ? priceCurrencyTag.textContent.trim() + priceTag.textContent.trim() : 'Price not available') : 'Price not available';
  
//       let ratingTag = result.querySelector('span.a-icon-alt');
//       let rating = ratingTag ? ratingTag.textContent.trim() : 'Rating not available';
  
//       let imageTag = result.querySelector('img.s-image');
//       let imageUrl = imageTag ? imageTag.getAttribute('src') : 'Image not available';
  
//       let reviewsTag = result.querySelector('span.a-size-base');
//       let reviews = reviewsTag ? reviewsTag.textContent.trim() : 'Reviews not available';
  
//       products.push({
//         site: 'Amazon',
//         title: title,
//         link: link,
//         price: price,
//         image_url: imageUrl,
//         rating: rating,
//         reviews: reviews
//       });
//     });
  
//     return products;
//   }
  
//   // Function to parse Flipkart results from 'doc'
//   function parseFlipkart(doc) {
//     let products = [];
//     let results = doc.querySelectorAll('div.tUxRFH, div.slAVV4');
    
//     results.forEach(result => {
//       let titleTag = result.querySelector('div.KzDlHZ, a.wjcEIp');
//       let title = titleTag ? titleTag.textContent.trim() : 'Title not found';
  
//       let priceTag = result.querySelector('div.Nx9bqj._4b5DiR, div.Nx9bqj');

//       let price = priceTag ? priceTag.textContent.trim() : 'Price not available';

  
//       let imageTag = result.querySelector('img.DByuf4');
//       let imageUrl = imageTag ? imageTag.getAttribute('src') : 'Image not available';
  
//       let ratingTag = result.querySelector('div.XQDdHH');
//       let rating = ratingTag ? ratingTag.textContent.trim() : 'Rating not available';
  
//       let reviewsTag = result.querySelector('span.Wphh3N');
//       let reviews = reviewsTag ? reviewsTag.textContent.trim() : 'Reviews not available';
  
//       let linkTag = result.querySelector('a.CGtC98, a.wjcEIp');
//       let link = linkTag ? 'https://www.flipkart.com' + linkTag.getAttribute('href') : 'Link not available';
  
//       products.push({
//         site: 'Flipkart',
//         title: title,
//         price: price,
//         link: link,
//         image_url: imageUrl,
//         rating: rating,
//         reviews: reviews
//       });
//     });
  
//     return products;
//   }
  
// //   // Function to parse eBay results from 'doc'
// //   function parseEbay(doc) {
// //     let products = [];
// //     let results = doc.querySelectorAll('div.s-item__info');
    
// //     results.forEach(result => {
// //       let titleTag = result.querySelector('div.s-item__title a');
// //       let title = titleTag ? titleTag.textContent.trim() : 'Title not found';
  
// //       let priceTag = result.querySelector('span.s-item__price');
// //       let price = priceTag ? priceTag.textContent.trim() : 'Price not available';
  
// //       let sellerTag = result.querySelector('span.s-item__seller-info-text');
// //       let seller = sellerTag ? sellerTag.textContent.trim() : 'Seller not available';
  
// //       let imageTag = result.querySelector('div.s-item__image-wrapper img');
// //       let imageUrl = imageTag ? imageTag.getAttribute('src') : 'Image not available';
  
// //       let linkTag = result.querySelector('a.s-item__link');
// //       let link = linkTag ? linkTag.getAttribute('href') : 'Link not available';
  
// //       products.push({
// //         site: 'eBay',
// //         title: title,
// //         price: price,
// //         seller: seller,
// //         image_url: imageUrl,
// //         link: link
// //       });
// //     });
  
// //     return products;
// //   }
// function parseEbay(doc) {
//     let products = [];
//     let results = doc.querySelectorAll('div.s-item__info');

    
//     results.forEach((result,index) => {

//         if(index<2)
//             {
//              return ;
//             }
//         let titleSpan = result.querySelector('div.s-item__title span[role="heading"]');
//         let title = titleSpan ? titleSpan.textContent.trim() : 'Title not found';

//         let priceTag = result.querySelector('span.s-item__price');
//         let price = priceTag ? priceTag.textContent.trim() : 'Price not available';

//         let sellerTag = result.querySelector('span.s-item__seller-info-text');
//         let seller = sellerTag ? sellerTag.textContent.trim() : 'Seller not available';

//         let imageTag = result.querySelector('div.s-item__image-wrapper.image-treatment img');
//         let imageUrl = imageTag ? imageTag.getAttribute('src') : 'Image not available';

//         let linkTag = result.querySelector('a.s-item__link');
//         let link = linkTag ? linkTag.getAttribute('href') : 'Link not available';

//         products.push({
//             site: 'eBay',
//             title: title,
//             price: price,
//             seller: seller,
//             image_url: imageUrl,
//             link: link
//         });
//     });

//     return products;
// }
