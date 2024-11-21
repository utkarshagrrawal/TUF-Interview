const {
  submitCodeLogic,
  fetchSubmissionsLogic,
} = require("../logic/SubmissionLogic");

const submitCode = async (req, res) => {
  const response = await submitCodeLogic(req.body);
  if (response.error) {
    return res.status(500).json({ error: "Internal server error" });
  }
  return res.status(200).json({ message: "Code submitted successfully" });
};

const fetchSubmissions = async (req, res) => {
  const response = await fetchSubmissionsLogic();
  if (response.error) {
    return res.status(500).json({ error: "Internal server error" });
  }
  return res.status(200).json({ submissions: response.submissions });
};

module.exports = {
  submitCode,
  fetchSubmissions,
};
