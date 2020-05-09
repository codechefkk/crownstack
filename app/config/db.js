const db = {
  url: "mongodb://localhost:27017/crownstack",
  options: {
    useNewUrlParser: true,
    // To make Mongoose's default index build use createIndex() instead of
    // ensureIndex() to avoid deprecation warnings from the MongoDB driver.
    useCreateIndex : true,
    // By default, mongoose automatically builds indexes defined in schema
    // when it connects. It (index builds) can cause performance degradation
    // in large production deployments, Setting autoIndex to false, mongoose
    // will not automatically build indexes for models associated with this connection.
    // autoIndex: false,
  },
};

module.exports = db;