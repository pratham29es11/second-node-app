// models/todo.js
"use strict";
const { DATEONLY } = require("sequelize");
const { Model } = require("sequelize");
const today=new Date().toLocaleDateString("en-CA");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      overdue().map((item)=>
      `${item.id}. ${item.completed ? "[x]": "[ ]"} ${item.title} ${item.dueDate===today ? `${item.completed}`:`${item.dueDate} ${item.completed}`}`
      );
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      dueToday().map((item)=>
      `${item.id}. ${item.completed ? "[x]": "[ ]"} ${item.title} ${item.dueDate===today ? `${item.completed}`:`${item.dueDate} ${item.completed}`}`
      );
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      dueLater().map((item)=>
      `${item.id}. ${item.completed ? "[x]": "[ ]"} ${item.title} ${item.dueDate===today ? `${item.completed}`:`${item.dueDate} ${item.completed}`}`
      );
    }
    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      try{
        const dueTodos=await Todo.findAll({
          where:{
            dueDate: {[Op.lt]:today},
            completed: false 
          }
        });
      } catch(error){
        console.error(error);
      }
      return dueTodos;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      try{
        const todayTodos=await Todo.findAll({
          where:{
            dueDate: today,
            completed: false
          }
        });
      } catch(error){
        console.error(error);
      }
      return todayTodos;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try{
        const dueLaterTodos=await Todo.findAll({
          where:{
            dueDate: {[Op.gt]:today},
            completed: false 
          }
        });
      } catch(error){
        console.error(error);
      }
      return dueLaterTodos;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      try{
        const markAsCompleteTodos=await Todo.findOne({
          where:{
            id: id
          }
        });
      } catch(error){
        console.error(error);
      }
      markAsCompleteTodos.completed==="true";
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
