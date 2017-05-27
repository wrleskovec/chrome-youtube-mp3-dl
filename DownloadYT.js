#! /usr/bin/env node
"use strict";

const exec = require('child_process').exec;

const dlPath = '/home/toughluck/Music';

process.stderr.write('Suck it chrome');


let first = true;
let buffers = [];
process.stdin.on('readable', () => {
  process.stderr.write('data received');
  let chunk;
  process.stderr.write(typeof chunk);
  while (null !== (chunk = process.stdin.read())) {
    process.stderr.write('reading chunk');
    if (first) {
      chunk = chunk.slice(4);
      first = false;
    }
    buffers.push(chunk);
  }
  const res = Buffer.concat(buffers);
  const url = JSON.parse(res).url;
  const outTemplate = `${dlPath}/%(title)s.%(ext)s`;
  const cmdOptions = {
    shell: '/bin/bash'
  };
  const cmd =`youtube-dl --extract-audio --audio-format mp3 -o \"${outTemplate}\" \"${url}\" &> \"/dev/null\"`;

  exec(cmd, cmdOptions, (err, stdout, stderr) => {
    if (err) throw err;
  });
});
