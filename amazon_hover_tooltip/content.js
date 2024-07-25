// content.js
document.addEventListener('mouseover', function (event) {
  const element = event.target;
  const text = element.innerText || element.alt || element.title;
  if (text) {
      element.dataset.hoverText = text;
      console.log(text);
  }
});

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'c') {
      const hoveredElement = document.querySelector('[data-hover-text]');
      if (hoveredElement) {
          const textToCopy = hoveredElement.dataset.hoverText;
          navigator.clipboard.writeText(textToCopy).then(() => {
              console.log(`Copied to clipboard: ${textToCopy}`);
          }).catch(err => {
              console.error('Failed to copy text: ', err);
          });
      }
  }
});
