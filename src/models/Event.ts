import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IEvent extends Document {
  day: number
  time: string
  title: string
  description: string
  link?: string
  readmore?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const EventSchema = new Schema<IEvent>(
  {
    day: { type: Number, required: true, min: 1, max: 3 },
    time: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    link: { type: String },
    readmore: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Index for efficient querying
EventSchema.index({ day: 1, order: 1 })

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema)

export default Event
