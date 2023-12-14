let users = []

const addUser = (user) => {
  const userName = user.name.trim().toLowerCase()
  const userRoom = user.room.trim().toLowerCase()

  const isEx = users.find(u => u.name.trim().toLowerCase() === userName.trim().toLowerCase() && u.room === userRoom)

  !isEx && users.push(user)

  const currentUser = isEx || user

  return {isEx:!!isEx, user: currentUser}
}

module.exports = {addUser}