from flask_cors import CORS
import sklearn
import json

import requests
import pandas as pd
from joblib import dump, load
from flask import Flask, Response, jsonify, render_template, request, render_template
from datetime import datetime
import mysql.connector
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score
# from apischm.user import user
from apischm.tablets import *
from flask import Blueprint, Response, request, jsonify
publishers = Blueprint('publishers', __name__)
# from apischm.authentification import authentification
# from apischm.ad import advertisement
app = Flask(__name__)
CORS(app)
# app.register_blueprint(authentification)
# app.register_blueprint(advertisement)
# app.register_blueprint(user)
import json
import databaseinf.inserts

from apischm.tablets import *
from sqlalchemy.orm import sessionmaker, Session
print(sklearn.__version__)
session = sessionmaker(bind=engine)
s = Session(bind=engine)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1111'
app.config['MYSQL_DB'] = 'diploma'

cnx = mysql.connector.connect(user='root', password='1111',
                                      host='127.0.0.1', database='diploma')
cursor = cnx.cursor()

import pickle

with open('models/model_other.joblib', 'rb') as file:
    model_other = load(file)
print(model_other)

with open('models/model_eu.joblib', 'rb') as file:
    model_eu = load(file)
# model_eu.predict()

def get_developer_rank(game_count):

    df_new['Developer_Rank'] = pd.cut(df_new['Game_Count'], bins=quantiles, labels=False, duplicates='drop') + 1


    developer_rank = df_new.iloc[0]['Developer_Rank']
    print(f"The developer rank for a new game count of {new_game_count} is {developer_rank}.")

