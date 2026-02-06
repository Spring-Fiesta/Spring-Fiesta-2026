import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IQuestion extends Document {
  sequenceNumber: number
  questionText: string
  answer: string
  destinationPic: string
  points: number
  createdAt: Date
  updatedAt: Date
}

const QuestionSchema = new Schema<IQuestion>(
  {
    sequenceNumber: { type: Number, required: true, unique: true },
    questionText: { type: String, default: '' },
    answer: { type: String, required: true },
    destinationPic: { type: String, required: true },
    points: { type: Number, default: 10 },
  },
  { timestamps: true }
)

QuestionSchema.index({ sequenceNumber: 1 })

const Question: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema)

export default Question
