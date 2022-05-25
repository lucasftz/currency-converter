#!/bin/zsh

update() {
    echo "Installing packages..."
    npm install
}

add-secret() {
    read "API_KEY?What is your API key?: "
    echo 'Adding API key...\n'
    echo "export const API_KEY = \"$API_KEY\";" > src/secrets.js
}

create-dist() {
    echo 'Building extension...'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build

    mkdir -p dist
    cp -r build/* dist

    mv dist/index.html dist/popup.html
}

build() {
    update
    add-secret
    create-dist
}

build
