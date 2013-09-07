

from flask import session
from passlib.hash import sha256_crypt as cryptor

from sys import path
path.append('../')
from config import responses as RESP
from config import errors as ERR
from config import mongo_config as MONGO


def login(mongo, data=None):
    if not data:
        return ERR.NO_DATA
    
    user = mongo.db[MONGO.USERS].find_one({'email': data['email']})
    if not user:
        return ERR.USER_NOT_FOUND

    # check password encryption
    if cryptor.verify(data['password'], user['password']):
        # add data to session
        session['username'] = user['username']
        session['email']    = user['password']
        session['uid']      = user['_id']
        return RESP.LOGGED_IN
    else:
        return ERR.BAD_LOGIN


def logout():
    session.clear()
    return RESP.LOGGED_OUT

