export default function slugify(text) {
  // 1. Metni küçük harfe çevir ve baştaki/sonundaki gereksiz boşlukları kaldır.
  text = text.toString().toLowerCase().trim();

  // 2. Türkçe karakterleri İngilizce karşılıklarına dönüştür.
  text = text
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u');

  // 3. Birden fazla boşluğu tek boşluğa indir.
  text = text.replace(/\s+/g, ' ');

  // 4. Tüm boşlukları '_' karakterine dönüştür.
  text = text.replace(/ /g, '_');

  return text;
}