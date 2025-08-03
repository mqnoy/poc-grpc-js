const _ = require("lodash");

function wrapperNullableValue(value) {
  return _.isNull(value) ? undefined : { value: value };
}

function wrapperValueToNull(entry) {
  const newEntry = Object.entries(entry).reduce((prev, curr) => {
    const [k, v] = curr;
    prev[k] = _.has(v, "value") ? v.value : v;
    return prev;
  }, {});
  return Object.assign(entry, newEntry);
}

module.exports = {
  wrapperNullableValue,
  wrapperValueToNull,
};
