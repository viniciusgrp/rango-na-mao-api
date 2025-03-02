import jwt from "jsonwebtoken";

export const superUser = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token não encontrado" });
  }

  const decoded = jwt.decode(token.replace("Bearer ", ""));

  console.log(decoded);

  const superUser = decoded.superUser;

  if (!superUser) {
    return res
      .status(401)
      .json({ message: "Recurso apenas para usuário administrador" });
  }

  next();
};

export const isSameUser = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token não encontrado" });
  }

  const decoded = jwt.decode(token.replace("Bearer ", ""));
  const isAdmin = decoded.superUser;

  
  if (isAdmin) {
      return next();
    }
    
    const userId = decoded.id;
    
    console.log(req.params.id, userId)
  if (userId != req.params.id) {
    return res
      .status(401)
      .json({ message: "Você não tem permissão para acessar este recurso" });
  }

  next();
};
