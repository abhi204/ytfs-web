from __future__ import absolute_import, unicode_literals
from celery import shared_task
from django.conf import settings
from subprocess import Popen,PIPE,run
import os
from ytfsweb import local_settings
import time

MEDIA_FOLDER = settings.MEDIA_ROOT

@shared_task
def umount(mounted_path,session_path):
    umount_command = 'echo {password} | sudo -S umount -l {quality_folder_path}'.format(password=local_settings.sys_pass,quality_folder_path=mounted_path)
    # time.sleep(60)
    umount_process = Popen(umount_command,shell=True,stdout=PIPE,stderr=PIPE)
    out=umount_process.communicate()
    if not umount_process.returncode:
        run(['rm','-r',session_path])
    else:
        print("unable to unmount session because : "+ out[1].decode())
        return("unmount failed!")

    return("unmount successful!")
