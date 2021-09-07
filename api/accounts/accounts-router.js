const router = require("express").Router();
const Accounts = require("./accounts-model");

const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.status(200).json(accounts);
  } catch (err) {
    next();
  }
});

router.get("/:id", checkAccountId, (req, res) => {
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const data = await Accounts.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      next();
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const data = await Accounts.updateById(req.params.id, req.body);
      res.status(200).json(data);
    } catch (err) {
      next();
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id);
    res.status(200).json(req.account);
  } catch (err) {
    next();
  }
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong with the accounts router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
