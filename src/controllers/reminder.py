

from flask import session
from flask.ext.pymongo import ObjectId
from functools import wraps
from datetime import datetime
import simplejson

from sys import path
path.append('../')
from config import responses as RESP
from config import errors as ERR
from config import mongo_config as MONGO


##############################################################################
#   Wrappers
##############################################################################

def needs_data(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'data' not in kwargs or not kwargs['data']:
            return ERR.NO_DATA
        return f(*args, **kwargs)
    return decorated_function


##############################################################################
#   controller methods
##############################################################################

@needs_data
def create(mongo, data=None):
    mongo.db[MONGO.REMINDERS].insert(form_to_dict(data))
    return RESP.REMINDER_CREATED


@needs_data
def edit(mongo, data=None):
    # TODO
    pass


@needs_data
def complete(mongo, data=None):
    response = mongo.db[MONGO.REMINDERS].update(
        {'_id' : ObjectId(data['rid'])},
        {'$set': {
            'completed' : True
        }})
    if not response:
        return ERR.REMINDER_NOT_FOUND

    return RESP.REMINDER_COMPLETED


@needs_data
def list(mongo):
    cursor = mongo.db[MONGO.REMINDERS].find({
        'email'     : session['email'],
        'completed' : False
    })
    reminders = [mongo_to_dict(item) for item in cursor]
    print reminders

    if len(reminders) == 0:
        return ERR.NO_REMINDERS_FOUND

    return simplejson.dumps({
        'reminders': reminders
    }), 200


##############################################################################
#   utility methods
##############################################################################

def form_to_dict(data):
    dict = {}
    dict['creationDate'] = datetime.now().utcnow()
    dict['completed'] = False

    for key in data:
        if key in ['dueDate']:
            # TODO
            pass
        elif 'date' in key.lower():
            dict[key] = datetime.strptime(data[key], "%Y-%m-%d %H:%M").utcnow()
        else:
            dict[key] = data[key]

    return dict


def mongo_to_dict(data):
    dict = {}

    for key in data:
        if key == '_id':
            dict[key] = str(data[key])
        elif 'date' in key.lower():
            dict[key] = data[key].strftime("%Y-%m-%d %H:%M")
        elif key in ['priority']:
            pass
        else:
            dict[key].encode('utf-8')

    return dict
