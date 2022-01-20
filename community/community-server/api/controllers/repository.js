const settings = require("../../../../indexer/Settings");
const swaggerJson = require("../../swagger/swagger.json");
const fs = require("fs");
const path = require('path');

module.exports = {


  friendlyName: 'Repository',


  description: 'Repository something.',


  inputs: {
    unique_id: {
      type: 'string'
    },
  },


  exits: {
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    var req = this.req;
    var res = this.res;

    console.log(req.param('name'));
    var repoName = req.param('name');
    var file = req.param('0');

    if (file && repoName)
    {
      try {
        if (file !== 'index.json')
          file = path.resolve('../../presets/' + repoName + "/" + file);
        else
          file = path.resolve('../../index.json');
        const fileContent = fs.readFileSync(file);
        return exits.success(fileContent);
      }
      catch(ex)
      {
        return exits.success("no file found");
      }
    }
    else {

      let out = {}
      const PresetsFolder = require('../../../../indexer/PresetsFolder');
      const settings = require('../../../../indexer/Settings');
      const IndexContent = require('../../../../indexer/IndexContent');
      const crypto = require('crypto');
      const errors = [];
      process.exitCode = 100;
      let writeIndexFile = false;

      let presetFilesArray = [];
      let presetsFolder = new PresetsFolder(settings.presetsDir, settings, presetFilesArray, errors);
      PresetsFolder.checkForIncludeLoops(presetFilesArray, errors);
      //console.log(presetFilesArray)

//console.log(getUniqueValues(presetFilesArray, "firmwareVersion"));

      if (0 === errors.length) {
        console.log("OK");

        const indexContent = new IndexContent(presetFilesArray, settings);
        const jsonIndexContent = JSON.stringify(indexContent, null, 2);

        console.log("index.json created");

        const sum = crypto.createHash('sha256');
        sum.update(jsonIndexContent);
        const indexHash = sum.digest('hex');

        console.log("index_hash.txt created");

        out.jsonIndexContent = indexContent;
        out.indexHash = indexHash;
        out.exitCode = 0;

        return exits.success(out);

      } else return exits.error("error")
    }


  }

}





