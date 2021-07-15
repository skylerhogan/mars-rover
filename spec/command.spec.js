const assert = require("assert");
const Command = require("../command.js");

describe("Command class", () => {
  //test1
  it("throws error if command type is NOT passed into constructor as the first parameter", () => {
    assert.throws(
      () => {
        new Command();
      },
      {
        message: "Command type required.",
      }
    );
  });
  //test2
  it("constructor sets command type", () => {
    const moveCommand = new Command("MOVE");
    assert.strictEqual(moveCommand.commandType, "MOVE");
  });
  //test3
  it("constructor sets a value passed in as the 2nd argument", () => {
    const moveCommand = new Command("MOVE", 5);
    assert.strictEqual(moveCommand.value, 5);
  });
});
