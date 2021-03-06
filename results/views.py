from django.shortcuts import render,redirect
from . import functions
from django.http import HttpResponse
import os
import subprocess

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

        # DEBUG:Test purpose
        session = functions.gen_token(resp_quality,search_text)
        # session = "debug"
        # resp_quality = '360p'
        # search_text = '3 days grace'

        return render(request,'results/results.html',{'resp_quality':resp_quality,'search_text':search_text,'session':session})
    else:
        return redirect("homepage")



def switch_page(request):
    if request.method == "POST":
        if request.POST["switch"] in ["next","prev"]:
            print("GOT {0} Request".format(request.POST["switch"]))
            session = request.POST["session"]
            resp_quality = request.POST["resp_quality"]
            search_text = request.POST["search_text"]
            switch_to = request.POST["switch"]
            functions.switch_function(session,resp_quality,search_text,switch_to)
            return HttpResponse(request.POST["switch"])
    else:
        return redirect("homepage")

# DEBUG: obsolete code
# def download(request):
#     if request.method == "POST":
#         download_title = request.POST['download_title']
#         download_quality = request.POST['download_quality']
#         session = request.POST['session']
#         # print("GOT DOWNLOAD REQUEST FOR FILE {0} in format {1} (Session is : {2})".format(download_title,download_quality,session))
#
#         download_path = functions.download_generator(session,download_quality,download_title)
#         print("DOWNLOAD PATH : %s"%download_path)
#         response = HttpResponse(content_type='application/mp4')
#         response['Content-Disposition']='attachment;filename="%s"'%download_path
#         response["X-Accel-Redirect"] = download_path
#
#         subprocess.run(['tail','-c','1',download_path])
#         response['Content-length'] = os.stat(download_path).st_size
#         print(response.items())
#         return response
#
#         # return render(request,'results/dummy.html')
#     else:
#         return redirect("homepage")
