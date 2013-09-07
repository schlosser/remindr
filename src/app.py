
# libraries
from flask.ext.pymongo import PyMongo
from flask import Flask, make_response


app = Flask(__name__)
app.config.from_object('config.flask_config')
mongo = PyMongo(app)


@app.route('/', methods=['GET'])
def home():
    return make_response(open('src/static/base.html').read())


if __name__ == '__main__':
    app.run()

