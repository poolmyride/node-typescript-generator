function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<html><head><meta charset=\"utf-8\"><title>marko</title></head><body><h1>Marko Demo</h1> Hello " +
      escapeXml(data.name) +
      "</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
