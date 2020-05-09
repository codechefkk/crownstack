// import packages
const mongoose    = require('mongoose');

// import helpers
const { categoryType, required } = require('../utils/model');

const { Schema } = mongoose;

const categorySchema = new Schema({
  id: {
		type: String
	},
  name: {
		required: required('Category name'),
		trim: true,
		type: String,
		unique: true,
	},
  type: {
		required: required('Category'),
		trim: true,
		type: String,
		enum: categoryType(),
	},
  model: {
		required: required('Model of category'),
		trim: true,
		type: Number,
		validate: {
			validator: year => validateYear(year),
			message: props => `${props.value} is not a valid year!`,
		},
	},
}, {
  collection: 'products',
  timestamps: true,
});

/**
 * Pre hooks
 */
categorySchema.pre('save', function preSave() {
  const product = this;
  product.id = product._id.toString();
});

// index
categorySchema.index({ "name": 1 }, {
  unique: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
