import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: UUID(),
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: {
			url: String,
			localPath: String,
		},
		default: {
			url: `https://via.placeholder.com/200x200.png`,
			localPath: '',
		},
	},
	category: {
		type: String,
		required: true,
	},
	technologies: {
		type: [String],
		required: true,
	},
	links: {
		type: [String],
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
})

const Project =
	mongoose.models.products || mongoose.model('Project', projectSchema)

export default Project
