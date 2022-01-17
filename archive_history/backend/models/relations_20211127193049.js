const { User } = require("./User");
const { Post } = require("./Post");
const { Comment } = require("./Comment");

User.hasMany(Post, {
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
});
Post.belongsTo(User);

Post.hasMany(Comment, {
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
});
Comment.belongsTo(Post);