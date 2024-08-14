const skills = await SkillModel.find({ linkedUserId: { $in: userIds } });
const allSkills = await SkillModel.find().lean();
const skillsList = await SkillModel.find({}, 'title price').lean();
const aggregatedSkills = await SkillModel.aggregate([
  {
    $group: {
      _id: "$price",
      totalSkills: { $sum: 1 }
    }
  }
]);