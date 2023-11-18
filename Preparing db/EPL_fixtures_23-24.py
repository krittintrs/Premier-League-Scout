import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor

def process_match(match_number, team_name_mapping):
    url = f"https://www.premierleague.com/match/{93320 + match_number}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract game week
    gameweek_elem = soup.find('div', class_='mc-header__gameweek-selector-current-gameweek mc-header__gameweek-selector-current-gameweek--short')

    if gameweek_elem:
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
                    return f"INSERT INTO `matchinfo` (`id`, `matchday`, `gameweek`, `homeTeamID`, `homeTeamResult`, `awayTeamID`, `awayTeamResult`) VALUES\n" \
                           f"(NULL, '{formatted_date+' '+time}', '{gameweek}', '{team_ids.get(home_team_name, 'Unknown')}', NULL, '{team_ids.get(away_team_name, 'Unknown')}', NULL),"

    # Handle the case where 'gameweek_elem' is None or other missing elements
    return None


def get_match_info():
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

    # Use ThreadPoolExecutor for concurrent execution
    with ThreadPoolExecutor(max_workers=10) as executor:
        # Process matches concurrently
        match_numbers = range(1, 381)
        results = list(executor.map(process_match, match_numbers, [team_name_mapping]*len(match_numbers)))

    # Filter out None values (matches that couldn't be processed)
    match_info_sql = filter(None, results)

    # Combine the SQL statements into a single string
    match_info_sql_str = '\n'.join(match_info_sql)

    # Write SQL commands to a file
    with open('EPL_fixtures_23-24.sql', 'w') as file:
        file.write(match_info_sql_str)

if __name__ == "__main__":
    get_match_info()
