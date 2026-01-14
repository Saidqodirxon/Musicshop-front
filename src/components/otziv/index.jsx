import React from "react";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    name: "Руслан",
    image: "/22.png",
    text: ` Брали плитку травертина для офиса. Менеджер помог выбрать цвет, доставили вовремя. Монтажники уложились за 5 дней. Выглядит солидно, клиенты замечают. Норм компания, рекомендую.`,
  },
  {
    name: "Ботир",
    image: "/20.png",
    text: `Взял травертин для дома, светлый, с полировкой. Ребята приехали, замерили, через 10 дней фасад был готов. Без лишних разговоров, всё по делу.Я доволен.`,
  },
  {
    name: "Абдуллох",
    image: "/21.png",
    text: `Обратился за фасадом для таунхауса. Fasad Master сделали всё под ключ: от эскиза до монтажа. Камень шикарный, бригада не халтурила. Минусов не нашёл, молодцы.`,
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-white py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {t("otziv.title_1")}{" "}
        <span className="text-[#71914B]">{t("otziv.title_2")}</span>
      </h2>

      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center space-y-4 px-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />

            <h4 className="font-semibold text-lg">{item.name}</h4>
            <p className="text-gray-600 text-sm relative">
              <span className="text-3xl text-[#71914B] absolute -left-4 top-0">
                “
              </span>
              {item.text}
              <span className="text-3xl text-[#71914B]">”</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
