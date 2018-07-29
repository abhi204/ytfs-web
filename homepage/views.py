from django.shortcuts import render

# Create your views here.
def homepage(request):
    if request.method == 'POST':
        search_text = request.POST['search-text']
        resp_quality = request.POST['search-quality']
        return render(request,'homepage/index.html',{"homepage":True,'resp_quality':resp_quality,'search_text':search_text})

    else :
        return render(request,'homepage/index.html',{"homepage":True,'resp_quality':'720p','search_text':""})
