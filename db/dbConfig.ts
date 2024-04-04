import mongoose from 'mongoose'

export async function connect() {
	try {
		mongoose.connect(process.env.MONGO_URI!)
		const connection = mongoose.connection

		connection.on('connected', () => {
			console.log('Info ==> MongoDB connected successfully')
		})

		connection.on('error', (err) => {
			console.log(
				'Error ==> MongoDB connection error. Please make sure MongoDB is running. ' +
					err
			)
			process.exit()
		})
	} catch (error) {
		console.log('Error ==> Something goes wrong!')
		console.log(error)
	}
}
