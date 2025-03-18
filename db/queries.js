const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function insertUser(username, password){
  await prisma.user.create({
    data: {
      username: username,
      password: password
    }
  })
}

async function getAllUsers(){
  const users = await prisma.user.findMany();
  return users;
}

module.exports = {insertUser, getAllUsers};
