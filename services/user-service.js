const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserModel = require("../models/userModel");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error.js");

class UserService {
  async registration(name, email, password) {
    console.log("registration service", email, password)
    const existUser = await UserModel.findOne({ email });
    if (existUser)
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует.`
      );
    const passwordHash = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      name,
      email,
      password: passwordHash,
      activationLink,
      isActivated: true
    });
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activation/${activationLink}`
    // );

    const userDto = new UserDto(user);
    const tokens = tokenService.generate({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    };
  }

  async activate(activationLink) {
    // const user = await UserModel.findOne(activationLink);
    // if (!user) ApiError.BadRequest("Некорректная ссылка активации");
    // user.isActivated = true;
    // await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user)
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} не существует.`
      );
    const isPassTrue = await bcrypt.compare(password, user.password);
    if (!isPassTrue) throw ApiError.BadRequest(`Не правильный пароль.`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generate({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }
}

module.exports = new UserService();
