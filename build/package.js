const path = require('path');
const packager = require('electron-packager');

packager({
    arch: 'x64',
    asar: true,
    dir: path.join(__dirname, '../'),
    // icon: path.join(__dirname, '../build/icons/icon'),
    ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
    prune: true,
    out: path.join(__dirname, '../tmp'),
    overwrite: true,
    platform: 'darwin'
}).then((appPaths) => {
    console.log(appPaths);
});
