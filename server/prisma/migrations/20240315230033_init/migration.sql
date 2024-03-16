-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "DateOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Access" (
    "Id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "DateOfExpiration" TIMESTAMP(3) NOT NULL,
    "DateOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Enabled" BOOLEAN NOT NULL DEFAULT true,
    "Type" TEXT NOT NULL DEFAULT 'web',

    CONSTRAINT "Access_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Id_key" ON "User"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Access_Id_key" ON "Access"("Id");

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
