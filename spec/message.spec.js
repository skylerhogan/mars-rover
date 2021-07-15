const assert = require("assert");
const Message = require("../message.js");
const Command = require("../command.js");

describe("Message class", () => {
  //test4
  it("throws error if a name is NOT passed into the constructor as the first parameter", () => {
    assert.throws(
      () => {
        new Message();
      },
      {
        message: "Message name required.",
      }
    );
  });
  //test5
  it("constructor sets name", () => {
    const message = new Message("Test message with two commands");
    assert.strictEqual(message.name, "Test message with two commands");
  });
  //test6
  it("contains a commands array passed into the constructor as 2nd argument", () => {
    const commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    const message = new Message("Test message with two commands", commands);
    assert.strictEqual(message.commands[0].commandType, "MODE_CHANGE");
    assert.strictEqual(message.commands[0].value, "LOW_POWER");
    assert.strictEqual(message.commands[1].commandType, "STATUS_CHECK");
  });
});
