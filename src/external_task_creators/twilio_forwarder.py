
from twilio.rest import TwilioRestClient

from os import environ

AUTH_TOKEN = environ['TWILIO_AUTH_TOKEN']
ACCOUNT_SID = environ['TWILIO_ACCOUNT_SID']

def run(reminder, forwarders):

    client = TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN)

    message_body = reminder['details']

    recipient_number = forwarders['forwarders']['sms']['number']

    message = client.sms.messages.create(body=message_body,
                                         to=recipient_number,
                                         from_="+16788203207")
    print message.sid