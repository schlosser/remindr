# Include the Dropbox SDK
import dropbox

from os import environ

DROPBOX_API_KEY = environ['DROPBOX_API_KEY']
DROPBOX_SECRET = environ['DROPBOX_SECRET']

def run(reminders, forwarders):

    refreshToken = forwarders['forwarders']['dropbox']['refreshToken']

    # fileSize = forwarders['forwarders']['dropbox']['fileSize']

    client = dropbox.client.DropboxClient(refreshToken)

    fileLocation = '/'.join(forwarders['dropbox']['fileUrl'].split('/')[5:])

    allReminderText = ''

    for reminder in reminders:
        allReminderText += '######################\n'
        allReminderText += '# Task: ' + reminder['task'] + '\n'
        allReminderText += '# Details: ' + reminder['details'] + '\n'
        allReminderText += '# Due: ' + reminder['due'] + '\n'
        allReminderText += '######################'

    print client.put_file(fileLocation, allReminderText, True, )



