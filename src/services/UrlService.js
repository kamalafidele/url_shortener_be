const UrlRepo = require('../repositories/UrlRepo');

class UrlService {
  static async save(data) {
    return UrlRepo.create(data);
  }

  static async getAllUrls() {
    return UrlRepo.findAll();
  }

  static async getUrlById(id) {
    return UrlRepo.findById(id);
  }

  static async getUrlByUniqueIdentifier(uniqueIdentifier) {
    return UrlRepo.findByUniqueIdentifier(uniqueIdentifier);
  }

  static async getUrlsByUser(userId) {
    return UrlRepo.findByUser(userId);
  }

  static async updateUrlById(id, data) {
    return UrlRepo.updateById(id, data);
  }

  static async updateByIdentifier(uniqueIdentifier) {
    return UrlRepo.updateByIdentifier(uniqueIdentifier);
  }

  static async deleteUrlById(id) {
    return UrlRepo.deleteById(id);
  }
}

module.exports = UrlService;
