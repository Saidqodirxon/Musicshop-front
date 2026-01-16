import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("i18nextLng") || "ru";

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "ru",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  resources: {
    uz: {
      translation: {
        Boglanish: "Боғланиш",
        links: {
          home: "Бош саҳифа",
          services: "Хизматлар",
          cases: "Кейслар",
          about_us: "Компания ҳақида",
          products: "Товарлар",
          contacts: "Алоқа",
          calculate: "Лойиҳани ҳисоблаш",
        },
        hero: {
          title:
            "Профессионал AV-ечимлар бизнес ва ташкилотлар учун калит остида",
          description:
            "Конференция залларi, аудиториялар ва катта макон учун аудио ва видео тизимларни лойиҳалаш, ўрнатиш ва интеграция қилиш",
          calculateBtn: "Лойиҳани ҳисоблаш",
          consultBtn: "Консултация олиш",
        },
        navbar: {
          logoAlt: "Логотип",
          phoneNumber: "+998 99 306 20 20",
          languageAlt: "Жорий тил",
          lang: {
            uz: "Ўзбек",
            ru: "Рус",
            en: "Инглиз",
          },
        },
        advantages: {
          title_1: "БИЗНИНГ",
          title_2: "АФЗАЛЛИКЛАРИМИЗ",
          guarantee: {
            title:
              "Мўҳр қўйилган шартнома асосида ишлаймиз ва 10 йиллик кафолат берамиз",
            description: `Ҳар бир лойиҳа аниқ муддатлар ва мажбуриятлар кўрсатилган расмий шартнома билан таъминланади.
          Биз ўз ишларимизнинг сифатига ишонамиз ва 10 йиллик кафолат берамиз — бу ишончли материаллар ва синовдан ўтган технологиялар асосида мумкин.`,
          },
          materials: {
            title: "Премиум материаллар",
            description:
              "Табиий кварсли травертин ва сифатли ёпиштиргичдан фойдаланамиз.",
          },
          price: {
            title: "Шаффоф нарх",
            description: "Яширин тўловларсиз адолатли нарх таклиф қиламиз.",
          },
          button: "Батафсил",
          imageAlt: "Афзалликлар",
        },
        why: {
          title_1: "НЕГА",
          title_2: "БИЗНИ ТАНЛАШАДИ",
          reason1: {
            title: "Тажриба",
            text: "Сертификатланган материаллар, аниқ шартнома, ўртача нарх.",
          },
          reason2: {
            title: "Индивидуал ёндашув",
            text: "Ҳар бир мижозга алоҳида эътибор.",
          },
          reason3: {
            title: "Сифат ва ишончлилик",
            text: "Кафолатланган натижа.",
          },
          reason4: {
            title: "Шаффофлик",
            text: "Шаффоф нарх ва иш жараёни.",
          },
          imageAlt: "Сабаб",
        },
        about: {
          title_1: "КОМПАНИЯ ҲАҚИДА",
          title_2: "ФАСАД МАСТЕР",
          paragraph_1:
            "«Фасад Мастер» МЧЖ 10 йилдан ортиқ вақтдан бери қурилиш хизматлари бозорида фаолият юритиб келмоқда. Компания ҳудудий жиҳатдан Тошкент шаҳрида жойлашган бўлиб, 90 нафардан ортиқ мутахассисларга эга ва ўзининг кенг моддий-техник ресурс базасига эга.",
          paragraph_2:
            "Асосий ихтисослашувимиз — ҳар қандай мураккабликдаги фасад ишларидир. Компания ҳисобида 400 дан ортиқ объектлар ва суюқ травертин, қумтош, ғишт, табиий тош, турли хил шпатлевкалар ва бошқа материаллар билан фасадни безаш бўйича бой тажриба мавжуд. Фасадни безатиш бинога эстетик кўриниш берибгина қолмай, уни ташқи омиллардан ҳимоя қилади.",
          paragraph_3:
            "Бизнинг ишларимиз расмий шартнома ва муҳр асосида амалга оширилади. Барча мажбуриятлар ҳужжат орқали тасдиқланади ва бу ҳамкорликнинг очиқлиги ҳамда ишончлилигини кафолатлайди.",
          paragraph_4:
            "Репутация — бизнинг асосий қадриятимиз. Биз Тошкентда фасад ишларини олиб борганимизда, юқори сифат стандартларига амал қиламиз ва буюртмачиларнинг энг юқори талабларига жавоб беришга ҳаракат қиламиз. Бизнинг принципларимиз: сертификатланган материаллардан фойдаланиш, шартномаларга сўзсиз риоя этиш, адолатли нарх сиёсати ва тўлиқ ўзини таъминлаш.",
        },
        contacts: {
          title: "Объектга прораб чақириб, маслаҳат олинг",
          subtitle:
            "Контактларингизни қолдиринг ва биз сиз билан алоқага чиқамиз",
          namePlaceholder: "Исмингиз",
          phonePlaceholder: "Телефон рақамингиз",
          button: "Юбориш",
          privacy: "Маълумотларингиз махфий сақланади",
          success: "Сўров юборилди",
          error: "Хатолик юз берди",
        },
        portfolio: {
          title_1: "БИЗНИНГ",
          title_2: "ИШЛАРИМИЗ",
          imageAlt: "Бизнинг лойиҳалар",
        },
        footer: {
          services: {
            title: "Хизматлар",
            travertine: "Травертин",
            alucobond: "Алюкобонд",
            natural_stone: "Табиий тош",
          },
          about: {
            title: "Биз ҳақимизда",
            company: "Компания",
            history: "Тарих",
            advantages: "Афзалликлар",
          },
          portfolio: {
            title: "Портфолио",
            works: "Бизнинг ишлар",
          },
          contacts: {
            title: "Алоқа",
            phone: "+998 99 306 20 20",
          },
          copyright:
            "Муаллифлик ҳуқуқи © {{year}} Fasad Master. Барча ҳуқуқлар ҳимояланган.",
          developed_by: "Ишлаб чиқарди",
        },
        notfound: {
          imageAlt: "404 хатолик",
          title: "Саҳифа топилмади",
          button: "Бош саҳифа",
        },
        company_history: {
          title: "КОМПАНИЯ ТАРИХИ",
          loading: "Юкланмоқда...",
          guarantee: {
            title: "Расмий кафолат — 10 йил",
          },
          materials: {
            title: "Премиум материаллар",
          },
          price: {
            title: "Шаффоф нарх",
          },
        },
        catalog: {
          title_1: "БИЗНИНГ",
          title_2: "ХИЗМАТЛАРИМИЗ",
          more: "Батафсил",
        },
        contact_form: {
          heading: "Биз билан боғланинг",
          short_about: "Қисқача биз ҳақимизда",
          company_description: `«Фасад Мастер» МЧЖ — фасад ишларида 10 йилдан ортиқ тажриба. Штатда — 90 нафардан ортиқ мутахассис, Ўзбекистон бўйлаб 400 дан ортиқ объект.
          Расмий муҳрли шартнома асосида ишлаймиз.
          Ихтисослашув: суюқ травертин, қумтош, ғишт, тош, шпатлевка ва бошқа фасад материаллари.`,
          form_heading: "Контактларингизни қолдиринг",
          thanks: "Рахмат! Тез орада сиз билан боғланамиз.",
          name: "Исм",
          phone: "Телефон",
          send: "Юбориш",
          privacy: "Маълумотларингиз махфий сақланади.",
        },
        otziv: {
          title_1: "Мижозларимиз",
          title_2: "фикрлари",
        },
        narxi: "Нархи",
        summ2: "сўм/м²",
      },
    },
    ru: {
      translation: {
        Boglanish: "Связаться",
        navbar: {
          logoAlt: "Логотип",
          phoneNumber: "+998 99 306 20 20",
          languageAlt: "Текущий язык",
          lang: {
            uz: "Узбекский",
            ru: "Русский",
            en: "Английский",
          },
        },
        links: {
          home: "Главная",
          services: "Услуги",
          cases: "Кейсы",
          about_us: "О компании",
          products: "Товары",
          contacts: "Контакты",
          calculate: "Рассчитать проект",
        },
        hero: {
          title:
            "Профессиональные AV- решение под ключ для бизнеса и организаций",
          description:
            "Проектирование, установка и интеграция аудио- и видео систем для конференц залов аудиторий и больших пространств",
          calculateBtn: "Рассчитать проект",
          consultBtn: "Получить консультацию",
        },
        advantages: {
          title_1: "НАШИ",
          title_2: "ПРЕИМУЩЕСТВА",
          guarantee: {
            title: "Работаем по договору с печатью и даём 10 лет гарантии",
            description: `Каждый проект сопровождается официальным договором с чёткими сроками и обязательствами.
Мы уверены в качестве своей работы и предоставляем гарантию 10 лет — благодаря надёжным материалам и проверенным технологиям.`,
          },
          materials: {
            title: "Премиальные материалы",
            description:
              "Используем жидкий травертин на основе натуральной крошки из Узбекистана и высококачественный акриловый клей российского производства. Только проверенные поставщики и комплектующие.",
          },
          price: {
            title: "Честная и прозрачная цена",
            description:
              "Стоимость работ соответствует среднерыночной, без скрытых доплат. С нами вы получите премиальный результат по честной цене от Fasad Master.",
          },
          button: "Подробнее",
          imageAlt: "Преимущества",
        },
        why: {
          title_1: "ПОЧЕМУ",
          title_2: "ВЫБИРАЮТ НАС",
          reason1: {
            title: "Опыт",
            text: "В наших правилах использование сертифицированных материалов, безукоризненное соблюдение договоров, разумная ценовая политика и полное самообеспечение.",
          },
          reason2: {
            title: "Индивидуальный подход",
            text: "В наших правилах использование сертифицированных материалов, безукоризненное соблюдение договоров, разумная ценовая политика и полное самообеспечение.",
          },
          reason3: {
            title: "Качество и надёжность",
            text: "В наших правилах использование сертифицированных материалов, безукоризненное соблюдение договоров, разумная ценовая политика и полное самообеспечение.",
          },
          reason4: {
            title: "Прозрачность",
            text: "В наших правилах использование сертифицированных материалов, безукоризненное соблюдение договоров, разумная ценовая политика и полное самообеспечение.",
          },
          imageAlt: "Причина выбора",
        },
        about: {
          title_1: "О КОМПАНИИ",
          title_2: "ФАСАД МАСТЕР",
          paragraph_1:
            "ООО «Фасад Мастер» более 10 лет работает на рынке строительных услуг. Территориально компания находится в Ташкенте, имеет в штате более 90 специалистов и располагает обширной базой собственных материально-технических ресурсов.",
          paragraph_2:
            "Наша основная специализация — фасадные работы любой сложности. На счету компании более 400 объектов и богатый опыт отделки фасадов жидким травертином, песчаником, кирпичом, натуральным камнем, различными видами штукатурки и другими материалами. Отделка фасадов решает сразу две задачи: придание зданию эстетического вида и защита поверхности от воздействия внешних факторов.",
          paragraph_3:
            "Работаем по официальному договору с печатью. Все обязательства фиксируются документально, что гарантирует прозрачность и надёжность сотрудничества.",
          paragraph_4:
            "Репутация — наша ключевая ценность. Выполняя отделочные работы в Ташкенте, мы придерживаемся высоких стандартов качества и стараемся соответствовать самым высоким требованиям заказчиков. В наших принципах — использование сертифицированных материалов, безукоризненное соблюдение договоров, разумная ценовая политика и полное самообеспечение.",
        },
        contacts: {
          title:
            "Вы можете вызвать прораба на Ваш участок и получить подробную консультацию",
          subtitle: "Оставьте Ваши контакты и наш менеджер свяжется с Вами",
          namePlaceholder: "Имя",
          phonePlaceholder: "Телефон",
          button: "Отправить",
          privacy: "Ваши данные не будут переданы 3-м лицам. Конфиденциально!",
          success: "Заявка успешно отправлена!",
          error: "Ошибка при отправке заявки",
        },
        portfolio: {
          title_1: "НАШИ",
          title_2: "РАБОТЫ",
          imageAlt: "Наши работы",
        },
        footer: {
          services: {
            title: "Услуги",
            travertine: "Травертин",
            alucobond: "Алюкобонд",
            natural_stone: "Натуральный камень",
          },
          about: {
            title: "О нас",
            company: "Компания",
            history: "История компании",
            advantages: "Наша преимущества",
          },
          portfolio: {
            title: "Портфолио",
            works: "Наши работы",
          },
          contacts: {
            title: "Контакты",
            phone: "+998 99 306 20 20",
          },
          copyright: "Копирайт: © {{year}} Fasad Master. Все права защищены.",
          developed_by: "Разработала команда",
        },
        notfound: {
          imageAlt: "404 ошибка",
          title: "Страница не найдена",
          button: "Главная страница",
        },
        company_history: {
          title: "ИСТОРИЯ КОМПАНИИ",
          loading: "Загрузка...",
          guarantee: {
            title: "Официальная гарантия — 10 лет",
          },
          materials: {
            title: "Премиальные материалы",
          },
          price: {
            title: "Честная и прозрачная цена",
          },
        },
        catalog: {
          title_1: "НАШИ",
          title_2: "УСЛУГИ",
          more: "Подробнее",
        },
        contact_form: {
          heading: "Наши контакты",
          short_about: "Коротко о нас",
          company_description: `ООО «Фасад Мастер» — более 10 лет опыта в фасадных работах. В штате — свыше 90 специалистов, более 400 объектов по Узбекистану.
Работаем по официальному договору с печатью.
Специализация: жидкий травертин, песчаник, кирпич, камень, штукатурка и другие фасадные материалы.`,
          form_heading: "Оставьте Ваши контакты",
          thanks: "Спасибо! Мы скоро с вами свяжемся.",
          name: "Имя",
          phone: "Телефон",
          send: "Отправить",
          privacy:
            "Ваши данные не будут переданы третьим лицам. Конфиденциально!",
        },
        otziv: {
          title_1: "Отзывы",
          title_2: "наших клиентов",
        },
        narxi: "Цена от",
        summ2: "сум/м²",
      },
    },
    en: {
      translation: {
        Boglanish: "Contact Us",
        navbar: {
          logoAlt: "Logo",
          phoneNumber: "+998 99 306 20 20",
          languageAlt: "Current language",
          lang: {
            uz: "Uzbek",
            ru: "Russian",
            en: "English",
          },
        },
        links: {
          home: "Home",
          services: "Services",
          cases: "Cases",
          about_us: "About company",
          products: "Products",
          contacts: "Contacts",
          calculate: "Calculate project",
        },
        hero: {
          title:
            "Professional turnkey AV solutions for business and organizations",
          description:
            "Design, installation and integration of audio and video systems for conference halls, auditoriums and large spaces",
          calculateBtn: "Calculate project",
          consultBtn: "Get consultation",
        },
        advantages: {
          title_1: "OUR",
          title_2: "ADVANTAGES",
          guarantee: {
            title:
              "We work under a sealed contract and provide a 10-year guarantee",
            description: `Each project is supported by an official contract with clear deadlines and obligations.
          We are confident in the quality of our work and offer a 10-year guarantee — thanks to reliable materials and proven technologies.`,
          },
          materials: {
            title: "Premium materials",
            description:
              "We use liquid travertine based on natural crumbs from Uzbekistan and high-quality acrylic glue from Russia.",
          },
          price: {
            title: "Fair and transparent pricing",
            description:
              "Prices are market average, no hidden fees. You get premium results at a fair price with Fasad Master.",
          },
          button: "More",
          imageAlt: "Advantages",
        },
        why: {
          title_1: "WHY",
          title_2: "CHOOSE US",
          reason1: {
            title: "Experience",
            text: "We follow strict standards: certified materials, solid contracts, fair pricing, and full self-sufficiency.",
          },
          reason2: {
            title: "Individual approach",
            text: "We follow strict standards: certified materials, solid contracts, fair pricing, and full self-sufficiency.",
          },
          reason3: {
            title: "Quality and reliability",
            text: "We follow strict standards: certified materials, solid contracts, fair pricing, and full self-sufficiency.",
          },
          reason4: {
            title: "Transparency",
            text: "We follow strict standards: certified materials, solid contracts, fair pricing, and full self-sufficiency.",
          },
          imageAlt: "Why choose",
        },
        about: {
          title_1: "ABOUT THE COMPANY",
          title_2: "FASAD MASTER",
          paragraph_1:
            "LLC 'Fasad Master' has been operating in the construction services market for over 10 years. The company is based in Tashkent, employs more than 90 specialists, and has an extensive base of its own material and technical resources.",
          paragraph_2:
            "Our main specialization is façade work of any complexity. The company has completed over 400 projects and has extensive experience in finishing façades with liquid travertine, sandstone, brick, natural stone, various types of plaster, and other materials. Façade finishing serves two purposes: enhancing the building’s appearance and protecting it from external influences.",
          paragraph_3:
            "We work under an official contract with a company seal. All obligations are documented, ensuring transparency and reliability in cooperation.",
          paragraph_4:
            "Reputation is our key value. While carrying out finishing work in Tashkent, we adhere to high quality standards and strive to meet the most demanding customer expectations. Our principles include the use of certified materials, flawless contract compliance, fair pricing, and full self-sufficiency.",
        },
        contacts: {
          title:
            "You can request a supervisor to visit your site for consultation",
          subtitle: "Leave your contact info and our manager will call you",
          namePlaceholder: "Name",
          phonePlaceholder: "Phone",
          button: "Send",
          privacy: "Your data will not be shared. Confidential!",
          success: "Request sent successfully!",
          error: "An error occurred while sending",
        },
        portfolio: {
          title_1: "OUR",
          title_2: "PROJECTS",
          imageAlt: "Our work",
        },
        footer: {
          services: {
            title: "Services",
            travertine: "Travertine",
            alucobond: "Alucobond",
            natural_stone: "Natural stone",
          },
          about: {
            title: "About",
            company: "Company",
            history: "History",
            advantages: "Advantages",
          },
          portfolio: {
            title: "Portfolio",
            works: "Our works",
          },
          contacts: {
            title: "Contacts",
            phone: "+998 99 306 20 20",
          },
          copyright: "Copyright © {{year}} Fasad Master. All rights reserved.",
          developed_by: "Developed by",
        },
        notfound: {
          imageAlt: "404 error",
          title: "Page not found",
          button: "Go to homepage",
        },
        company_history: {
          title: "COMPANY HISTORY",
          loading: "Loading...",
          guarantee: {
            title: "Official warranty — 10 years",
          },
          materials: {
            title: "Premium materials",
          },
          price: {
            title: "Transparent price",
          },
        },
        catalog: {
          title_1: "OUR",
          title_2: "SERVICES",
          more: "More",
        },
        contact_form: {
          heading: "Our Contacts",
          short_about: "About Us",
          company_description: `LLC "Fasad Master" — over 10 years of experience in façade work. The team includes more than 90 specialists, with over 400 completed projects across Uzbekistan.
          We operate under an official contract with a company seal.
          Specialization: liquid travertine, sandstone, brick, stone, plaster, and other façade materials.`,
          form_heading: "Leave your contact info",
          thanks: "Thank you! We'll contact you soon.",
          name: "Name",
          phone: "Phone",
          send: "Send",
          privacy: "Your data will be kept confidential.",
        },
        otziv: {
          title_1: "Customer",
          title_2: "reviews",
        },
        narxi: "Price",
        summ2: "UZS/m²",
      },
    },
  },
});

export default i18n;
