const fs = require('fs');

let rowdata;
let myData = [];
let myData1 = [];
let linenum = 0;
let index = 0;
let arrest = 0;
let type = 0;
let desc = 0;
let readline = require('readline');

for(let i=0;i<16;i++)
{
  let assaultobj = {"Year":0,"ARRESTED":0,"NOT ARRESTED":0}
  let theftobj = {"Year":0,"OVER $500":0,"$500 AND UNDER": 0}
  theftobj['Year']=2001+i;
  assaultobj['Year']=2001+i;
  myData[i]=theftobj;
  myData1[i]=assaultobj;
}


let rd = readline.createInterface({
    input: fs.createReadStream('../inputdata/crimedata.csv'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
let row = line;

  if(linenum==0)
  {
    title = row.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    index = title.indexOf('Year');
    arrest = title.indexOf('Arrest');
    type = title.indexOf('Primary Type');
    desc = title.indexOf('Description');
    linenum++;
  }
let exists=0;
let exists1=0;

  rowdata = row.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  if(rowdata[type] === "THEFT" && rowdata[desc] === "$500 AND UNDER")
  {
    myData[rowdata[index]-2001]["$500 AND UNDER"]++
  }
  else if(rowdata[type] === "THEFT" && rowdata[desc] === "OVER $500")
  {
    myData[rowdata[index]-2001]["OVER $500"]++
  }
  else if(rowdata[type] === "ASSAULT" && rowdata[arrest] === "true")
  {
    myData1[rowdata[index]-2001]["ARRESTED"]++
  }
  else if(rowdata[type] === "ASSAULT" && rowdata[arrest] === "false")
  {
    myData1[rowdata[index]-2001]["NOT ARRESTED"]++
  }
});

rd.on('close',function()
{
fs.writeFileSync('../outputdata/theft.json',JSON.stringify(myData));
fs.writeFileSync('../outputdata/assault.json',JSON.stringify(myData1));
});
