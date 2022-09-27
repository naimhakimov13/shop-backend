declare const XRegExp: any
export const urlSlug = (s: string, opt = null) => {
  s = String(s);
  opt = Object(opt);

  var defaults = {
    'delimiter': '-',
    'limit': undefined,
    'lowercase': true,
    'replacements': {},
    'transliterate': (typeof(XRegExp) === 'undefined') ? true : false
  };

  // Merge options
  for (var k in defaults) {
    if (!opt.hasOwnProperty(k)) {
      opt[k] = defaults[k];
    }
  }

  var char_map = {
    // Russian
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
    'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
    'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C',
    'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
    'Я': 'Ya',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya',

  };

  // Make custom replacements
  for (var k in opt.replacements) {
    s = s.replace(RegExp(k, 'g'), opt.replacements[k]);
  }

  // Transliterate characters to ASCII
  if (opt.transliterate) {
    for (var k in char_map) {
      s = s.replace(RegExp(k, 'g'), char_map[k]);
    }
  }

  // Replace non-alphanumeric characters with our delimiter
  var alnum = (typeof(XRegExp) === 'undefined') ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
  s = s.replace(alnum, opt.delimiter);

  // Remove duplicate delimiters
  s = s.replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter);

  // Truncate slug to max. characters
  s = s.substring(0, opt.limit);

  // Remove delimiter from ends
  s = s.replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');

  return opt.lowercase ? s.toLowerCase() : s;
}
