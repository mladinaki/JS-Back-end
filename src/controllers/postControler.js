const router = require('express').Router();
const creatureSrevice = require('../services/creatureService');
const Cretaure = require('../model/creature');

router.get('/create', (req, res) => {
    res.render('post/create');
});

router.post('/create', async (req, res) => {
    const { name, species, skinColor, eyeColor, image, description } = req.body;
    const payload = { name, species, skinColor, eyeColor, image, description, owner: req.user };
    await creatureSrevice.create(payload);
    res.redirect('/posts/all-posts');
})

router.get('/all-posts', async (req, res) => {
    const creature = await creatureSrevice.getAll().lean();
    res.render('post/all-posts', { creature })
});

router.get('/profile', async (req, res) => {
    const { user } = req;
    const myCreature = await creatureSrevice.myProfile(user?._id).lean();
    res.render('post/profile', { myCreature });
});

router.get('/:creatureId/details', async (req, res) => {
    const { creatureId } = req.params;
    const creature = await creatureSrevice.singleCreature(creatureId).lean();

    const { user } = req;
    const { owner } = creature;

    const isUserCreature = user?._id === owner?.toString();
    const hasVotes = creature.votes?.some((v) => v?._id.toString() === user?._id);
    
    const joinEmil = creature.votes.map((v) => v.email).join(', ');
    res.render('post/details', { creature, isUserCreature, hasVotes, joinEmil });
});

router.get('/:creatureId/edit', async (req, res) => {
    const creature = await creatureSrevice.singleCreature(req.params.creatureId).lean();
    res.render(`post/edit`, { creature });
})

router.post('/:creatureId/edit', async (req, res) => {
    const creatureData = req.body
    await creatureSrevice.update(req.params.creatureId, creatureData);
    res.redirect(`/posts/${req.params.creatureId}/details`)
})

router.get('/:creatureId/delete', async (req, res) => {
    const { creatureId } = req.params;
    await creatureSrevice.delete(creatureId);
    res.redirect('/');
})

router.get('/:creatureId/vote', async (req, res) => {
    const { creatureId } = req.params;
    const { _id } = req.user;
    await creatureSrevice.addVotes(creatureId, _id);
    res.redirect(`/posts/${creatureId}/details`)
})
module.exports = router