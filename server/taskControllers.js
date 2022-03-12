const Task = require('../model/taskModel.js');


const taskController{

  async createTask(req,res,next){
    const {} = req.body;
    const task = await Task.create({})
  }catch(error){
   return next({
    log: `CreateTask controller failed: ${error}`,
    status:400,
    message:{err:'unable to create new entry.'}
   })
  }

}


module.exports = taskController;