#!/bin/sh

usage() {
    echo "Usage: $0 -d projectdir -t targetdir"
    echo -e "\t-d, --dir Defines the project directory."
    echo -e "\t-t, --target Defines the deployment directory."
    echo -e "\t--deploy-dev Deploy to dev.tippdiekistebier.de"
    echo -e "\t--deploy-test Deploy to test.tippdiekistebier.de"
    echo -e "\t--deploy-prelive Deploy to prelive.tippdiekistebier.de"
    echo -e "\t--deploy-prod Deploy to tippdiekistebier.de"
    exit 1 # Exit script after printing help
}

die() {
    printf '%s\n' "$1" >&2
    exit 1
}

upload() {
    echo "scp ${DIST_DIR}/${DIST_TARGZ} $1.tdkb2:~/projects/upload"
    scp $DIST_DIR/$DIST_TARGZ $1.tdkb2:~/projects/upload
    ssh $1.tdkb2 << EOF
        cd ~/projects/upload
        cp betoffice.tar.gz ~/www
        cd ~/www
        tar -xzf betoffice.tar.gz
EOF
}

while [ "$1" != "" ]; do 
    case $1 in
        -d | --dir )    shift
                        DIR=$1
                        ;;
        -t | --target ) shift
                        TARGET_DIR=$1
                        ;;
        --deploy-dev )  DEPLOY_DEV=1
                        ;;
        --deploy-test ) DEPLOY_TEST=1
                        ;;
        --deploy-prelive ) DEPLOY_PRELIVE=1
                        ;;
        --deploy-prod ) DEPLOY_PROD=1
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

#if [ -z "$TARGET_DIR" ]
#then
#    echo "Target directory: Undefined. Start build without deployment."
#else
#   echo "Project directory: ${TARGET_DIR}"
#fi

DIST_TARGZ=betoffice.tar.gz
DIST_DIR=${DIR}/dist/angularapp

if [ -d "$DIST_DIR" ]; then
    rm -r -f $DIST_DIR
fi

# Start NG build
PATH=${DIR}/node_modules/.bin/:$PATH
# TODO npm install
cd $DIR
ng build --prod

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

if [[ $DEPLOY_DEV -eq 1 ]]
then
    upload "winkler"
fi

if [[ $DEPLOY_TEST -eq 1 ]]
then
    upload "botest";
fi

if [[ $DEPLOY_PRELIVE -eq 1 ]]
then
    upload "boprelive"
fi

if [[ $DEPLOY_PROD -eq 1 ]]
then
    upload "boprod"
fi

exit 0;
