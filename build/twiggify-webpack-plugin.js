
const _ = require('lodash');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const JSDOM = require('jsdom').JSDOM;

function TwiggifyWebpackPlugin(fileInfos, options) {
    this.fileInfos = fileInfos || [];
    this.options = options || {};
}

TwiggifyWebpackPlugin.prototype.apply = function (compiler) {
    var fileInfos = this.fileInfos;
    var template = fs.readFileSync(this.options.template).toString();
    compiler.plugin("after-emit", function(compilation, callback) {
        Promise.all(fileInfos.map(function (fileInfo) {
            return new Promise(function(resolve, reject) {
                fs.readFile(fileInfo.from, function (err, data) {
                    if (err) return reject(err);
                    resolve({fileInfo: fileInfo, data: data});
                });
            });
        })).then(function (pages) {
            return Promise.all(pages.map(function (page) {
                return new Promise(function (resolve, reject) {
                    var docHTML = page.data.toString();
                    var g = (new JSDOM(docHTML)).window;
                    var headElems = g.document.querySelectorAll('head > style, head > link');
                    var body = docHTML.split('<!--@SECTION-->')[1].split('<!--@ENDSECTION-->')[0];
                    var contents = template;
                    
                    // head replace
                    _.forEach(headElems, function (headStyle) {
                        contents = contents.replace('</head>', headStyle.outerHTML + '</head>');
                    });

                    // body replace
                    contents = contents.replace('<div id="app"></div>', body);

                    mkdirp(path.dirname(page.fileInfo.to), function (err) {
                        if (err) return reject(err);
                        fs.writeFile(page.fileInfo.to, contents, function (err) {
                            if (err) return reject(err);
                            resolve();
                        });
                    });
                });
            }));
        }).then(function () {
            callback();
        });
    });
};

TwiggifyWebpackPlugin['default'] = TwiggifyWebpackPlugin;
module.exports = TwiggifyWebpackPlugin;
