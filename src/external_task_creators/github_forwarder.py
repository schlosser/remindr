
import requests
import simplejson

BASE_URL = 'https://api.github.com/v3'
REPO_NAME = 'TODO_LIST'


def get_repo(TOKEN):
    headers = {
        'Authorization' : 'token ' + TOKEN
    }
    resp = requests.get(
        BASE_URL+'/user/repos',
        headers = headers
    )
    names = [repo['name'] for repo in resp.data]

    if REPO_NAME in names:
        USERNAME = resp[0]['owner']['login']
        return USERNAME
    else:
        return make_repo(TOKEN)


def make_repo(TOKEN):
    headers = {
        'Authorization' : 'token ' + TOKEN
    }
    resp = requests.post(
        BASE_URL+'/user/repos',
        headers = headers
    )

    if resp.status_code != 201:
        USERNAME = resp['owner']['login']
        return USERNAME
    return simplejson({
        'message' : "Our github integration broke :("
    }), 400


def create_issue(TOKEN, USERNAME, reminder):
    headers = {
        'Authorization' : 'token ' + TOKEN
    }

    data = {
        'title' : reminder['task'],
        'body'  : reminder['details']
    }

    resp = requests.post(
        BASE_URL+'/repos/'+USERNAME+'/'+REPO_NAME+'/issues',
        data = data,
        headers = headers
    )
    if resp.status_code == 201:
        print 'SUCCESS'
    print 'FUCK'


def run(reminder, forwarders, user=None):

    TOKEN = forwarders['forwarders']['github']['token']

    USERNAME = get_repo(TOKEN)

    create_issue(TOKEN, USERNAME, reminder) 

    pass

