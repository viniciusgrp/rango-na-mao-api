import Endereco from "../models/Endereco.model.js";

export const createEndereco = async (req, res) => {
  try {
    req.validatedBody.userId = req.tokenId;

    if (req.validatedBody.enderecoPrincipal) {
      await Endereco.update(
        { enderecoPrincipal: false },
        { where: { userId: decoded.id } }
      );
    }

    const endereco = await Endereco.create(req.validatedBody);

    res.status(201).json(endereco);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const updateEndereco = async (req, res) => {
  const validated = req.validatedBody;

  try {
    const endereco = await Endereco.findOne({
      where: { enderecoId: req.params.id },
    });

    if (!endereco) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }

    if (validated.enderecoPrincipal) {
      await Endereco.update(
        { enderecoPrincipal: false },
        { where: { userId: decoded.id } }
      );
    }

    const updatedEndereco = await endereco.update(validated);

    res.status(200).json(updatedEndereco);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteEndereco = async (req, res) => {
  try {
    const endereco = await Endereco.findOne({
      where: { enderecoId: req.params.id },
    });

    if (!endereco) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }

    await endereco.destroy();

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getEnderecos = async (req, res) => {
  try {
    const enderecos = await Endereco.findAll({
      where: { userId: req.tokenId },
    });

    res.status(200).json(enderecos);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getEnderecosDeUsuario = async (req, res) => {
  try {
    const enderecos = await Endereco.findAll({
      where: { userId: req.params.id },
    });

    res.status(200).json(enderecos);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
