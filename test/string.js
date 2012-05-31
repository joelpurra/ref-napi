
var assert = require('assert')
var ref = require('../')

describe('C string', function () {

  describe('readCString()', function () {

    it('should return "" for a Buffer containing "\\0"', function () {
      var buf = new Buffer('\0')
      assert.strictEqual('', buf.readCString(0))
    })

    it('should return "hello" for a Buffer containing "hello\\0world"', function () {
      var buf = new Buffer('hello\0world')
      assert.strictEqual('hello', buf.readCString(0))
    })

    it('should return `null` when reading a NULL pointer', function () {
      assert.strictEqual(null, ref.NULL.readCString())
    })

  })

  describe('writeCString()', function () {

    it('should write a C string (NULL terminated) to a Buffer', function () {
      var buf = new Buffer(20)
      var str = 'hello world'
      buf.writeCString(str)
      for (var i = 0; i < str.length; i++) {
        assert.equal(str.charCodeAt(i), buf[i])
      }
      assert.equal(0, buf[str.length])
    })

  })

  describe('allocCString()', function () {

    it('should return a new Buffer containing the given string', function () {
      var buf = ref.allocCString('hello world')
      assert.strictEqual('hello world', buf.readCString())
    })

    it('should return the NULL pointer for `null` values', function () {
      var buf = ref.allocCString(null)
      assert(buf.isNull())
      assert.strictEqual(0, buf.address())
    })

    it('should return the NULL pointer for `undefined` values', function () {
      var buf = ref.allocCString(undefined)
      assert(buf.isNull())
      assert.strictEqual(0, buf.address())
    })

  })

})
