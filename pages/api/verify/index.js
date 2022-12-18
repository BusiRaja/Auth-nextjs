export default function handler(req, res) {
  if (code === req.body.code) {
    return res.json({ message: "You're verified successfully" });
  }
  res.json({
    error_message: "Incorrect credentials",
  });
}
