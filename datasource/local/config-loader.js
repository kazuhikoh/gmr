const fs = require('fs');

const CONFIG_SKELTON = {
  cookieSession: 'key=value',
  getOwnerFeedsUrl: ""
};

function createConfig() {
  return CONFIG_SKELTON;
}

function load(path) {
  const data = fs.readFileSync(path, 'utf8');
  const json = JSON.parse(data);
  return json;
}

module.exports = {
  createConfig,
  load,
};
