const express = require("express");
const {
  submitCode,
  fetchSubmissions,
} = require("../controllers/SubmissionController");

const router = express.Router();

router.post("/submit", submitCode);

router.get("/submissions", fetchSubmissions);

module.exports = router;
