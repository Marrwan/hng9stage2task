const { check, validationResult } = require("express-validator");

class AssignmentController {
  index(req, res) {
    const obj = {
      slackUsername: "hussaynabdsamad07",
      backend: true,
      age: 20,
      bio: "I am Hussayn AbdulSamad, a backend developer with experience working with node and Laravel. I am a self motivated problem solver, with enthusiasm towards learning, I hope to go far in my HNG journey",
    };
    res.status(200).json(obj);
  }

  async operation(req, res) {
    try {
      const validations = [
        check("operation_type")
          .notEmpty()
          .withMessage("operation_type is required")
          .isString()
          .withMessage("operation_type must be a string")
          .matches(/(add|multiply|subtract|x|\+|\-|times|minus)/)
          .withMessage(
            'must contain either "x " for multiplication or - or + to perform operation'
          ),
        check("x")
          .notEmpty()
          .withMessage("x field is required")
          .isInt()
          .withMessage("x must be a number"),
        check("y")
          .notEmpty()
          .withMessage("y field is required")
          .isInt()
          .withMessage("y must be a number"),
      ];

      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      let result = 0;
      let x = Number(req.body.x);
      let y = Number(req.body.y);
      let operation_type = "";
      let operationType = req.body.operation_type;

      if (
        operationType.includes("add") ||
        operationType.includes("addition") ||
        operationType.includes("+")
      ) {
        result += x + y;
        operation_type += "ADDITION";
      }
      if (
        operationType.includes("multiply") ||
        operationType.includes("x") ||
        operationType.includes("*") ||
        operationType.includes("multiplication") ||
        operationType.includes("times")
      ) {
        result = x * y;
        operation_type += "MULTIPLICATION";
      }
      if (
        operationType.includes("subtraction") ||
        operationType.includes("minus") ||
        operationType.includes("-")
      ) {
        result += x - y;
        operation_type += "SUBTRACTION";
      }
      // submitted late because of school test forgive me
      return res.status(201).json({
        slackUserName: "hussaynabdsamad07",
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
