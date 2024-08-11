const userIds = [/* array of ObjectId's */];
const skills = await Promise.all(
  userIds.map(userId => SkillModel.find({ linkedUserId: userId }))
);

const userIds = [/* array of ObjectId's */];
const skills = await SkillModel.find({ linkedUserId: { $in: userIds } });

const skills = await SkillModel.find().lean();

const skillsList = await SkillModel.find({}, 'title price').lean();

const aggregatedSkills = await SkillModel.aggregate([
  {
    $group: {
      _id: "$price",
      totalSkills: { $sum: 1 }
    }
  }
]);