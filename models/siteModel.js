import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema({
    site_name: {
        type: String,
        required: true
    },
    position: {
        type: {
            latitude: Number,
            longitude: Number
        }
    },
    status: {
        type: String,
        default: 'active'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    deleted_on: Date
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const siteModel = mongoose.model('siteModel', siteSchema);

export default siteModel;