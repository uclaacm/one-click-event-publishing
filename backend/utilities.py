from requests import get, post, exceptions
#import facebook as fb
import os
from dotenv import load_dotenv


def create_discord_event(name, description, start_time, end_time, location, image):
    load_dotenv()

    acm_guild_id = os.getenv('ACM_GUILD_ID')
    acm_bot_token = os.getenv('ACM_BOT_TOKEN')

    # Check if os environ variables properly set
    if acm_guild_id is None:
        raise SystemError('Guild ID')
    if acm_bot_token is None:
        raise SystemError('Bot Token')
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

    # Handle discord api errors
    try:
        created_event = post(api_url, json=data, headers=headers).json()
    except exceptions.RequestException as e:  # This is the correct syntax
        raise SystemExit(e)

    return created_event


# def facebook_graph(request):
#     load_dotenv()
#     access_token = os.getenv('ACCESS_TOKEN_FB')
#     page = fb.GraphAPI(access_token)
#     page_id = os.getenv('PAGE_ID')
#     page_message = "Hello!"
#     page.put_object(page_id, "feed", message=page_message)
#     return HttpResponse("Successfully posted to facebook!")


def instagram_graph(description, image_url):
    load_dotenv()

    access_token = os.getenv('ACCESS_TOKEN_FB')

    # Check if os environ variable properly set
    if access_token is None:
        raise SystemError('Instagram Token')

    main_url = "https://graph.facebook.com/v13.0/"
    headers = {
        "Authorization": "Bearer " + access_token
    }

    # Gets the facebook id of the user's page using the access token
    url = main_url + "me/accounts"
    response = get(url, headers=headers).json()
    fb_page_id = response['data'][0]['id']

    # With the facebook id of the page, gets the instagram page and its id linked to the facebook page
    url = main_url + fb_page_id + \
        "?fields=instagram_business_account&access_token=" + access_token
    response = get(url).json()
    ig_page_id = response['instagram_business_account']['id']

    # Creates a post on the ig page
    body = {
        'image_url': image_url,
        'caption': description,
    }
    url = main_url + ig_page_id + "/media"
    response = post(url, headers=headers, json=body).json()
    creation_id = response['id']

    # Publishes the created post
    body = {
        "creation_id": creation_id
    }
    url = main_url + ig_page_id + "/media_publish"
    response = post(url, headers=headers, json=body).json()

    return response
