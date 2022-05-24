const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                min: 8
            }
        }
    }, {
        tableName: 'user',
        underscored: true
    })
}

