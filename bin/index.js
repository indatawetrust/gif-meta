#!/usr/bin/env node

const {exec} = require('child_process');
const path = require('path');
if (!process.argv[2]) process.exit();

exec(
  `ffmpeg -i ${path.join(process.cwd(), process.argv[2])} -f null -`,
  (error, stdout, data) => {
    data = data.toString();

    if (data.match(/time=([0-9]{2,2}:[0-9]{2,2}:[0-9]{2,2}.[0-9]{2,2})/)) {
      console.log(
        JSON.stringify({
          time: data.match(
            /time=([0-9]{2,2}:[0-9]{2,2}:[0-9]{2,2}.[0-9]{2,2})/
          )[1],
          frame: data.match(/frame= {1,}([0-9]+)/)[1],
        })
      );
    }
  }
);
