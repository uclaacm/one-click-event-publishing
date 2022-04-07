
import facebook as fb
from django.http import HttpResponse

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