@app.route('/game/add', methods=['POST'])
def add_game():
    if request.method == 'POST':


        game_data = json.loads(request.data.decode('UTF-8'))


        name = game_data.get("name")
        platform = game_data.get("platform")
        year_of_release = game_data.get("yearOfRelease")
        genre = game_data.get("genre")
        publisher_name = game_data.get("publisherName")
        na_sales = game_data.get("naSales")
        eu_sales = game_data.get("euSales")
        jp_sales = game_data.get("jpSales")
        other_sales = game_data.get("otherSales")
        # na_sales_perc = game_data.get("naSalesPerc")
        # eu_sales_perc = game_data.get("euSalesPerc")
        # jp_sales_perc = game_data.get("jpSalesPerc")
        # other_sales_perc = game_data.get("otherSalesPerc")
        # na_sales_rank = game_data.get("rankNaDeveloper")
        # eu_sales_rank = game_data.get("rankEuDeveloper")
        # jp_sales_rank = game_data.get("rankJpDeveloper")
        # other_sales_rank = game_data.get("rankOtherDeveloper")
        # developer_rank = game_data.get("developerRank")
        # global_sales = game_data.get("globalSales")
        critic_score = game_data.get("criticScore")
        critic_count = game_data.get("criticCount")
        user_score = game_data.get("userScore")
        user_count = game_data.get("userCount")
        developer = game_data.get("developer")
        rating = game_data.get("rating")
        currency=game_data.get("currency")
        steamId=game_data.get("steamId")
        # gameAge=game_data.get("gameAgw")
        gameAge = calculate_game_age(game_data)


        # Connect to the database
        cnx = mysql.connector.connect(user='root', password='1111',
                                      host='127.0.0.1', database='diploma')
        cursor = cnx.cursor()


        cursor.execute("SELECT PublisherID FROM publishers WHERE PublisherName = %s", (publisher_name,))
        publisher_res = cursor.fetchone()

        if not publisher_res:

            cursor.execute("INSERT INTO publishers (PublisherName) VALUES (%s)", (publisher_name,))
            cnx.commit()
            publisher_id = cursor.lastrowid
        else:

            publisher_id = publisher_res[0]
        # cursor.close()
        # cnx.close()
        # Insert the new game data
        insert_game_query = """
        INSERT INTO games (Name, Platform, Year_of_Release, Genre, PublisherID) 
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_game_query, (name, platform, year_of_release, genre, publisher_id))
        cnx.commit()

        # Close the database connection
        # cursor.close()
        # cnx.close()

        insert_sales_query = """
                INSERT INTO sales (NA_Sales, EU_Sales, JP_Sales, Other_Sales) 
                VALUES (%s, %s, %s, %s)
                """
        cursor.execute(insert_sales_query, (na_sales, eu_sales, jp_sales, other_sales))
        cnx.commit()


        insert_ratings_query = """
                INSERT INTO ratings (Critic_Score, Critic_Count, User_Score, User_Count, Developer, Rating) 
                VALUES (%s, %s, %s, %s, %s, %s)
                """
        cursor.execute(insert_ratings_query,
                       (critic_score, critic_count, user_score, user_count, developer, rating))
        cnx.commit()

        cursor.close()
        cnx.close()

        return jsonify({'message': 'Game and related data added successfully!'}), 201

    else:
        return jsonify({'error': 'Invalid request method'}), 405




def get_game_price(appid, currency="usd"):
    url = f"http://store.steampowered.com/api/appdetails/?appids={appid}&cc={currency}"
    response = requests.get(url)
    data = response.json()

    if str(appid) in data and data[str(appid)]['success']:
        game_info = data[str(appid)]['data']
        if 'price_overview' in game_info:
            price_info = game_info['price_overview']
            final_price = price_info['final'] / 100  # Convert to dollars
            return final_price
        else:
            print(f"No pricing information available for appid: {appid}")
            return None
    else:
        print(f"Failed to retrieve data. The game may not exist or the App ID is incorrect: {appid}")
        return None


@app.route('/game/add/eu', methods=['POST'])
def add_game_eu():
    if request.method == 'POST':
        game_data = request.get_json()
        print("Original Data:", game_data)


        key_mapping = {
            'name':'Name','naSales': 'NA_Sales', 'jpSales': 'JP_Sales', 'otherSales': 'Other_Sales',
            'yearOfRelease': 'Year_of_Release', 'criticScore': 'Critic_Score',
            'criticCount': 'Critic_Count', 'userScore': 'User_Score', 'userCount': 'User_Count',
            'platform': 'Platform', 'publisher': 'Publisher', 'developer': 'Developer',
            'rating': 'Rating_E', 'gameCount': 'Game_Count',
            'genre': "Genre", 'rankEuDeveloper': 'Rank_EU_Developer', 'steamId': 'steamId', 'currency': 'currency','developerRank':'Developer_Rank'
        }
        name = game_data.get("name")
        platform = game_data.get("platform")
        year_of_release = game_data.get("yearOfRelease")
        genre = game_data.get("genre")
        publisher_name = game_data.get("publisherName")
        na_sales = game_data.get("naSales")
        eu_sales = game_data.get("euSales")
        jp_sales = game_data.get("jpSales")
        other_sales = game_data.get("otherSales")
        # na_sales_perc = game_data.get("naSalesPerc")
        # eu_sales_perc = game_data.get("euSalesPerc")
        # jp_sales_perc = game_data.get("jpSalesPerc")
        # other_sales_perc = game_data.get("otherSalesPerc")
        # na_sales_rank = game_data.get("rankNaDeveloper")
        eu_sales_rank = game_data.get("rankEuDeveloper")
        # jp_sales_rank = game_data.get("rankJpDeveloper")
        # other_sales_rank = game_data.get("rankOtherDeveloper")
        developer_rank = game_data.get("developerRank")
        # global_sales = game_data.get("globalSales")
        critic_score = game_data.get("criticScore")
        critic_count = game_data.get("criticCount")
        user_score = game_data.get("userScore")
        user_count = game_data.get("userCount")
        developer = game_data.get("developer")
        rating = game_data.get("rating")
        currency = game_data.get("currency")
        steamId = game_data.get("steamId")
        gameAge=game_data.get("gameAge")
        gameCount=game_data.get('gameCount')


        game_data = {key_mapping.get(k, k): v for k, v in game_data.items()}
        print("Mapped Data:", game_data)


        def calculate_game_age(year_of_release):
            return 2024 - int(year_of_release) if year_of_release else 0


        game_data['Game_Age'] = calculate_game_age(game_data.get('Year_of_Release'))
        game_age = calculate_game_age(game_data['Game_Age'])

        if 'Game_Count' not in game_data:
            game_data['Game_Count'] = 0
        game_data = map_categories(game_data, category_mappings)
        print("Category Mapped Data:", game_data)

        with open('bin_edges.pickle', 'rb') as handle:
            loaded_bin_edges = pickle.load(handle)

        game_data_df = pd.DataFrame([game_data])


        game_data_df['Game_Count'] = pd.to_numeric(game_data_df['Game_Count'], errors='coerce')
        game_data_df['Rank_EU_Developer'] = pd.to_numeric(game_data_df['Rank_EU_Developer'], errors='coerce')


        game_data_df['Developer_Rank'] = pd.cut(
            game_data_df['Game_Count'], bins=loaded_bin_edges['Global'], labels=False, include_lowest=True
        ) + 1
        game_data_df['Rank_EU_Developer'] = int(pd.cut(
            game_data_df['Rank_EU_Developer'], bins=loaded_bin_edges['EU'], labels=False, include_lowest=True
        ) + 1)



        model_columns = [
            'Platform', 'Year_of_Release', 'Genre', 'Publisher', 'NA_Sales', 'JP_Sales',
            'Other_Sales', 'Critic_Score', 'Critic_Count', 'User_Score', 'User_Count',
            'Developer', 'Game_Count', 'Developer_Rank', 'Rank_EU_Developer',
            'Game_Age', 'Rating_E'
        ]


        game_data = {k: game_data[k] for k in model_columns if k in game_data}


        input_df = pd.DataFrame([game_data[key] for key in model_columns if key in game_data]).transpose()
        input_df.columns = model_columns

        print("Model Input Data:", input_df)

        try:
            eu_predict = model_eu.predict(input_df)
            print("EU Sales Prediction:", eu_predict)
        except Exception as e:
            print("Error in prediction:", e)
            return jsonify({'error': 'Error during prediction'}), 500
        steam_id = game_data_df['steamId'].iloc[0]
        currency = game_data_df['currency'].iloc[0]

        print("steam_id:", steam_id)
        print("currency:", currency)

        price_per_game = get_game_price(steam_id, currency)
        print("Price per Game:", price_per_game)

        if price_per_game is None:
            return jsonify({'error': 'Unable to retrieve game price data'}), 500

        price = eu_predict[0] * 1000000 * price_per_game

        # steam_id = game_data_df['steamId'].iloc[0]
        # currency = game_data_df['currency'].iloc[0]
        # name = game_data_df['Name'].iloc[0]
        # platform = game_data_df['Platform'].iloc[0]
        # year_of_release = int(game_data_df['Year_of_Release'].iloc[0])
        # genre = game_data_df['Genre'].iloc[0]
        # publisher_name = game_data_df['Publisher'].iloc[0]
        # na_sales = float(game_data_df['NA_Sales'].iloc[0])
        # jp_sales = float(game_data_df['JP_Sales'].iloc[0])
        # other_sales = float(game_data_df['Other_Sales'].iloc[0])
        # eu_sales_rank = int(game_data_df['Rank_EU_Developer'].iloc[0])
        # developer_rank = int(game_data_df['Developer_Rank'].iloc[0])
        # critic_score = int(game_data_df['Critic_Score'].iloc[0])
        # critic_count = int(game_data_df['Critic_Count'].iloc[0])
        # user_score = float(game_data_df['User_Score'].iloc[0])
        # user_count = int(game_data_df['User_Count'].iloc[0])
        # developer = game_data_df['Developer'].iloc[0]
        # rating = game_data_df['Rating_E'].iloc[0]
        # game_age = int(game_data_df['Game_Age'].iloc[0])
        # game_count = int(game_data_df['Game_Count'].iloc[0])
        # Connect to the database
        cnx = mysql.connector.connect(user='root', password='1111',
                                      host='127.0.0.1', database='diploma')
        cursor = cnx.cursor()


        cursor.execute("SELECT PublisherID FROM publishers WHERE PublisherName = %s", (publisher_name,))
        publisher_res = cursor.fetchone()

        if not publisher_res:

            cursor.execute("INSERT INTO publishers (PublisherName) VALUES (%s)", (publisher_name,))
            cnx.commit()
            publisher_id = cursor.lastrowid
        else:

            publisher_id = publisher_res[0]


        insert_game_query = """
               INSERT INTO games (Name, Platform, Year_of_Release, Genre, PublisherID, gameAge) 
               VALUES (%s, %s, %s, %s, %s, %s)
               """
        cursor.execute(insert_game_query, (name, platform, year_of_release, genre, publisher_id, game_age))
        cnx.commit()


        insert_sales_query = """
               INSERT INTO sales (NA_Sales, JP_Sales, Other_Sales) 
               VALUES (%s, %s, %s)
               """
        cursor.execute(insert_sales_query, (na_sales, jp_sales, other_sales))
        cnx.commit()


        insert_ratings_query = """
               INSERT INTO ratings (Critic_Score, Critic_Count, User_Score, User_Count, Developer, Rating, Game_Count, Developer_Rank, Rank_EU_Developer) 
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
               """
        cursor.execute(insert_ratings_query, (
            critic_score, critic_count, user_score, user_count, developer, rating, gameCount, developer_rank, eu_sales_rank
        ))
        cnx.commit()

        cursor.close()
        cnx.close()

        return jsonify({
            'message': 'Game and related data added successfully!',
            'predicted_eu_sales': "%.2f"%eu_predict[0],
            'calculated_price': (int(price), currency)
        }), 201

    else:
        return jsonify({'error': 'Invalid request method'}), 405



@app.route('/game/add/na', methods=['POST'])
def add_game_na():
    if request.method == 'POST':
        game_data = request.get_json()
        print("Original Data:", game_data)


        key_mapping = {
            'name':'Name','naSales': 'EU_Sales', 'jpSales': 'JP_Sales', 'otherSales': 'Other_Sales',
            'yearOfRelease': 'Year_of_Release', 'criticScore': 'Critic_Score',
            'criticCount': 'Critic_Count', 'userScore': 'User_Score', 'userCount': 'User_Count',
            'platform': 'Platform', 'publisher': 'Publisher', 'developer': 'Developer',
            'rating': 'Rating_E', 'gameCount': 'Game_Count',
            'genre': "Genre", 'rankEuDeveloper': 'Rank_EU_Developer', 'steamId': 'steamId', 'currency': 'currency','developerRank':'Developer_Rank'
        }
        name = game_data.get("name")
        platform = game_data.get("platform")
        year_of_release = game_data.get("yearOfRelease")
        genre = game_data.get("genre")
        publisher_name = game_data.get("publisherName")
        na_sales = game_data.get("naSales")
        eu_sales = game_data.get("euSales")
        jp_sales = game_data.get("jpSales")
        other_sales = game_data.get("otherSales")
        # na_sales_perc = game_data.get("naSalesPerc")
        # eu_sales_perc = game_data.get("euSalesPerc")
        # jp_sales_perc = game_data.get("jpSalesPerc")
        # other_sales_perc = game_data.get("otherSalesPerc")
        # na_sales_rank = game_data.get("rankNaDeveloper")
        eu_sales_rank = game_data.get("rankEuDeveloper")
        # jp_sales_rank = game_data.get("rankJpDeveloper")
        # other_sales_rank = game_data.get("rankOtherDeveloper")
        developer_rank = game_data.get("developerRank")
        # global_sales = game_data.get("globalSales")
        critic_score = game_data.get("criticScore")
        critic_count = game_data.get("criticCount")
        user_score = game_data.get("userScore")
        user_count = game_data.get("userCount")
        developer = game_data.get("developer")
        rating = game_data.get("rating")
        currency = game_data.get("currency")
        steamId = game_data.get("steamId")
        gameAge=game_data.get("gameAge")
        gameCount=game_data.get('gameCount')


        game_data = {key_mapping.get(k, k): v for k, v in game_data.items()}
        print("Mapped Data:", game_data)


        def calculate_game_age(year_of_release):
            return 2024 - int(year_of_release) if year_of_release else 0


        game_data['Game_Age'] = calculate_game_age(game_data.get('Year_of_Release'))
        game_age = calculate_game_age(game_data['Game_Age'])

        if 'Game_Count' not in game_data:
            game_data['Game_Count'] = 0
        game_data = map_categories(game_data, category_mappings)
        print("Category Mapped Data:", game_data)

        with open('bin_edges.pickle', 'rb') as handle:
            loaded_bin_edges = pickle.load(handle)

        game_data_df = pd.DataFrame([game_data])


        game_data_df['Game_Count'] = pd.to_numeric(game_data_df['Game_Count'], errors='coerce')
        game_data_df['Rank_EU_Developer'] = pd.to_numeric(game_data_df['Rank_EU_Developer'], errors='coerce')


        game_data_df['Developer_Rank'] = pd.cut(
            game_data_df['Game_Count'], bins=loaded_bin_edges['Global'], labels=False, include_lowest=True
        ) + 1
        game_data_df['Rank_EU_Developer'] = int(pd.cut(
            game_data_df['Rank_EU_Developer'], bins=loaded_bin_edges['EU'], labels=False, include_lowest=True
        ) + 1)



        model_columns = [
            'Platform', 'Year_of_Release', 'Genre', 'Publisher', 'NA_Sales', 'JP_Sales',
            'Other_Sales', 'Critic_Score', 'Critic_Count', 'User_Score', 'User_Count',
            'Developer', 'Game_Count', 'Developer_Rank', 'Rank_EU_Developer',
            'Game_Age', 'Rating_E'
        ]


        game_data = {k: game_data[k] for k in model_columns if k in game_data}


        input_df = pd.DataFrame([game_data[key] for key in model_columns if key in game_data]).transpose()
        input_df.columns = model_columns

        print("Model Input Data:", input_df)

        try:
            eu_predict = model_eu.predict(input_df)
            print("EU Sales Prediction:", eu_predict)
        except Exception as e:
            print("Error in prediction:", e)
            return jsonify({'error': 'Error during prediction'}), 500
        steam_id = game_data_df['steamId'].iloc[0]
        currency = game_data_df['currency'].iloc[0]

        print("steam_id:", steam_id)
        print("currency:", currency)

        price_per_game = get_game_price(steam_id, currency)
        print("Price per Game:", price_per_game)

        if price_per_game is None:
            return jsonify({'error': 'Unable to retrieve game price data'}), 500

        price = eu_predict[0] * 1000000 * price_per_game

        # steam_id = game_data_df['steamId'].iloc[0]
        # currency = game_data_df['currency'].iloc[0]
        # name = game_data_df['Name'].iloc[0]
        # platform = game_data_df['Platform'].iloc[0]
        # year_of_release = int(game_data_df['Year_of_Release'].iloc[0])
        # genre = game_data_df['Genre'].iloc[0]
        # publisher_name = game_data_df['Publisher'].iloc[0]
        # na_sales = float(game_data_df['NA_Sales'].iloc[0])
        # jp_sales = float(game_data_df['JP_Sales'].iloc[0])
        # other_sales = float(game_data_df['Other_Sales'].iloc[0])
        # eu_sales_rank = int(game_data_df['Rank_EU_Developer'].iloc[0])
        # developer_rank = int(game_data_df['Developer_Rank'].iloc[0])
        # critic_score = int(game_data_df['Critic_Score'].iloc[0])
        # critic_count = int(game_data_df['Critic_Count'].iloc[0])
        # user_score = float(game_data_df['User_Score'].iloc[0])
        # user_count = int(game_data_df['User_Count'].iloc[0])
        # developer = game_data_df['Developer'].iloc[0]
        # rating = game_data_df['Rating_E'].iloc[0]
        # game_age = int(game_data_df['Game_Age'].iloc[0])
        # game_count = int(game_data_df['Game_Count'].iloc[0])
        # Connect to the database
        cnx = mysql.connector.connect(user='root', password='1111',
                                      host='127.0.0.1', database='diploma')
        cursor = cnx.cursor()


        cursor.execute("SELECT PublisherID FROM publishers WHERE PublisherName = %s", (publisher_name,))
        publisher_res = cursor.fetchone()

        if not publisher_res:

            cursor.execute("INSERT INTO publishers (PublisherName) VALUES (%s)", (publisher_name,))
            cnx.commit()
            publisher_id = cursor.lastrowid
        else:

            publisher_id = publisher_res[0]


        insert_game_query = """
               INSERT INTO games (Name, Platform, Year_of_Release, Genre, PublisherID, gameAge) 
               VALUES (%s, %s, %s, %s, %s, %s)
               """
        cursor.execute(insert_game_query, (name, platform, year_of_release, genre, publisher_id, game_age))
        cnx.commit()


        insert_sales_query = """
               INSERT INTO sales (NA_Sales, JP_Sales, Other_Sales) 
               VALUES (%s, %s, %s)
               """
        cursor.execute(insert_sales_query, (na_sales, jp_sales, other_sales))
        cnx.commit()


        insert_ratings_query = """
               INSERT INTO ratings (Critic_Score, Critic_Count, User_Score, User_Count, Developer, Rating, Game_Count, Developer_Rank, Rank_EU_Developer) 
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
               """
        cursor.execute(insert_ratings_query, (
            critic_score, critic_count, user_score, user_count, developer, rating, gameCount, developer_rank, eu_sales_rank
        ))
        cnx.commit()

        cursor.close()
        cnx.close()

        return jsonify({
            'message': 'Game and related data added successfully!',
            'predicted_eu_sales': "%.2f"%eu_predict[0],
            'calculated_price': (int(price), currency)
        }), 201

    else:
        return jsonify({'error': 'Invalid request method'}), 405



@app.route('/game/add/jp', methods=['POST'])
def add_game_jp():
    if request.method == 'POST':
        game_data = request.get_json()
        print("Original Data:", game_data)


        key_mapping = {
            'name':'Name','naSales': 'NA_Sales', 'jpSales': 'JP_Sales', 'otherSales': 'Other_Sales',
            'yearOfRelease': 'Year_of_Release', 'criticScore': 'Critic_Score',
            'criticCount': 'Critic_Count', 'userScore': 'User_Score', 'userCount': 'User_Count',
            'platform': 'Platform', 'publisher': 'Publisher', 'developer': 'Developer',
            'rating': 'Rating_E', 'gameCount': 'Game_Count',
            'genre': "Genre", 'rankEuDeveloper': 'Rank_EU_Developer', 'steamId': 'steamId', 'currency': 'currency','developerRank':'Developer_Rank'
        }
        name = game_data.get("name")
        platform = game_data.get("platform")
        year_of_release = game_data.get("yearOfRelease")
        genre = game_data.get("genre")
        publisher_name = game_data.get("publisherName")
        na_sales = game_data.get("naSales")
        eu_sales = game_data.get("euSales")
        jp_sales = game_data.get("jpSales")
        other_sales = game_data.get("otherSales")
        # na_sales_perc = game_data.get("naSalesPerc")
        # eu_sales_perc = game_data.get("euSalesPerc")
        # jp_sales_perc = game_data.get("jpSalesPerc")
        # other_sales_perc = game_data.get("otherSalesPerc")
        # na_sales_rank = game_data.get("rankNaDeveloper")
        eu_sales_rank = game_data.get("rankEuDeveloper")
        # jp_sales_rank = game_data.get("rankJpDeveloper")
        # other_sales_rank = game_data.get("rankOtherDeveloper")
        developer_rank = game_data.get("developerRank")
        # global_sales = game_data.get("globalSales")
        critic_score = game_data.get("criticScore")
        critic_count = game_data.get("criticCount")
        user_score = game_data.get("userScore")
        user_count = game_data.get("userCount")
        developer = game_data.get("developer")
        rating = game_data.get("rating")
        currency = game_data.get("currency")
        steamId = game_data.get("steamId")
        gameAge=game_data.get("gameAge")
        gameCount=game_data.get('gameCount')


        game_data = {key_mapping.get(k, k): v for k, v in game_data.items()}
        print("Mapped Data:", game_data)


        def calculate_game_age(year_of_release):
            return 2024 - int(year_of_release) if year_of_release else 0


        game_data['Game_Age'] = calculate_game_age(game_data.get('Year_of_Release'))
        game_age = calculate_game_age(game_data['Game_Age'])

        if 'Game_Count' not in game_data:
            game_data['Game_Count'] = 0
        game_data = map_categories(game_data, category_mappings)
        print("Category Mapped Data:", game_data)

        with open('bin_edges.pickle', 'rb') as handle:
            loaded_bin_edges = pickle.load(handle)

        game_data_df = pd.DataFrame([game_data])


        game_data_df['Game_Count'] = pd.to_numeric(game_data_df['Game_Count'], errors='coerce')
        game_data_df['Rank_EU_Developer'] = pd.to_numeric(game_data_df['Rank_EU_Developer'], errors='coerce')


        game_data_df['Developer_Rank'] = pd.cut(
            game_data_df['Game_Count'], bins=loaded_bin_edges['Global'], labels=False, include_lowest=True
        ) + 1
        game_data_df['Rank_EU_Developer'] = int(pd.cut(
            game_data_df['Rank_EU_Developer'], bins=loaded_bin_edges['EU'], labels=False, include_lowest=True
        ) + 1)



        model_columns = [
            'Platform', 'Year_of_Release', 'Genre', 'Publisher', 'NA_Sales', 'JP_Sales',
            'Other_Sales', 'Critic_Score', 'Critic_Count', 'User_Score', 'User_Count',
            'Developer', 'Game_Count', 'Developer_Rank', 'Rank_EU_Developer',
            'Game_Age', 'Rating_E'
        ]


        game_data = {k: game_data[k] for k in model_columns if k in game_data}


        input_df = pd.DataFrame([game_data[key] for key in model_columns if key in game_data]).transpose()
        input_df.columns = model_columns

        print("Model Input Data:", input_df)

        try:
            eu_predict = model_eu.predict(input_df)
            print("EU Sales Prediction:", eu_predict)
        except Exception as e:
            print("Error in prediction:", e)
            return jsonify({'error': 'Error during prediction'}), 500
        steam_id = game_data_df['steamId'].iloc[0]
        currency = game_data_df['currency'].iloc[0]

        print("steam_id:", steam_id)
        print("currency:", currency)

        price_per_game = get_game_price(steam_id, currency)
        print("Price per Game:", price_per_game)

        if price_per_game is None:
            return jsonify({'error': 'Unable to retrieve game price data'}), 500

        price = eu_predict[0] * 1000000 * price_per_game

        # steam_id = game_data_df['steamId'].iloc[0]
        # currency = game_data_df['currency'].iloc[0]
        # name = game_data_df['Name'].iloc[0]
        # platform = game_data_df['Platform'].iloc[0]
        # year_of_release = int(game_data_df['Year_of_Release'].iloc[0])
        # genre = game_data_df['Genre'].iloc[0]
        # publisher_name = game_data_df['Publisher'].iloc[0]
        # na_sales = float(game_data_df['NA_Sales'].iloc[0])
        # jp_sales = float(game_data_df['JP_Sales'].iloc[0])
        # other_sales = float(game_data_df['Other_Sales'].iloc[0])
        # eu_sales_rank = int(game_data_df['Rank_EU_Developer'].iloc[0])
        # developer_rank = int(game_data_df['Developer_Rank'].iloc[0])
        # critic_score = int(game_data_df['Critic_Score'].iloc[0])
        # critic_count = int(game_data_df['Critic_Count'].iloc[0])
        # user_score = float(game_data_df['User_Score'].iloc[0])
        # user_count = int(game_data_df['User_Count'].iloc[0])
        # developer = game_data_df['Developer'].iloc[0]
        # rating = game_data_df['Rating_E'].iloc[0]
        # game_age = int(game_data_df['Game_Age'].iloc[0])
        # game_count = int(game_data_df['Game_Count'].iloc[0])
        # Connect to the database
        cnx = mysql.connector.connect(user='root', password='1111',
                                      host='127.0.0.1', database='diploma')
        cursor = cnx.cursor()


        cursor.execute("SELECT PublisherID FROM publishers WHERE PublisherName = %s", (publisher_name,))
        publisher_res = cursor.fetchone()

        if not publisher_res:

            cursor.execute("INSERT INTO publishers (PublisherName) VALUES (%s)", (publisher_name,))
            cnx.commit()
            publisher_id = cursor.lastrowid
        else:

            publisher_id = publisher_res[0]


        insert_game_query = """
               INSERT INTO games (Name, Platform, Year_of_Release, Genre, PublisherID, gameAge) 
               VALUES (%s, %s, %s, %s, %s, %s)
               """
        cursor.execute(insert_game_query, (name, platform, year_of_release, genre, publisher_id, game_age))
        cnx.commit()


        insert_sales_query = """
               INSERT INTO sales (NA_Sales, JP_Sales, Other_Sales) 
               VALUES (%s, %s, %s)
               """
        cursor.execute(insert_sales_query, (na_sales, jp_sales, other_sales))
        cnx.commit()


        insert_ratings_query = """
               INSERT INTO ratings (Critic_Score, Critic_Count, User_Score, User_Count, Developer, Rating, Game_Count, Developer_Rank, Rank_EU_Developer) 
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
               """
        cursor.execute(insert_ratings_query, (
            critic_score, critic_count, user_score, user_count, developer, rating, gameCount, developer_rank, eu_sales_rank
        ))
        cnx.commit()

        cursor.close()
        cnx.close()

        return jsonify({
            'message': 'Game and related data added successfully!',
            'predicted_eu_sales': "%.2f"%eu_predict[0],
            'calculated_price': (int(price), currency)
        }), 201

    else:
        return jsonify({'error': 'Invalid request method'}), 405


@app.route('/game/add/other', methods=['POST'])
def add_game_other():
    if request.method == 'POST':
        game_data = request.get_json()
        print("Original Data:", game_data)


        key_mapping = {
            'name':'Name','naSales': 'NA_Sales', 'jpSales': 'JP_Sales', 'otherSales': 'Other_Sales',
            'yearOfRelease': 'Year_of_Release', 'criticScore': 'Critic_Score',
            'criticCount': 'Critic_Count', 'userScore': 'User_Score', 'userCount': 'User_Count',
            'platform': 'Platform', 'publisher': 'Publisher', 'developer': 'Developer',
            'rating': 'Rating_E', 'gameCount': 'Game_Count',
            'genre': "Genre", 'rankEuDeveloper': 'Rank_EU_Developer', 'steamId': 'steamId', 'currency': 'currency','developerRank':'Developer_Rank'
        }
        name = game_data.get("name")
        platform = game_data.get("platform")
        year_of_release = game_data.get("yearOfRelease")
        genre = game_data.get("genre")
        publisher_name = game_data.get("publisherName")
        na_sales = game_data.get("naSales")
        eu_sales = game_data.get("euSales")
        jp_sales = game_data.get("jpSales")
        other_sales = game_data.get("otherSales")
        # na_sales_perc = game_data.get("naSalesPerc")
        # eu_sales_perc = game_data.get("euSalesPerc")
        # jp_sales_perc = game_data.get("jpSalesPerc")
        # other_sales_perc = game_data.get("otherSalesPerc")
        # na_sales_rank = game_data.get("rankNaDeveloper")
        eu_sales_rank = game_data.get("rankEuDeveloper")
        # jp_sales_rank = game_data.get("rankJpDeveloper")
        # other_sales_rank = game_data.get("rankOtherDeveloper")
        developer_rank = game_data.get("developerRank")
        # global_sales = game_data.get("globalSales")
        critic_score = game_data.get("criticScore")
        critic_count = game_data.get("criticCount")
        user_score = game_data.get("userScore")
        user_count = game_data.get("userCount")
        developer = game_data.get("developer")
        rating = game_data.get("rating")
        currency = game_data.get("currency")
        steamId = game_data.get("steamId")
        gameAge=game_data.get("gameAge")
        gameCount=game_data.get('gameCount')


        game_data = {key_mapping.get(k, k): v for k, v in game_data.items()}
        print("Mapped Data:", game_data)


        def calculate_game_age(year_of_release):
            return 2024 - int(year_of_release) if year_of_release else 0


        game_data['Game_Age'] = calculate_game_age(game_data.get('Year_of_Release'))
        game_age = calculate_game_age(game_data['Game_Age'])

        if 'Game_Count' not in game_data:
            game_data['Game_Count'] = 0
        game_data = map_categories(game_data, category_mappings)
        print("Category Mapped Data:", game_data)
        # Load bin edges for categorizing data
        with open('bin_edges.pickle', 'rb') as handle:
            loaded_bin_edges = pickle.load(handle)

        game_data_df = pd.DataFrame([game_data])


        game_data_df['Game_Count'] = pd.to_numeric(game_data_df['Game_Count'], errors='coerce')
        game_data_df['Rank_EU_Developer'] = pd.to_numeric(game_data_df['Rank_EU_Developer'], errors='coerce')


        game_data_df['Developer_Rank'] = pd.cut(
            game_data_df['Game_Count'], bins=loaded_bin_edges['Global'], labels=False, include_lowest=True
        ) + 1
        game_data_df['Rank_EU_Developer'] = int(pd.cut(
            game_data_df['Rank_EU_Developer'], bins=loaded_bin_edges['EU'], labels=False, include_lowest=True
        ) + 1)



        model_columns = [
            'Platform', 'Year_of_Release', 'Genre', 'Publisher', 'NA_Sales', 'JP_Sales',
            'Other_Sales', 'Critic_Score', 'Critic_Count', 'User_Score', 'User_Count',
            'Developer', 'Game_Count', 'Developer_Rank', 'Rank_EU_Developer',
            'Game_Age', 'Rating_E'
        ]


        game_data = {k: game_data[k] for k in model_columns if k in game_data}


        input_df = pd.DataFrame([game_data[key] for key in model_columns if key in game_data]).transpose()
        input_df.columns = model_columns

        print("Model Input Data:", input_df)

        try:
            eu_predict = model_eu.predict(input_df)
            print("EU Sales Prediction:", eu_predict)
        except Exception as e:
            print("Error in prediction:", e)
            return jsonify({'error': 'Error during prediction'}), 500
        steam_id = game_data_df['steamId'].iloc[0]
        currency = game_data_df['currency'].iloc[0]

        print("steam_id:", steam_id)
        print("currency:", currency)

        price_per_game = get_game_price(steam_id, currency)
        print("Price per Game:", price_per_game)

        if price_per_game is None:
            return jsonify({'error': 'Unable to retrieve game price data'}), 500

        price = eu_predict[0] * 1000000 * price_per_game

        # steam_id = game_data_df['steamId'].iloc[0]
        # currency = game_data_df['currency'].iloc[0]
        # name = game_data_df['Name'].iloc[0]
        # platform = game_data_df['Platform'].iloc[0]
        # year_of_release = int(game_data_df['Year_of_Release'].iloc[0])
        # genre = game_data_df['Genre'].iloc[0]
        # publisher_name = game_data_df['Publisher'].iloc[0]
        # na_sales = float(game_data_df['NA_Sales'].iloc[0])
        # jp_sales = float(game_data_df['JP_Sales'].iloc[0])
        # other_sales = float(game_data_df['Other_Sales'].iloc[0])
        # eu_sales_rank = int(game_data_df['Rank_EU_Developer'].iloc[0])
        # developer_rank = int(game_data_df['Developer_Rank'].iloc[0])
        # critic_score = int(game_data_df['Critic_Score'].iloc[0])
        # critic_count = int(game_data_df['Critic_Count'].iloc[0])
        # user_score = float(game_data_df['User_Score'].iloc[0])
        # user_count = int(game_data_df['User_Count'].iloc[0])
        # developer = game_data_df['Developer'].iloc[0]
        # rating = game_data_df['Rating_E'].iloc[0]
        # game_age = int(game_data_df['Game_Age'].iloc[0])
        # game_count = int(game_data_df['Game_Count'].iloc[0])
        # Connect to the database
        cnx = mysql.connector.connect(user='root', password='1111',
                                      host='127.0.0.1', database='diploma')
        cursor = cnx.cursor()


        cursor.execute("SELECT PublisherID FROM publishers WHERE PublisherName = %s", (publisher_name,))
        publisher_res = cursor.fetchone()

        if not publisher_res:

            cursor.execute("INSERT INTO publishers (PublisherName) VALUES (%s)", (publisher_name,))
            cnx.commit()
            publisher_id = cursor.lastrowid
        else:

            publisher_id = publisher_res[0]


        insert_game_query = """
               INSERT INTO games (Name, Platform, Year_of_Release, Genre, PublisherID, gameAge) 
               VALUES (%s, %s, %s, %s, %s, %s)
               """
        cursor.execute(insert_game_query, (name, platform, year_of_release, genre, publisher_id, game_age))
        cnx.commit()


        insert_sales_query = """
               INSERT INTO sales (NA_Sales, JP_Sales, Other_Sales) 
               VALUES (%s, %s, %s)
               """
        cursor.execute(insert_sales_query, (na_sales, jp_sales, other_sales))
        cnx.commit()


        insert_ratings_query = """
               INSERT INTO ratings (Critic_Score, Critic_Count, User_Score, User_Count, Developer, Rating, Game_Count, Developer_Rank, Rank_EU_Developer) 
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
               """
        cursor.execute(insert_ratings_query, (
            critic_score, critic_count, user_score, user_count, developer, rating, gameCount, developer_rank, eu_sales_rank
        ))
        cnx.commit()

        cursor.close()
        cnx.close()

        return jsonify({
            'message': 'Game and related data added successfully!',
            'predicted_eu_sales': "%.2f"%eu_predict[0],
            'calculated_price': (int(price), currency)
        }), 201

    else:
        return jsonify({'error': 'Invalid request method'}), 405



if __name__ == '__main__':
    #serve(app, host='0.0.0.0', port=8080)
    app.run(debug=True)
