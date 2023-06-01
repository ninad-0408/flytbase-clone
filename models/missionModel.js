import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    speed: Number,
    alt: Number,
    waypoints: {
        type: [{
            alt: Number,
            lat: Number,
            lng: Number
        }],
        required: true,
        minlength: 2
    },
    site: {
        type: mongoose.Types.ObjectId,
        ref: 'siteModel',
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'categoryModel'
    },
    status: {
        type: String,
        default: 'created',
        required: true
    },
    deleted_on: Date,
    completed_on: Date

},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const missionModel = mongoose.model('missionModel', missionSchema);

export default missionModel;