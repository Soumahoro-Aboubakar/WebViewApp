import { Dimensions } from "react-native";
const calendly = require("../assets/images/calendly.png");
const chatGpt = require("../assets/images/chatGpt.png");
const faceBook = require("../assets/images/faceBook.png");
const gemini = require("../assets/images/gemini.png");
const google = require("../assets/images/google.png");
const hubspot = require("../assets/images/hubspot.png");
const leaonardo = require("../assets/images/leaonardo.ia.png");
const playBackground = require("../assets/images/playBackground.png");
const scanManga = require("../assets/images/scanManga.png");
const turbologo = require("../assets/images/turbologo.png");
const wixCom = require("../assets/images/wix.com.png");
const youtube = require("../assets/images/youtube.png");
const Instagram = require("../assets/images/instagramm.jpg");
const Tiwtter = require("../assets/images/twitter.png");
const YouIcon = require("../assets/images/youIcon.png");
const Quillbot = require("../assets/images/quillbolt.png");
/*************   Admob key */ //
export const BANNER_ID = "ca-app-pub-8738536260846552/4721130948"; //standart
export const BANNER_ID_2 = "ca-app-pub-8738536260846552/1383687012"; //Enchères partenaires
export const RewardedInterstitial_ID = "ca-app-pub-8738536260846552/9581725328"; //standart
export const RewardedVidEO_ID = "ca-app-pub-8738536260846552/4888134981"; //Enchères partenaires
export const Interstitial_ID = "ca-app-pub-8738536260846552/7917289863"; //Enchères partenaires
/*****************    and */
export const blueColor = "#3498db";
export const languageMap = {
  en: "Anglais",
  fr: "Français",
  zh: "Chinois mandarin",
  es: "Espagnol",
  hi: "Hindi",
  ar: "Arabe",
  bn: "Bengali",
  pt: "Portugais",
  ru: "Russe",
  ur: "Ourdou",
};
export const getDefaultLanguage = (languageTag = "") => {
  let langTag = languageTag.split("-")[0];
  const languageName = languageMap[langTag] || "Anglais";
  return {
    languageName,
    thereIsDefaultLanguage: languageName ? true : false,
  };
};
export const { height, width } = Dimensions.get("window");
export const getObjectData = (language) => {
  const selectedLanguage = geDataByLangauges().find(
    (lang) => lang.lang.toLowerCase() === language.toLowerCase()
  );
  return selectedLanguage;
};
export const handleData = (language) => {
  let result;
  const defaultLanguage = getObjectData("Français");
  const selectedLanguage = getObjectData(language);

  if (selectedLanguage) {
    result = selectedLanguage.data;
  } else {
    result = defaultLanguage.data;
  }
  const data = [
    {
      id: 1,
      concernPersons: result.concernPersons_1,

      values: [
        {
          name: "ChatGPT",
          url: "https://chat.openai.com/",
          logo: chatGpt,
        },
        {
          name: "Gemini",
          url: "https://gemini.google.com/",
          logo: gemini,
        },
        {
          name: "You.com",
          url: "https://you.com/",
          logo: YouIcon,
        },
        {
          name: "Quillbot",
          url: "https://quillbot.com/",
          logo: Quillbot,
        },
      ],
    },
    {
      id: 2,
      concernPersons: result.concernPersons_2,
      values: [
        {
          name: "Youtube",
          url: "https://www.youtube.com/",
          logo: youtube,
        },
        {
          name: "Google",
          url: "https://www.google.com/",
          logo: google,
        },
        {
          name: "Facebook",
          url: "https://web.facebook.com/",
          logo: faceBook,
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/",
          logo: Instagram,
        },
        {
          name: "Tiwtter",
          url: "https://twitter.com/",
          logo: Tiwtter,
        },
      ],
    },
    {
      id: 3,
      concernPersons: result.concernPersons_3,
      values: [
        {
          name: "Turbologo",
          url: "https://turbologo.com/",
          logo: turbologo,
        },
        {
          name: "Wix.com",
          url: "https://fr.wix.com/logolangdesktop/fr_logo-maker?utm_source=google&utm_medium=cpc&utm_campaign=20019644532^147601995799^search%20logo%20-%20lang&experiment_id=g%C3%A9n%C3%A9rateur%20de%20logo%20gratuit^e^656026188630^&gad_source=1&gclid=CjwKCAjww_iwBhApEiwAuG6ccGg0G4Hm_4-aIxVlW4F_kwxxIz50GLT_krwVKFBl1rmE7yPMkz2yqRoCwaUQAvD_BwE",
          logo: wixCom,
        },
      ],
    },
    {
      id: 4,
      concernPersons: result.concernPersons_4,
      values: [
        {
          name: "PlayBackground",
          url: "https://playground.com",
          logo: playBackground,
        },
        {
          name: "Leaonardo",
          url: "https://leonardo.ai/",
          logo: leaonardo,
        },
      ],
    },
    {
      id: 5,
      concernPersons: result.concernPersons_5,
      values: [
        {
          name: "Calendly",
          url: "https://calendly.com/fr",
          logo: calendly,
        },
        {
          name: "Hubspot",
          url: "https://www.hubspot.fr/products/cms/ai-content-writer?hubs_post-cta=fr-blog-plain&hubs_post=blog.hubspot.fr%2Fmarketing%2Foutils-ia-productivite&_ga=2.203061394.2051792404.1713320338-827832996.1713320338&_gl=1*1x0qx0p*_ga*ODI3ODMyOTk2LjE3MTMzMjAzMzg.*_ga_57BHR4YHPH*MTcxMzMyMDgzNy4xLjEuMTcxMzMyMDg4Ni4xMS4wLjA",
          logo: hubspot,
        },
      ],
    },
    {
      id: 6,
      concernPersons: result.concernPersons_6,
      values: [
        {
          name: "scan manga",
          url: "https://www.lelmanga.com/",
          logo: scanManga,
        },
      ],
    },
  ];
  return data;
};

