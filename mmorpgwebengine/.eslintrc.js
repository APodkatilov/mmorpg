// const fs = require('fs');
// const path = require('path');

// const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
    parser: 'babel-eslint',
    extends: ['plugin:react/recommended', 'airbnb'],
    plugins: ['react'],
    env: {
        mocha: true,
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    rules: {
        "linebreak-style": 0,
        "no-console":"off",
        "no-plusplus":"off"
    },
};
