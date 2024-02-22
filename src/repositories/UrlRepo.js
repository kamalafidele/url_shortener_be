const UrlModel = require('../models/Url');

class UrlRepo {
  static async create(data) {
    return UrlModel.create(data);
  }

  static async findAll() {
    return UrlModel.find({}).populate('user').exec();
  }

  static async findById(id) {
    return UrlModel.findById(id).populate('user');
  }

  static async findByUniqueIdentifier(uniqueIdentifier) {
    return UrlModel.findOne({ uniqueIdentifier }).populate('user').exec();
  }

  static async findByUser(userId) {
    return UrlModel.find({ user: userId }).populate('user').exec();
  }

  static async updateById(id, data) {
    return UrlModel.findByIdAndUpdate(id, data).exec();
  }

  static async deleteById(id) {
    return UrlModel.findByIdAndDelete(id);
  }
}

module.exports = UrlRepo;
