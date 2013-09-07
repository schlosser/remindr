
# libraries
from flask.ext.pymongo import PyMongo
from flask import Flask, make_response, request
import simplejson

from config import responses as RESP

app = Flask(__name__)
app.config.from_object('config.flask_config')
mongo = PyMongo(app)



@app.route('/login', methods=['POST'])
def login():
    print simplejson.loads(request.data)
    return RESP.LOGGED_IN






@app.route('/', methods=['GET'])
def home():
    return make_response(open('src/static/base.html').read())


if __name__ == '__main__':
    app.run()

