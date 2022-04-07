
import facebook as fb
from django.http import HttpResponse
from requests import get, post
import os
from dotenv import load_dotenv


def facebook_graph(request):
    load_dotenv()
    access_token=os.getenv('ACCESS_TOKEN_FB')
    page=fb.GraphAPI(access_token)
    page_id= os.getenv('PAGE_ID')
    page_message="Hello!"
    page.put_object(page_id,"feed",message=page_message)
    return HttpResponse("Successfully posted to facebook!")

def instagram_graph(description, image_url):
    load_dotenv()
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
    'image_url': image_url,
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
    


