let log4js = require('log4js');
let logger = log4js.getLogger();
module.exports = (cel) => {
  if(isNaN(cel))
  {
    return "";
  }
  let frac = 9 / 5;
  let val = cel * frac + 32;
  return Math.round(val);
}
