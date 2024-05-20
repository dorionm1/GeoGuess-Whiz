-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "emailaddress" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "gametype" (
    "gameid" SERIAL NOT NULL,
    "gamedescription" VARCHAR(255) NOT NULL,

    CONSTRAINT "gametype_pkey" PRIMARY KEY ("gameid")
);

-- CreateTable
CREATE TABLE "usergame" (
    "usergameid" SERIAL NOT NULL,
    "userid" INTEGER,
    "gameid" INTEGER,
    "gamestartdate" DATE NOT NULL,
    "gameenddate" DATE,

    CONSTRAINT "usergame_pkey" PRIMARY KEY ("usergameid")
);

-- CreateTable
CREATE TABLE "userscore" (
    "scoreid" SERIAL NOT NULL,
    "userid" INTEGER,
    "gameid" INTEGER,
    "score" INTEGER NOT NULL,
    "createddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userscore_pkey" PRIMARY KEY ("scoreid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "usergame" ADD CONSTRAINT "fk_game_type" FOREIGN KEY ("gameid") REFERENCES "gametype"("gameid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usergame" ADD CONSTRAINT "fk_user_game" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userscore" ADD CONSTRAINT "fk_game_score" FOREIGN KEY ("gameid") REFERENCES "gametype"("gameid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userscore" ADD CONSTRAINT "fk_user_score" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;
