import { DataTypes, Model } from "sequelize";
import { userattributes } from "../interface/user_interface";
import { sequelize } from "../config/db";
import { Books } from "./book_model";
import { issuedBooks } from "./issuedBooks_model";

export const user = sequelize.define<Model<userattributes>>("user", {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    full_name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,

    },
    mobile: {
        type: DataTypes.INTEGER,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'female'),
    },
    birthdate: {
        type: DataTypes.DATE,
        validate: {
            isDate: true
        }
    },
    usertype: {
        type: DataTypes.ENUM('Admin', 'User'),
        defaultValue: "user"
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive')
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }

},
    {
        tableName: "user",
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
    }
)

// associations
Books.belongsToMany(user, {
    through: issuedBooks
});

user.belongsToMany(Books, {
    through: issuedBooks,
});

// Books.hasMany(user,{
//     foreignKey: "user_id",
//     as: "user",
// })

// user.hasMany(Books, {
//     foreignKey: "id",
//     as: "book",
// });

// user.hasMany(issuedBooks, {
//     foreignKey: "id",
//     as: "issued_book",
// });

