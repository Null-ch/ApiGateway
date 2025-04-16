class UrlUtils {
  static createBaseUrl(serviceUrl) {
    while (serviceUrl.endsWith('/')) {
      serviceUrl = serviceUrl.slice(0, -1);
    }
    return serviceUrl;
  }

  static normalizePath(path) {
    while (path.startsWith('/')) {
      path = path.slice(1);
    }
    return path;
  }

  static buildFullUrl(baseUrl, path) {
    const normalizedBaseUrl = this.createBaseUrl(baseUrl);
    const normalizedPath = this.normalizePath(path);
    return `${normalizedBaseUrl}/${normalizedPath}`;
  }
}

module.exports = UrlUtils; 