import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

def get_match_info():
    # Initialize an empty list to store the match info in SQL format
    match_info_sql = []
    match_info_sql.append("INSERT INTO `matchinfo` (`match_id`, `date_time`, `gameweek`, `home_team_id`, `home_team_score`, `away_team_id`, `away_team_score`) VALUES")

    # Mapping of team names to handle variations
    team_name_mapping = {
        'Arsenal': ['Arsenal'],
        'Aston Villa': ['Aston Villa'],
        'Bournemouth': ['Bournemouth'],
        'Brentford': ['Brentford'],
        'Brighton & Hove Albion': ['Brighton & Hove Albion', 'Brighton', 'BHA'],
        'Burnley': ['Burnley'],
        'Chelsea': ['Chelsea'],
        'Crystal Palace': ['Crystal Palace', 'CPFC'],
        'Everton': ['Everton'],
        'Fulham': ['Fulham'],
        'Liverpool': ['Liverpool'],
        'Luton Town': ['Luton Town','Luton'],
        'Manchester City': ['Manchester City', 'Man City', 'MCFC'],
        'Manchester United': ['Manchester United', 'Man United', 'MUFC','Man Utd'],
        'Newcastle United': ['Newcastle United', 'Newcastle', 'NUFC'],
        'Nottingham Forest': ['Nottingham Forest', 'NFFC','Nott\'m Forest'],
        'Sheffield United': ['Sheffield United', 'Sheffield', 'SUFC'],
        'Tottenham Hotspur': ['Tottenham Hotspur', 'Tottenham', 'Spurs'],
        'West Ham United': ['West Ham United', 'West Ham', 'WHUFC'],
        'Wolverhampton Wanderers': ['Wolverhampton Wanderers', 'Wolves', 'WWFC','Wolves'],
    }

    # Loop through each match from game week 1 to game week 38
    with open('EPL_fixtures_23-24.sql', 'a') as file:
        for match_number in range(1, 381):
            # Construct the URL for each match
            url = f"https://www.premierleague.com/match/{93320 + match_number}"

            # Send a GET request to the URL
            response = requests.get(url)

            # Check if the request was successful (status code 200)
            # Parse the HTML content using BeautifulSoup
            soup = BeautifulSoup(response.content, 'html.parser')

            # Extract game week
            gameweek_elem = soup.find('div', class_='mc-header__gameweek-selector-current-gameweek mc-header__gameweek-selector-current-gameweek--short')
            gameweek = gameweek_elem.text.strip().split()[1]
            # Extract date and time information
            date_elem = soup.find('div', class_='mc-summary__info')
            time_elem = soup.find('span', class_='renderKOContainer')

            if date_elem and time_elem and 'data-kickoff' in time_elem.attrs:
                date = date_elem.text.strip()
                # Convert the date string to a datetime object
                date_obj = datetime.strptime(date, '%a %d %b %Y')

                # Format the date as 'YYYY-MM-DD' for MySQL
                formatted_date = date_obj.strftime('%Y-%m-%d')
                time_in_milliseconds = int(time_elem['data-kickoff'])
                time_utc = datetime.utcfromtimestamp(time_in_milliseconds / 1000)
                time_bst = time_utc + timedelta(hours=1)  # Adjust for British Summer Time (BST)
                time_gmt_plus_7 = time_bst + timedelta(hours=6)  # Add 7 hours for GMT+7
                time = time_gmt_plus_7.strftime('%H:%M:%S')

                # Extract home and away team names
                team_container_elems = soup.find_all('div', class_='mc-summary__team-container')

                if len(team_container_elems) == 2:  # Ensure that there are exactly two team containers
                    home_team_elem = team_container_elems[0].find('a', class_='mc-summary__team-name-link')
                    away_team_elem = team_container_elems[1].find('a', class_='mc-summary__team-name-link')

                    if home_team_elem and away_team_elem:
                        home_team_name = home_team_elem.find('span', class_='mc-summary__team-name').text.strip()
                        away_team_name = away_team_elem.find('span', class_='mc-summary__team-name').text.strip()

                        # Find the matching team name in the mapping
                        for team, variations in team_name_mapping.items():
                            if any(variation.lower() in home_team_name.lower() for variation in variations):
                                home_team_name = team
                                break
                        for team, variations in team_name_mapping.items():
                            if any(variation.lower() in away_team_name.lower() for variation in variations):
                                away_team_name = team
                                break

                        # Get the team IDs from the provided team information
                        team_ids = {
                            'Arsenal': 1,
                            'Aston Villa': 2,
                            'Bournemouth': 3,
                            'Brentford': 4,
                            'Brighton & Hove Albion': 5,
                            'Burnley': 6,
                            'Chelsea': 7,
                            'Crystal Palace': 8,
                            'Everton': 9,
                            'Fulham': 10,
                            'Liverpool': 11,
                            'Luton Town': 12,
                            'Manchester City': 13,
                            'Manchester United': 14,
                            'Newcastle United': 15,
                            'Nottingham Forest': 16,
                            'Sheffield United': 17,
                            'Tottenham Hotspur': 18,
                            'West Ham United': 19,
                            'Wolverhampton Wanderers': 20,
                        }

                        # Create the SQL insert statement for the match info
                        match_info_sql.append(
                            f"(NULL, '{formatted_date+' '+time}', '{gameweek}', '{team_ids.get(home_team_name, 'Unknown')}', NULL, '{
                                team_ids.get(away_team_name, 'Unknown')}', NULL),"
                        )
                        
                        # Combine the SQL statements into a single string
                        match_info_sql_str = '\n'.join(match_info_sql)
                        if(match_number%10 == 0):
                            file.write(match_info_sql_str)
                            match_info_sql = ['\n']
                            match_info_sql_str = ['\n']
            else:
                # Handle the case where 'renderKOContainer' or 'data-kickoff' is not found
                date = "Unknown"
                time = "Unknown"
get_match_info()