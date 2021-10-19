module.exports = (sequelize, DataTypes) => {
  const Post =  sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    likes: {
        type: DataTypes.INTEGER,
        default: 0
    },
    dislikes: {
        type: DataTypes.INTEGER,
        default: 0
    },
    usersLiked: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: []
    },
    usersDisliked: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: []
    }
  });
    return Post;
}
