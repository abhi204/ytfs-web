import uuid
import subprocess
from django.conf import settings
import os
import json

MEDIA_FOLDER = settings.MEDIA_ROOT

def gen_token(video_quality,search_text):

    '''
    returns object in string form : session aka folder_name
    '''
    folder_name = str(uuid.uuid4()) # folder_name = tokenName = SessionName
    mkdirs(folder_name,search_text,video_quality)
    json_data = generate_JSON_data(folder_name,search_text,video_quality) # generate JSON file in session-folder with fields = { titles, quality(=fetch quality)}

    #Schedule Celery Task to delete the token folder(i.e. Session-folder after 24hours)
    return folder_name #return stringified object {token,titles}


def mkdirs(folder_name,text,quality): # text is search_text
    folder_path = os.path.join(MEDIA_FOLDER,folder_name) # session folder path
    stream_path = os.path.join(folder_path,'stream') # stream folder path
    dl_path = os.path.join(folder_path,'dl') #download folder path
    subprocess.run(['mkdir',folder_path,stream_path,dl_path])
    formats = ["720p","480p","360p"]
    # formats = ["720p"] #debug Mode

    main_dir = os.getcwd()
    os.chdir(stream_path)

    for format in formats:
        quality_folder_path = str(os.path.join(stream_path,format))
        subprocess.run(['mkdir',quality_folder_path])
        if format == quality:
            subprocess.run(['ytfs','-f',str(format),'-m','thumb',quality_folder_path]) # can add description META later
            subprocess.run(['mkdir',os.path.join(quality_folder_path,text)]) #Takes time (But is required by webpage)
        else:  #To be run by Celery for background execution
            subprocess.run(['ytfs','-f',str(format),quality_folder_path])
            subprocess.run(['mkdir',os.path.join(quality_folder_path,text)]) #Takes comparatively less time (But is required by webpage only when user changes streaming video quality)

    os.chdir(main_dir)

def generate_JSON_data(folder_name,text,quality): #folder_name -> session folder
    token = folder_name #token == SessionName => generated folder on each search

    files_list = subprocess.run(['ls',os.path.join(MEDIA_FOLDER,token,"stream",quality,text)],stdout=subprocess.PIPE).stdout.decode().split('\n')[:-1]  #due to split the last element is "" so [:-1] is done


    print("files_list is :")
    for x in files_list:
        print(x)

    titles = [os.path.splitext(x)[0] for x in files_list]
    for title in titles:
        if titles.count(title)>1:
            titles.remove(title)    #Remove duplicate entries (present because of each video has an mp4 and thumb file )

    data = {'token':token,"titles":titles}

    data_file = open(os.path.join(MEDIA_FOLDER,token,'data.json'),'w+')
    json.dump(data,data_file)
    data_file.close()

    json_data = json.dumps(data)

    return json_data
