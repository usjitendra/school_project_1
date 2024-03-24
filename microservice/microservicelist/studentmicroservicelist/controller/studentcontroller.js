const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const { jwtvalidation } = require("../../../../helper/authvalidation");
const student_model = require('../../../../model/studentregistration');
const { validate } = require('../vailidation/vailidation');



router.use(bodyparser.json());

router.route('/registration').post(jwtvalidation, validate, async (req, res) => {
      try {
            const item = req.body;
            const data = {
                  name: item.name,
                  age:item.age,
                  gender:item.gender,
                  class: item.class,
                  last_name: item.last_name,
                  father_name: item.father_name,
                  mother_name: item.mother_name,
                  address: item.address,
                  permanent_address: item.permanent_address,
                  student_email: item.student_email,
                  father_email: item.father_email,
                  mother_email: item.mother_email,
                  student_mobile_number: item.student_mobile_number,
                  father_mobile_number: item.father_mobile_number,
                  mother_mobile_number: item.mother_mobile_number,
                  father_occupation: item.father_occupation,
                  mother_occupation: item.mother_occupation,
                  document: item.document
            };

            const createdStudent = await student_model.create(data);
            res.status(200).send({ message: "Data saved successfully", data: createdStudent });
      } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Internal server error", error: err });
      }
});


router.route('/find').get(jwtvalidation, async (req, res) => {
      try {
            const data = await student_model.find()
            if (!data.length == 0) {
                  res.status(200).send({ massage: "deta find successful", deat: data });
            } else {
                  res.status(400).send({ massage: 'deta not found' });
            }
      } catch (error) {
            res.status(400).send({ massage: "internal server error", error: error });
      }
})

router.route('/update/:Id').put(jwtvalidation, validate, async (req, res) => {
      const item = req.body;
      const id = req.params.Id;
      console.log(id);
      try {
            const data = {
                  name: item.name,
                  age: item.age,
                  gender: item.gender,
                  class: item.class,
                  last_name: item.last_name,
                  father_name: item.father_name,
                  mother_name: item.mother_name,
                  address: item.address,
                  permanent_address: item.permanent_address,
                  student_email: item.student_email,
                  father_email: item.father_email,
                  mother_email: item.mother_email,
                  student_mobile_number: item.student_mobile_number,
                  father_mobile_number: item.father_mobile_number,
                  mother_mobile_number: item.mother_mobile_number,
                  father_occupation: item.father_occupation,
                  mother_occupation: item.mother_occupation
            }
            await student_model.findByIdAndUpdate(id, data)
                  .then((data) => {
                        return res.status(200).send({ massage: "deta update successful", deta: data });
                  })
                  .catch(err => {
                        return res.status(400).send({ massage: 'deta not up date successful', error: err });
                  })

      } catch (err) {
            console.error(err);
            return res.status(500).send({ status: 500, massage: err.message });
      }
})

router.route('/delete').delete(jwtvalidation, async (req, res) => {
      try {
            const id = req.body.id;
            console.log(id);
            const deta = await student_model.findByIdAndDelete(id)
            if (deta) {
                  res.status(200).send({ message: "delete successful" })
            } else {
                  res.status(400).send({ massage: "id is not find in detabase" });
            }

      } catch (err) {
            res.status(400).send({ massage: err.message });
      }
})


router.route('/aggregate').get(async (req, res) => {
      try {
          const result = await student_model.aggregate([
              {
                  $match: {
                      age:{$gt:10}
                  }
              },
              {
                  $group: {
                      _id: "$name",
                      total: { $sum: 1 }
                  }
              }
          ]);
  
          res.status(200).json({ result });
      } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message });
      }
  });
  

module.exports = router;





