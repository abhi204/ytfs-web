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
        # print("data passsed into page is: "+data+"\n typeof(data): "+str(type(data)))
        # data = "{'a':'asdasd','c':'asdasdasd'}"
        return render(request,'results/results.html',{'resp_quality':resp_quality,'search_text':search_text,'session':session})

    else:
        return redirect('homepage')
