// ===== スポットのデータ =====
// 新しいスポットは、下の window.SPOTS の中に、次の形で1件ずつ足してください。
//
//   {
//     region: "kanto",                    // 地方（下の一覧から選ぶ）
//     name: "スポット名",
//     address: "東京都渋谷区神宮前3-5-1",   // 地図アプリで開くときに使います
//     work: "いちごタルト（かき氷）",        // 作品名・メニュー名など
//     note: "ひとこと（なくてもOK）",
//     lon: 139.711, lat: 35.669,          // 経度・緯度（地方の地図にピンを立てます）
//     photos: ["cups1.jpg"]               // photos フォルダに置いた写真のファイル名（なくてもOK）
//   },
//
// region に書ける値:
//   hokkaido / tohoku / kanto / chubu / kinki / chugoku-shikoku / kyushu-okinawa
//
// ※写真に人の顔や自宅が写っていないか、公開してよいものかを確認してから載せてください。

window.SPOTS = [
  {
    "region": "kanto",
    "name": "Muffin&Bowls cafe CUPS",
    "address": "東京都渋谷区神宮前3-5-1",
    "work": "いちごタルト（かき氷）",
    "note": "",
    "srcName": "Instagram",
    "srcUrl": "https://www.instagram.com/p/Db8VwbzEwLD/?stkn=MTJrMXI5bjd4d3Bzbw==",
    "postDate": "2026-08-12",
    "lon": 139.7126,
    "lat": 35.669,
    "photos": [
      "pmuwmbeen0.jpg",
      "pmuwmbef61.jpg",
      "pmuwmbefp2.jpg"
    ],
    "id": "nedd0ji"
  },
  {
    "region": "chubu",
    "name": "こふり",
    "address": "岐阜県岐阜市鏡島南4-5-5",
    "work": "ドバイチョコ（かき氷）",
    "note": "",
    "srcName": "Instagram",
    "srcUrl": "https://www.instagram.com/p/Dc8biwEkwcl/?stkn=MTUxc3piMzV2MmJ5OA==",
    "postDate": "2026-09-06",
    "lon": 136.71194,
    "lat": 35.40206,
    "photos": [
      "pmuwmk76l0.jpg",
      "pmuwmk76z1.jpg",
      "pmuwmk77d2.jpg"
    ],
    "id": "pmuwmkl318wn"
  },
  {
    "region": "chubu",
    "name": "伊奈波神社",
    "address": "岐阜県岐阜市伊奈波通1丁目1",
    "work": "",
    "note": "",
    "sources": [
      {
        "name": "YouTube",
        "url": "https://youtu.be/5uxOKYfOors?si=63XvCocL52ODttHN",
        "date": "2026-09-19"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/Ddtt_V6E9ny/?stkn=ZG00MXloMDBvY3l3",
        "date": "2026-09-25"
      }
    ],
    "photos": [
      "pmuwnjf6j0.jpg",
      "pmuwnjf781.jpg",
      "pmuwnjf7o2.jpg",
      "pmuwnjf893.jpg"
    ],
    "lon": 136.7697,
    "lat": 35.42786,
    "id": "pmuwnguo93n6"
  },
  {
    "region": "kanto",
    "name": "氷連",
    "address": "東京都豊島区西池袋5-28-3 ノアビル 1F",
    "works": [
      "桃レアチーズティー（かき氷）"
    ],
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2087684434233614460?s=46",
        "date": "2026-08-13"
      },
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSb4g4Ysm/",
        "date": "2026-08-17"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DcbOS-5kwRM/?img_index=5&stkn=MXB1ZG9lcmw4dmJybg==",
        "date": "2026-08-24"
      }
    ],
    "photos": [
      "pmuwns7oi0.jpg",
      "pmux1sopt16.jpg"
    ],
    "lon": 139.69862,
    "lat": 35.73051,
    "id": "pmuwnsbjh1zi"
  },
  {
    "region": "kanto",
    "name": "cafe The SUN LIVES HERE",
    "address": "東京都世田谷区三軒茶屋1丁目27-33",
    "works": [
      "とうもろこし × チーズケーキ（かき氷）",
      "ラテ（ドリンク）"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DcbOS-5kwRM/?img_index=5&stkn=MXB1ZG9lcmw4dmJybg==",
        "date": "2026-08-24"
      },
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2092381622121505124?s=46",
        "date": "2026-08-26"
      }
    ],
    "photos": [
      "pmuwnur261.jpg",
      "pmuwnur2k2.jpg"
    ],
    "lon": 139.67227,
    "lat": 35.6407,
    "id": "pmuwnuspfzhm"
  },
  {
    "region": "kanto",
    "name": "IDOL",
    "address": "東京都港区南青山5-11-9 レキシントン青山ビル B1F",
    "work": "",
    "note": "",
    "srcName": "Instagram",
    "srcUrl": "https://www.instagram.com/p/Db8VwbzEwLD/?img_index=5&stkn=MTJrMXI5bjd4d3Bzbw==",
    "postDate": "2026-08-12",
    "lon": 139.71199,
    "lat": 35.66189,
    "photos": [
      "pmuwo3q6r3.jpg"
    ],
    "id": "pmuwo3rihoqe"
  },
  {
    "region": "kanto",
    "name": "Cafe Lumiere",
    "address": "東京都武蔵野市吉祥寺南町1-2-2 東山ビル4F",
    "work": "Lumiere特製　焼き氷（かき氷）",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2082081003812933983?s=46",
        "date": "2026-07-28"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DbiqFJdE2jT/?img_index=2&stkn=MWt3YXY0NGd4ZzRzdA==",
        "date": "2026-08-02"
      }
    ],
    "photos": [
      "pmuwsp1k10.jpg",
      "pmuwob6924.jpg",
      "pmuwob69r5.jpg",
      "pmuwob6a66.jpg"
    ],
    "lon": 139.58012,
    "lat": 35.70232,
    "id": "pmuwob7qo2qr"
  },
  {
    "region": "chubu",
    "name": "珈琲と紅茶 あるてあ",
    "address": "岐阜県岐阜市鵜川町5-3",
    "work": "",
    "note": "",
    "srcName": "X",
    "srcUrl": "https://x.com/chii_nyan02/status/2095282580493136349?s=46",
    "postDate": "2026-09-03",
    "lon": 136.77054,
    "lat": 35.44238,
    "photos": [
      "pmuwoh2p90.jpg"
    ],
    "id": "pmuwoh4b5y7t"
  },
  {
    "region": "other",
    "name": "李暁七マーラータン",
    "address": "",
    "works": [
      "麻辣担"
    ],
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2102531776065486886?s=46",
        "date": "2026-09-23"
      }
    ],
    "photos": [
      "pmuwovh7q0.jpg"
    ],
    "chain": true,
    "noPlace": true,
    "pref": [
      "埼玉",
      "東京",
      "富山",
      "大阪"
    ],
    "id": "pmuwovi9r44u"
  },
  {
    "region": "other",
    "name": "楊国福",
    "address": "",
    "works": [
      "麻辣担"
    ],
    "note": "",
    "sources": [
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSb421W9s/",
        "date": "2026-08-10"
      },
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2100547882868953287?s=46",
        "date": "2026-09-17"
      },
      {
        "name": "Instagram(リール)",
        "url": "https://www.instagram.com/reel/Ddg0X6mTc2d/?stkn=djh1OGRqdGFxc2Nq",
        "date": "2026-09-20"
      }
    ],
    "photos": [
      "pmuwpc8j30.jpg",
      "pmuwpc8jk1.jpg"
    ],
    "thumb": "pmuwpc8jk1.jpg",
    "chain": true,
    "noPlace": true,
    "pref": [
      "埼玉",
      "東京",
      "神奈川",
      "京都",
      "大阪",
      "兵庫",
      "福岡"
    ],
    "id": "pmuwpd926bfm"
  },
  {
    "region": "kanto",
    "name": "café paro paro",
    "address": "東京都渋谷区神宮前2丁目6-6 秀和外苑レジデンス 104",
    "works": [
      "あんこバター（ベーグル）",
      "ラテ（コーヒー）"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DYHrnl-kR6q/?img_index=4&stkn=MXh6a3hqcjYzbHV3cQ==",
        "date": "2026-05-09"
      },
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2049618917853970606?s=46",
        "date": "2026-04-30"
      }
    ],
    "photos": [
      "pmuwt1rfy3.jpg",
      "pmuwpmimj2.jpg",
      "pmuwpmimx3.jpg",
      "pmuwpmine4.jpg"
    ],
    "lon": 139.71223,
    "lat": 35.6725,
    "id": "pmuwpmjt9f1s"
  },
  {
    "region": "other",
    "name": "岐阜タンメン",
    "address": "",
    "works": [
      "岐阜タンメン",
      "半チャーハン"
    ],
    "note": "",
    "sources": [
      {
        "name": "TikTok(エイアイ過多)",
        "url": "https://vt.tiktok.com/ZSb4jLkrB/",
        "date": "2026-06-16"
      },
      {
        "name": "X(1)",
        "url": "https://x.com/chii_nyan02/status/2067581366359953667?s=46",
        "date": "2026-06-18"
      },
      {
        "name": "X(2)",
        "url": "https://x.com/chii_nyan02/status/2098186053849063632?s=46",
        "date": "2026-09-11"
      }
    ],
    "photos": [
      "pmuwqlvei0.jpg",
      "pmuwsqq9b1.jpg",
      "pmuwqlvev1.jpg"
    ],
    "thumb": "pmuwsqq9b1.jpg",
    "chain": true,
    "noPlace": true,
    "pref": [
      "富山",
      "石川",
      "福井",
      "長野",
      "岐阜",
      "静岡",
      "愛知",
      "三重"
    ],
    "id": "pmuwqlwurqfn"
  },
  {
    "region": "other",
    "name": "I'm donut？",
    "address": "",
    "works": [
      "抹茶ラテ"
    ],
    "note": "※期間限定コラボカフェ",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2059405961144697144?s=46",
        "date": "2026-05-27"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DY4fuVMk-z8/?img_index=4&stkn=dTA4Y3poa2xrZzE4",
        "date": "2026-05-28"
      }
    ],
    "photos": [
      "pmux0fkvs2.jpg",
      "pmuwr32802.jpg",
      "pmuwr328g3.jpg",
      "pmuwr328t4.jpg",
      "pmuwr32995.jpg"
    ],
    "chain": true,
    "noPlace": true,
    "pref": [
      "東京",
      "神奈川",
      "長野",
      "京都",
      "福岡"
    ],
    "id": "pmuwr363da27"
  },
  {
    "region": "chubu",
    "name": "KOYO BASE",
    "address": "岐阜県土岐市泉町久尻1496-5",
    "work": "ひのき牛と飛騨豚のハンバーグとお野菜のセット",
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DTQNAVTkYXH/?img_index=2&stkn=MWZkM3FybWRsdHNhOQ==",
        "date": "2026-01-08"
      }
    ],
    "photos": [
      "pmuwrbld96.jpg",
      "pmuwrbldq7.jpg",
      "pmuwrble78.jpg"
    ],
    "lon": 137.16991,
    "lat": 35.35616,
    "id": "pmuwrbmoxtm2"
  },
  {
    "region": "chubu",
    "name": "土岐プレミアム・アウトレット",
    "address": "岐阜県土岐市土岐ヶ丘1-2",
    "work": "",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2007795551744807327?s=46",
        "date": "2026-01-04"
      },
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSb4MTwFJ/",
        "date": "2026-01-06"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DTQNAVTkYXH/?img_index=4&stkn=MWZkM3FybWRsdHNhOQ==",
        "date": "2026-01-08"
      }
    ],
    "photos": [
      "pmuwt886e4.jpg",
      "pmuwroo9611.jpg",
      "pmuwroo9o12.jpg",
      "pmuwrooa513.jpg"
    ],
    "lon": 137.16518,
    "lat": 35.34062,
    "id": "pmuwrdhxxobz"
  },
  {
    "region": "chubu",
    "name": "PancakeHouse HoiHoi 栄本店",
    "address": "愛知県名古屋市中区栄5丁目4-2 レジデンシア栄南1A",
    "works": [
      "オムタコライス"
    ],
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2066659542860251550?s=46",
        "date": "2026-06-16"
      }
    ],
    "photos": [
      "pmuwswdt22.jpg"
    ],
    "chain": true,
    "lon": 136.91208,
    "lat": 35.16589,
    "id": "pmuwswmg6wji"
  },
  {
    "region": "kanto",
    "name": "鵬天閣",
    "address": "",
    "works": [
      "海鮮と豚肉2種盛りセット（小籠包）"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DQwlZMrkx9L/?stkn=azZ0cXp6b2ZhaGt0",
        "date": "2025-11-07"
      }
    ],
    "photos": [
      "pmuwtmb9n0.jpg",
      "pmuwtmba61.jpg"
    ],
    "chain": true,
    "noPlace": true,
    "pref": "神奈川",
    "id": "pmuwtmcx196m"
  },
  {
    "region": "kanto",
    "name": "開華楼 横浜博覧館店",
    "address": "神奈川県横浜市中区山下町145番地 横浜博覧館1階",
    "work": "三色ごま団子串",
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DQwlZMrkx9L/?img_index=3&stkn=azZ0cXp6b2ZhaGt0",
        "date": "2025-11-07"
      }
    ],
    "photos": [
      "pmuwtup4x2.jpg"
    ],
    "chain": true,
    "lon": 139.64471,
    "lat": 35.44264,
    "id": "pmuwtuxfoj9p"
  },
  {
    "region": "kanto",
    "name": "香港飲茶専門店 西遊記",
    "address": "神奈川県横浜市中区山下町149-1-4",
    "works": [
      "叉焼メロンパン"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DQwlZMrkx9L/?img_index=5&stkn=azZ0cXp6b2ZhaGt0",
        "date": "2025-11-07"
      },
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/1987871832830279942?s=46",
        "date": "2025-11-10"
      }
    ],
    "photos": [
      "pmuwu26960.jpg",
      "pmuwu269m1.jpg",
      "pmuwv7j6b3.jpg"
    ],
    "lon": 139.64575,
    "lat": 35.44364,
    "id": "pmuwu27gocke"
  },
  {
    "region": "kanto",
    "name": "caldo",
    "address": "東京都新宿区西新宿7-8-6 新宿ヴィンテージビル1F",
    "works": [
      "クラシックパンケーキ",
      "カフェラテ or ソイラテ"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DRR6Zg2Eco6/?stkn=Y3Vyejd2ZzVoMTAx",
        "date": "2025-11-20"
      }
    ],
    "photos": [
      "pmuwujx340.jpg",
      "pmuwujx3r1.jpg",
      "pmuwujx492.jpg"
    ],
    "lon": 139.69777,
    "lat": 35.69582,
    "id": "pmuwuk2jg88s"
  },
  {
    "region": "chubu",
    "name": "ロッキンロビン 大須店",
    "address": "愛知県名古屋市中区大須3丁目44-20 小田ビル1F",
    "works": [
      "食べ歩きスライダーズ"
    ],
    "note": "※食べ歩き限定",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2008509236180099404?s=46",
        "date": "2026-01-06"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DTfnGtKEblF/?img_index=2&stkn=Nmp4MzNpd2l4dnk2",
        "date": "2026-01-14"
      }
    ],
    "photos": [
      "pmuwvd29w6.jpg",
      "pmuwvd28x4.jpg",
      "pmuwvd29e5.jpg"
    ],
    "thumb": "pmuwvd28x4.jpg",
    "chain": true,
    "lon": 136.90449,
    "lat": 35.15791,
    "id": "pmuwv5t8rxh0"
  },
  {
    "region": "chubu",
    "name": "昔の矢場とん 大須観音本店",
    "address": "愛知県名古屋市中区大須2-21-32",
    "works": [
      "昔セット（串カツみそ味４本）"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DTfnGtKEblF/?img_index=2&stkn=Nmp4MzNpd2l4dnk2",
        "date": "2026-01-14"
      }
    ],
    "photos": [
      "pmuwvm78m7.jpg"
    ],
    "chain": true,
    "lon": 136.89986,
    "lat": 35.15953,
    "id": "pmuwvmaytagf"
  },
  {
    "region": "chubu",
    "name": "カレーのあさくま 大須店",
    "address": "愛知県名古屋市中区大須2-29-9",
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DTfnGtKEblF/?img_index=5&stkn=Nmp4MzNpd2l4dnk2",
        "date": "2026-01-14"
      }
    ],
    "photos": [
      "pmuwvsmhk8.jpg"
    ],
    "chain": true,
    "lon": 136.90054,
    "lat": 35.15888,
    "id": "pmuwvso4u9k3"
  },
  {
    "region": "kanto",
    "name": "ディズニーランド",
    "address": "千葉県浦安市舞浜1-1",
    "works": [
      "チョコレートチュロス",
      "ポップコーン レギュラーボックス",
      "チョコレートとバニラムースのタルト"
    ],
    "note": "※クリスマス限定フード有",
    "sources": [
      {
        "name": "X(1)",
        "url": "https://x.com/chii_nyan02/status/1996214178479231036?s=46",
        "date": "2025-12-03"
      },
      {
        "name": "X(2)",
        "url": "https://x.com/chii_nyan02/status/1998524175909270011?s=46",
        "date": "2025-12-10"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DSP0LXAEaxM/?img_index=6&stkn=Nnh5cjdyOGh5eDIy",
        "date": "2025-12-14"
      },
      {
        "name": "Instagram(リール)",
        "url": "https://www.instagram.com/reel/DSaFWbJkTsD/?stkn=OWw3dTRlb2Z0MDNz",
        "date": "2025-12-18"
      }
    ],
    "photos": [
      "pmuwy494z0.jpg",
      "pmuwy495i1.jpg",
      "pmuwy49622.jpg",
      "pmuwy496m3.jpg",
      "pmuwy49764.jpg",
      "pmuwy497r5.jpg",
      "pmuwy498b6.jpg",
      "pmuwy498s7.jpg",
      "pmuwy49998.jpg"
    ],
    "lon": 139.87433,
    "lat": 35.63126,
    "id": "pmuwy4ay8epu"
  },
  {
    "region": "kanto",
    "name": "浅草うなな",
    "address": "東京都台東区浅草2-7-21",
    "works": [
      "鰻焼おにぎり"
    ],
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2042580872726221296?s=46",
        "date": "2026-04-10"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DXRnnu0kfqz/?stkn=aGJjZGhhMnB5YWNo",
        "date": "2026-04-18"
      }
    ],
    "photos": [
      "pmuwydxbs10.jpg"
    ],
    "lon": 139.79437,
    "lat": 35.7152,
    "id": "pmuwye1dfjrz"
  },
  {
    "region": "kanto",
    "name": "くろげ 浅草雷門店",
    "address": "東京都台東区浅草1-20-2",
    "works": [
      "雷門チーズメンチ"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DXRnnu0kfqz/?stkn=aGJjZGhhMnB5YWNo",
        "date": "2026-04-18"
      },
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2046724538956927248?s=46",
        "date": "2026-04-22"
      }
    ],
    "photos": [
      "pmuwyjqbs11.jpg",
      "pmuwyjqc812.jpg",
      "pmuwymtrj13.jpg"
    ],
    "thumb": "pmuwyjqc812.jpg",
    "chain": true,
    "lon": 139.79628,
    "lat": 35.71154,
    "id": "pmuwyjsd2gk2"
  },
  {
    "region": "kanto",
    "name": "浅草蛸たこ×ころも兄弟",
    "address": "東京都台東区浅草1-32-11 九十一ビル 1F",
    "works": [
      "賞味期限3分のたこせん"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DXRnnu0kfqz/?stkn=aGJjZGhhMnB5YWNo",
        "date": "2026-04-18"
      },
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2057953537490088141?s=46",
        "date": "2026-05-23"
      }
    ],
    "photos": [
      "pmuwys3dk14.jpg",
      "pmuwys3dv15.jpg"
    ],
    "lon": 139.79707,
    "lat": 35.71227,
    "id": "pmuwys4x5eke"
  },
  {
    "region": "kanto",
    "name": "浅草花月堂 雷門店",
    "address": "東京都台東区浅草1-18-11 1F~2F",
    "works": [
      "元祖ジャンボめろんぱん"
    ],
    "note": "※和傘の壁は雷門店限定",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DXRnnu0kfqz/?img_index=5&stkn=aGJjZGhhMnB5YWNo",
        "date": "2026-04-18"
      }
    ],
    "photos": [
      "pmuwz3pu216.jpg"
    ],
    "chain": true,
    "lon": 139.79597,
    "lat": 35.71154,
    "id": "pmuwz4oc0s0v"
  },
  {
    "region": "kanto",
    "name": "HAND BAKES ルミネ新宿店",
    "address": "東京都新宿区新宿3-38-2 ルミネ新宿LUMINE2 3F",
    "works": [
      "レアチーズチョコオレオタルト",
      "（ラテ系）"
    ],
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2038389623320432670?s=46",
        "date": "2026-03-30"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DWi7vSike_H/?stkn=MTZmanM1MWgyOHZuZA==",
        "date": "2026-03-31"
      }
    ],
    "photos": [
      "pmuwzneef1.jpg",
      "pmux2me7s0.jpg",
      "pmux2me861.jpg"
    ],
    "chain": true,
    "lon": 139.70094,
    "lat": 35.6918,
    "id": "pmuwzpzaqamm"
  },
  {
    "region": "kanto",
    "name": "マリオンクレープ 北千住マルイ店",
    "address": "東京都足立区千住3-92 北千住マルイ 1F",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2045133933436961186?s=46",
        "date": "2026-04-17"
      }
    ],
    "photos": [
      "pmux08yh10.jpg",
      "pmux08yh81.jpg"
    ],
    "thumb": "pmux08yh81.jpg",
    "chain": true,
    "lon": 139.80456,
    "lat": 35.75108,
    "id": "pmux093fobgu"
  },
  {
    "region": "kyushu-okinawa",
    "name": "ジャングリア沖縄",
    "address": "沖縄県国頭郡今帰仁村字呉我山553番地1",
    "note": "",
    "sources": [
      {
        "name": "TikTok(エイアイカ)",
        "url": "https://vt.tiktok.com/ZSb4qh4ca/",
        "date": "2026-01-11"
      },
      {
        "name": "Instagram(立花玲奈)",
        "url": "https://www.instagram.com/p/DZXWzVVE7PJ/?img_index=5&stkn=MWZ5YWtqMGpodXMxMQ==",
        "date": "2026-06-09"
      }
    ],
    "photos": [
      "pmux0pg8k3.jpg",
      "pmux0pg914.jpg"
    ],
    "lon": 127.96958,
    "lat": 26.64299,
    "id": "pmux0ru7upk8"
  },
  {
    "region": "kyushu-okinawa",
    "name": "瀬長島ウミカジテラス",
    "address": "沖縄県豊見城市瀬長174-6",
    "note": "",
    "sources": [
      {
        "name": "X(1)",
        "url": "https://x.com/chii_nyan02/status/2005611860436119817?s=46",
        "date": "2025-12-29"
      },
      {
        "name": "X(2)",
        "url": "https://x.com/chii_nyan02/status/2011931539853263027?s=46",
        "date": "2026-01-16"
      }
    ],
    "photos": [
      "pmux0wg515.jpg",
      "pmux1lb3d15.jpg"
    ],
    "thumb": "pmux1lb3d15.jpg",
    "lon": 127.64978,
    "lat": 26.17591,
    "id": "pmux0wzkze3i"
  },
  {
    "region": "kanto",
    "name": "nui box",
    "address": "東京都新宿区新宿1-12-8",
    "works": [
      "深煎りほうじ茶ラテ"
    ],
    "note": "",
    "sources": [
      {
        "name": "X(1)",
        "url": "https://x.com/chii_nyan02/status/2014105274869518529?s=46",
        "date": "2026-01-22"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DT5cfMukY-A/?stkn=ZWhvaGFlYXE5cjI1",
        "date": "2026-01-24"
      },
      {
        "name": "X(2)",
        "url": "https://x.com/chii_nyan02/status/2020626445564096817?s=46",
        "date": "2026-02-09"
      }
    ],
    "photos": [
      "pmux1dfpl6.jpg",
      "pmux1dfpx7.jpg",
      "pmux1dfqd8.jpg",
      "pmux1dfqt9.jpg",
      "pmux1dfr910.jpg"
    ],
    "lon": 139.71207,
    "lat": 35.68897,
    "id": "pmux1ds1c6gp"
  },
  {
    "region": "other",
    "name": "スガキヤ",
    "address": "",
    "works": [
      "ソフトクリーム"
    ],
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2013238580991160556?s=46",
        "date": "2026-01-19"
      }
    ],
    "photos": [
      "pmux1itb411.jpg"
    ],
    "chain": true,
    "pref": [
      "神奈川",
      "岐阜",
      "静岡",
      "愛知",
      "三重",
      "滋賀",
      "京都",
      "大阪",
      "兵庫",
      "奈良"
    ],
    "id": "pmux1iunm9w8"
  },
  {
    "region": "kanto",
    "name": "LINO cafe&bar",
    "address": "東京都新宿区歌舞伎町2-38-2",
    "works": [
      "キャラメルナッツラテ"
    ],
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2033538815428878567?s=46",
        "date": "2026-10-16"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DWi7vSike_H/?stkn=MTZmanM1MWgyOHZuZA==",
        "date": "2026-03-31"
      }
    ],
    "photos": [
      "pmux2rbmp3.jpg",
      "pmux2rbmb2.jpg"
    ],
    "thumb": "pmux2rbmb2.jpg",
    "lon": 139.70201,
    "lat": 35.69623,
    "id": "pmux2unm3aih"
  },
  {
    "region": "kanto",
    "name": "東京ドーム",
    "address": "東京都文京区後楽1-3-61",
    "note": "",
    "sources": [
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSb4G6ENu/",
        "date": "2025-11-15"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DRe5R8HEXjx/?img_index=5&stkn=MWRtNDVjaWN1czFmZQ==",
        "date": "2025-11-25"
      },
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/1993308870203392230?s=46",
        "date": "2025-11-25"
      }
    ],
    "photos": [
      "pmux37iil4.jpg",
      "pmux37ijn5.jpg",
      "pmux37iks6.jpg",
      "pmux37ils7.jpg",
      "pmux37imv8.jpg",
      "pmux37inx9.jpg",
      "pmux37io510.jpg"
    ],
    "thumb": "pmux37ils7.jpg",
    "lon": 139.75215,
    "lat": 35.70315,
    "id": "pmux382kiepv"
  },
  {
    "region": "kanto",
    "name": "ZOZOマリンスタジアム",
    "address": "千葉県千葉市美浜区美浜1",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2040045921833226670?s=46",
        "date": "2026-04-03"
      }
    ],
    "photos": [
      "pmux3dgaj12.jpg",
      "pmux3dgau13.jpg",
      "pmux3dgb814.jpg"
    ],
    "lon": 140.03113,
    "lat": 35.64552,
    "id": "pmux3dkrbpaj"
  },
  {
    "region": "chugoku-shikoku",
    "name": "厳島神社",
    "address": "広島県廿日市市宮島町1-1",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2052516807286849806?s=46",
        "date": "2026-05-08"
      }
    ],
    "photos": [
      "pmux3feis15.jpg"
    ],
    "lon": 132.30998,
    "lat": 34.27261,
    "id": "pmux3fvrlo8g"
  },
  {
    "region": "chugoku-shikoku",
    "name": "広島牡蠣と和牛ラーメン 衝青天",
    "address": "広島県広島市中区流川町8-4 日宝ミンクスビル 1F",
    "works": [
      "広島牡蠣塩ラーメン"
    ],
    "note": "※写真は広島ふるさとまつり出演時",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2009941241962869153?s=46",
        "date": "2026-01-10"
      }
    ],
    "photos": [
      "pmux3psbz16.jpg"
    ],
    "lon": 132.46455,
    "lat": 34.38918,
    "id": "pmux3qcm8m5a"
  },
  {
    "region": "kanto",
    "name": "渋谷ハチ公口自転車駐車場",
    "address": "東京都渋谷区渋谷1-26・27先",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2039100490966094063?s=46",
        "date": "2026-04-01"
      }
    ],
    "photos": [
      "pmux3vws621.jpg",
      "pmux3vwsc22.jpg"
    ],
    "thumb": "pmux3vwsc22.jpg",
    "lon": 139.70172,
    "lat": 35.66177,
    "id": "pmux3w92upuh"
  }
];
