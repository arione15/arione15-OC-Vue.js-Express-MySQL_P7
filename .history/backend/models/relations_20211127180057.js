const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");

User.hasMany(Comment, {
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
})