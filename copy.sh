#!/bin/sh

rm ~/www/*.js
rm ~/www/*.css
rm ~/www/*.woff*
cp -R ./dist/angularapp/* ~/www/
