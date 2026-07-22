/** Structured FAQs per service — used for UI + FAQPage schema */
export const serviceFaqs = {
  gps: {
    ar: [
      {
        question: 'ما هي منصة تتبع المركبات من أبعاد المدار؟',
        answer:
          'منصة سحابية تتيح لك مراقبة موقع المركبات لحظياً، سجل الرحلات، السرعة، ساعات المحرك، والتنبيهات والتقارير لتحسين إدارة الأسطول.',
      },
      {
        question: 'هل أجهزة التتبع GPS تعمل في جميع مناطق السعودية؟',
        answer:
          'نعم، تعتمد أجهزة التتبع لدينا على شبكات 4G/GPS وتغطي المدن والطرق السريعة في المملكة العربية السعودية مع دعم فني محلي.',
      },
      {
        question: 'كم يستغرق تركيب جهاز تتبع على المركبة؟',
        answer:
          'عادةً يتم التركيب خلال زيارة قصيرة بواسطة فنيين معتمدين، ثم تُربط المركبة بحسابك على المنصة فوراً.',
      },
      {
        question: 'هل يمكن تتبع الشاحنات والحافلات معاً؟',
        answer:
          'بالتأكيد. تدعم المنصة أساطيل مختلطة: شاحنات، حافلات، سيارات خفيفة، ومعدات ضمن لوحة تحكم واحدة.',
      },
    ],
    en: [
      {
        question: 'What is Orbit Dimension GPS vehicle tracking?',
        answer:
          'A cloud platform for live vehicle location, trip history, speed, engine hours, alerts, and analytics to improve fleet management across Saudi Arabia.',
      },
      {
        question: 'Do GPS trackers work nationwide in Saudi Arabia?',
        answer:
          'Yes. Our 4G/GPS devices cover cities and highways across the Kingdom, backed by local support.',
      },
      {
        question: 'How long does tracker installation take?',
        answer:
          'Most vehicles are installed in a short on-site visit by certified technicians, then linked to your account immediately.',
      },
      {
        question: 'Can I track trucks and buses on one platform?',
        answer:
          'Yes. The IoT platform supports mixed fleets — trucks, buses, light vehicles, and equipment — in one dashboard.',
      },
    ],
  },
  rental: {
    ar: [
      {
        question: 'كيف يساعد التتبع شركات تأجير السيارات؟',
        answer:
          'يوفر تتبعاً لحظياً، سياجاً جغرافياً، وتنبيهات للاستخدام خارج العقد لحماية الأصول وتحسين استغلال الأسطول.',
      },
      {
        question: 'هل يمكن معرفة إذا غادرت السيارة المنطقة المسموحة؟',
        answer: 'نعم عبر Geofencing مع تنبيهات فورية لفريق العمليات.',
      },
      {
        question: 'هل تتوفر تقارير استخدام يومية؟',
        answer: 'نعم، تقارير استخدام يومية وشهرية لدعم التسعير والتشغيل.',
      },
    ],
    en: [
      {
        question: 'How does tracking help car rental companies?',
        answer:
          'Live tracking, geofencing, and unauthorized-use alerts protect assets and improve fleet utilization.',
      },
      {
        question: 'Can I detect out-of-zone usage?',
        answer: 'Yes — geofences trigger instant alerts for operations teams.',
      },
      {
        question: 'Are utilization reports available?',
        answer: 'Daily and monthly utilization reports support pricing and operations.',
      },
    ],
  },
  temp: {
    ar: [
      {
        question: 'ما فائدة مراقبة الحرارة في الشاحنات المبردة؟',
        answer:
          'تحمي جودة المنتجات الحساسة عبر مراقبة الحرارة والرطوبة مع تنبيهات فورية عند تجاوز الحدود.',
      },
      {
        question: 'هل تُحفظ سجلات سلسلة التبريد؟',
        answer: 'نعم، تتوفر سجلات وتقارير للامتثال والتدقيق.',
      },
      {
        question: 'هل يعمل النظام للمستودعات أيضاً؟',
        answer: 'نعم، يمكن مراقبة المركبات والمستودعات ضمن منصة واحدة.',
      },
    ],
    en: [
      {
        question: 'Why monitor temperature in refrigerated trucks?',
        answer:
          'Protect sensitive cargo with continuous temperature and humidity monitoring plus instant threshold alerts.',
      },
      {
        question: 'Are cold-chain records stored?',
        answer: 'Yes — logs and reports support compliance and audits.',
      },
      {
        question: 'Does it work for warehouses too?',
        answer: 'Yes. Vehicles and warehouses can be monitored on one platform.',
      },
    ],
  },
  weight: {
    ar: [
      {
        question: 'كيف تساعد إدارة الوزن على خفض التكاليف؟',
        answer: 'بمنع الحمولة الزائدة وتحسين توزيع الأحمال مما يقلل استهلاك الوقود والمخالفات.',
      },
      {
        question: 'هل المراقبة لحظية أثناء الرحلة؟',
        answer: 'نعم، يمكن متابعة الوزن والحالة التشغيلية أثناء النقل.',
      },
      {
        question: 'هل يناسب أساطيل الشاحنات الثقيلة؟',
        answer: 'مصمم خصيصاً لتتبع الشاحنات وإدارة الحمولات الثقيلة.',
      },
    ],
    en: [
      {
        question: 'How does weight management cut costs?',
        answer: 'By preventing overloading and optimizing load distribution to reduce fuel use and fines.',
      },
      {
        question: 'Is monitoring real-time during trips?',
        answer: 'Yes — weight and status can be monitored in transit.',
      },
      {
        question: 'Is it suitable for heavy truck fleets?',
        answer: 'Yes — built for truck tracking and heavy payload management.',
      },
    ],
  },
  school: {
    ar: [
      {
        question: 'كيف يعمل تتبع الحافلات المدرسية؟',
        answer:
          'تتبع لحظي لمسار الحافلة مع تنبيهات السلامة وإمكانية إشعار أولياء الأمور لتحسين شفافية النقل المدرسي.',
      },
      {
        question: 'هل يمكن مراقبة سلوك السائق؟',
        answer: 'نعم عبر السرعة، التوقفات، ويمكن دمج كاميرات AI للسلامة.',
      },
      {
        question: 'هل النظام آمن لبيانات الطلاب؟',
        answer: 'نطبق ضوابط وصول وصلاحيات لحماية بيانات التشغيل والخصوصية.',
      },
    ],
    en: [
      {
        question: 'How does school bus tracking work?',
        answer:
          'Live bus routes with safety alerts and optional parent notifications for transparent student transport.',
      },
      {
        question: 'Can driver behavior be monitored?',
        answer: 'Yes via speed and stops, with optional AI cameras for safety.',
      },
      {
        question: 'Is student-related operational data protected?',
        answer: 'Access controls and roles protect operational privacy.',
      },
    ],
  },
  specialized: {
    ar: [
      {
        question: 'ما المقصود بتتبع النقل المتخصص؟',
        answer: 'حلول مخصصة لعقود النقل المتخصص مع رقابة مسارات وتقارير أداء للتشغيل والتعاقد.',
      },
      {
        question: 'هل يدعم تعدد العملاء والعقود؟',
        answer: 'نعم، يمكن تنظيم الأسطول حسب العقود والعملاء.',
      },
      {
        question: 'هل تتوفر تقارير SLA؟',
        answer: 'تقارير الأداء تساعد على إثبات الالتزام بمستويات الخدمة.',
      },
    ],
    en: [
      {
        question: 'What is specialized transport tracking?',
        answer: 'Tailored tracking for contract transport with route control and performance reporting.',
      },
      {
        question: 'Does it support multiple contracts?',
        answer: 'Yes — fleets can be organized by contract and customer.',
      },
      {
        question: 'Are SLA reports available?',
        answer: 'Performance reports help prove service-level compliance.',
      },
    ],
  },
  fuel: {
    ar: [
      {
        question: 'كيف تكشف مراقبة الوقود السرقة أو الهدر؟',
        answer: 'عبر مستشعرات المستوى والتنبيهات عند السحب غير الطبيعي أو التراجع المفاجئ في الخزان.',
      },
      {
        question: 'هل يمكن ربطها بتتبع GPS؟',
        answer: 'نعم، تتكامل مراقبة الوقود مع منصة تتبع المركبات وإدارة الأسطول.',
      },
      {
        question: 'ما العائد المتوقع؟',
        answer: 'خفض هدر الوقود وتحسين الشفافية التشغيلية غالباً ما يحقق عائداً سريعاً.',
      },
    ],
    en: [
      {
        question: 'How does fuel monitoring detect theft or waste?',
        answer: 'Level sensors trigger alerts on abnormal drops or sudden tank decreases.',
      },
      {
        question: 'Can it integrate with GPS tracking?',
        answer: 'Yes — fuel monitoring integrates with the vehicle tracking and fleet platform.',
      },
      {
        question: 'What ROI can fleets expect?',
        answer: 'Lower fuel waste and clearer operations typically deliver fast payback.',
      },
    ],
  },
  equipment: {
    ar: [
      {
        question: 'هل يمكن تتبع المعدات الثقيلة وليس المركبات فقط؟',
        answer: 'نعم، حلول تتبع الأصول والمعدات الميدانية ضمن منصة إنترنت الأشياء.',
      },
      {
        question: 'كيف تساعد على الصيانة؟',
        answer: 'بمتابعة ساعات التشغيل والاستخدام لتخطيط الصيانة وتقليل الأعطال.',
      },
      {
        question: 'هل يمنع فقدان المعدات؟',
        answer: 'الموقع الحي والتنبيهات تساعد على تقليل الفقد والاستخدام غير المصرح.',
      },
    ],
    en: [
      {
        question: 'Can I track heavy equipment, not only vehicles?',
        answer: 'Yes — asset and equipment tracking on the IoT platform.',
      },
      {
        question: 'How does it help maintenance?',
        answer: 'Runtime and utilization data support planned maintenance and fewer failures.',
      },
      {
        question: 'Does it reduce equipment loss?',
        answer: 'Live location and alerts help prevent loss and unauthorized use.',
      },
    ],
  },
  waste: {
    ar: [
      {
        question: 'كيف يحسّن التتبع أساطيل النظافة؟',
        answer: 'بتحسين المسارات، إثبات الزيارات، ورفع كفاءة جمع النفايات.',
      },
      {
        question: 'هل يمكن إثبات تنفيذ الجولات؟',
        answer: 'نعم عبر سجل المسارات والوقت والموقع.',
      },
      {
        question: 'هل يناسب البلديات والمقاولين؟',
        answer: 'مصمم للبلديات وشركات العقود في إدارة الأسطول التشغيلي.',
      },
    ],
    en: [
      {
        question: 'How does tracking improve waste fleets?',
        answer: 'By optimizing routes, proving visits, and raising collection efficiency.',
      },
      {
        question: 'Can route completion be proven?',
        answer: 'Yes — path, time, and location history provide evidence.',
      },
      {
        question: 'Is it suitable for municipalities and contractors?',
        answer: 'Built for municipal and contract waste fleet operations.',
      },
    ],
  },
  dashcamAi: {
    ar: [
      {
        question: 'ما فائدة كاميرا الذكاء الاصطناعي للأسطول؟',
        answer:
          'تقلل الحوادث عبر تنبيهات ADAS وDMS، وتوفر تسجيلاً للأحداث وبثاً مرتبطاً بموقع GPS.',
      },
      {
        question: 'هل تدعم اكتشاف تعب السائق واستخدام الجوال؟',
        answer: 'نعم ضمن أنظمة مراقبة السائق (DMS).',
      },
      {
        question: 'هل تتكامل مع منصة التتبع؟',
        answer: 'نعم، الفيديو والتنبيهات ترتبط بمنصة إدارة الأسطول في أبعاد المدار.',
      },
    ],
    en: [
      {
        question: 'Why use AI cameras for fleets?',
        answer:
          'ADAS/DMS alerts reduce accidents, with event recording and GPS-linked live video.',
      },
      {
        question: 'Does it detect fatigue and phone use?',
        answer: 'Yes — Driver Monitoring System (DMS) features.',
      },
      {
        question: 'Does it integrate with the tracking platform?',
        answer: 'Yes — video and alerts connect to Orbit Dimension fleet management.',
      },
    ],
  },
}

