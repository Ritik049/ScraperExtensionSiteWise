from django.http import JsonResponse
from django.shortcuts import render
import asyncio
from .utils import scrape_amazon, scrape_flipkart, scrape_ebay

async def compare_prices(request):
    query = request.GET.get('q', '')
    amazon_data = scrape_amazon(query)
    flipkart_data = scrape_flipkart(query)
    ebay_data = scrape_ebay(query)
    amazon_data, flipkart_data, ebay_data = await asyncio.gather(amazon_data, flipkart_data, ebay_data)

    response_data = amazon_data + flipkart_data + ebay_data
    return JsonResponse(response_data, safe=False)

def index(request):
    return render(request, 'index.html')
