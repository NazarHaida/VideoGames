from pytrends.request import TrendReq
import pandas as pd

from pytrends.request import TrendReq
import pandas as pd
df=pd.read_csv('good.csv')
# Initialize pytrends
pytrends = TrendReq(hl='en-US', tz=360)

# Function to fetch Google Trends score for a given row
def get_trends_score(row):
    name = row['Name']
    year = row['Year_of_Release']  # Adjusted to the 'year' column of the DataFrame
    # geo = row['location']  # Adjusted to the 'location' column of the DataFrame
    # rank = row['rank']
    # Map to ISO country codes
    geo_map = {'US': 'US', 'UA': 'UA', 'JP': 'JP'}
    # geo_code = geo_map.get(geo, '')  # Default to an empty string if no mapping is found

    # Set timeframe for the whole year
    timeframe = f"{year}-01-01 {year}-12-31"
    pytrends.build_payload([name], timeframe=timeframe, geo='US')
    data = pytrends.interest_over_time()
    if not data.empty:
        return data[name].mean()  # Return the average score
    return 0  # Return 0 if data is empty or not found

# Load or subset the DataFrame
test_df = df.iloc[10:15]  # Assuming merged_df is your main DataFrame
test_df['Trends_Score'] = test_df.apply(get_trends_score, axis=1)

# Rank the Trends Scores
test_df['Trends_Rank'] = test_df['Trends_Score'].rank(method='min', ascending=False)
test_df['Region']='US'
test_df.to_csv('trends2.csv', mode='a', index=False, header=False)
# Display the DataFrame with the Trends Score and Rank
print(test_df[['Name', 'Year_of_Release','Trends_Score', 'Trends_Rank','Region']])


subset_df = df.head(20)  # Modify as needed for actual processing
subset_df['Trends_Score'] = subset_df.apply(get_trends_score, axis=1)


