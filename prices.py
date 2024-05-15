

#
import requests


import os
GAME_IDS = ["220200", "105600", "440"]
CURRENCY = "usd"


def get_game_price(appid, currency="usd"):

    url = f"http://store.steampowered.com/api/appdetails/?appids={appid}&cc={currency}"
    response = requests.get(url)
    data = response.json()

    if data[str(appid)]['success']:
        game_info = data[str(appid)]['data']
        if 'price_overview' in game_info:
            price_info = game_info['price_overview']
            final_price = price_info['final'] / 100  # Convert to dollars


    else:
        print("Failed to retrieve data. The game may not exist or the App ID is incorrect.\n{'='*32}")


# for game_id in GAME_IDS:
#     get_game_price(game_id, CURRENCY)