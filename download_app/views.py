from django.shortcuts import render,redirect
from . import download_function
from django.http import HttpResponse
# Create your views here.
def download(request):
    if request.method == "GET":
        session = request.GET['session']
        title = request.GET['download_title']
        download_quality = request.GET['download_quality']

        file_url = download_function.download_generator(session,download_quality,title)
        # local_download_path = download_process[0]
        # download_file = download_process[1]
        #
        # x_accel_redirect = download_process[2]

        return HttpResponse(file_url)
