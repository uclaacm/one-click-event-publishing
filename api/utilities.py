from requests import get, post
import facebook as fb
from django.http import HttpResponse
import os
from dotenv import load_dotenv

load_dotenv()

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
  

def facebook_graph(description):
    access_token=os.getenv('ACCESS_TOKEN_FB')
    page=fb.GraphAPI(access_token)
    page_id= os.getenv('PAGE_ID')
    page_message=description
    page.put_object(page_id,"feed",message=page_message)
    return HttpResponse("Successfully posted to facebook!")

def instagram_graph(description, image_location):
    access_token = os.getenv('ACCESS_TOKEN_FB')
    
    main_url = "https://graph.facebook.com/v13.0/"
    headers = {
    "Authorization": "Bearer " + access_token
    }

    ## Gets the facebook id of the user's page using the access token
    url = main_url + "me/accounts"
    response = get(url, headers=headers).json()
    fb_page_id = response['data'][0]['id']

    ## With the facebook id of the page, gets the instagram page and its id linked to the facebook page
    url = main_url + fb_page_id + "?fields=instagram_business_account&access_token=" + access_token
    response = get(url).json()
    ig_page_id = response['instagram_business_account']['id']


    ## Creates a post on the ig page
    body = {
    'image_url': image_location,
    'caption': description,
    }
    url = main_url + ig_page_id + "/media"
    response = post(url, headers=headers, json=body).json()
    creation_id = response['id']

    ## Publishes the created post

    body = {
        "creation_id": creation_id
    }
    url = main_url + ig_page_id + "/media_publish"
    response = post(url, headers=headers, json=body).json()

    return HttpResponse("Successfully posted to facebook!")