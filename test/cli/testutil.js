
var vm = require('vm');
var fs = require('fs');
var assert = require('assert');

var emu = require("gen/common/emu.js");
var util = require("gen/common/util.js");
var nes = require("gen/platform/nes.js");

var NES_CONIO_ROM_LZG = [
  76,90,71,0,0,160,16,0,0,11,158,107,131,223,83,1,9,17,21,22,78,69,83,26,2,1,3,0,22,6,120,216,
  162,0,134,112,134,114,134,113,134,115,154,169,32,157,0,2,157,0,3,157,0,4,232,208,244,32,134,130,32,85,129,169,
  0,162,8,133,2,134,3,32,93,128,32,50,129,32,73,129,76,0,128,72,152,72,138,72,169,1,133,112,230,107,208,2,
  230,108,32,232,129,169,32,141,6,32,169,0,22,129,141,5,22,66,104,170,104,168,104,64,160,0,240,7,169,105,162,128,
  76,4,96,96,162,0,21,23,0,32,22,195,1,22,194,63,21,37,21,134,22,197,41,21,27,173,41,96,201,4,32,169,
  129,240,3,76,158,128,76,188,128,169,184,162,130,24,109,41,96,144,1,232,160,0,32,130,129,141,7,21,36,238,41,96,
  21,32,76,140,128,21,47,33,21,246,201,17,14,61,15,21,253,227,128,76,1,129,169,169,17,24,61,209,21,125,17,2,
  180,17,10,130,5,22,201,128,17,4,172,30,141,1,32,76,46,129,22,65,96,173,0,96,174,1,96,32,112,130,173,2,
  96,174,3,21,65,160,4,76,105,128,17,3,228,188,162,130,17,2,228,169,188,133,10,169,130,133,11,169,0,133,12,169,
  96,133,13,162,214,169,255,133,18,160,0,232,240,13,177,10,145,12,200,208,246,230,11,230,13,208,240,230,18,208,239,96,
  133,10,134,11,162,0,177,10,96,208,42,162,0,138,96,240,36,22,163,30,48,28,22,227,2,16,20,22,227,14,144,12,
  21,200,176,4,22,226,162,0,169,1,96,165,115,208,252,96,169,255,197,115,240,252,96,133,118,132,116,134,117,32,193,129,
  164,113,165,116,153,0,2,165,117,153,0,3,165,118,153,0,4,200,132,113,230,115,96,164,115,208,1,96,166,114,169,14,
  141,42,96,189,0,2,141,6,32,189,0,3,22,163,4,141,7,32,232,136,240,93,17,19,14,71,17,19,14,49,17,19,
  14,27,17,19,14,5,206,42,96,208,141,134,114,132,115,96,169,0,162,0,72,165,2,56,233,2,133,2,176,2,198,3,
  160,1,138,145,2,104,136,145,2,96,169,41,133,10,169,96,17,34,41,168,162,0,240,10,145,10,200,208,251,230,11,202,
  208,246,192,2,240,5,21,70,247,96,78,111,32,99,97,114,116,32,108,111,97,100,101,100,0,1,0,16,32,17,66,184,
  141,18,96,142,19,96,141,25,96,142,26,96,136,185,255,255,141,35,22,196,34,96,140,37,96,32,255,255,160,255,208,232,
  96,17,71,230,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,10,53,128,0,128,92,128,
  17,14,14,204,204,51,51,22,106,0,24,60,126,24,22,1,22,231,16,48,127,127,48,16,0,22,230,12,18,48,124,48,
  98,252,22,231,0,0,3,62,118,54,54,22,231,127,127,17,4,80,22,230,224,224,96,22,3,22,230,24,24,24,248,248,
  21,16,22,230,204,153,51,102,22,106,51,153,204,22,107,21,27,255,255,17,4,67,22,227,3,22,13,17,6,188,22,230,
  17,2,172,22,13,31,31,22,236,255,255,22,236,31,31,17,4,136,22,227,22,1,248,248,21,5,22,233,17,14,123,17,
  3,64,22,230,17,3,64,21,248,17,8,29,21,216,17,6,88,17,3,64,22,230,240,22,13,21,233,21,243,22,230,17,
  6,16,22,226,192,192,48,48,22,106,15,22,1,21,84,22,230,17,10,4,22,226,17,10,52,22,230,17,6,16,17,10,
  44,22,6,17,35,220,0,24,22,231,102,102,17,34,107,0,22,233,255,22,33,102,22,231,24,62,96,60,6,124,21,40,
  22,229,0,102,12,24,48,102,70,22,231,60,102,60,56,103,102,63,22,231,6,12,17,36,59,22,230,21,30,48,48,24,
  12,22,231,22,97,12,21,4,22,231,0,102,60,255,60,17,2,115,22,230,24,24,126,17,35,70,22,230,17,4,173,21,
  33,22,231,126,21,205,22,231,21,80,22,232,3,6,12,24,48,96,22,231,60,102,110,118,102,102,60,22,231,24,24,56,
  24,24,24,126,22,231,60,102,6,12,48,96,22,235,28,6,21,168,22,228,6,14,30,102,127,6,6,22,231,126,96,124,
  6,21,80,22,230,60,102,96,124,17,4,88,22,228,126,102,12,17,35,83,22,230,60,21,13,21,216,22,231,62,21,240,
  22,228,17,34,124,22,66,22,236,17,2,224,22,228,14,24,48,96,48,24,14,0,22,230,17,2,239,17,4,241,22,228,
  112,24,12,6,12,24,112,22,231,17,2,192,24,21,52,22,232,110,110,96,98,17,3,248,22,227,24,60,102,126,17,34,
  228,22,230,124,102,102,22,66,22,231,60,102,96,96,96,17,4,200,22,227,120,108,21,30,108,120,22,231,126,96,96,120,
  96,96,126,22,237,96,22,231,21,48,110,17,37,8,22,227,21,46,17,3,96,22,230,60,17,99,19,21,24,22,229,30,
  12,22,1,108,56,22,231,102,108,120,112,120,108,21,40,22,229,17,132,62,126,22,231,99,119,127,107,99,99,99,22,231,
  102,118,126,126,110,17,2,88,22,229,60,102,22,2,17,35,88,22,227,17,2,205,21,49,22,231,21,144,60,14,22,231,
  21,80,17,2,96,22,230,60,102,96,60,17,37,208,22,227,17,163,13,17,34,200,22,229,21,111,17,5,208,22,232,60,
  17,5,16,22,225,99,99,99,107,127,119,99,22,231,21,77,60,17,3,248,22,230,21,1,17,4,64,22,227,126,17,67,
  159,126,22,231,60,48,22,2,60,22,231,96,48,24,12,6,3,0,22,231,60,17,34,32,12,21,24,22,229,17,34,193,
  17,68,244,22,229,22,3,17,165,133,22,225,17,134,203,22,230,21,58,6,62,102,62,22,232,96,17,66,176,124,22,232,
  0,60,96,96,96,17,66,144,22,229,6,21,31,21,96,22,230,0,60,102,126,21,216,22,228,14,24,62,17,3,84,22,
  230,0,21,95,6,124,22,231,17,3,80,102,17,5,88,22,225,24,0,56,17,34,240,22,231,6,0,6,22,1,60,22,
  231,96,96,108,17,34,128,22,231,21,30,21,160,22,230,0,102,127,127,107,99,22,233,17,2,79,21,32,22,231,17,34,
  210,17,4,152,22,228,17,36,242,22,232,17,3,144,6,22,232,124,17,66,226,21,160,22,228,17,131,225,22,232,17,130,
  127,17,98,112,22,230,17,35,226,17,34,0,22,233,60,17,2,240,22,230,99,107,127,62,17,226,24,22,230,17,35,241,
  22,234,21,47,12,120,22,232,126,12,24,48,17,98,194,22,228,28,48,24,112,24,48,28,22,231,17,164,159,22,3,22,
  227,56,12,24,14,24,12,56,0,22,230,51,255,204,17,35,206,22,230,22,14,17,194,92,22,10,17,236,246,204,204,255,
  231,195,129,231,22,1,22,231,239,207,128,128,207,239,255,22,230,243,237,207,131,207,157,3,22,231,255,255,252,193,137,201,
  201,22,231,128,128,17,4,80,22,230,31,31,159,22,3,22,230,231,231,231,7,7,21,16,22,230,17,236,246,204,17,237,
  246,51,153,17,227,11,17,4,67,22,227,252,22,13,17,6,188,22,230,17,2,172,22,13,224,224,22,236,0,0,22,236,
  224,224,17,4,136,22,227,22,1,7,7,21,5,22,233,17,14,123,17,3,64,22,230,17,3,64,21,248,17,8,29,21,
  216,17,6,88,17,3,64,22,230,17,226,124,22,10,17,238,244,22,226,17,6,16,22,226,63,63,207,207,22,106,17,226,
  192,21,84,22,230,17,10,4,17,230,220,17,14,60,17,234,252,17,6,44,22,6,17,35,220,255,231,22,231,153,153,17,
  34,107,255,22,233,0,22,33,153,22,231,231,193,159,195,249,131,21,40,22,229,255,153,243,231,207,153,185,22,231,195,153,
  195,199,152,153,192,22,231,249,243,17,36,59,22,230,21,30,207,207,231,243,22,231,22,97,243,21,4,22,231,255,153,195,
  0,195,17,2,115,22,230,231,231,129,17,35,70,22,230,17,4,173,21,33,22,231,129,21,205,22,231,21,80,22,232,252,
  249,243,231,207,159,22,231,195,153,145,137,153,153,195,22,231,231,231,199,231,231,231,129,22,231,195,153,249,243,207,159,22,
  235,227,249,21,168,22,228,249,241,225,153,128,249,249,22,231,129,159,131,249,21,80,22,230,195,153,159,131,17,4,88,22,
  228,129,153,243,17,35,83,22,230,195,21,13,21,216,22,231,193,21,240,22,228,17,34,124,22,66,22,236,17,2,224,22,
  228,241,231,207,159,207,231,241,255,22,230,17,2,239,17,4,241,22,228,143,231,243,249,243,231,143,22,231,17,2,192,231,
  21,52,22,232,145,145,159,157,17,3,248,22,227,231,195,153,129,17,34,228,22,230,131,153,153,22,66,22,231,195,153,159,
  159,159,17,4,200,22,227,135,147,21,30,147,135,22,231,129,159,159,135,159,159,129,22,237,159,22,231,21,48,145,17,37,
  8,22,227,21,46,17,3,96,22,230,195,17,99,19,21,24,22,229,225,243,22,1,147,199,22,231,153,147,135,143,135,147,
  21,40,22,229,17,132,62,129,22,231,156,136,128,148,156,156,156,22,231,153,137,129,129,145,17,2,88,22,229,195,153,22,
  2,17,35,88,22,227,17,2,205,21,49,22,231,21,144,195,241,22,231,21,80,17,2,96,22,230,195,153,159,195,17,37,
  208,22,227,17,163,13,17,34,200,22,229,21,111,17,5,208,22,232,195,17,5,16,22,225,156,156,156,148,128,136,156,22,
  231,21,77,195,17,3,248,22,230,21,1,17,4,64,22,227,129,17,67,159,129,22,231,195,207,22,2,195,22,231,159,207,
  231,243,249,252,255,22,231,195,17,34,32,243,21,24,22,229,17,34,193,17,68,244,22,229,22,3,17,165,133,22,225,17,
  134,203,22,230,21,58,249,193,153,193,22,232,159,17,66,176,131,22,232,255,195,159,159,159,17,66,144,22,229,249,21,31,
  21,96,22,230,255,195,153,129,21,216,22,228,241,231,193,17,3,84,22,230,255,21,95,249,131,22,231,17,3,80,153,17,
  5,88,22,225,231,255,199,17,34,240,22,231,249,255,249,22,1,195,22,231,159,159,147,17,34,128,22,231,21,30,21,160,
  22,230,255,153,128,128,148,156,22,233,17,2,79,21,32,22,231,17,34,210,17,4,152,22,228,17,36,242,22,232,17,3,
  144,249,22,232,131,17,66,226,21,160,22,228,17,131,225,22,232,17,130,127,17,98,112,22,230,17,35,226,17,34,0,22,
  233,195,17,2,240,22,230,156,148,128,193,17,226,24,22,230,17,35,241,22,234,21,47,243,135,22,232,129,243,231,207,17,
  98,194,22,228,227,207,231,143,231,207,227,22,231,17,164,159,22,3,22,227,199,243,231,241,231,243,199,255,22,230,204,0,
  51,17,35,206,22,230,22,14,9,19,0,13,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,22,31,
  22,31,22,31,22,31,22,31,22,31,22,30,22,28
];

