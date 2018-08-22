from django.shortcuts import render,redirect
from . import functions

from django.conf import settings

# Create your views here.

def results(request):
    if request.method == "POST":
        search_text = request.POST['search-text']
        resp_quality = request.POST['search-quality'].rstrip()
##REGISTER [IP,search_text,Time] in Database Table
        ip = ""
        if "HTTP_X_REAL_IP" in request.META.keys():
            ip = request.META["HTTP_X_REAL_IP"]
        else:
            ip = request.META["REMOTE_ADDR"]
#################################################
        session = functions.gen_token(resp_quality,search_text)

        # DEBUG: comment the line below before commiting
        # session = "debug-mode"
        # search_text = "blink-182"
        # resp_quality = "720"

        # print("data passsed into page is: "+data+"\n typeof(data): "+str(type(data)))
        # data = "{'a':'asdasd','c':'asdasdasd'}"
        return render(request,'results/results.html',{'resp_quality':resp_quality,'search_text':search_text,'session':session})

    else:
        return redirect('homepage')

def download(request):
    if request.method == "POST":
        download_title = request.POST['download_title']
        download_quality = request.POST['download_quality']
        session = request.POST['session']
        print("GOT DOWNLOAD REQUEST FOR FILE {0} in format {1} (Session is : {2})".format(download_title,download_quality,session))

        download_file_path = functions.download_generator(session,download_quality,download_title)
        
        return render(request,'results/dummy.html')
    else:
        return redirect("homepage")
