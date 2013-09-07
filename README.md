
#Remindr

###PennApps 2013 Fall Project

Allow others to make reminders for you

###Set up

(in the top level directory)

    virtualenv --no-site-packages .
    source bin/activate
    pip install -r requirements.txt

setting up mongo users

    mongo
    use remindr
    db.addUser({user: 'test_user', pwd: 'test_mongo', roles: ['readWrite']});


###Running

(in the `src` directory)

    ./run.sh

