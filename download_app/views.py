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
        return HttpResponse(file_url)
