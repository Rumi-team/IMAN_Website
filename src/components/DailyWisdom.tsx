"use client";

import { useState, useEffect } from "react";

const wisdoms = [
  // Prophet Muhammad (PBUH)
  { en: "The best of people are those who are most beneficial to others.", fa: "بهترین مردم کسی است که سودمندترین آنها برای دیگران باشد.", author: "Prophet Muhammad (PBUH)", authorFa: "پیامبر اکرم (ص)" },
  { en: "Seek knowledge from the cradle to the grave.", fa: "از گهواره تا گور دانش بجوی.", author: "Prophet Muhammad (PBUH)", authorFa: "پیامبر اکرم (ص)" },
  { en: "The ink of the scholar is more sacred than the blood of the martyr.", fa: "مرکب دانشمند از خون شهید مقدس‌تر است.", author: "Prophet Muhammad (PBUH)", authorFa: "پیامبر اکرم (ص)" },
  { en: "A kind word is a form of charity.", fa: "سخن نیکو صدقه است.", author: "Prophet Muhammad (PBUH)", authorFa: "پیامبر اکرم (ص)" },
  { en: "Make things easy and do not make them difficult, cheer people up and do not scare them away.", fa: "آسان بگیرید و سخت نگیرید، مژده دهید و نفرت نیفکنید.", author: "Prophet Muhammad (PBUH)", authorFa: "پیامبر اکرم (ص)" },
  { en: "He who is not merciful to others, will not be treated mercifully.", fa: "هر که به دیگران رحم نکند، بر او رحم نخواهد شد.", author: "Prophet Muhammad (PBUH)", authorFa: "پیامبر اکرم (ص)" },
  { en: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.", fa: "قوی کسی نیست که دیگری را به زمین بزند، قوی کسی است که هنگام خشم خود را کنترل کند.", author: "Prophet Muhammad (PBUH)", authorFa: "پیامبر اکرم (ص)" },
  // Ali ibn Abi Talib
  { en: "The tongue is a beast; if it is let loose, it devours.", fa: "زبان درنده‌ای است که اگر رها شود می‌درد.", author: "Ali ibn Abi Talib", authorFa: "علی ابن ابی‌طالب" },
  { en: "Patience is of two kinds: patience over what pains you, and patience against what you covet.", fa: "صبر دو گونه است: صبر بر آنچه ناگوار است و صبر در برابر آنچه دوست داری.", author: "Ali ibn Abi Talib", authorFa: "علی ابن ابی‌طالب" },
  { en: "The worth of a man lies in what he does well.", fa: "ارزش هر کسی به اندازه کاری است که نیکو انجام می‌دهد.", author: "Ali ibn Abi Talib", authorFa: "علی ابن ابی‌طالب" },
  { en: "Do not let your difficulties fill you with anxiety; after all, it is only in the darkest nights that stars shine more brightly.", fa: "مگذار سختی‌ها تو را مضطرب کند، ستارگان در تاریک‌ترین شب‌ها درخشان‌ترند.", author: "Ali ibn Abi Talib", authorFa: "علی ابن ابی‌طالب" },
  { en: "A wise man first thinks and then speaks, but a fool speaks first and then thinks.", fa: "انسان دانا نخست می‌اندیشد و سپس سخن می‌گوید، اما نادان نخست سخن می‌گوید و سپس می‌اندیشد.", author: "Ali ibn Abi Talib", authorFa: "علی ابن ابی‌طالب" },
  { en: "Your remedy is within you, but you do not sense it.", fa: "درمان تو در درون توست اما احساسش نمی‌کنی.", author: "Ali ibn Abi Talib", authorFa: "علی ابن ابی‌طالب" },
  // Rumi
  { en: "Let yourself be silently drawn by the strange pull of what you really love.", fa: "بگذار آنچه را واقعاً دوست داری بی‌صدا تو را به سوی خود بکشاند.", author: "Rumi", authorFa: "مولانا" },
  { en: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", fa: "دیروز عاقل بودم و می‌خواستم دنیا را عوض کنم. امروز دانا هستم و خودم را تغییر می‌دهم.", author: "Rumi", authorFa: "مولانا" },
  { en: "The wound is the place where the Light enters you.", fa: "زخم جایی است که نور به درون تو راه می‌یابد.", author: "Rumi", authorFa: "مولانا" },
  { en: "Raise your words, not your voice. It is rain that grows flowers, not thunder.", fa: "کلامت را بالا ببر نه صدایت را. این باران است که گل می‌رویاند نه رعد.", author: "Rumi", authorFa: "مولانا" },
  { en: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.", fa: "آن سوی نیکی و بدی صحرایی است، من تو را آنجا ملاقات خواهم کرد.", author: "Rumi", authorFa: "مولانا" },
  // Saadi
  { en: "Human beings are members of a whole, in creation of one essence and soul.", fa: "بنی آدم اعضای یکدیگرند / که در آفرینش ز یک گوهرند.", author: "Saadi", authorFa: "سعدی" },
  { en: "A thankful person is thankful under all circumstances.", fa: "آدم شاکر در همه حال شکرگزار است.", author: "Saadi", authorFa: "سعدی" },
  { en: "Whoever is indifferent to the suffering of others is not worthy to be called human.", fa: "هر که بر درد دیگران بی‌تفاوت باشد، شایسته نام انسان نیست.", author: "Saadi", authorFa: "سعدی" },
  // Hafiz
  { en: "I wish I could show you, when you are lonely or in darkness, the astonishing light of your own being.", fa: "ای کاش می‌توانستم نور شگفت‌انگیز وجودت را در تنهایی به تو نشان دهم.", author: "Hafiz", authorFa: "حافظ" },
  { en: "The heart is a thousand-stringed instrument that can only be tuned with love.", fa: "دل سازی هزار تار است که جز با عشق کوک نمی‌شود.", author: "Hafiz", authorFa: "حافظ" },
  { en: "Stay close to anything that makes you glad you are alive.", fa: "نزدیک هر چیزی بمان که از زنده بودنت شادمان شوی.", author: "Hafiz", authorFa: "حافظ" },
  // Attar
  { en: "If the eye of the heart is open, in each atom there will be a hundred secrets.", fa: "اگر چشم دل باز باشد در هر ذره‌ای صد راز نهان است.", author: "Attar", authorFa: "عطار" },
  // Ferdowsi
  { en: "The world is a passing thing, but the name of a good man endures forever.", fa: "جهان گذران است ولی نام نیکو جاودان می‌ماند.", author: "Ferdowsi", authorFa: "فردوسی" },
  { en: "Be wise and fill your mind with knowledge, for the ignorant will waste his years.", fa: "توانا بود هر که دانا بود / ز دانش دل پیر برنا بود.", author: "Ferdowsi", authorFa: "فردوسی" },
  // Omar Khayyam
  { en: "Be happy for this moment. This moment is your life.", fa: "شاد باش در این لحظه. این لحظه زندگی توست.", author: "Omar Khayyam", authorFa: "عمر خیام" },
  { en: "A loaf of bread, a jug of wine, and thou beside me singing in the wilderness.", fa: "نان و پیاله‌ای شراب و تو در کنار من، آوازخوان در بیابان.", author: "Omar Khayyam", authorFa: "عمر خیام" },
  // Nizami
  { en: "Generosity is giving more than you can, and pride is taking less than you need.", fa: "سخاوت آن است که بیش از توان بدهی و غرور آن است که کمتر از نیاز بگیری.", author: "Nizami", authorFa: "نظامی" },
];

/** Get the day number in LA timezone (resets at midnight PT) */
function getLADay(): number {
  const laStr = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const la = new Date(laStr);
  const start = new Date(la.getFullYear(), 0, 0);
  return Math.floor((la.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

/** Calculate ms until next midnight PT */
function msUntilMidnightPT(): number {
  const laStr = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const la = new Date(laStr);
  const midnight = new Date(la);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - la.getTime();
}

export default function DailyWisdom() {
  const [wisdom, setWisdom] = useState<typeof wisdoms[0] | null>(null);

  useEffect(() => {
    function update() {
      const dayIndex = getLADay() % wisdoms.length;
      setWisdom(wisdoms[dayIndex]);
    }

    update();

    // Schedule refresh at midnight PT
    const timeoutId = setTimeout(() => {
      update();
      // Then refresh every 24 hours
      const intervalId = setInterval(update, 24 * 60 * 60 * 1000);
      return () => clearInterval(intervalId);
    }, msUntilMidnightPT());

    return () => clearTimeout(timeoutId);
  }, []);

  if (!wisdom) return null;

  return (
    <div className="bg-[var(--text)] text-[var(--bg)] py-2.5 px-4 text-center">
      <p className="text-xs sm:text-sm leading-relaxed max-w-[900px] mx-auto">
        <span className="italic">&ldquo;{wisdom.en}&rdquo;</span>
        <span className="text-[var(--gold)] mx-2">|</span>
        <span
          className="font-[IranNastaliq] text-sm sm:text-base"
          dir="rtl"
          lang="fa"
        >
          &laquo;{wisdom.fa}&raquo;
        </span>
        <span className="text-[var(--muted)] ml-2 text-xs">
          — {wisdom.author}
        </span>
      </p>
    </div>
  );
}
