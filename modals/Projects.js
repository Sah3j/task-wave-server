const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    members: {
        type: Array,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    tasks: [{
        description: {
            type: String,
            required: true,
        },
        assignedTo: {
            type: String,
            required: true,
        },
        dueDate: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    }]
});

const ProjectModel = mongoose.model("projects", ProjectSchema);

module.exports = ProjectModel;