class Command {
  constructor(commandType, value) {
    this.commandType = commandType;
    this.value = value;
    if (!commandType) {
      throw Error("Command type required.");
    }
  }
}

module.exports = Command;
