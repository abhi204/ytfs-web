from django.shortcuts import render

from . import download_function

# Create your views here.
def download(request):
    if request.method == "GET":
        session = request.GET['session']
        title = request.GET['download_title']
        download_quality = request.GET['download_quality']

        download_process = download_function.download_generator(session,download_quality,title)
        local_download_path = download_process[0]
        download_file = download_process[1]

        return render(request,'download/download.html',{"session":session,"title":title,"quality":download_quality,"path":local_download_path,"file_name":download_file})
