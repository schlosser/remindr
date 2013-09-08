
from flask import session
from flask.ext.pymongo import ObjectId
from functools import wraps
from passlib.hash import sha256_crypt as cryptor
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

def save_dropbox(mongo, code):
    mongo.db[MONGO.FORWARDERS].update(
        {'userId' : ObjectId(session['uid'])},
        {
            '$set' : {
                'forwarders.dropbox.refreshToken' : code
        }
    })