from requests import get, post
import facebook as fb
from django.http import HttpResponse
import os
from dotenv import load_dotenv

def create_discord_event(name, description, start_time, end_time, location, image):
    acm_guild_id = os.getenv('ACM_GUILD_ID')
    acm_bot_token = os.getenv('ACM_BOT_TOKEN')
    api_url = "https://discord.com/api/guilds/" + acm_guild_id + "/scheduled-events"

    data = {
        'name': name,
        'description': description,
        'privacy_level': '2',
        'scheduled_start_time': start_time,
        'scheduled_end_time': end_time,
        'entity_type': '3',
        'entity_metadata': {'location': location},
        'image': image,
    }

    headers = {
        'Authorization': 'Bot %s' % (acm_bot_token),
        'Content-Type': 'application/json',
    }

    created_event = post(api_url, json = data, headers = headers).json()

    return created_event
  

def facebook_graph(request):
    load_dotenv()
    access_token=os.getenv('ACCESS_TOKEN_FB')
    page=fb.GraphAPI(access_token)
    page_id= os.getenv('PAGE_ID')
    page_message="Hello!"
    page.put_object(page_id,"feed",message=page_message)
    return HttpResponse("Successfully posted to facebook!")
