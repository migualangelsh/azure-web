import Gerente from "../../../models/Gerente.js";
import { Hotel } from "../../../models/Hotel.js";

const consultaGerente = async (req, res) => {
  const gerentes = await Gerente.findAll({
    include: {
      model: Hotel
    },
    raw:true,
    nest:true
  });
  res.render("hotel/gerente/consultagerente", {
    pagina: "Lista de Gerentes",
    gerente: gerentes
  });
};

export { consultaGerente };
