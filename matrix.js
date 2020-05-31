var util = require('util');

function _getCombinations(options, optionIndex, results, current) {
  var allKeys = Object.keys(options);
  var optionKey = allKeys[optionIndex];

  var vals = options[optionKey];
  for (var i = 0; i < vals.length; i++) {
      current[optionKey] = vals[i];

      if (optionIndex + 1 < allKeys.length) {
          _getCombinations(options, optionIndex + 1, results, current);
      } else {
          // The easiest way to clone an object.
          var res = JSON.parse(JSON.stringify(current));
          results.push(res);
      }
  }
  return results;
}

var matrixConfiguration = {
  environmentVariables: {
    env1: [],
    env2: []
  },
  runtimes: [],
  nodePools: []
};
var matrixEnvironmentalVariablesBag = matrixConfiguration.environmentVariables;

var matrixMultiplierInputBag = {};

Object.keys(matrixEnvironmentalVariablesBag).forEach(
  function (key) {
    var matrixKey = util.format("env_%s",key);
    matrixMultiplierInputBag[matrixKey] = matrixEnvironmentalVariablesBag[key];
  }
);
if (matrixConfiguration.nodePools && matrixConfiguration.nodePools.length > 0) {
  matrixMultiplierInputBag.nodePools = matrixConfiguration.nodePools;
}
if (matrixConfiguration.runtimes && matrixConfiguration.runtimes.length > 0) {
  matrixMultiplierInputBag.runtime = matrixConfiguration.runtimes;
}

console.log(matrixMultiplierInputBag);
var allCombinations = _getCombinations(matrixMultiplierInputBag, 0, [], {});
var results = [];

var matrixStepletsConfiguations = allCombinations.map(
  function (combination) {
    var configPropBag = {};
    configPropBag.environmentalVariables = {};
    if (combination.runtime) {
      configPropBag.runtime = combination.runtime;
    }
    if (combination.nodePools) {
      configPropBag.nodePool = combination.nodePools;
    } 
    for (var key in combination) {
      if (combination.hasOwnProperty(key)) {
        var envKeySplitted = key.split("env_");
        if (envKeySplitted.length === 2) {
          configPropBag.environmentalVariables[envKeySplitted[1]] = combination[key];
        }
      }
    }
    return configPropBag;
  }
);
console.log(matrixStepletsConfiguations.length);