export const geDataByLangauges = () => {
  const languages = [
    {
      lang: "Français",
      selectText: "Langage selectionné",
      data: {
        concernPersons_1:
          "Destiné aux étudiants, élèves, entrepreneurs et autres.",
        concernPersons_2:
          "Pour le divertissement, les actualités, les recherches et plus encore.",
        concernPersons_3: "Création de logos professionnels.",
        concernPersons_4: "Génération d'images professionnelles.",
        concernPersons_5:
          "Apprendre à s'organiser pour une meilleure rentabilité.",
        concernPersons_6: "Lecture de mangas scannés.",
        firstWord: "Simplicité",
        secondWord: "Fiabilité",
        thirdWord: "Efficacité",
        queryText: "Rechercher",
        text: "Sélectionnez une langue",
        languages: [
          "Français",
          "Chinois mandarin",
          "Espagnol",
          "Anglais",
          "Hindi",
          "Arabe",
          "Bengali",
          "Portugais",
          "Russe",
          "Ourdou",
        ],
      },
    },
    {
      lang: "Chinois mandarin",
      selectText: "选定语言 (Xuǎndìng yǔyán)",
      data: {
        concernPersons_1: "面向学生、学生、企业家等。",
        concernPersons_2: "用于娱乐、新闻、研究等等。",
        concernPersons_3: "专业logo设计。",
        concernPersons_4: "生成专业图像。",
        concernPersons_5: "学会组织以提高效益。",
        concernPersons_6: "阅读扫描漫画。",
        firstWord: "简单",
        secondWord: "可靠",
        thirdWord: "高效",
        queryText: "搜索",
        text: "选择一种语言",
        languages: [
          "法语",
          "中文",
          "西班牙语",
          "英语",
          "印地语",
          "阿拉伯语",
          "孟加拉语",
          "葡萄牙语",
          "俄语",
          "乌尔都语",
        ],
      },
    },
    {
      selectText: "Idioma seleccionado",
      lang: "Espagnol",
      data: {
        concernPersons_1:
          "Destinado a estudiantes, escolares, empresarios y otros.",
        concernPersons_2:
          "Para entretenimiento, noticias, investigaciones y más.",
        concernPersons_3: "Creación de logotipos profesionales.",
        concernPersons_4: "Generación de imágenes profesionales.",
        concernPersons_5: "Aprender a organizarse para una mayor rentabilidad.",
        concernPersons_6: "Lectura de mangas escaneados.",
        firstWord: "Simplicidad",
        secondWord: "Fiabilidad",
        thirdWord: "Eficiencia",
        queryText: "Buscar",
        text: "Seleccione un idioma",
        languages: [
          "Francés",
          "Mandarín chino",
          "Español",
          "Inglés",
          "Hindi",
          "Árabe",
          "Bengalí",
          "Portugués",
          "Ruso",
          "Urdu",
        ],
      },
    },
    {
      lang: "Anglais",
      selectText: "Selected language",
      data: {
        concernPersons_1:
          "Intended for students, pupils, entrepreneurs, and others.",
        concernPersons_2: "For entertainment, news, research, and more.",
        concernPersons_3: "Creation of professional logos.",
        concernPersons_4: "Generation of professional images.",
        concernPersons_5: "Learning to organize for greater profitability.",
        concernPersons_6: "Reading scanned mangas.",
        firstWord: "Simplicity",
        secondWord: "Reliability",
        thirdWord: "Efficiency",
        queryText: "Search",
        text: "Select a language",
        languages: [
          "French",
          "Mandarin Chinese",
          "Spanish",
          "English",
          "Hindi",
          "Arabic",
          "Bengali",
          "Portuguese",
          "Russian",
          "Urdu",
        ],
      },
    },
    {
      lang: "Hindi",
      selectText: "चयनित भाषा (Chayanit bhāṣā)",
      data: {
        concernPersons_1:
          "छात्रों, छात्रों, उद्यमियों और अन्य के लिए निर्दिष्ट।",
        concernPersons_2: "मनोरंजन, समाचार, अनुसंधान और अधिक के लिए।",
        concernPersons_3: "पेशेवर लोगो बनाना।",
        concernPersons_4: "पेशेवर छवियों की पीढ़ी।",
        concernPersons_5: "अधिक लाभ के लिए संगठन सीखना।",
        concernPersons_6: "स्कैन किए गए मंगा पढ़ना।",
        firstWord: "सरलता",
        secondWord: "विश्वसनीयता",
        thirdWord: "कुशलता",
        queryText: "खोज",
        text: "एक भाषा का चयन करें",
        languages: [
          "फ्रेंच",
          "मंडारिन चीनी",
          "स्पेनिश",
          "अंग्रेज़ी",
          "हिंदी",
          "अरबी",
          "बंगाली",
          "पुर्तगाली",
          "रूसी",
          "उर्दू",
        ],
      },
    },
    {
      lang: "Arabe",
      selectText: "'ا'لة المحددة' (Al-lughah al-muhaddadah)",
      data: {
        concernPersons_1: "مخصص للطلاب والتلاميذ ورجال الأعمال وغيرهم.",
        concernPersons_2: "للترفيه والأخبار والبحوث والمزيد.",
        concernPersons_3: "إنشاء شعارات مهنية.",
        concernPersons_4: "إنشاء صور مهنية.",
        concernPersons_5: "تعلم التنظيم لتحقيق الربحية الأكبر.",
        concernPersons_6: "قراءة المانجا الممسوحة.",
        firstWord: "بساطة",
        secondWord: "موثوقية",
        thirdWord: "فعالية",
        queryText: "بحث",
        text: "اختر لغة",
        languages: [
          "فرنسي",
          "الصينية الماندرينية",
          "الأسبانية",
          "الإنجليزية",
          "الهندية",
          "العربية",
          "البنغالية",
          "البرتغالية",
          "الروسية",
          "الأردية",
        ],
      },
    },
    {
      lang: "Bengali",
      selectText: "'নির্বাচিত ভাষা' (Nirbachita bhāṣā)",
      data: {
        concernPersons_1:
          "শিক্ষার্থীদের, ছাত্র-ছাত্রীদের, উদ্যোক্তাদের এবং অন্যান্যের জন্য উপযুক্ত।",
        concernPersons_2: "বিনোদন, খবর, গবেষণা এবং আরো জন্য।",
        concernPersons_3: "পেশাদার লোগো তৈরি।",
        concernPersons_4: "পেশাদার ছবির উৎপাদন।",
        concernPersons_5: "বেশি লাভের জন্য সংগঠনের শেখার।",
        concernPersons_6: "স্ক্যান করা ম্যাংগা পড়া।",
        firstWord: "সহজতা",
        secondWord: "বিশ্বস্ততা",
        thirdWord: "কার্যকরতা",
        queryText: "অনুসন্ধান",
        text: "একটি ভাষা নির্বাচন করুন",
        languages: [
          "ফরাসি",
          "ম্যান্ডারিন চীনা",
          "স্প্যানিশ",
          "ইংরেজি",
          "হিন্দি",
          "আরবি",
          "বাংলা",
          "পর্তুগিজ",
          "রুশ",
          "উর্দু",
        ],
      },
    },
    {
      lang: "Portugais",
      selectText: "Idioma selecionado",
      data: {
        concernPersons_1:
          "Destinado a estudantes, alunos, empreendedores e outros.",
        concernPersons_2:
          "Para entretenimento, notícias, pesquisas e muito mais.",
        concernPersons_3: "Criação de logotipos profissionais.",
        concernPersons_4: "Geração de imagens profissionais.",
        concernPersons_5:
          "Aprender a se organizar para uma maior rentabilidade.",
        concernPersons_6: "Leitura de mangás digitalizados.",
        firstWord: "Simplicidade",
        secondWord: "Confiabilidade",
        thirdWord: "Eficiência",
        queryText: "Pesquisar",
        text: "Selecione um idioma",
        languages: [
          "Francês",
          "Chinês mandarim",
          "Espanhol",
          "Inglês",
          "Hindi",
          "Árabe",
          "Bengali",
          "Russo",
          "Urdu",
        ],
      },
    },
    {
      lang: "Russe",
      selectText: "'Выбранный язык' (Vybrannyy yazyk)",
      data: {
        concernPersons_1:
          "Предназначен для студентов, учеников, предпринимателей и других.",
        concernPersons_2:
          "Для развлечения, новостей, исследований и многого другого.",
        concernPersons_3: "Создание профессиональных логотипов.",
        concernPersons_4: "Генерация профессиональных изображений.",
        concernPersons_5: "Изучение организации для большей прибыльности.",
        concernPersons_6: "Чтение отсканированных манг.",
        firstWord: "Простота",
        secondWord: "Надежность",
        thirdWord: "Эффективность",
        queryText: "Поиск",
        text: "Выберите язык",
        languages: [
          "Французский",
          "Китайский мандарин",
          "Испанский",
          "Английский",
          "Хинди",
          "Арабский",
          "Бенгальский",
          "Португальский",
          "Урду",
        ],
      },
    },
    {
      lang: "Ourdou",
      selectText: "'منتخب زبان' (Muntakhib zabān)",
      data: {
        concernPersons_1: "طلباء، طلباء، کاروباری افراد اور دیگر لوگوں کے لیے۔",
        concernPersons_2: "تفریح، خبریں، تحقیقات اور زیادہ کے لیے۔",
        concernPersons_3: "پیشہ ورانہ لوگوں کی تخلیق۔",
        concernPersons_4: "پیشہ ورانہ تصاویر کی تخلیق۔",
        concernPersons_5: "زیادہ منافع کے لیے تنظیم سیکھنا۔",
        concernPersons_6: "اسکینڈ مانگاس کی پڑھائی۔",
        firstWord: "آسانی",
        secondWord: "قابل اعتمادی",
        thirdWord: "کارگری",
        queryText: "تلاش کریں",
        text: "ایک زبان منتخب کریں",
        languages: [
          "فرانسیسی",
          "چینی منڈارن",
          "ہندوستانی",
          "انگریزی",
          "عربی",
          "بنگالی",
          "پرتگالی",
          "روسی",
          "اردو",
        ],
      },
    },
  ];

  return languages;
};
