import mongoose, { Schema, Document, Model } from 'mongoose'

export type SponsorTier = 'title' | 'associate' | 'regular'

export interface ISponsor extends Document {
  name: string
  logoUrl: string
  tier: SponsorTier
  website?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const SponsorSchema = new Schema<ISponsor>(
  {
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    tier: { 
      type: String, 
      enum: ['title', 'associate', 'regular'],
      required: true 
    },
    website: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

SponsorSchema.index({ tier: 1, order: 1 })

const Sponsor: Model<ISponsor> = mongoose.models.Sponsor || mongoose.model<ISponsor>('Sponsor', SponsorSchema)

export default Sponsor
