module.exports = (knex, User) => {
  return () => {
    return Promise.resolve(
      knex("users")
        .select()
        .then((users) => users.map((x) => new User(x)))
    );
  };
};
