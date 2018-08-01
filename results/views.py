from django.shortcuts import render,redirect

# Create your views here.

def results(request):
    if request.method == "POST":
        search_text = request.POST['search-text']
        resp_quality = request.POST['search-quality']
        return render(request,'results/results.html',{'resp_quality':resp_quality,'search_text':search_text})

    else:
        return redirect('homepage')
