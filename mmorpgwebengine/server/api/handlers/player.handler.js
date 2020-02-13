import Response from '../response';


export const getCurrent = (req, res) => {
  const { context } = req;

  res.status(200).json(
    new Response(true, context.player.toObject()).toObject(),
  );
};
