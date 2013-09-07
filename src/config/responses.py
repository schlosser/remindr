
import simplejson


######################################
#   User responses
######################################

LOGGED_IN = (
    simplejson.dumps({
        "message" : "You're logged in!"
    }), 200
)
SIGNED_UP = (
    simplejson.dumps({
        "message" : "You're signed up!"
    }), 200
)

LOGGED_OUT = (
    simplejson.dumps({
        "message" : "Logged out!"
    }), 200
)
