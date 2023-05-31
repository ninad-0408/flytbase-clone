import mongoose from 'mongoose';

const droneSchema = new mongoose.Schema({
    drone_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    make_name: {
        type: String,
        required: true
    },
    drone_type: {
        type: String,
        required: true
    },
    site: {
        type: mongoose.Types.ObjectId,
        ref: 'siteModel',
        required: true
    },
    deleted_by: {
        type: mongoose.Types.ObjectId,
        ref: 'userModel'
    },
    deleted_on: Date

},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const droneModel = mongoose.model('droneModel', droneSchema);

export default droneModel;