const express = require('express');
const router = express.Router();
const members = require('../database/members.js')

// get members
router.get('/', (req, res) => {
  console.log(members)
  res.json(members);
});
  
// Get single member
router.get('/:id', (req, res) => {
  const member = members.filter(member => member.id === Number(req.params.id));
  const found = member.length > 0;
  
  if (found) {
    res.json(member)
  } else {
    res.status(400).json([{msg: `No member with the id of ${req.params.id} found`}]);
  }
});


router.post('/', (req, res) => {

    const newMember = {
        id: members[members.length - 1].id + 1,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }

    members.push(newMember);
    res.json(members);
});

module.exports = router;