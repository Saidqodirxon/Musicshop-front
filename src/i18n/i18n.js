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
        Boglanish: "Bog'lanish",
        loading: "Yuklanmoqda...",
        links: {
          home: "Bosh sahifa",
          services: "Xizmatlar",
          cases: "Keyslar",
          about_us: "Kompaniya haqida",
          products: "Mahsulotlar",
          contacts: "Aloqa",
          calculate: "Loyihani hisoblash",
        },
        hero: {
          title:
            "Professional AV-yechimlar biznes va tashkilotlar uchun kalit ostida",
          description:
            "Konferensiya zallari, auditoriyalar va katta makonlar uchun audio va video tizimlarni loyihalash, o'rnatish va integratsiya qilish",
          calculateBtn: "Loyihani hisoblash",
          consultBtn: "Konsultatsiya olish",
        },
        navbar: {
          logoAlt: "Logotip",
          phoneNumber: "+998 99 306 20 20",
          languageAlt: "Joriy til",
          lang: {
            uz: "O'zbek",
            ru: "Rus",
            en: "Ingliz",
          },
        },
        advantages: {
          title_1: "BIZNING",
          title_2: "AFZALLIKLARIMIZ",
          guarantee: {
            title:
              "Muhr qo'yilgan shartnoma asosida ishlaymiz va 10 yillik kafolat beramiz",
            description: `Har bir loyiha aniq muddatlar va majburiyatlar ko'rsatilgan rasmiy shartnoma bilan ta'minlanadi.
          Biz o'z ishlarimizning sifatiga ishonamiz va 10 yillik kafolat beramiz — bu ishonchli materiallar va sinovdan o'tgan texnologiyalar asosida mumkin.`,
          },
          materials: {
            title: "Premium materiallar",
            description:
              "Tabiiy kvarsli travertin va sifatli yopishtiruvchidan foydalanamiz.",
          },
          price: {
            title: "Shaffof narx",
            description: "Yashirin to'lovlarsiz adolatli narx taklif qilamiz.",
          },
          button: "Batafsil",
          imageAlt: "Afzalliklar",
        },
        why: {
          title_1: "NEGA",
          title_2: "BIZNI TANLASHADI",
          reason1: {
            title: "Tajriba",
            text: "Sertifikatlangan materiallar, aniq shartnoma, o'rtacha narx.",
          },
          reason2: {
            title: "Individual yondashuv",
            text: "Har bir mijozga alohida e'tibor.",
          },
          reason3: {
            title: "Sifat va ishonchlilik",
            text: "Kafolatlangan natija.",
          },
          reason4: {
            title: "Shaffoflik",
            text: "Shaffof narx va ish jarayoni.",
          },
          imageAlt: "Sabab",
        },
        about: {
          title_1: "KOMPANIYA HAQIDA",
          title_2: "FASAD MASTER",
          paragraph_1:
            "«Fasad Master» MChJ 10 yildan ortiq vaqtdan beri qurilish xizmatlari bozorida faoliyat yuritib kelmoqda. Kompaniya hududiy jihatdan Toshkent shahrida joylashgan bo'lib, 90 nafardan ortiq mutaxassislarga ega va o'zining keng moddiy-texnik resurs bazasiga ega.",
          paragraph_2:
            "Asosiy ixtisoslashuvimiz — har qanday murakkablikdagi fasad ishlaridir. Kompaniya hisobida 400 dan ortiq objektlar va suyuq travertin, qumtosh, g'isht, tabiiy tosh, turli xil shpatlevkalar va boshqa materiallar bilan fasadni bezash bo'yicha boy tajriba mavjud. Fasadni bezatish binoga estetik ko'rinish beribgina qolmay, uni tashqi omillardan himoya qiladi.",
          paragraph_3:
            "Bizning ishlarimiz rasmiy shartnoma va muhr asosida amalga oshiriladi. Barcha majburiyatlar hujjat orqali tasdiqlanadi va bu hamkorlikning ochiqligi hamda ishonchliligini kafolatlaydi.",
          paragraph_4:
            "Reputatsiya — bizning asosiy qadrivatimiz. Biz Toshkentda fasad ishlarini olib borganimizda, yuqori sifat standartlariga amal qilamiz va buyurtmachilarning eng yuqori talablariga javob berishga harakat qilamiz. Bizning prinsiplarimiz: sertifikatlangan materiallardan foydalanish, shartnomaga so'zsiz rioya etish, adolatli narx siyosati va to'liq o'zini ta'minlash.",
        },
        contacts: {
          title: "Obyektga prorab chaqirib, maslahat oling",
          subtitle:
            "Kontaktlaringizni qoldiring va biz siz bilan aloqaga chiqamiz",
          namePlaceholder: "Ismingiz",
          phonePlaceholder: "Telefon raqamingiz",
          button: "Yuborish",
          privacy: "Ma'lumotlaringiz maxfiy saqlanadi",
          success: "So'rov yuborildi",
          error: "Xatolik yuz berdi",
        },
        portfolio: {
          title_1: "BIZNING",
          title_2: "ISHLARIMIZ",
          imageAlt: "Bizning loyihalar",
        },
        footer: {
          services: {
            title: "Xizmatlar",
            travertine: "Travertin",
            alucobond: "Alyukobond",
            natural_stone: "Tabiiy tosh",
          },
          about: {
            title: "Biz haqimizda",
            company: "Kompaniya",
            history: "Tarix",
            advantages: "Afzalliklar",
          },
          portfolio: {
            title: "Portfolio",
            works: "Bizning ishlar",
          },
          contacts: {
            title: "Aloqa",
            phone: "+998 99 306 20 20",
          },
          copyright:
            "Mualliflik huquqi © {{year}} Fasad Master. Barcha huquqlar himoyalangan.",
          developed_by: "Ishlab chiqardi",
        },
        notfound: {
          imageAlt: "404 xatolik",
          title: "Sahifa topilmadi",
          button: "Bosh sahifa",
        },
        company_history: {
          title: "KOMPANIYA TARIXI",
          loading: "Yuklanmoqda...",
          guarantee: {
            title: "Rasmiy kafolat — 10 yil",
          },
          materials: {
            title: "Premium materiallar",
          },
          price: {
            title: "Shaffof narx",
          },
        },
        catalog: {
          title_1: "BIZNING",
          title_2: "XIZMATLARIMIZ",
          more: "Batafsil",
        },
        contact_form: {
          heading: "Biz bilan bog'laning",
          short_about: "Qisqacha biz haqimizda",
          company_description: `«Fasad Master» MChJ — fasad ishlarida 10 yildan ortiq tajriba. Shtatda — 90 nafardan ortiq mutaxassis, O'zbekiston bo'ylab 400 dan ortiq obyekt.
          Rasmiy muhrli shartnoma asosida ishlaymiz.
          Ixtisoslasuv: suyuq travertin, qumtosh, g'isht, tosh, shpatlevka va boshqa fasad materiallari.`,
          form_heading: "Kontaktlaringizni qoldiring",
          thanks: "Rahmat! Tez orada siz bilan bog'lanamiz.",
          name: "Ism",
          phone: "Telefon",
          send: "Yuborish",
          privacy: "Ma'lumotlaringiz maxfiy saqlanadi.",
        },
        otziv: {
          title_1: "Mijozlarimiz",
          title_2: "fikrlari",
        },
        services: {
          sectionTitle: "BIZ NIMA QILAMIZ",
          sectionSubtitle:
            "Professional audio, video va multimedia uskunalarni loyihalaymiz, yetkazamiz va o'rnatamiz",
        },
        solutions: {
          sectionTitle: "BIZ KIM UCHUN ISHLAYMIZ",
          sectionSubtitle:
            "Biz har bir ob'ekt turining vazifalarini tushunamiz va kalitga tayyor yechimlarni taklif qilamiz",
        },
        contactForm: {
          title: "BIZ BILAN BOG'LANING",
          subtitle: "Savollaringiz bormi? Bizga yozing",
          description:
            "Formani to'ldiring va biz sizga 24 soat ichida javob beramiz",
          namePlaceholder: "Ismingiz *",
          phonePlaceholder: "Telefon *",
          emailPlaceholder: "Email (majburiy emas)",
          messagePlaceholder: "Xabaringiz *",
          sendButton: "Xabar yuborish",
          sending: "Yuborilmoqda...",
          successMessage:
            "Xabar muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.",
          errorMessage:
            "Xabar yuborishda xatolik yuz berdi. Qaytadan urinib ko'ring.",
        },
        consultationForm: {
          title: "Hoziroq konsultatsiya buyurtma qiling",
          description:
            "Formani to'ldiring va biz sizga 15 daqiqa ichida qo'ng'iroq qilamiz, narxni hisoblaymiz.",
          namePlaceholder: "Ismingizni kiriting",
          phonePlaceholder: "+998 (00) 000-00-00",
          callButton: "Qo'ng'iroqni buyurtma qiling",
          sending: "Yuborilmoqda...",
          successMessage:
            "Ariza muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.",
          errorMessage:
            "Arizani yuborishda xatolik yuz berdi. Qaytadan urinib ko'ring.",
        },
        narxi: "Narxi",
        summ2: "so'm/m²",
        pages: {
          about: {
            loading: "Yuklanmoqda...",
            banner_alt: "Kompaniya haqida - banner",
            image_alt: "Kompaniya haqida - asosiy",
            gallery_alt: "Kompaniya haqida galereya",
          },
          products: {
            top_products: "Top mahsulotlar",
            all_products: "Barcha mahsulotlar",
            more_details: "Batafsil",
            no_products: "Top mahsulotlar topilmadi",
            recommended: "Tavsiya etamiz",
            in_stock: "Omborda bor",
            out_of_stock: "Omborda yo'q",
            contact: "Yozish",
            currency: "so'm",
            view_details: "Batafsil",
            description: "Tavsif",
            gallery: "Rasmlar",
            close: "Yopish",
          },
          contacts: {
            address: "Manzil",
            email: "E-mail",
            phone: "Telefon",
            work_time: "Ish vaqti",
            name_placeholder: "Ismingiz",
            phone_placeholder: "Telefoningiz",
            message_placeholder: "Xabaringiz",
            send_button: "Yuborish",
            success_message: "Xabar yuborildi!",
            contact_form_title: "Biz bilan bog'laning",
          },
          calculate: {
            object_type_title: "Qaysi ob'ekt uchun loyiha kerak?",
            object_types: {
              conference: "Konferensiya zali",
              classroom: "O'quv auditoriyasi",
              meeting: "Muzokara xonasi",
              government: "Davlat zali",
              concert: "Konsert/majlis zali",
              other: "Boshqa",
            },
            area_title: "Ob'ekt maydoni (m2)",
            height_title: "Shift balandligi (ixtiyoriy)",
            other_area_title: "Qo'shimcha maydon (m2)",
            equipment_title: "Qanday uskunalar kerak?",
            equipment_types: {
              audio: "Audio tizim",
              video: "Video / ekran / proyektor",
              microphones: "Mikrofonlar",
              control: "Boshqaruv va avtomatlashtirish",
              conference: "Konferensiya tizimi",
              other: "Boshqa",
            },
            contact_title: "Bog'lanish uchun",
            contact_description:
              "Biz siz bilan bog'lanamiz va loyihaning dastlabki hisob-kitobini tayyorlaymiz",
            name_placeholder: "Ismingiz",
            phone_placeholder: "Telefoningiz",
            calculate_button: "Hisoblash",
            success_message: "Ariza muvaffaqiyatli yuborildi!",
            reviews_title: "Mijozlar fikrlari",
            reviews_label: "FIKRLAR",
          },
          services: {
            title: "Bizning xizmatlarimiz",
            more: "Batafsil",
          },
        },
      },
    },
    ru: {
      translation: {
        Boglanish: "Связаться",
        loading: "Загрузка...",
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
        services: {
          sectionTitle: "ЧТО МЫ ДЕЛАЕМ",
          sectionSubtitle:
            "Проектируем, поставляем и монтируем профессиональное аудио, видео и мультимедийное оборудование",
        },
        solutions: {
          sectionTitle: "ДЛЯ КОГО МЫ РАБОТАЕМ",
          sectionSubtitle:
            "Мы понимаем задачи каждого типа объектов и предлагаем готовые решения под ключ",
        },
        contactForm: {
          title: "СВЯЖИТЕСЬ С НАМИ",
          subtitle: "Есть вопросы? Напишите нам",
          description: "Заполните форму и мы ответим вам в течение 24 часов",
          namePlaceholder: "Ваше имя *",
          phonePlaceholder: "Телефон *",
          emailPlaceholder: "Email (необязательно)",
          messagePlaceholder: "Ваше сообщение *",
          sendButton: "Отправить сообщение",
          sending: "Отправка...",
          successMessage:
            "Сообщение успешно отправлено! Мы ответим вам в ближайшее время.",
          errorMessage: "Ошибка при отправке сообщения. Попробуйте еще раз.",
        },
        consultationForm: {
          title: "Заказать консультацию прямо сейчас",
          description:
            "Заполните форму и мы перезвоним вам в течение 15 минут, чтобы расчитать стоимость.",
          namePlaceholder: "Введите имя",
          phonePlaceholder: "+998 (00) 000-00-00",
          callButton: "Заказать звонок",
          sending: "Отправка...",
          successMessage:
            "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
          errorMessage: "Ошибка при отправке заявки. Попробуйте еще раз.",
        },
        narxi: "Цена от",
        summ2: "сум/м²",
        pages: {
          about: {
            loading: "Загрузка...",
            banner_alt: "О компании - баннер",
            image_alt: "О компании - основное",
            gallery_alt: "О компании галерея",
          },
          products: {
            top_products: "Топ товары",
            all_products: "Все товары",
            more_details: "Подробнее",
            no_products: "Топ товары не найдены",
            recommended: "Рекомендуем",
            in_stock: "В наличии",
            out_of_stock: "Нет в наличии",
            contact: "Написать",
            currency: "сум",
            view_details: "Подробнее",
            description: "Описание",
            gallery: "Фотогалерея",
            close: "Закрыть",
          },
          contacts: {
            address: "Адрес",
            email: "E-mail",
            phone: "Телефон",
            work_time: "Время работы",
            name_placeholder: "Ваше имя",
            phone_placeholder: "Ваш телефон",
            message_placeholder: "Ваше сообщение",
            send_button: "Отправить",
            success_message: "Сообщение отправлено!",
            contact_form_title: "Свяжитесь с нами",
          },
          calculate: {
            object_type_title: "Для какого объекта нужен проект?",
            object_types: {
              conference: "Конференц-зал",
              classroom: "Учебная аудитория",
              meeting: "Переговорная",
              government: "Государственный зал",
              concert: "Концертный/актовый зал",
              other: "Другое",
            },
            area_title: "Площадь объекта (м2)",
            height_title: "Высота потолков (опц)",
            other_area_title: "Дополнительная площадь (м2)",
            equipment_title: "Какое оборудование необходимо?",
            equipment_types: {
              audio: "Аудиосистема",
              video: "Видео / экран / проектор",
              microphones: "Микрофоны",
              control: "Управление и автоматизация",
              conference: "Конференц-система",
              other: "Другое",
            },
            contact_title: "Контактные данные",
            contact_description:
              "Мы свяжемся с вами и подготовим предварительный расчет проекта",
            name_placeholder: "Ваше имя",
            phone_placeholder: "Ваш телефон",
            calculate_button: "Рассчитать",
            success_message: "Заявка успешно отправлена!",
            reviews_title: "Отзывы клиентов",
            reviews_label: "ОТЗЫВЫ",
          },
          services: {
            title: "Наши услуги",
            more: "Подробнее",
          },
        },
      },
    },
    en: {
      translation: {
        Boglanish: "Contact Us",
        loading: "Loading...",
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
          services: {
            sectionTitle: "WHAT WE DO",
            sectionSubtitle:
              "We design, supply and install professional audio, video and multimedia equipment",
          },
          solutions: {
            sectionTitle: "WHO WE WORK FOR",
            sectionSubtitle:
              "We understand the tasks of each type of facility and offer turnkey solutions",
          },
          contactForm: {
            title: "CONTACT US",
            subtitle: "Have questions? Write to us",
            description:
              "Fill out the form and we will respond within 24 hours",
            namePlaceholder: "Your name *",
            phonePlaceholder: "Phone *",
            emailPlaceholder: "Email (optional)",
            messagePlaceholder: "Your message *",
            sendButton: "Send message",
            sending: "Sending...",
            successMessage:
              "Message sent successfully! We will respond to you shortly.",
            errorMessage: "Error sending message. Please try again.",
          },
          consultationForm: {
            title: "Order consultation right now",
            description:
              "Fill out the form and we will call you back within 15 minutes to calculate the cost.",
            namePlaceholder: "Enter name",
            phonePlaceholder: "+998 (00) 000-00-00",
            callButton: "Order a call",
            sending: "Sending...",
            successMessage:
              "Request sent successfully! We will contact you soon.",
            errorMessage: "Error submitting request. Please try again.",
          },
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
        pages: {
          about: {
            loading: "Loading...",
            banner_alt: "About company - banner",
            image_alt: "About company - main",
            gallery_alt: "About company gallery",
          },
          products: {
            top_products: "Top products",
            all_products: "All products",
            more_details: "More details",
            no_products: "Top products not found",
            recommended: "Recommended",
            in_stock: "In stock",
            out_of_stock: "Out of stock",
            contact: "Contact",
            currency: "UZS",
            view_details: "View details",
            description: "Description",
            gallery: "Gallery",
            close: "Close",
          },
          contacts: {
            address: "Address",
            email: "E-mail",
            phone: "Phone",
            work_time: "Working hours",
            name_placeholder: "Your name",
            phone_placeholder: "Your phone",
            message_placeholder: "Your message",
            send_button: "Send",
            success_message: "Message sent!",
            contact_form_title: "Contact us",
          },
          calculate: {
            object_type_title: "What type of facility needs the project?",
            object_types: {
              conference: "Conference hall",
              classroom: "Classroom",
              meeting: "Meeting room",
              government: "Government hall",
              concert: "Concert/assembly hall",
              other: "Other",
            },
            area_title: "Facility area (m2)",
            height_title: "Ceiling height (optional)",
            other_area_title: "Additional area (m2)",
            equipment_title: "What equipment is needed?",
            equipment_types: {
              audio: "Audio system",
              video: "Video / screen / projector",
              microphones: "Microphones",
              control: "Control and automation",
              conference: "Conference system",
              other: "Other",
            },
            contact_title: "Contact information",
            name_placeholder: "Your name",
            phone_placeholder: "Your phone",
            calculate_button: "Calculate",
            success_message: "Request sent successfully!",
            reviews_title: "Customer reviews",
          },
          services: {
            title: "Our services",
            more: "More",
          },
        },
      },
    },
  },
});

export default i18n;
