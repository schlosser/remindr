#!/bin/bash

cd ..
grunt
source bin/activate
source config/test_config.sh
python src/app.py

