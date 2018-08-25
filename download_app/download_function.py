import uuid
import os
import subprocess
from django.conf import settings

MEDIA_FOLDER = settings.MEDIA_ROOT

def download_generator(session,download_quality,download_title):
    download_session = str(uuid.uuid4()) #Created inside dl folder
    dl_folder = os.path.join(MEDIA_FOLDER,session,"dl")
    download_quality = download_quality[:-1] #given quality is "720p" but we require "720"
    main_dir = os.getcwd() #remember current working dir
    os.chdir(dl_folder)

    download_title_folder = os.path.join(dl_folder,download_session,download_title)
    subprocess.run(["mkdir",download_session])
    subprocess.run(["ytfs","-f",download_quality,download_session])
    subprocess.run(["mkdir",download_title_folder])
    file_name = download_title+".mp4"

    download_local_path = os.path.join(download_title_folder,file_name)
    os.chdir(main_dir)

    subprocess.run(['tail','-c','1',download_local_path])

    redirect_path = '/serve/media/{session1}/dl/{session2}/{title}/{file}'.format(session1=session,session2=download_session,title=download_title,file=file_name)

    return (download_local_path,file_name,redirect_path)
