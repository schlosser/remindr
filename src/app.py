
# libraries
from flask.ext.pymongo import PyMongo
from flask import Flask, make_response, request, session
from functools import wraps
import simplejson

# config
from config import responses    as RESP
from config import errors       as ERR

# controllers
from controllers import user as user_controller
from controllers import reminder as reminder_controller

app = Flask(__name__)
app.config.from_object('config.flask_config')
mongo = PyMongo(app)


##############################################################################
#   ROUTE WRAPPERS
##############################################################################

# user must be logged in
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            return ERR.NOT_LOGGED_IN
        return f(*args, **kwargs)
    return decorated_function


# user cannot be logged in
def logout_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' in session:
            return ERR.ALREADY_SIGNED_IN
        return f(*args, **kwargs)
    return decorated_function


##############################################################################
#   authentication
##############################################################################

@app.route('/reminder/create', methods=['POST'])
def create_reminder():
    return reminder_controller.create(mongo, data=simplejson.loads(request.data))


@app.route('/reminder/complete/<rid>', methods=['POST'])
def complete_reminder(rid):
    return reminder_controller.complete(mongo, data={"id": rid})


@login_required
@app.route('/reminder/list', methods=['GET'])
def list_reminders():
    return reminder_controller.list(mongo)


##############################################################################
#   authentication
##############################################################################

@app.route('/login', methods=['POST'])
def login():
    return user_controller.login(mongo, data=simplejson.loads(request.data))

@app.route('/signup', methods=['POST'])
def signup():
    return user_controller.signup(mongo, data=simplejson.loads(request.data))

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    return user_controller.logout()


##############################################################################
#   main
##############################################################################

@app.route('/', methods=['GET'])
def home():
    return make_response(open('src/static/base.html').read())


if __name__ == '__main__':
    app.run()

