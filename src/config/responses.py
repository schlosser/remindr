
import simplejson


######################################
#   User responses
######################################

LOGGED_IN = (
    simplejson.dumps({
        "message" : "Your're logged in!"
    }), 200
)

LOGGED_OUT = (
    simplejson.dumps({
        "message" : "Logged out!"
    }), 200
)
