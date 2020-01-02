#!/bin/sh

usage() {
    echo "Usage: $0 -d projectdir -t targetdir"
    echo -e "\t-d, --dir Defines the project directory."
    echo -e "\t-t, --target Defines the deployment directory."
    exit 1 # Exit script after printing help
}

while [ "$1" != "" ]; do 
    case $1 in
        -d | --dir )    shift
                        DIR=$1
                        ;;
        -t | --target ) shift
                        TARGET_DIR=$1
                        ;;
        -h | --help )   usage
                        ;;
        * )             usage
    esac
    shift
done

if [ -z "$DIR" ]
then
    DIR=$(pwd)
fi

echo "Start building betoffice web ..."
if [ -z "$TARGET_DIR" ]
then
    echo "Target directory: Undefined. Start build without deployment."
else
   echo "Project directory: ${TARGET_DIR}"
fi

DIST_TARGZ=boang.tar.gz
DIST_DIR=${DIR}/dist/angularapp

if [ -d "$DIST_DIR" ]; then
    rm -r -f $DIST_DIR
fi

# Start NG build
PATH=${DIR}/node_modules/.bin/:$PATH
# TODO npm install
ng build

# Package distribution
cd $DIST_DIR
tar -czf $DIST_TARGZ *

# Copy to deployment target, if defined
if [ -z "$TARGET_DIR" ]
then
    echo "Deployment directory is not defined."
else
    echo "Start deployment to directory ${TARGET_DIR}"
    if [ -f "$TARGET_DIR/$DIST_TARGZ" ]
    then
        rm $TARGET_DIR/$DIST_TARGZ
    fi

    cp $DIST_DIR/$DIST_TARGZ $TARGET_DIR
    tar -xzf $TARGET_DIR/$DIST_TARGZ -C $TARGET_DIR
fi

exit 0;
