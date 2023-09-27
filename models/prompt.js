import mongoose, { Schema, model, models } from 'mongoose';

// This is just some plain vanilla mongoose code for defining:
// 1. The schema, the prompt object has three attributes each of a specific type
const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    },
})

export default models.Prompt || model('Prompt', PromptSchema);