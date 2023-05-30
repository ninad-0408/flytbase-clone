import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
    
},
{
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    }
});

const missionModel = mongoose.model('missionModel', missionSchema);

export default missionModel;