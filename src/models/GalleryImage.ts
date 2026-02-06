import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IGalleryImage extends Document {
  imageUrl: string
  altText: string
  isCarousel: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    imageUrl: { type: String, required: true },
    altText: { type: String, default: '' },
    isCarousel: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

GalleryImageSchema.index({ isCarousel: 1, order: 1 })

const GalleryImage: Model<IGalleryImage> = mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema)

export default GalleryImage
