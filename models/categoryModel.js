import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tag_name: {
        type: String,
        required: true
    },
    color: String,
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'userModel'
    }

},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const categoryModel = mongoose.model('categoryModel', categorySchema);

export default categoryModel;