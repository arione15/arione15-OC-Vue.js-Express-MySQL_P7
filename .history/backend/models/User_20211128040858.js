module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
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
        role: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            default: "BASIC"
        },
        // imageUrl: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
        //timestamps: true
    });
    User.associate = function(models) {
        User.hasMany(models.Post, {
            foreignKey: {
                type: DataTypes.UUID,
                allo w
                Null: false
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        })
    };
    User.associate = function(models) {
        User.hasMany(models.Comment, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    };
    return User;
}