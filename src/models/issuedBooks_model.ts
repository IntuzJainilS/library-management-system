import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { issuedbooks } from "../interface/issuedBooks_interface";

export const issuedBooks = sequelize.define<Model<issuedbooks>>("issued_books", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
        references: {
            model: "user",
            key: "user_id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    book_id: {
        type: DataTypes.STRING,
        references: {
            model: "book",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    issued_date: {
        type: DataTypes.DATE
    },
    return_date: {
        type: DataTypes.DATE
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},
    {
        tableName: "issued_books",
        timestamps: false,
        paranoid: true,
        deletedAt: "deleted_at",
    }
)