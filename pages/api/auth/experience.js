import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const { id, experience } = req.body;

  try {
    const findUser = await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        isAdmin: true,
        isNew: true,
        experience: true,
        repositories: true,
      },
    });
    if (!findUser) {
      return res.status(401).send("Unauthorized...");
    } else {
      const user = await prisma.users.update({
        where: { id },
        data: { experience },
      });
      return res.status(200).send(user);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};
