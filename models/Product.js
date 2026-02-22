const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    slug: {
      type: String,
      lowercase: true
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true
    },

    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true
    },

    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    description: String,

    // ✅ Multiple images
    images: [
      {
        type: String   // store image URL or path
      }
    ],

    attributes: [
      {
        name: String,
        value: String
      }
    ],

    isActive: { type: Boolean, default: true }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);