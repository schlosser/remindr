# Include the Dropbox SDK
import dropbox

# Get your app key and secret from the Dropbox developer website
app_key = 'INSERT_APP_KEY'
app_secret = 'INSERT_APP_SECRET'

flow = dropbox.client.DropboxOAuth2FlowNoRedirect(app_key, app_secret)


def run(reminder, forwarders):
    pass