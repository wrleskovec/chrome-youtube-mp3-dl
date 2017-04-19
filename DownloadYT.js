#! /usr/bin/env node
"use strict";
const fs = require('fs');
const exec = require('child_process').execSync;

const dlPath = '/home/toughluck/Music';

let first = true;
let buffers = [];
process.stdin.on('readable', () => {
  let chunk = process.stdin.read();
  if (chunk !== null) {
    if (first) {
      chunk = chunk.slice(4);
      first = false;
    }
    buffers.push(chunk);
  }
});
process.stdin.on('end', () => {
  const res = Buffer.concat(buffers);
  const url = JSON.parse(res).url;
  const outTemplate = `${dlPath}/%(title)s.%(ext)s`;
  const cmdOptions = {
    shell: '/bin/bash'
  };
  const cmd = `youtube-dl --extract-audio --audio-format mp3 -o \"${outTemplate}\" ${url} &> d.txt`;
  // const args = ['--extract-audio', '--audio-format', 'mp3', '-o', outTemplate, url];
  // const cmd2 = 'youtube-dl';

  process.stderr.write('Suck it chrome');
  process.stderr.write('stderr doesnt stop host');

  exec(cmd, cmdOptions, (err, stdout, stderr) => {
    if (err) throw err;
    process.stderr.write(stdout);
    process.stderr.write(stderr);
  });

  // child.on('error', (err) => {
  //   console.log(err);
  // });
  // child.stderr.on('data', (data) => {
  //   console.log(data);
  // });
  // child.stdout.on('data', (data) => {
  //   console.log(data);
  // });

  process.stderr.write('\n Okay....');
});
