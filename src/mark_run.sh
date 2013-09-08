#!/bin/bash

cd ..
grunt noSass
source bin/activate
source src/config/deploy_config.sh
python src/app.py

