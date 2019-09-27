'use strict';

var _postcss = require('postcss');

var postcss = require('postcss');

var schema = {
  component: {
    alias: 'b',
    separator: '.'
  },
  descendent: {
    alias: 'e',
    separator: '-'
  },
  modifier: {
    alias: 'm',
    separator: '--'
  },
  when: {
    alias: 'w',
    separator: '_'
  }
};

module.exports = postcss.plugin('postcss-bem', function (opts) {
  function getAtruleSelector(atRule, paramName) {
    var selectorArray = [schema[atRule.name].separator, paramName];
    var theParent = atRule.parent;
    while (theParent && theParent.type !== 'root') {
      selectorArray.unshift('' + schema[theParent.name].separator + theParent.params);
      theParent = theParent.parent;
    }
    return selectorArray.join('');
  }

  function processAtrule(css, atRule) {
    var ruleName = atRule.name;
    if (!schema.hasOwnProperty(ruleName)) {
      throw new Error('you have written an unsupported type of bem declaration ' + ruleName);
    }
    var paramName = atRule.params;
    var ruleSelector = getAtruleSelector(atRule, paramName);
    var newRule = postcss.rule({
      selector: ruleSelector
    });
    atRule.nodes.forEach(function (item) {
      if (item.type === 'decl') {
        newRule.append(item);
      }
    });
    css.append(newRule);
  }

  return function (css, result) {
    var atRules = [];
    css.walkAtRules(function (atRule) {
      atRules.push(atRule);
      processAtrule(css, atRule);
    });
    atRules.forEach(function (item) {
      item.remove();
    });
  };
});