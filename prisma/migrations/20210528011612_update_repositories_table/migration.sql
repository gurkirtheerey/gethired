-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "image" VARCHAR(255),
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isNew" BOOLEAN NOT NULL DEFAULT true,
    "experience" VARCHAR(100),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repository" (
    "id" SERIAL NOT NULL,
    "repo" TEXT,
    "usersId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users.image_unique" ON "users"("image");

-- AddForeignKey
ALTER TABLE "repository" ADD FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
