import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  productSchema,
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "uz";

  const defaultTitle =
    currentLang === "uz"
      ? "MusicShopUz - Musiqa Asboblari va Jihozlari | O'zbekiston"
      : currentLang === "ru"
        ? "MusicShopUz - Музыкальные инструменты и оборудование | Узбекистан"
        : "MusicShopUz - Music Instruments and Equipment | Uzbekistan";

  const defaultDescription =
    currentLang === "uz"
      ? "O'zbekistondagi eng yaxshi musiqa asboblari do'koni. Gitara, klaviatura, zarb asboblari, audio jihozlar va boshqalar. Sifatli mahsulotlar, professional xizmat."
      : currentLang === "ru"
        ? "Лучший магазин музыкальных инструментов в Узбекистане. Гитары, клавишные, ударные инструменты, аудиооборудование и многое другое. Качественные товары, профессиональное обслуживание."
        : "The best music store in Uzbekistan. Guitars, keyboards, percussion, audio equipment and more. Quality products, professional service.";

  const defaultKeywords =
    currentLang === "uz"
      ? "musiqa asboblari, gitara, klaviatura, zarb asboblari, mikrofon, kalonka, audio jihozlar, musiqa do'koni, MusicShopUz"
      : currentLang === "ru"
        ? "музыкальные инструменты, гитара, синтезатор, ударные инструменты, микрофон, колонки, аудиооборудование, музыкальный магазин, MusicShopUz"
        : "musical instruments, guitar, keyboard, percussion, microphone, speakers, audio equipment, music shop, MusicShopUz";

  const siteUrl = "https://music-shop.uz";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image || `${siteUrl}/logo.png`;

  const pageTitle = title ? `${title} | MusicShopUz` : defaultTitle;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="MusicShopUz" />
      <meta
        property="og:locale"
        content={
          currentLang === "uz"
            ? "uz_UZ"
            : currentLang === "ru"
              ? "ru_RU"
              : "en_US"
        }
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={fullImage} />

      {/* Product Schema (JSON-LD) */}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
