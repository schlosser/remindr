import sendgrid

from os import environ

USERNAME = environ['SENDGRID_USERNAME']
PASSWORD = environ['SENDGRID_PASSWORD']

def run(reminder, forwarders, user):

    # make a secure connection to SendGrid
    s = sendgrid.Sendgrid(USERNAME, PASSWORD, secure=True)

    message_body = "<p>Task: " + reminder['task'] + "</p><p>" + reminder['details'] + "</p>"

    # make a message object
    message = sendgrid.Message("digest@remindr.io", "Remindr Daily Digest", "",
                               message_body)
    # add a recipient
    message.add_to(user['email'], user['username'])

    # use the Web API to send your message
    s.web.send(message)