const Cretaure = require('../model/creature');

exports.create = async (createData) => await Cretaure.create(createData);

exports.getAll = () => Cretaure.find()

exports.singleCreature = (creatureId) => Cretaure.findById(creatureId).populate('votes');

exports.update = async (creatureId, creatureData) => await Cretaure.findByIdAndUpdate(creatureId, creatureData).lean();

exports.delete = async (data) => await Cretaure.findByIdAndDelete(data);

exports.myProfile = (ownerId) => Cretaure.find({ owner: ownerId }).populate('owner');

exports.addVotes = async (creatureId, userId) => {
    const creature = await this.singleCreature(creatureId);
    const isVotes = creature.votes.some((v) => v?.toString() === userId);

    if (isVotes) {
        return
    }
    creature.votes.push(userId);
    return creature.save();
}

