const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // route ke base pe folder decide karega
        let folder = "uploads/others";
        if (req.baseUrl.includes("brand")) {
            folder = "uploads/brand";
        }
        if (req.baseUrl.includes("products")) {
            folder = "uploads/products";
        }
        if (req.baseUrl.includes("categories")) {
            folder = "uploads/categories";
        }

        if (req.baseUrl.includes("subcategories")) {
            folder = "uploads/subcategories";
        }

        // agar folder exist nahi karta to create kare
        fs.mkdirSync(folder, { recursive: true });

        cb(null, folder);
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;