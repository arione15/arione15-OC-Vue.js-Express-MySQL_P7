module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            //required: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            //required: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //required: true,
            unique: {
                msg: "L'adresse email est déjà prise. Choisissez-en une autre !"
            }
        },
        password: {
            type: DataTypes.STRING,
            //required: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            //required: true,
            allowNull: false,
        },
        // imageUrl: {
        //   type: DataTypes.STRING,
        //   allowNull: true
        // }
    });
    return User;
}