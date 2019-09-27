const bem = require('../lib')
const postcss = require('postcss')
const fs = require('fs')
const path = require('path')
const tape = require('tape')

let input = fs.readFileSync(path.join('test', 'fixtrues', 'base.css'), 'utf8')
let expect = fs.readFileSync(
  path.join('test', 'fixtrues', 'base.expect.css'),
  'utf8'
)
postcss([bem])
  .process(input, {from: undefined})
  .then(result => {
    tape('base test', t => {
      t.plan(1)
      t.equal(result.css, expect)
      t.end()
    })
  })
  .catch(err => {
    console.log(13, err)
  })
