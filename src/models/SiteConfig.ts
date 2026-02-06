import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISiteConfig extends Document {
  mainLogo: string
  instituteLogo: string
  festName: string
  festYear: string
  contactEmail: string
  address: string
  socialLinks: {
    platform: string
    url: string
  }[]
  footerText: string
  createdAt: Date
  updatedAt: Date
}

const SiteConfigSchema = new Schema<ISiteConfig>(
  {
    mainLogo: { type: String, required: true },
    instituteLogo: { type: String, required: true },
    festName: { type: String, default: 'Spring Fiesta' },
    festYear: { type: String, default: '2026' },
    contactEmail: { type: String, default: 'springfiesta@iiitsurat.ac.in' },
    address: { type: String, default: 'IIIT Surat, Kholvad Campus, Kamrej, Surat - 394190, Gujarat' },
    socialLinks: [{
      platform: { type: String },
      url: { type: String }
    }],
    footerText: { type: String, default: '© 2026 Spring Fiesta' },
  },
  { timestamps: true }
)

const SiteConfig: Model<ISiteConfig> = mongoose.models.SiteConfig || mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema)

export default SiteConfig
