
import simplejson


######################################
#   User responses
######################################

NOT_LOGGED_IN = (
    simplejson.dumps({
        "message" : "You must be logged in"
    }), 401
)

USER_NOT_FOUND = (
    simplejson.dumps({
        "message" : 'User not found'
    }), 404
)

BAD_LOGIN = (
    simplejson.dumps({
        "message" : "Your login credentials were invalid"
    }), 401
)

######################################
#   General responses
######################################

NO_DATA = (
    simplejson.dumps({
        "message" : "You need to pass in data"
    }), 400
)

