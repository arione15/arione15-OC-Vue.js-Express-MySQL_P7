module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Media', {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mediaUrl: {
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
  })
}
