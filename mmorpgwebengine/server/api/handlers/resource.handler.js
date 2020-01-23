import AmmunitionType from "../../../models/amunitionType";
import Response from "../response";

export const ammunitionTypes = (req, res) => {
  AmmunitionType.find({})
    .then(ammunitionTypes => {
      res.status(200).json(
        new Response(
          true,
          ammunitionTypes.map(a => a.toObject())
        ).toObject()
      );
    })
    .catch(err => res.status(400).json(new Response(false, null, err.message)));
};
