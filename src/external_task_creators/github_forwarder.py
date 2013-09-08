
import requests
import simplejson

BASE_URL = 'https://api.github.com'
REPO_NAME = 'TODO_LIST'


def get_repo(TOKEN):
    headers = {
        'Authorization' : 'token ' + TOKEN
    }
    resp = simplejson.loads(requests.get(
        BASE_URL+'/user/repos',
        headers = headers
    ).text)
    #for x in resp:
    #   print x
    names = [repo['name'] for repo in resp]

    if REPO_NAME in names:
        USERNAME = resp[0]['owner']['login']
        return
    else:
        return make_repo(TOKEN)


def make_repo(TOKEN):
    print 'MAKING A REPO'
    headers = {
        'Authorization' : 'token ' + TOKEN
    }
    data = {
        'name'  : REPO_NAME,
        'description'   : 'REMINDR'
    }
    resp = requests.post(
        BASE_URL+'/user/repos',
        headers = headers,
        data = simplejson.dumps(data)
    )

    if resp.status_code != 201:
        return
    return simplejson({
        'message' : "Our github integration broke :("
    }), 400


def get_username(TOKEN):
    headers = {
        'Authorization' : 'token ' + TOKEN
    }
    user = simplejson.loads(requests.get(
        BASE_URL + '/user',
        headers = headers
    ).text)
    return user['login']


def create_issue(TOKEN, USERNAME, reminder):
    headers = {
        'Authorization' : 'token ' + TOKEN
    }

    data = {
        'title' : reminder['task'],
        'body'  : reminder['details'],
        'assignee'  : USERNAME
    }

    resp = requests.post(
        BASE_URL+'/repos/'+USERNAME+'/'+REPO_NAME+'/issues',
        data = simplejson.dumps(data),
        headers = headers
    )

    print resp.text
    print resp

    if resp.status_code == 201:
        print 'SUCCESS'
    else:
        print 'FUCK'


def run(reminder, forwarders, user=None):

    TOKEN = forwarders['forwarders']['github']['token']

    get_repo(TOKEN)

    USERNAME = get_username(TOKEN)

    create_issue(TOKEN, USERNAME, reminder) 

