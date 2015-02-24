#!/bin/bash

# figure out where we are
DIR=`dirname $0`

if [ -z "$DIR" ]
then
	DIR=.
fi

# echo DIR is $DIR

cd $DIR

node sensible-app.js

