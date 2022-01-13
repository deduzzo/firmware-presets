const settings = require("../../../../indexer/Settings");
module.exports = {


  friendlyName: 'Repository',


  description: 'Repository something.',


  inputs: {
    unique_id: {
      type: 'string'
    },
  },


  exits: {},


  fn: async function (inputs, exits) {
    let out = {}
    const path = require("path");
    const PresetsFolder = require('../../../../indexer/PresetsFolder');
    const settings = require('../../../../indexer/Settings');
    const IndexContent = require('../../../../indexer/IndexContent');
    const crypto = require('crypto');
    const errors = [];
    process.exitCode = 100;

    let writeIndexFile = false;

    let presetFilesArray = [];
    let presetsFolder = new PresetsFolder(path.resolve("../../" + settings.presetsDir), settings, presetFilesArray, errors);
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





