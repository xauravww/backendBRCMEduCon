const Gallery = require('../model/gallery');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");

// Create a new image in the gallery
exports.createGalleryImage = catchAsyncErrors(async (req, res, next) => {
  const { image, description, tags } = req.body;

  const newGalleryImage = await Gallery.create({
    image,
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
