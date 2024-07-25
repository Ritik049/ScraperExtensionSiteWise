# compare/utils.py
import aiohttp
import asyncio
from bs4 import BeautifulSoup
from googletrans import Translator

SCRAPER_API_KEY = '417b9930cfc419821d215c7937ee1ec4'

async def fetch(session, url):
    async with session.get(f'http://api.scraperapi.com?api_key={SCRAPER_API_KEY}&url={url}') as response:
        return await response.text()

async def scrape_amazon(product):
    search_url = f"https://www.amazon.in/s?k={product}"

    async with aiohttp.ClientSession() as session:
        html = await fetch(session, search_url)
        soup = BeautifulSoup(html, 'html.parser')
        results = soup.find_all('div', {'data-component-type': 's-search-result'})

        data = []
        for result in results[:10]:  # Get the first 10 results
            title_tag = result.h2.a
            title = title_tag.text.strip()
            link = "https://www.amazon.in" + title_tag['href']

            price = result.find('span', {'class': 'a-price-whole'})
            currency = result.find('span',{'class':'a-price-symbol'})
            price = currency.text+price.text if price else "Price not available"
            print("PRICE ",price)

            rating = result.find('span', {'class': 'a-icon-alt'})
            rating = rating.text if rating else "Rating not available"

            image_tag = result.find('img', {'class': 's-image'})
            image_url = image_tag['src'] if image_tag else "Image not available"
            #print("IMge ",image_url)

            reviews = result.find('span', {'class': 'a-size-base'})
            reviews = reviews.text if reviews else "Reviews not available"

            data.append({
                'site':'Amazon',
                'title': title,
                'link': link,
                'price': price,
                'image_url':image_url,
                'rating': rating,
                'reviews': reviews
            })

        return data

async def scrape_flipkart(product):
    search_url = f"https://www.flipkart.com/search?q={product}"
    async with aiohttp.ClientSession() as session:
        html = await fetch(session, search_url)
        soup = BeautifulSoup(html, 'html.parser')
        results = soup.find_all('div', {'class': 'tUxRFH'})

        data = []
        for result in results[2:12]:  # Get the first 10 results, skipping non-product divs
            title = result.find('div', {'class': 'KzDlHZ'})
            title = title.text if title else "Not found"       

            price = result.find('div', {'class': 'Nx9bqj _4b5DiR'})
            price = price.text if price else "Price not available"

            image = result.find('img', {'class': 'DByuf4'})
            image_url = image['src'] if image else "Image not available"

            rating = result.find('div', {'class': 'XQDdHH'})
            rating = rating.text if rating else "Rating not available"

            reviews = result.find('span', {'class': 'Wphh3N'})
            reviews = reviews.text if reviews else "Reviews not available"

            link_tag = result.find('a', {'class': 'CGtC98'})
            link = f"https://www.flipkart.com{link_tag['href']}" if link_tag and link_tag.has_attr('href') else "Link not available"
           # print("LINK ",link)

            data.append({
                'site': 'Flipkart',
                'title': title,
                'price': price,
                'link':link,
                'image_url': image_url,
                'rating': rating,
                'reviews': reviews
            })

        results_2 = soup.find_all('div', {'class': 'slAVV4'})[:10]
        for result in results_2:
            title = result.find('a', {'class': 'wjcEIp'})
            title = title.text if title else "Not found"

            price = result.find('div', {'class': 'Nx9bqj'})
            price = price.text if price else "Price not available"

            image = result.find('img', {'class': 'DByuf4'})
            image_url = image['src'] if image else "Image not available"

            rating = result.find('div', {'class': 'XQDdHH'})
            rating = rating.text if rating else "Rating not available"

            reviews = result.find('span', {'class': 'Wphh3N'})
            reviews = reviews.text if reviews else "Reviews not available"

            link_tag = result.find('a', {'class': 'wjcEIp'})
            link = f"https://www.flipkart.com{link_tag['href']}" if link_tag and link_tag.has_attr('href') else "Link not available"
            

            data.append({
                'site': 'Flipkart',
                'title': title,
                'price': price,
                'link':link,
                'image_url': image_url,
                'rating': rating,
                'reviews': reviews
            })

        return data
    


async def scrape_ebay(product):
    search_url = f"https://www.ebay.com/sch/i.html?_nkw={product}"
    translator = Translator()
    async with aiohttp.ClientSession() as session:
        html = await fetch(session, search_url)
        soup = BeautifulSoup(html, 'html.parser')
        results = soup.find_all('div', {'class': 's-item__info'})

        data = []
        for result in results[2:12]:  # Get the first 10 results
            title_tag = result.find('div', {'class': 's-item__title'})
            title = title_tag.text if title_tag else "Not found"
            try:
                title = translator.translate(title, dest='en').text  # Translate to English
            except Exception as e:
                title = "Translation error" 


            price_tag = result.find('span', {'class': 's-item__price'})
            price = price_tag.text.strip() if price_tag else "Price not available"

            seller_tag = result.find('span',{'class':'s-item__seller-info-text'})
            seller = seller_tag.text if seller_tag else "Not found"

            image_tag = result.find('div', {'class': 's-item__image-wrapper image-treatment'})
            print(image_tag)
            image_url = "Image not available"
            if image_tag:
                img = image_tag.find('img')
                if img and img.has_attr('src'):
                    image_url = img['src']
            print("Image Url ebay ",image_url)

            # = result.find('div', {'class': 'x-star-rating'})
            #rating = rating_tag.text.strip() if rating_tag else "Rating not available"

            #reviews_tag = result.find('span', {'class': 's-item__reviews'})
            #reviews = reviews_tag.text.strip() if reviews_tag else "Reviews not available"

            link_tag = result.find('a', {'class': 's-item__link'})
            link = link_tag['href'] if link_tag and link_tag.has_attr('href') else "Link not available"

            data.append({
                'site': 'eBay',
                'title': title,
                'price': price,
                'image_url':image_url,
                'link': link,
                'seller':seller,
                
            })

        return data
