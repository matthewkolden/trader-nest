export default function ensureLoggedIn(req, res, next) {
  if (!req.user) return res.status(401).json("Unauthorized");
  console.log(req.user);
  next();
}
