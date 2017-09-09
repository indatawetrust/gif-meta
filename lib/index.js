const {spawn} = require('child_process');

module.exports = gif => {
  return new Promise((resolve, reject) => {
    const ls = spawn('ffmpeg', ['-i', gif, '-f', 'null', '-']);

    ls.stderr.on('data', data => {
      data = data.toString();

      if (data.match(/time=([0-9]{2,2}:[0-9]{2,2}:[0-9]{2,2}.[0-9]{2,2})/)) {
        resolve({
          time: data.match(
            /time=([0-9]{2,2}:[0-9]{2,2}:[0-9]{2,2}.[0-9]{2,2})/
          )[1],
          frame: data.match(/frame= {1,}([0-9]+)/)[1],
        });
      }
    });
  });
};
