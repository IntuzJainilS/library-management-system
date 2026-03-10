import { DataTypes, Model } from "sequelize";
import { BookAttributes } from "../interface/books_interface";
import { sequelize } from "../config/db";


export const Books = sequelize.define<Model<BookAttributes>>("books", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
    },
    authorname: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},
    {
        tableName: "books",
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
    }
)