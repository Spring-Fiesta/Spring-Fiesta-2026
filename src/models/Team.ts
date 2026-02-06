import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ITeam extends Document {
  name: string
  password: string
  score: number
  currentQuestion: number
  timestamp: Date
  createdAt: Date
  updatedAt: Date
}

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
    currentQuestion: { type: Number, default: 1 },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const Team: Model<ITeam> = mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema)

export default Team
