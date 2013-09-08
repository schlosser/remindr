
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

@needs_data
def get_user(mongo, uid=None, data=None):
    try:
        user = mongo.db[MONGO.USERS].find_one({'_id': ObjectId(uid)})
    except:
        return ERR.USER_NOT_FOUND

    if not user:
        return ERR.USER_NOT_FOUND

    response = {}
    # build response
    for key in data['return']:
        response[key] = user[key]

    return simplejson.dumps(response), 200


@needs_data
def login(mongo, data=None):
    user = mongo.db[MONGO.USERS].find_one({'email': data['email']})
    if not user:
        return ERR.USER_NOT_FOUND

    # check password encryption
    if cryptor.verify(data['password'], user['password']):
        # add data to session
        addUserToSession(user)
        return RESP.LOGGED_IN
    else:
        return ERR.BAD_LOGIN


@needs_data
def signup(mongo, data=None):
    user = mongo.db[MONGO.USERS].find_one({'email': data['email']})

    if user:
        return ERR.USER_ALREADY_EXISTS

    userId = mongo.db[MONGO.USERS].insert({
        "username": data['username'],
        "email": data['email'],
        "password": cryptor.encrypt(data["password"])
    })

    user = mongo.db[MONGO.USERS].find_one({'_id': ObjectId(userId)})

    mongo.db[MONGO.FORWARDERS].insert({
        'current' : 'sms',
        'forwarders' : {
            'sms' : {
                'number' : ''
            },
        },
        'userId' : userId
    })

    addUserToSession(user)
    return RESP.LOGGED_IN


def logout():
    session.clear()
    return RESP.LOGGED_OUT


##############################################################################
#   util methods
##############################################################################

def user_exists(mongo, data=None):

    for identifier, method in [('_id', ObjectId), ('username', str), ('email', str)]:
        if identifier in data.keys():
            user = mongo.db[MONGO.USERS].find_one({
                identifier : method(data[identifier])
            })
            if user:
                return True

    return False


def addUserToSession(user):
    session['username'] = user['username']
    session['email']    = user['email']
    session['uid']      = str(user['_id'])