export function getServiceFaqs(serviceId, locale) {
  const entry = serviceFaqs[serviceId]
  if (!entry) return []
  return entry[locale] || entry.ar || []
}

/** Site-wide FAQ for /faq page */
export const siteFaqs = {
  ar: [
    {
      question: 'ما هي شركة أبعاد المدار؟',
      answer:
        'شركة أبعاد المدار للحلول التقنية متخصصة في تتبع المركبات، إدارة الأسطول، أجهزة التتبع GPS، مراقبة الوقود والحرارة، وكاميرات الذكاء الاصطناعي ومنصات إنترنت الأشياء في السعودية.',
    },
    {
      question: 'ما الفرق بين تتبع المركبات وإدارة الأسطول؟',
      answer:
        'تتبع المركبات يركز على الموقع والحالة لحظياً، بينما إدارة الأسطول تضيف السياسات والتنبيهات والتقارير والكفاءة التشغيلية عبر منصة متكاملة.',
    },
    {
      question: 'هل تقدمون أجهزة تتبع مع المنصة؟',
      answer:
        'نعم، نوفر أجهزة تتبع معتمدة ومنصة سحابية مع تركيب ودعم فني محلي.',
    },
    {
      question: 'هل يمكن تتبع الشاحنات والحافلات المدرسية؟',
      answer:
        'نعم، لدينا حلول مخصصة لتتبع الشاحنات وتتبع الحافلات والنقل المدرسي.',
    },
    {
      question: 'أين يقع مقر أبعاد المدار؟',
      answer:
        'في الرياض — حي المرسلات، طريق أبو بكر الصديق، ونخدم العملاء في أنحاء المملكة.',
    },
    {
      question: 'كيف أطلب عرض سعر؟',
      answer:
        'تواصل عبر نموذج الاتصال في الموقع أو واتساب أو البريد الإلكتروني info@orbitdimension.com للحصول على عرض مخصص.',
    },
  ],
  en: [
    {
      question: 'What is Orbit Dimension?',
      answer:
        'Orbit Dimension is a Saudi technology company specializing in vehicle tracking, fleet management, GPS devices, fuel and temperature monitoring, AI cameras, and IoT platforms.',
    },
    {
      question: 'What is the difference between vehicle tracking and fleet management?',
      answer:
        'Vehicle tracking focuses on live location and status, while fleet management adds policies, alerts, reports, and operational efficiency on one platform.',
    },
    {
      question: 'Do you provide tracking devices with the platform?',
      answer:
        'Yes — certified GPS trackers with a cloud platform, installation, and local support.',
    },
    {
      question: 'Can you track trucks and school buses?',
      answer:
        'Yes. We offer dedicated truck tracking and school bus tracking solutions.',
    },
    {
      question: 'Where is Orbit Dimension located?',
      answer:
        'Riyadh — Al-Mursalat, Abu Bakr Al-Siddiq Road, serving clients across Saudi Arabia.',
    },
    {
      question: 'How do I get a quote?',
      answer:
        'Use the website contact form, WhatsApp, or email info@orbitdimension.com for a tailored proposal.',
    },
  ],
}

export function getSiteFaqs(locale) {
  return siteFaqs[locale] || siteFaqs.ar
}
