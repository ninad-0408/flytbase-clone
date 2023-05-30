import mongoose from 'mongoose';

const droneSchema = new mongoose.Schema({
    

},
{
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    }
});

const droneModel = mongoose.model('droneModel', droneSchema);

export default droneModel;