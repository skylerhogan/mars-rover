const assert = require("assert");
const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

describe("Rover class", () => {
  //test7
  it("constructor sets position and default values for mode and generatorWatts", () => {
    const roverTest = new Rover(98382);
    assert.strictEqual(roverTest.position, 98382);
    assert.strictEqual(roverTest.mode, "NORMAL");
    assert.strictEqual(roverTest.generatorWatts, 110);
  });
  //test8
  it("response returned by receiveMessage contains name of message", () => {
    const commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    const messageTest = new Message("Test message with two commands", commands);
    const roverTest = new Rover(98382);
    const response = roverTest.receiveMessage(messageTest);
    assert.strictEqual(response.message, "Test message with two commands");
  });
  //test9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    const commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    const messageTest = new Message("Test message with two commands", commands);
    const roverTest = new Rover(98382);
    const response = roverTest.receiveMessage(messageTest);
    assert.strictEqual(response.results.length, 2);
  });
  //test10
  it("responds correctly to status check command", () => {
    const commands = [new Command("STATUS_CHECK")];
    const messageTest = new Message("test message for status check", commands);
    const roverTest = new Rover(98382);
    const response = roverTest.receiveMessage(messageTest);
    assert.strictEqual(response.results[0].completed, "true");
    assert.strictEqual(response.results[0].roverStatus.mode, "NORMAL");
  });
  //test11
  it("responds correctly to mode change command", () => {
    const commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    const messageTest = new Message("test message for mode change", commands);
    const roverTest = new Rover(98382);
    const response = roverTest.receiveMessage(messageTest);
    assert.strictEqual(response.results[0].completed, "true");
    assert.strictEqual(roverTest.mode, "LOW_POWER");
  });
  //test12
  it("responds with false completed value when attempting to move in LOW_POWER mode", () => {
    const commands = [new Command("MOVE", 5)];
    const messageTest = new Message("test message for mode change", commands);
    const roverTest = new Rover(98382);
    roverTest.mode = "LOW_POWER";
    const response = roverTest.receiveMessage(messageTest);
    assert.strictEqual(response.results[0].completed, "false");
    assert.strictEqual(roverTest.position, 98382);
    assert.strictEqual(response.results[0].message, "LOW_POWER - CANNOT MOVE");
  });
  //test13
  it("responds with position for move command", () => {
    const commands = [new Command("MOVE", 5)];
    const messageTest = new Message("test message for move command", commands);
    const roverTest = new Rover(98382);
    const response = roverTest.receiveMessage(messageTest);
    assert.strictEqual(roverTest.position, 5);
  });
  //test14
  it("completed false and a message for an unknown command", () => {
    const commands = [new Command("DETONATE")];
    const messageTest = new Message("test message for mode change", commands);
    const roverTest = new Rover(98382);
    const response = roverTest.receiveMessage(messageTest);
    assert.strictEqual(response.results[0].completed, "false");
    assert.strictEqual(response.results[0].message, "INVALID_COMMAND");
  });
});
