import { Link } from "react-router-dom";
import { FaTelegramPlane, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2C2C2C] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Music Shop"
                className="w-12 h-12 rounded-lg"
              />
              <span className="text-xl font-bold">Music Shop</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Профессиональное аудио, видео и мультимедийное оборудование для любых задач
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#8F4E24] rounded-full flex items-center justify-center transition-all"
                aria-label="Telegram"
              >
                <FaTelegramPlane className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#8F4E24] rounded-full flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#8F4E24] rounded-full flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#8F4E24] rounded-full flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Навигация</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors inline-block"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-white transition-colors inline-block"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors inline-block"
                >
                  О компании
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-white transition-colors inline-block"
                >
                  Товары
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="text-gray-400 hover:text-white transition-colors inline-block"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Услуги</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Проектирование</li>
              <li>Поставка оборудования</li>
              <li>Монтаж и настройка</li>
              <li>Техническая поддержка</li>
              <li>Гарантийное обслуживание</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Контакты</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <div className="text-gray-400 mb-1">Телефон:</div>
                <a
                  href="tel:+998909982800"
                  className="text-white font-semibold hover:text-[#C08552] transition-colors"
                >
                  +998 90 998 28 00
                </a>
              </li>
              <li>
                <div className="text-gray-400 mb-1">Email:</div>
                <a
                  href="mailto:Supersite.uz@gmail.com"
                  className="text-white hover:text-[#C08552] transition-colors"
                >
                  Supersite.uz@gmail.com
                </a>
              </li>
              <li>
                <div className="text-gray-400 mb-1">Адрес:</div>
                <p className="text-white">
                  г. Ташкент, Чиланзарский р-н,<br />
                  дублер 18А
                </p>
              </li>
              <li>
                <div className="text-gray-400 mb-1">Время работы:</div>
                <p className="text-white">
                  Пн-Вс: 9:00 - 19:00
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              &copy; {currentYear} Music Shop. Все права защищены.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
