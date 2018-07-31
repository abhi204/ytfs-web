from django.shortcuts import render,redirect

# Create your views here.

def results(request):
    if request.method == "POST":
        return render(request,'results/results.html')

    else:
        return redirect('homepage')
