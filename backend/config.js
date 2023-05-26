const secretKey = 'asdfgfjlAsdfweofuheo1rffwe!!asd,';
const mongoPath = 'mongodb://localhost:27017/mestodb';
const linkRegExp = /^(https?|ftp):\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*$/;

module.exports = {
  secretKey,
  mongoPath,
  linkRegExp,
};
