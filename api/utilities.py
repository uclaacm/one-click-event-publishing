from requests import get, post

def create_discord_event(name, description, start_time, end_time, location, image):
    
    acm_guild_id = ""
    acm_bot_token = ""
    api_url = "https://discord.com/api/guilds/" + acm_guild_id + "/scheduled-events"

    data = {
        'name': name,
        'description': description,
        'privacy_level': '2',
        'scheduled_start_time': start_time,
        'scheduled_end_time': end_time,
        'entity_type': '3',
        'entity_metadata': {'location': location},
        #'image': image,
    }

    headers = {
        'Authorization': 'Bot %s' % (acm_bot_token),
        'Content-Type': 'application/json',
    }

    created_event = post(api_url, json = data, headers = headers).json()

    return created_event