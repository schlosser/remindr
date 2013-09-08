

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
# controller methods
##############################################################################

@needs_data
def update(mongo, data=None):

    mongo.db[MONGO.FORWARDERS].update(
        { 'userId' : ObjectId(session['uid']), },
        {
            '$set' : {
                'current' : data['current'],
                'forwarders.sms.number' : data['forwarders']['sms']['number']
            }
        })

    return RESP.UPDATED

def find_by_current_user(mongo):
    forwarders = mongo.db[MONGO.FORWARDERS].find_one({
        'userId' : ObjectId(session['uid'])
    })

    return simplejson.dumps(mongo_to_dict(forwarders)), 200

def mongo_to_dict(data):
    dict = {}
    if not data: 
        return dict
    for key in data:
        if key in ['_id', 'userId']:
            dict[key] = str(data[key])
        else:
            dict[key] = data[key]
    return dict
