const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post);
Post.belongsTo(User, , {
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

Post.hasMany(Comment);
Comment.belongsTo(Post);