describe('LZG', function() {
  it('Should decode LZG', function() {
   var rom = new Uint8Array(new util.lzgmini().decode(NES_CONIO_ROM_LZG));
   assert.equal(40976, rom.length);
  });
});

describe('string functions', function() {
  it('Should detect binary', function() {
    assert.ok(!util.isProbablyBinary(null, [32,32,10,13,9,32,32,10,13]));
    assert.ok(util.isProbablyBinary(null, [32,32,0x80]));
    assert.ok(!util.isProbablyBinary(null, [32,32,0xc1,0x81,32,32,10,13]));
    assert.ok(util.isProbablyBinary(null, NES_CONIO_ROM_LZG));
    assert.ok(util.isProbablyBinary('test.bin'));
    assert.ok(util.isProbablyBinary('test.chr'));
    assert.ok(!util.isProbablyBinary('test.txt'));
    assert.ok(util.isProbablyBinary('test.dat'));
    assert.ok(!util.isProbablyBinary(null, [0x20,0xa9,0x20,0x31,0x39,0x38,0x32]));
    assert.ok(util.isProbablyBinary(null, [0x00,0x00])); // 00 is binary
    assert.ok(util.isProbablyBinary(null, [0x9f])); // 9f is binary
    assert.ok(util.isProbablyBinary(null, [0xff])); // FF is binary
    assert.ok(util.isProbablyBinary(null, [0xf0,0x12])); // ran out of data
  });
});

describe('EmuHalt', function() {
  it('Should detect emuhalt', function() {
    var e = new emu.EmuHalt();
    assert.ok(e instanceof emu.EmuHalt);
    assert.ok(e.hasOwnProperty('$loc'));
  });
});
