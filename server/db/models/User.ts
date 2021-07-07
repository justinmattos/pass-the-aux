import db from '../db';
import { Model, DataTypes } from 'sequelize';
const { STRING, VIRTUAL } = DataTypes;

class User extends Model {}

User.init(
  {
    display_name: { type: STRING },
    email: { type: STRING },
    id: { type: STRING },
  },
  { sequelize: db, modelName: 'User' }
);
