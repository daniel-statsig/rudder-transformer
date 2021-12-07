const { httpGET } = require("../../../adapters/network");
const { CustomError, toUnixTimestamp } = require("../../util");

const CURRENCY_CODES = [
  "aed",
  "afn",
  "all",
  "amd",
  "ang",
  "aoa",
  "ars",
  "aud",
  "awg",
  "azn",
  "bam",
  "bbd",
  "bdt",
  "bgn",
  "bhd",
  "bif",
  "bmd",
  "bnd",
  "bob",
  "brl",
  "bsd",
  "btc",
  "btn",
  "bwp",
  "bzd",
  "cad",
  "cdf",
  "chf",
  "clf",
  "clp",
  "cny",
  "cop",
  "crc",
  "cup",
  "cve",
  "czk",
  "djf",
  "dkk",
  "dop",
  "dzd",
  "egp",
  "ern",
  "etb",
  "eur",
  "fjd",
  "fkp",
  "gbp",
  "gel",
  "ghs",
  "gip",
  "gmd",
  "gnf",
  "gtq",
  "gyd",
  "hkd",
  "hnl",
  "hrk",
  "htg",
  "huf",
  "idr",
  "ils",
  "inr",
  "iqd",
  "irr",
  "isk",
  "jep",
  "jmd",
  "jod",
  "jpy",
  "kes",
  "kgs",
  "khr",
  "kmf",
  "kpw",
  "krw",
  "kwd",
  "kyd",
  "kzt",
  "lak",
  "lbp",
  "lkr",
  "lrd",
  "lsl",
  "lyd",
  "mad",
  "mdl",
  "mga",
  "mkd",
  "mmk",
  "mnt",
  "mop",
  "mro",
  "mur",
  "mvr",
  "mwk",
  "mxn",
  "myr",
  "mzn",
  "nad",
  "ngn",
  "nio",
  "nok",
  "npr",
  "nzd",
  "omr",
  "pab",
  "pen",
  "pgk",
  "php",
  "pkr",
  "pln",
  "pyg",
  "qar",
  "ron",
  "rsd",
  "rub",
  "rwf",
  "sar",
  "sbd",
  "scr",
  "sdg",
  "sek",
  "sgd",
  "shp",
  "sll",
  "sos",
  "srd",
  "std",
  "svc",
  "syp",
  "szl",
  "thb",
  "tjs",
  "tmt",
  "tnd",
  "top",
  "try",
  "ttd",
  "twd",
  "tzs",
  "uah",
  "ugx",
  "usd",
  "uyu",
  "uzs",
  "vef",
  "vnd",
  "vuv",
  "wst",
  "xaf",
  "xag",
  "xau",
  "xcd",
  "xdr",
  "xof",
  "xpf",
  "yer",
  "zar",
  "zmw",
  "zwl"
];

const getSubscriptionHistory = async (endpoint, options) => {
  const requestOptions = {
    method: "get",
    ...options
  };
  let res;
  try {
    const response = await httpGET(endpoint, requestOptions);
    res = { success: true, response };
  } catch (err) {
    res = { success: false, response: err };
  }
  return res;
};

const unixTimestampOrError = (timestamp, originalTimestamp) => {
  if (!timestamp) {
    return toUnixTimestamp(originalTimestamp);
  }
  const convertedTS = new Date(Number(timestamp)).getTime();
  if (convertedTS > 0) {
    return convertedTS;
  }
  throw new CustomError(
    "invalid timestamp format for effectiveDate. Aborting",
    400
  );
};

const isValidPlanCurrency = planCurrency => {
  return CURRENCY_CODES.includes(planCurrency.toLowerCase());
};

module.exports = {
  getSubscriptionHistory,
  unixTimestampOrError,
  isValidPlanCurrency
};
