import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const { id, role } = req.body;

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
      const user = await prisma.users.create({ data: { name, email, image } });
      return res.status(200).send(user);
    } else {
      if (role) {
        const user = await prisma.users.update({
          where: { id },
          data: { isAdmin: true, isNew: false },
        });
        return res.status(200).send(user);
      } else if (!role) {
        const user = await prisma.users.update({
          where: { id },
          data: { isAdmin: false, isNew: false },
        });
        return res.status(200).send(user);
      }
      return res.status(200).send(findUser);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};
