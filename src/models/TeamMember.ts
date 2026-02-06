import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ITeamMember extends Document {
  name: string
  designation: string
  department: string
  imageUrl: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, default: 'General' },
    imageUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

TeamMemberSchema.index({ order: 1 })

const TeamMember: Model<ITeamMember> = mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema)

export default TeamMember
