class Rover {
  constructor(position, mode, generatorWatts) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(messageObject) {
    let results = [];
    let resultsObject;
    let roverStatus;
    for (let i = 0; i < messageObject.commands.length; i++) {
      if (messageObject.commands[i].commandType === "STATUS_CHECK") {
        resultsObject = {
          completed: "true",
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        };
        results.push(resultsObject);
      } else if (messageObject.commands[i].commandType === "MODE_CHANGE") {
        if (messageObject.commands[i].value === "NORMAL") {
          this.mode = "NORMAL";
          resultsObject = {
            completed: "true",
          };
        } else {
          this.mode = "LOW_POWER";
          resultsObject = {
            completed: "true",
          };
        }
        results.push(resultsObject);
      } else if (messageObject.commands[i].commandType === "MOVE") {
        if (this.mode === "LOW_POWER") {
          resultsObject = {
            completed: "false",
            message: "LOW_POWER - CANNOT MOVE",
          };
          results.push(resultsObject);
        } else {
          resultsObject = {
            completed: "true",
          };
          this.position = messageObject.commands[i].value;
          results.push(resultsObject);
        }
      } else {
        resultsObject = {
          completed: "false",
          message: "INVALID_COMMAND",
        };
        results.push(resultsObject);
      }
    }
    return {
      message: messageObject.name,
      results: results,
    };
  }
}

module.exports = Rover;
