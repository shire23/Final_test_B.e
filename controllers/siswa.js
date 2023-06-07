const { siswa } = require("../models");
const { get } = require("../routes/siswa");

exports.getSiswaById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await siswa.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (data == undefined || data == null) {
      return res.status(404).send({
        message: `Siswa with id: ${id} not found`,
      });
    }
    res.status(200).send({
      message: `Get siswa with id: ${id}`,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

exports.submitSiswa = async (req, res) => {
  try {
    const name = req.body.name;
    let image = null;

    const schema = joi.object({
      name: joi.string().min(3).require(),
      email: joi.string().min().require(),
      password: joi.string().min(5).require(),
    });

    const { error } = schema.validate(req, body);

    if (error)
      return res.status(404).send({
        message: error.details[0].message,
      });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.file != undefined) {
      image = req.protocol + "://" + req.get("host") + req.get.destination + "/" + req.file.filename;
    }

    const getSiswa = await siswa.create({
      name: name,
      email: req.body.email,
      password: hashedPassword,
      image: image,
    });
    const dataSiswa = await siswa.findOne({
      where: { id: getSiswa.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      message: ` Succes create siswa with name: ${name}`,
      data: dataSiswa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: " Internal server error",
    });
  }
};

exports.editSiswa = async (req, res) => {
  try {
    const userId = req.params.id;
    const name = req.body.name;

    const siswaData = await siswa.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!siswaData) {
      return res.status(404).send({
        message: `siswa with id: ${userId} not found`,
      });
    }

    const getSiswa = await siswaData.update({
      name: name,
    });

    const dataSiswa = await siswa.findOne({
      where: { id: getSiswa.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      message: `Succes update siswa with name: ${$name}`,
      data: dataSiswa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: " Internal server error",
    });
  }
};
