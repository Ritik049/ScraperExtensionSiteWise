// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchAmazonData') {
    fetchAmazonData().then(data => sendResponse(data));
    return true;
  } else if (message.action === 'fetchFlipkartData') {
    fetchFlipkartData().then(data => sendResponse(data));
    return true;
  } else if (message.action === 'fetchEbayData') {
    fetchEbayData().then(data => sendResponse(data));
    return true;
  }
});

async function fetchAmazonData() {
  const amazonData = await chrome.scripting.executeScript({
    target: { tabId: sender.tab.id },
    func: parseAmazonResults,
  });
  return amazonData[0].result;
}

async function fetchFlipkartData() {
  const flipkartData = await chrome.scripting.executeScript({
    target: { tabId: sender.tab.id },
    func: parseFlipkartResults,
  });
  return flipkartData[0].result;
}

async function fetchEbayData() {
  const ebayData = await chrome.scripting.executeScript({
    target: { tabId: sender.tab.id },
    func: parseEbayResults,
  });
  return ebayData[0].result;
}
