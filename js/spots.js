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
    "work": "桃レアチーズティー（かき氷）",
    "note": "",
    "srcName": "Instagram",
    "srcUrl": "https://www.instagram.com/p/DcbOS-5kwRM/?img_index=5&stkn=MXB1ZG9lcmw4dmJybg==",
    "postDate": "2026-08-24",
    "lon": 139.69862,
    "lat": 35.73051,
    "photos": [
      "pmuwns7oi0.jpg"
    ],
    "id": "pmuwnsbjh1zi"
  },
  {
    "region": "kanto",
    "name": "cafe The SUN LIVES HERE",
    "address": "東京都世田谷区三軒茶屋1丁目27-33",
    "work": "とうもろこし × チーズケーキ（かき氷）",
    "note": "",
    "srcName": "Instagram",
    "srcUrl": "https://www.instagram.com/p/DcbOS-5kwRM/?img_index=5&stkn=MXB1ZG9lcmw4dmJybg==",
    "postDate": "2026-08-24",
    "lon": 139.67227,
    "lat": 35.6407,
    "photos": [
      "pmuwnur261.jpg",
      "pmuwnur2k2.jpg"
    ],
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
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DbiqFJdE2jT/?img_index=2&stkn=MWt3YXY0NGd4ZzRzdA==",
        "date": "2026-08-02"
      }
    ],
    "photos": [
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
    "work": "",
    "note": "",
    "srcName": "X",
    "srcUrl": "https://x.com/chii_nyan02/status/2102531776065486886?s=46",
    "postDate": "2026-09-23",
    "photos": [
      "pmuwovh7q0.jpg"
    ],
    "chain": true,
    "id": "pmuwovi9r44u"
  },
  {
    "region": "other",
    "name": "楊国福",
    "address": "",
    "work": "",
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
        "name": "Instagram",
        "url": "https://www.instagram.com/reel/Ddg0X6mTc2d/?stkn=djh1OGRqdGFxc2Nq",
        "date": "2026-09-20"
      }
    ],
    "photos": [
      "pmuwpc8j30.jpg",
      "pmuwpc8jk1.jpg"
    ],
    "chain": true,
    "id": "pmuwpd926bfm"
  },
  {
    "region": "kanto",
    "name": "café paro paro",
    "address": "東京都渋谷区神宮前2丁目6-6 秀和外苑レジデンス 104",
    "work": "あんこバター（ベーグル）",
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DYHrnl-kR6q/?img_index=4&stkn=MXh6a3hqcjYzbHV3cQ==",
        "date": "2026-05-09"
      }
    ],
    "photos": [
      "pmuwpmimj2.jpg",
      "pmuwpmimx3.jpg",
      "pmuwpmine4.jpg"
    ],
    "lon": 139.71223,
    "lat": 35.6725,
    "id": "pmuwpmjt9f1s"
  },
  {
    "region": "chubu",
    "name": "岐阜タンメン",
    "address": "",
    "work": "",
    "note": "",
    "sources": [
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSb4jLkrB/",
        "date": "2026-06-16"
      },
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2098186053849063632?s=46",
        "date": "2026-09-11"
      }
    ],
    "photos": [
      "pmuwqlvei0.jpg",
      "pmuwqlvev1.jpg"
    ],
    "chain": true,
    "id": "pmuwqlwurqfn"
  },
  {
    "region": "other",
    "name": "I'm donut？",
    "address": "",
    "work": "抹茶ラテ",
    "note": "※期間限定コラボカフェ",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DY4fuVMk-z8/?img_index=4&stkn=dTA4Y3poa2xrZzE4",
        "date": "2026-05-28"
      }
    ],
    "photos": [
      "pmuwr32802.jpg",
      "pmuwr328g3.jpg",
      "pmuwr328t4.jpg",
      "pmuwr32995.jpg"
    ],
    "chain": true,
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
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DTQNAVTkYXH/?img_index=4&stkn=MWZkM3FybWRsdHNhOQ==",
        "date": "2026-01-08"
      }
    ],
    "photos": [
      "pmuwrdgr39.jpg",
      "pmuwrdgrk10.jpg"
    ],
    "lon": 137.16518,
    "lat": 35.34062,
    "id": "pmuwrdhxxobz"
  }
];
