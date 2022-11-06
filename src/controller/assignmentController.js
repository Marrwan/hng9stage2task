const { check, validationResult } = require("express-validator");

class AssignmentController {
  index(req, res) {
    const obj = {
      slackUsername: "Abuabdirrahman",
      backend: true,
      age: 22,
      bio: "I am a software engineer with about 4 years of experience in web development as a full-stack developer and about a year of mobile development. My strongest skills are in Javascript, Nodejs, Laravel, MySQL, MongoDB, and React. I am good at connecting a feature with business value and the importance of user experience.",
    };
    res.status(200).json(obj);
  }

  async operation(req, res) {
    try {
      let result = null;
      let x = Number(req.body.x);
      let y = Number(req.body.y);
      let operation_type = null;
      if (typeof req.body.operation_type !== "string")
        throw new Error("Operation type must be a string");
      let operationType = req.body.operation_type.toLowerCase();

      console.log(req.body);
      if (isNaN(x) || isNaN(y)) {
        throw new Error("Input must be a number");
      }
      /** 
        @type {string} operationType
        @type {Number}  x
        @type {Number} y
          */

      let matchAdd = /(add|addition|\+|plus)/;
      let matchSubtraction = /(deduct|subtract|\-|minus)/;
      let matchMultiply = /(multiplication|multiply|x|\*|times)/;

      if (matchAdd.test(operationType)) {
        result += x + y;
        operation_type = "addition";
      }
      if (matchSubtraction.test(operationType)) {
        result += x - y;
        operation_type = "subtraction";
      }
      if (matchMultiply.test(operationType)) {
        result += x * y;
        operation_type = "multiplication";
      }

      // submitted late because of school test forgive me
      return res.status(200).json({
        slackUsername: "Abuabdirrahman",
        result,
        operation_type: operation_type,
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}
module.exports = new AssignmentController();
