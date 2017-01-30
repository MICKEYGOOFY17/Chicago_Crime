
var a = (year) => {
    if(!year || typeof year !== 'number')
    {
        throw Error('Not a number');
    }

const fs = require('fs');

let rowdata;
let title = [];
let myData = [];
let myData1 = [];
let linenum = 0;
let index = 0;
let arrest = 0;
let type = 0;
let desc = 0;
let readline = require('readline');

/* creating object for 16 years from 2001 to 2016 */
for(let i = 0; i < 16; i = i + 1)
{
  let assaultobj = {Year: 0, ARRESTED: 0, NOT_ARRESTED: 0};
  let theftobj = {Year: 0, OVER_$500: 0, UNDER_$500: 0};
  theftobj.Year = 2001 + i;
  assaultobj.Year = 2001 + i;
  myData[i] = theftobj;
  myData1[i] = assaultobj;
}
/* objects are created and pushed into my data and mydata1 array */


/* event emitter is created */
let rd = readline.createInterface({
    input: fs.createReadStream('../inputdata/crimedata.csv'),
    output: process.stdout ,
    terminal: false
});

/* event for each line */
rd.on('line', function(line) {
  let row = line;
  if(linenum === 0)
  {
    title = row.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    index = title.indexOf('Year');
    arrest = title.indexOf('Arrest');
    type = title.indexOf('Primary Type');
    desc = title.indexOf('Description');
    linenum = linenum + 1;
  }
  else {
    /* Splits each line based on , */
  rowdata = row.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  /* increments the array value based on the theft and assault cases */
  if(rowdata[type] === 'THEFT' && rowdata[desc] === '$500 AND UNDER')
  {
    myData[rowdata[index] - 2001].UNDER_$500 = myData[rowdata[index] - 2001].UNDER_$500 + 1;
  }
  else if(rowdata[type] === 'THEFT' && rowdata[desc] === 'OVER $500')
  {
    myData[rowdata[index] - 2001].OVER_$500 = myData[rowdata[index] - 2001].OVER_$500 + 1;
  }
  else if(rowdata[type] === 'ASSAULT' && rowdata[arrest] === 'true')
  {
    myData1[rowdata[index] - 2001].ARRESTED = myData1[rowdata[index] - 2001].ARRESTED + 1;
  }
  else if(rowdata[type] === 'ASSAULT' && rowdata[arrest] === 'false')
  {
    myData1[rowdata[index] - 2001].NOT_ARRESTED = myData1[rowdata[index] - 2001].NOT_ARRESTED + 1;
  }
  }
});

/* function after the file is read */
rd.on('close', function()
{
fs.writeFileSync('../outputdata/theft.json', JSON.stringify(myData));
fs.writeFileSync('../outputdata/assault.json', JSON.stringify(myData1));
});
return 'JSON written successfully';
};

a(2001);

module.exports = {
  a
};
