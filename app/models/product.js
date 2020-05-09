// import packages
const mongoose    = require('mongoose');

// import helpers
const { required } = require('../utils/model');

const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
		type: String
	},
  name: {
		required: required('Product name'),
		trim: true,
		type: String
	},
  category: {
		required: required('Category'),
		trim: true,
		type: String
	},
  description: {
		required: required('Description of product'),
		trim: true,
		type: String
	},
  price: {
		required: required('Price of product'),
		trim: true,
		type: Number
	},
  make: {
		required: required('Make of product'),
		trim: true,
		type: Number,
		validate: {
			validator: year => validateYear(year),
			message: props => `${props.value} is not a valid year!`,
		},
	},
}, {
  collection: 'product',
  timestamps: true,
});

/**
 * Pre hooks
 */
productSchema.pre('save', function preSave() {
  const product = this;
  product.id = product._id.toString();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
