import mongoose from 'mongoose'
const { Schema } = mongoose

const LogIssues = new Schema({
  issuesId: {
    type: String
  },
  issuesName: {
    type: String
  },
  member: {
    type: String
  },
  memberPhoneNumber: {
    type: String
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('log-issues', LogIssues)
