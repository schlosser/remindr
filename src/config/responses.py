
import simplejson


LOGGED_IN = (
    simplejson.dumps({
        "message" : "Your're logged in!"
    }), 200
)


