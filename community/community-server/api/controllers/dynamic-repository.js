const axios = require('axios');

module.exports = {

  friendlyName: 'Dynamic repository',


  description: '',


  inputs: {

  },


  exits: {
      notFound: {
        description: 'No file found',
        responseType: 'notFound'
      }
    },


    fn: async function (inputs, exits) {
      var req = this.req;
      var res = this.res;

      var repoName = req.param('name').trim();
      var file = req.param('0').trim();
      const repos = {
        'official': {
          url: 'https://raw.githubusercontent.com/betaflight/firmware-presets/master/',
          static: 'true'
        }
      }
      try {
        if (repoName) {
          // check if is a static repository
          if (Object.keys(repos).includes(repoName)) {
            //static repo
            if (!file || file === "")
              file = 'index.json';
            const path = repos[repoName].url + file;
            const fileContent = await axios.get(path);
            return exits.success(fileContent.data);
          }
        }
      } catch (ex) {
        return exits.success("no file found");
      }

      // All done.
      return;

    }
  }
