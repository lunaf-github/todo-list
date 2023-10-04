const express = require('express');
const router = express.Router();
let members = require('../database/members.js')

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

// Add Member
router.post('/', (req, res) => {

    const newMember = {
        id: (members.length > 0)? members[members.length - 1].id + 1 : 1,
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


// Update Member
router.put('/:id', (req, res) => {
    let member = null;

    for (let i = 0; i < members.length; i++) {
        if (members[i].id === Number(req.params.id)) member = members[i];
    }

    if (member) {
      const update = req.body;
      member.name = (update.name ?? member.name);
      member.email = (update.email ?? member.email);
      res.json({msg: "Member Updated", member})
    } else {
      res.status(400).json([{msg: `No member with the id of ${req.params.id} found`}]);
    }
  });

// Delete Member
  router.delete('/:id', (req, res) => {
      const updateMembers = members.filter(member => member.id !== Number(req.params.id));
      const found = members.length !== updateMembers.length;
      
    if (found) {
      members = updateMembers;
      res.json({msg: "Member deleted", members})
    } else {
      res.status(400).json([{msg: `No member with the id of ${req.params.id} found`}]);
    }
  });


module.exports = router;