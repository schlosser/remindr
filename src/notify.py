
import pymongo
from os import environ as env
from datetime import datetime

from config import mongo_config as MONGO

# controllers
from controllers import reminder as reminder_controller
from controllers import user as user_controller

# reminder forwards
from external_task_creators import twilio_forwarder
from external_task_creators import dropbox_forwarder

MONGO_HOST = env['MONGO_HOST']
MONGO_PORT = int(env['MONGO_PORT'])
MONGO_DBNAME = env['MONGO_DBNAME']
MONGO_USERNAME = env['MONGO_USERNAME']
MONGO_PASSWORD = env['MONGO_PASSWORD']


def get_db():
    client = pymongo.MongoClient(MONGO_HOST, MONGO_PORT)
    # how do I authenticate?????? TODO
    #client.authenticate(MONGO_USERNAME, MONGO_PASSWORD)
    
    return client[MONGO_DBNAME]


def get_uncompleted_tasks(db):
    cursor = db[MONGO.REMINDERS].find({
        'completed' : False
    })

    reminders = [reminder_controller.mongo_to_dict(item) for item in cursor]
    reminders = [reminder_controller.time_to_datetime(item) for item in reminders]

    return reminders


def forward_reminder(mongo, reminder):
    user = user_controller.user_info(mongo, data={'username': reminder['user']})

    forwarders = mongo.db[MONGO.FORWARDERS].find_one({
        'userId': user['_id']
    })

    print 'NOTIFY'
    pass

    if forwarders['current'] == 'sms':
        twilio_forwarder.run(reminder, forwarders)
    elif forwarders['current'] == 'dropbox':
        dropbox_forwarder.run(reminder, forwarders)


def time_to_notify(reminder):
    now = datetime.now()
    time_to_notification = reminder['due'] - now
    if time_to_notification.days < 0:
        return True
    return False


def send_reminders():
    db = get_db()

    open_reminders = get_uncompleted_tasks(db)

    for remind in open_reminders:
        if time_to_notify(remind) and 'current' in remind:
            forward_reminder(db, remind)


if __name__ == '__main__':
    send_reminders()
