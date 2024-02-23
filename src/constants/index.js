// export const API_BASE_URL = "http://localhost:3500/";
export const API_BASE_URL = "https://api.avarealestate.ae/";

export const Gender = [
  { value: "Male", lng: { en: "Male", ar: "ذكر" } },
  { value: "Female", lng: { en: "Female", ar: "انثى" } },
];
export const Purpose = [
  { value: "Rent", lng: { en: "Rent", ar: "للايجار" } },
  { value: "Buy", lng: { en: "Buy", ar: "للبيع" } },
];
export const RentFrequency = [
  { value: "Yearly", lng: { en: "Yearly", ar: "سنوي" } },
  { value: "Monthly", lng: { en: "Monthly", ar: "شهري" } },
  { value: "Weekly", lng: { en: "Weekly", ar: "اسبوعي" } },
  { value: "Daily", lng: { en: "Daily", ar: "يومي" } },
];
export const NearbyTypes = [
  { value: "atm", lng: { en: "ATMs", ar: "صراف آلي" } },
  { value: "bank", lng: { en: "Banks", ar: "بنوك" } },
  { value: "hospital", lng: { en: "Hospitals", ar: "مستشفيات" } },
  { value: "school", lng: { en: "Schools", ar: "مدارس" } },
  { value: "cafe", lng: { en: "Cafes", ar: "مقاهي" } },
  { value: "park", lng: { en: "Parks", ar: "حدائق عامة" } },
  { value: "shopping_mall", lng: { en: "Shopping Malls", ar: "مراكز تسوق" } },
  { value: "mosque", lng: { en: "Mosques", ar: "جوامع" } },
];
export const CompletionStatus = [
  { value: "Ready", lng: { en: "Ready", ar: "جاهز" } },
  { value: "OffPlan", lng: { en: "OffPlan", ar: "قيد الإنشاء" } },
];
export const Announcement_Type = ["Normal", "Popup"];
export const Directions = ["ltr", "rtl"];
export const Fields = ["Off Plan", "Rent", "Seecondary Market"];
export const Language_Lvl = [
  {
    value: "None",
    lng: { en: "No proficiency", ar: "لا يوجد" },
  },
  {
    value: "A1",
    lng: { en: "Beginner", ar: "مبتدئ" },
  },
  {
    value: "A2",
    lng: {
      en: "Pre-intermediate",
      ar: "ما قبل المتوسط",
    },
  },
  {
    value: "B1",
    lng: {
      en: "Intermediate",
      ar: "متوسط",
    },
  },
  {
    value: "B2",
    lng: {
      en: "Upper-intermediate",
      ar: "وسيط ذو مستوي رفيع",
    },
  },
  {
    value: "C1",
    lng: {
      en: "Advanced",
      ar: "متقدم",
    },
  },
  {
    value: "C2",
    lng: {
      en: "Native or Bilingual",
      ar: "أصلية أو ثنائية اللغة",
    },
  },
];
