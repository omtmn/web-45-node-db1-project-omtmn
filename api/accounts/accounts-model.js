const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where({ id }).first();
};

const create = async ({ name, budget }) => {
  const trimmedName = await name.trim();
  const [id] = await db("accounts").insert({ name: trimmedName, budget });
  const newAccount = await getById(id);
  return newAccount;
};

const updateById = async (id, { name, budget }) => {
  const trimmedName = await name.trim();
  await db("accounts").where("id", id).update({ name: trimmedName, budget });
  const updatedAccount = await getById(id);
  return updatedAccount;
};

const deleteById = (id) => {
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};