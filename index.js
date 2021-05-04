var child_process = require("child_process");
var Encoding = require('encoding-japanese');

const toString = (bytes) => {
    return Encoding.convert(bytes, {
      from: 'SJIS',
      to: 'UNICODE',
      type: 'string',
    });
  };

var stdout = child_process.execSync("echo hogehoge");
console.log(toString(stdout))
