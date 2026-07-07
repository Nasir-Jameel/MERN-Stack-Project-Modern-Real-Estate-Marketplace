import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Automatically strips accidental whitespace padding
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
      min: [0, 'Regular price cannot be a negative value'],
    },
    discountPrice: {
      type: Number,
      required: true,
      min: [0, 'Discount price cannot be a negative value'],
      validate: {
        // Enforces that discount price is always lower than regular price
        validator: function (value) {
          return value <= this.regularPrice;
        },
        message: 'Discount price ({VALUE}) must be lower than or equal to the regular price',
      },
    },
    bathrooms: {
      type: Number,
      required: true,
      min: [0, 'Bathrooms cannot be negative'],
    },
    bedrooms: {
      type: Number,
      required: true,
      min: [0, 'Bedrooms cannot be negative'],
    },
    furnished: {
      type: Boolean,
      required: true,
      default: false,
    },
    parking: {
      type: Boolean,
      required: true,
      default: false,
    },
    type: {
      type: String,
      required: true,
      enum: ['rent', 'sale'], // Locks input down exclusively to these two options
    },
    offer: {
      type: Boolean,
      required: true,
      default: false,
    },
    imageUrls: {
      type: [String], // Strongly typed array ensuring only valid image URLs can be inserted
      required: true,
      validate: {
        validator: function (array) {
          return array.length > 0; // Ensures listings have at least one upload
        },
        message: 'A listing must include at least one image URL',
      },
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId, // Converts mapping to an explicit reference
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// --- PERFORMANCE INDEXING ---
// Speeds up text searches using regex on property names
listingSchema.index({ name: 'text' });

// Optimizes filter performance inside your `getListings` search controller
listingSchema.index({ type: 1, offer: 1, userRef: 1 });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
