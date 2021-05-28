import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const { user } = req.body;
  const { name, email, image } = user;

  try {
    const findUser = await prisma.users.findUnique({
      where: { email },
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
      return res.status(200).send(findUser);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};
