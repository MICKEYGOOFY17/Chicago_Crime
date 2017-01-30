var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var jsonDiff = require('./jsondiff');
var totalObjectKeys = require('./totalObjectKeys');
var expectedJSON = require('./expectedjson/chicagoCrime1.json');
var actualJSON = require('../outputdata/assault.json');

describe.skip('Test Application as Blackbox', function(){
  it ('Test JSON is well formed', function(done){
    /*ToDO Parse JSON*/
    done();
  });
  it('JSON has expected Number of Objects', function(done){
    var objMatrix = totalObjectKeys.traverse(actualJSON);
    expect(objMatrix.totalNoObjects).to.not.equal(0);
    expect(objMatrix.totalNoKeys).to.not.equal(0);
    done();
  });
  it('Test JSON is as expected', function(done){
    var compareResult = jsonDiff.compareJSONObjects(expectedJSON, actualJSON);
    expect(compareResult.diffs).equal(0);
    done();
  });
})
