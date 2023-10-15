import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const lnglocal = localStorage.getItem("lng");

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: {
        English: "English",
        Arabic: "العربية",
        Persian: "فارسی",
        code: "Ar",
        home: "الرئيسية",
        exit: "خروج",
        cancel: "الغاء",
        ok: "موافق",
        menu: "القائمة",
        register: "سجل الآن",
        download: "تحميل",
        formFullName: "الاسم الكامل",
        formPhoneNumber: "رقم الموبايل",
        formEmail: "الايميل",
        AboutUs: "من نحن",
        JoinUs: "انضم لنا",
      },
    },
    en: {
      translation: {
        English: "English",
        Arabic: "العربية",
        Persian: "فارسی",
        code: "En",
        home: "Home",
        exit: "Exit",
        cancel: "Cancel",
        ok: "Ok",
        menu: "Menu",
        register: "Register Now",
        download: "Download",
        formFullName: "Full Name",
        formPhoneNumber: "Phone Number",
        formEmail: "Email",
        AboutUs: "About Us",
        JoinUs: "Join Us",
      },
    },
  },
  lng: lnglocal ?? "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
