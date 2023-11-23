const Gallery = require('../model/gallery');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const cloudinary = require("cloudinary");
const getDataUri = require("../utils/dataUri.js");

// Create a new image in the gallery
exports.createGalleryImage = catchAsyncErrors(async (req, res, next) => {
  const {description, tags } = req.body;
  const file = req.file;
  console.log(req.body)
  const fileUri = getDataUri(file);


  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const newGalleryImage = await Gallery.create({
    image:{
      public_id: mycloud.public_id,
      url: mycloud.secure_url
    },
    description,
    tags
  });

  res.status(201).json({
    success: true,
    data: newGalleryImage
  });
});

// Update an existing image in the gallery
exports.updateGalleryImage = catchAsyncErrors(async (req, res, next) => {
  const imageId = req.params.id;
  const { image, description, tags } = req.body;

  const updatedGalleryImage = await Gallery.findByIdAndUpdate(imageId, {
    image,
    description,
    tags
  }, { new: true, runValidators: true });

  if (!updatedGalleryImage) {
    return next(new ErrorHander('Gallery image not found', 404));
  }

  res.status(200).json({
    success: true,
    data: updatedGalleryImage
  });
});

// Delete an image from the gallery
exports.deleteGalleryImage = catchAsyncErrors(async (req, res, next) => {
  const imageId = req.params.id;

  const deletedGalleryImage = await Gallery.findByIdAndDelete(imageId);

  if (!deletedGalleryImage) {
    return next(new ErrorHander('Gallery image not found', 404));
  }

  res.status(200).json({
    success: true,
    data: deletedGalleryImage
  });
});

// Get all images in the gallery
exports.getAllGalleryImages = catchAsyncErrors(async (req, res, next) => {
  const galleryImages = await Gallery.find();

  res.status(200).json({
    success: true,
    data: galleryImages
  });
});
