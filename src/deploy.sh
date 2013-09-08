#!/bin/bash

cd ..
grunt
source bin/activate
source src/config/deploy_config.sh
#gunicorn src/app.py
gunicorn --pythonpath src app:app

