let log4js = require('log4js');
let logger = log4js.getLogger();
let convert = (cel) => {
  if(isNaN(cel))
  {
    return NaN;
  }
  let frac = 9 / 5;
  let val = cel * frac + 32;
  return Math.round(val);
};

let cel = 31;
logger.debug(convert(cel));
logger.debug(convert());

module.exports = {
  convertToFahrenheit: convert
};
