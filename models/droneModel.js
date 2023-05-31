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
    status: {
        type: String,
        default: 'deployed',
        required: true
    },
    site: {
        type: mongoose.Types.ObjectId,
        ref: 'siteModel'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    assigned_to: {
        type: mongoose.Types.ObjectId,
        ref: 'userModel'
    },
    mission: {
        type: mongoose.Types.ObjectId,
        ref: 'missionModel'
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