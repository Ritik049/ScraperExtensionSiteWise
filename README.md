### Product Search Extension 

This Chrome extension, "Product Search Extension SiteWise," allows users to search for products directly from selected text on web pages and compare prices across Amazon, Flipkart, and eBay using a companion Django web application.

### Features

- **Context Menu Integration**: Right-click on selected text to initiate a product search directly from the browser.
- **Multi-Site Price Comparison**: Fetch and compare product prices, ratings, and reviews from Amazon, Flipkart, and eBay.
- **Interactive Popup**: Displays search results with product details fetched from the Django backend API.

### Installation

1. **Chrome Extension Installation**:
   - Download or clone the repository from GitHub.
   - Open Google Chrome and go to `chrome://extensions/`.
   - Enable **Developer Mode**.
   - Click on **Load unpacked** and select the `Product Search Extension SiteWise` directory from the downloaded repository.

2. **Django Backend Setup**:
   - Navigate to the `product_comparison` directory of the Django project.
   - Install Python dependencies: `pip install -r requirements.txt`.
   - Apply migrations: `python manage.py migrate`.
   - Start the Django development server: `python manage.py runserver`.
   - The backend will run on `http://localhost:8000`.

### Usage

1. **Using the Chrome Extension**:
   - **Search Product**: Select any text on a webpage, right-click, and choose "Search Product" from the context menu.
   - **View Results**: The extension's popup will display product details fetched from the Django backend, including images, prices, ratings, and links to Amazon, Flipkart, and eBay.

2. **Web Application**:
   - Open a web browser and navigate to `http://localhost:8000`.
   - Enter a product name in the search box provided on the homepage.
   - Click on **Search** to fetch and compare prices from Amazon, Flipkart, and eBay.

### Project Structure

- **Django Backend (`product_comparison`)**:
  - Contains the Django web application for handling product comparison logic.
  - Uses `aiohttp` and `BeautifulSoup` for scraping product data.
  - API endpoint (`/api/compare`) serves product data to the Chrome extension.

- **Chrome Extension (`Product Search Extension SiteWise`)**:
  - **Files**: Includes `manifest.json` defining extension properties, `background.js` for context menu setup, `content.js` for extracting text from web pages, and `popup.html` for displaying search results.
  - **Integration**: Communicates with the Django backend API to fetch and display product information.

### Dependencies

- Python dependencies for Django backend (`product_comparison`):
  - `aiohttp`, `BeautifulSoup`, `googletrans`
  
### License

- This project is licensed under the [MIT License](LICENSE).

### Authors

- Add names or contributors of the project.

### Support

- For any issues or suggestions, please contact [author's email] or create an issue on GitHub repository.

This readme provides instructions for setting up and using the "Product Search Extension SiteWise" Chrome extension and associated Django backend. It aims to facilitate easy setup and effective use of the product comparison functionality across multiple e-commerce platforms.
