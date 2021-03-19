// Here we require the Skill model
const Skill = require('../model/skill');

//Get all skills
module.exports.get_all_skills = (req, res) => {
    Skill.find()
    .then(result => {
        res.json(result);
    })
    .catch(err => console.log(err))
}


//Post a new skill
module.exports.post_one_skill = (req, res) => {
    const skill = new Skill(req.body)
    skill.save()
    .then(result => {
        res.json({message:"ok"});
    })
    .catch(err => console.log(err));
}

//Post multiple skills
module.exports.post_many_skill = (req, res) => {
    Skill.insertMany(req.body.map(skill => new Skill(skill)))
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(err)
        res.json({err: err.message})
    });
}


//Get Skill by using Route param ID
module.exports.get_one_skillByID = (req, res) => {
    const id = req.params.id;
    Skill.findById(id)
    .then(resutl => {
        res.json(resutl);
    })
    .catch(err => {
        console.log(err);
        res.json({err: err.message})
    })
}


//Delete a Skill based on Route param ID
module.exports.delete_one_skillByID = (req, res) => {
    const id = req.params.id;
    Skill.findByIdAndDelete(id)
    .then(result => {
        res.json({message:"ok"});
    })
    .catch(err => {
        console.log(err);
        res.json({error: err.message})
    })
}


//Update a Skill based on Route param ID
module.exports.update_one_skillByID = (req, res) => {
    const id = req.params.id;
    Skill.findByIdAndUpdate(id, req.body)
    .then(result => {
        res.json({message:"ok"});
    })
    .catch(err => {
        console.log(err);
        res.json({err: err.message});
    })
}

const ExcelCreator = require('../ExcelCreator')

//Get Skills into .xlsx file and send them back
module.exports.excel_all_skills = (req, res) => {
      
    Skill.find()
    .then(result => {
        //  console.log(result[0].name)
        // res.json(result);
        const workbook = ExcelCreator.CreateSkillsWorkbook(result)
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "skills.xlsx"
          );
          return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
          });

    })
    .catch(err => {
        console.log(err)
        res.json({error: err.message})
    })



} 