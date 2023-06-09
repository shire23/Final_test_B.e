const { user } = require("../models");

exports.getAllUser = async (req, res) => {
  try {
    // await siswa.findAll();
    const getData = await user.findAll();
    // select * from user
    // const data = await musics.findAll({ attributes: { exclude: ["music_id"] } });
    res.send(getData);
  } catch (err) {
    console.log(err);
    res.send({ message: "internal error" });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;

  const data = await siswa.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.send(data);
};

exports.postUser = async (req, res) => {
  try {
    const body = req.body;

    await user.create({
      name: body.nam,
    });

    res.send({
      status: 200,
      message: "data sukses insert",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: "Internal server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log(req.params.id);

    const userData = await user.findOne({
      where: {
        id: req.params.id,
      },
    });

    // req.params.id digunakan untuk mencari id
    // select * from user where id = req.params.id
    // return untuk memberhentikan data sesuai yang diperintahkan atau memngamalikan nilai sebelumnya
    //res.send untuk mengirimkan respon ke postman

    if (!userData) {
      return res.send({
        message: "User not found",
      });
    }

    // untuk menjalankan data ke database
    const userDataRespon = await userData.update({
      name: req.body.name,
    });

    res.send(userDataRespon);
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: "Internal server error",
    });
  }
};
