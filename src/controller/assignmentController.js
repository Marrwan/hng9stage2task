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
      let result = null;
      let x = Number(req.body.x);
      let y = Number(req.body.y);
      console.log(req.body);
      /** 
      @type {string} operationType
     */
      let operation_type = null;
      let operationType = req.body.operation_type.toLowerCase();
    
      if (operationType.includes("add") || operationType.includes("+")) {
        operation_type = "addition";
        result = x + y;
      }
      if (operationType.includes("sub") || operationType.includes("-")) {
        operation_type = "subtraction";
        result = x - y;
      }
    
      if (operationType.includes("mul") || operationType.includes("*")) {
        operation_type = "multiplication";
        result = x * y;
      }
      if (operationType.includes("sum")) {
        operation_type = "addition";
        result = x + y;
      }
    
      if (operationType.includes("pro")) {
        operation_type = "multiplication";
        result = x * y;
      }
      if (operationType.includes("times")) {
        operation_type = "multiplication";
        result = x * y;
      }
    
      if (operationType.includes("diff")) {
        operation_type = "subtraction";
        result = x - y;
      }
      // submitted late because of school test forgive me
      return res.status(200).json({
        slackUserName: "hussaynabdsamad07",
        result,
        operation_type,
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
