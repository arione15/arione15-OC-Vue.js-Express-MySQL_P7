const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");

Post.hasMany(Comment, {
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
});
Comment.belongsTo(Post);

User.hasMany(Post, {
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
});
Post.belongsTo(User);