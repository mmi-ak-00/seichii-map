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
    "name": "Muffin&Bowls cafe CUPS 表参道店",
    "address": "東京都渋谷区神宮前3-5-1",
    "works": [
      "いちごタルト（かき氷）"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/Db8VwbzEwLD/?stkn=MTJrMXI5bjd4d3Bzbw==",
        "date": "2026-08-12"
      }
    ],
    "photos": [
      "pmuwmbeen0.jpg",
      "pmuwmbef61.jpg",
      "pmuwmbefp2.jpg"
    ],
    "tabelog": "https://s.tabelog.com/tokyo/A1306/A130602/13320295/",
    "insta": "https://www.instagram.com/cups_omotesando?stkn=MXVkZ3A1dXo0MHQ0Mg==",
    "chain": true,
    "branches": [
      {
        "id": "bmv2s2qqbr4v",
        "name": "町田本店",
        "address": "東京都町田市原町田3-1-4 町田ターミナルプラザ2F",
        "lon": 139.44917,
        "lat": 35.54055
      }
    ],
    "chainName": "Muffin&Bowls cafe CUPS",
    "branch": "表参道店",
    "more": [
      "東京"
    ],
    "lon": 139.7126,
    "lat": 35.669,
    "id": "nedd0ji"
  },
  {
    "region": "chubu",
    "name": "こふり",
    "address": "岐阜県岐阜市鏡島南4-5-5",
    "works": [
      "ドバイチョコ（かき氷）"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/Dc8biwEkwcl/?stkn=MTUxc3piMzV2MmJ5OA==",
        "date": "2026-09-06"
      }
    ],
    "photos": [
      "pmuwmk76l0.jpg",
      "pmuwmk76z1.jpg",
      "pmuwmk77d2.jpg"
    ],
    "tabelog": "https://s.tabelog.com/gifu/A2101/A210101/21025035/",
    "insta": "https://www.instagram.com/6kofuri?stkn=MTdxbGdocGFkcWtpeQ==",
    "lon": 136.71194,
    "lat": 35.40206,
    "id": "pmuwmkl318wn"
  },
  {
    "region": "chubu",
    "name": "伊奈波神社",
    "address": "岐阜県岐阜市伊奈波通1丁目1",
    "note": "",
    "sources": [
      {
        "name": "YouTube(エイアイカ)",
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
    "hp": "https://www.inabasan.com/",
    "insta": "https://www.instagram.com/inaba_jinja?stkn=cTNnNzRib2U1Z3E1",
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
    "tabelog": "https://s.tabelog.com/tokyo/A1322/A132202/13271809/",
    "insta": "https://www.instagram.com/hyoren_koori?stkn=aGthNXJocWxqbXhm",
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
      "ラテ"
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
    "tabelog": "https://s.tabelog.com/tokyo/A1317/A131706/13145455/",
    "hp": "https://www.cafethesunliveshere.com/",
    "insta": "https://www.instagram.com/cafethesunliveshere?stkn=NHU5MXNoNnFrMGc=",
    "lon": 139.67227,
    "lat": 35.6407,
    "id": "pmuwnuspfzhm"
  },
  {
    "region": "kanto",
    "name": "IDOL",
    "address": "東京都港区南青山5-11-9 レキシントン青山ビル B1F",
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/Db8VwbzEwLD/?img_index=5&stkn=MTJrMXI5bjd4d3Bzbw==",
        "date": "2026-08-12"
      }
    ],
    "photos": [
      "pmuwo3q6r3.jpg"
    ],
    "tabelog": "https://s.tabelog.com/tokyo/A1306/A130602/13145525/",
    "hp": "https://restaurant.idoltokyo.jp/omotesando/",
    "insta": "https://www.instagram.com/idoltokyo?stkn=cW1qNHBmcmhmYzRj",
    "lon": 139.71199,
    "lat": 35.66189,
    "id": "pmuwo3rihoqe"
  },
  {
    "region": "kanto",
    "name": "Cafe Lumiere",
    "address": "東京都武蔵野市吉祥寺南町1-2-2 東山ビル4F",
    "works": [
      "Lumiere特製　焼き氷（かき氷）"
    ],
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
    "tabelog": "https://s.tabelog.com/tokyo/A1320/A132001/13147519/",
    "hp": "https://lumiere-kichijyoji.com/",
    "insta": "https://www.instagram.com/cafe_lumiere_kichijyoji?stkn=OTRlanNiaHg2cHZh",
    "lon": 139.58012,
    "lat": 35.70232,
    "id": "pmuwob7qo2qr"
  },
  {
    "region": "chubu",
    "name": "珈琲と紅茶 あるてあ",
    "address": "岐阜県岐阜市鵜川町5-3",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2095282580493136349?s=46",
        "date": "2026-09-03"
      }
    ],
    "photos": [
      "pmuwoh2p90.jpg"
    ],
    "tabelog": "https://s.tabelog.com/gifu/A2101/A210101/21008592/",
    "insta": "https://www.instagram.com/alutea.gifu?stkn=MW80YWVqdXZyeTZldg==",
    "lon": 136.77054,
    "lat": 35.44238,
    "id": "pmuwoh4b5y7t"
  },
  {
    "region": "kanto",
    "name": "李暁七マーラータン 渋谷サクラステージ店",
    "address": "東京都渋谷区桜丘町3-4 SAKURAテラス106",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2102531776065486886?s=46",
        "date": "2026-09-23"
      }
    ],
    "photos": [
      "pmuzprxqf0.jpg"
    ],
    "tabelog": "https://s.tabelog.com/tokyo/A1303/A130301/13314698/",
    "hp": "https://www.maratanjp.com/",
    "insta": "https://www.instagram.com/rishouchi_maratan?stkn=MTFjYmM3cXAxenZ5MQ==",
    "chain": true,
    "branches": [
      {
        "id": "bmv2s7vexmz9",
        "name": "新大久保店",
        "address": "東京都新宿区百人町1-11-27 1F"
      },
      {
        "id": "bmv2s8sjzvz1",
        "name": "西武新宿店",
        "address": "東京都新宿区百人町1-5-1 1F",
        "lon": 139.70119,
        "lat": 35.69822
      },
      {
        "id": "bmv2s96uncc0",
        "name": "歌舞伎町店",
        "address": "東京都新宿区歌舞伎町1-22-6 富士ビル 1F",
        "lon": 139.70088,
        "lat": 35.695
      },
      {
        "id": "bmv2sa008dsr",
        "name": "高田馬場店",
        "address": "東京都新宿区高田馬場2-14-9 アティレビル2階",
        "lon": 139.7061,
        "lat": 35.71291
      },
      {
        "id": "bmv2sa1i73o0",
        "name": "上野店",
        "address": "東京都台東区上野4-2-5 鈴木ビル 1F・2F",
        "lon": 139.77394,
        "lat": 35.70836
      },
      {
        "id": "bmv2saca7fax",
        "name": "神保町店",
        "address": "東京都千代田区神田神保町2-26-1 プラザ神保町白山通ビル 1F",
        "lon": 139.75691,
        "lat": 35.69795
      },
      {
        "id": "bmv2sareld7x",
        "name": "半蔵門店",
        "address": "東京都千代田区麹町 1-5-3 麹町MCM 1F",
        "lon": 139.74214,
        "lat": 35.68357
      },
      {
        "id": "bmv2sbdb50e1",
        "name": "本郷三丁目店",
        "address": "東京都文京区本郷3-34-4 1F",
        "lon": 139.76077,
        "lat": 35.70729
      },
      {
        "id": "bmv2sc2pt5uy",
        "name": "田町店",
        "address": "東京都港区芝 5-34-7田町センタービル B1F",
        "lon": 139.7467,
        "lat": 35.64587
      },
      {
        "id": "bmv2scg9n9qv",
        "name": "池袋北口店",
        "address": "東京都豊島区西池袋1-41-6 第二大谷ビル 1F",
        "lon": 139.71036,
        "lat": 35.73304
      },
      {
        "id": "bmv2scvlzx2l",
        "name": "上池袋店",
        "address": "東京都豊島区上池袋1-25-2 コスモス26 1F",
        "lon": 139.72049,
        "lat": 35.73679
      },
      {
        "id": "bmv2sdauz6wv",
        "name": "新小岩店",
        "address": "東京都葛飾区新小岩1-37-7 1F",
        "lon": 139.86061,
        "lat": 35.71461
      },
      {
        "id": "bmv2sdpombo8",
        "name": "王子店",
        "address": "東京都北区王子1-13-14 オオタケビル 1F",
        "lon": 139.73708,
        "lat": 35.75562
      },
      {
        "id": "bmv2se24pj17",
        "name": "十条店",
        "address": "東京都北区上十条2-27-1 J＆MALL 1階",
        "lon": 139.72206,
        "lat": 35.75957
      },
      {
        "id": "bmv2seg71wd2",
        "name": "浮間舟渡店",
        "address": "東京都板橋区舟渡1-15-15 1F",
        "lon": 139.69005,
        "lat": 35.79298
      },
      {
        "id": "bmv2sfj4xbzd",
        "name": "日吉店",
        "address": "神奈川県横浜市港北区日吉本町1-24-1 奥村ビル",
        "lon": 139.64569,
        "lat": 35.55288
      },
      {
        "id": "bmv2sfxbp4rb",
        "name": "川越店",
        "address": "埼玉県川越市脇田町5-2 彩和ビル 2F",
        "lon": 139.48202,
        "lat": 35.90958
      },
      {
        "id": "bmv2sgcft3lp",
        "name": "川口店",
        "address": "埼玉県川口市本町4-5-26 1F"
      },
      {
        "id": "bmv2sgpndkyc",
        "name": "大阪店",
        "address": "大阪府大阪市中央区千日前1-9-16 1F",
        "lon": 135.50319,
        "lat": 34.66754
      },
      {
        "id": "bmv2swenq3by",
        "name": "富山飯野店",
        "address": "富山県富山市新屋 3-6 1F",
        "lon": 137.24776,
        "lat": 36.71851
      },
      {
        "id": "bmv2sh1813hr",
        "name": "ファボーレ店",
        "address": "富山県富山市婦中町下轡田165-1 ファボーレ1F",
        "lon": 137.17131,
        "lat": 36.66263
      }
    ],
    "chainName": "李暁七マーラータン",
    "branch": "渋谷サクラステージ店",
    "more": [
      "埼玉",
      "東京",
      "神奈川",
      "富山",
      "大阪"
    ],
    "lon": 139.70247,
    "lat": 35.65661,
    "id": "pmuwovi9r44u"
  },
  {
    "region": "kanto",
    "name": "楊国福 東京新宿店",
    "address": "東京都新宿区歌舞伎町1-11-6 川田ビル 1F~4F",
    "works": [
      "牛骨スープ",
      "しいたけ",
      "カニ団子",
      "えび団子",
      "プンモジャ",
      "じゃがいも",
      "魚団子"
    ],
    "note": "※メニューは動画内で紹介していたもののみ",
    "sources": [
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSb421W9s/",
        "date": "2026-08-10"
      },
      {
        "name": "TikTok(エイアイ過多)",
        "url": "https://vt.tiktok.com/ZSb4WVXRC/",
        "date": "2026-08-12"
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
    "tabelog": "https://s.tabelog.com/tokyo/A1304/A130401/13297112/",
    "hp": "https://www.daitengen-jp.com/",
    "insta": "https://www.instagram.com/ygf_shinjuku?stkn=cnE0d3Q1bDRmcjhk",
    "chain": true,
    "branches": [
      {
        "id": "bmv2t4zhw27k",
        "name": "東京池袋店",
        "address": "東京都豊島区東池袋1-13-12 JETビル1F~4F",
        "lon": 139.71533,
        "lat": 35.72944
      },
      {
        "id": "bmv2t5ise5e1",
        "name": "東京上野店",
        "address": "東京都台東区上野6-3-14 中谷ビル1F~3F",
        "lon": 139.77533,
        "lat": 35.70813
      },
      {
        "id": "bmv2t5y2och9",
        "name": "東京高田馬場店",
        "address": "東京都新宿区高田馬場2-14-8 NTビル1F",
        "lon": 139.70624,
        "lat": 35.71283
      },
      {
        "id": "bmv2t661fpij",
        "name": "東京大久保店",
        "address": "東京都新宿区百人町2-21-2 牧田ビル1F",
        "lon": 139.69742,
        "lat": 35.70176
      },
      {
        "id": "bmv2t6rgt05y",
        "name": "東京渋谷店",
        "address": "東京都渋谷区宇田川町25-3 プリンスビル1F",
        "lon": 139.69919,
        "lat": 35.66029
      },
      {
        "id": "bmv2t74v2pfs",
        "name": "東京銀座店",
        "address": "東京都中央区銀座5-11-13 幸田ビルB1F~1F",
        "lon": 139.76553,
        "lat": 35.66962
      },
      {
        "id": "bmv2t7hzdf8x",
        "name": "東京下北沢店",
        "address": "東京都世田谷区北沢2-11-5 月村ビル1F",
        "lon": 139.66798,
        "lat": 35.66118
      },
      {
        "id": "bmv2t7wmxdaq",
        "name": "東京吉祥寺店",
        "address": "東京都武蔵野市吉祥寺本町1-14-2 SRA吉祥寺ビル1F~3F",
        "lon": 139.58031,
        "lat": 35.70457
      },
      {
        "id": "bmv2t89iwxfg",
        "name": "東京神田店",
        "address": "東京都千代田区鍛冶町2-7-2 神田駅前ビル",
        "lon": 139.77164,
        "lat": 35.6923
      },
      {
        "id": "bmv2t8lm1w60",
        "name": "東京錦糸町店",
        "address": "東京都墨田区江東橋3-9-10 錦糸町マルイ 7F",
        "lon": 139.81374,
        "lat": 35.69535
      },
      {
        "id": "bmv2ta81nv0t",
        "name": "東京赤坂店",
        "address": "東京都港区赤坂3-12-3コンチネンタル赤坂Vビル1F",
        "lon": 139.73785,
        "lat": 35.6737
      },
      {
        "id": "bmv2tahorrhp",
        "name": "東京後楽園店",
        "address": "東京都文京区小石川1-3-2 文京ガーデンゲートタワー107",
        "lon": 139.75296,
        "lat": 35.70909
      },
      {
        "id": "bmv2tb5xqbnt",
        "name": "東京浅草橋店",
        "address": "東京都台東区浅草橋1-18-10 サントミ浅草橋駅前ビル1階~2階",
        "lon": 139.78624,
        "lat": 35.69761
      },
      {
        "id": "bmv2tbl1z3pt",
        "name": "東京上野駅前店",
        "address": "東京都台東区上野2-7-13 1F~5F",
        "lon": 139.7731,
        "lat": 35.70903
      },
      {
        "id": "bmv2tc2r97st",
        "name": "東京新宿駅前店",
        "address": "東京都渋谷区代々木2-10-10 TRN新宿プラザ B1F~1F",
        "lon": 139.69795,
        "lat": 35.688
      },
      {
        "id": "bmv2tcfymd21",
        "name": "東京中野店",
        "address": "東京都中野区中野5-67-11 共同ビル1F~4F",
        "lon": 139.66559,
        "lat": 35.70813
      },
      {
        "id": "bmv2tcvdwv31",
        "name": "横浜中華街店",
        "address": "神奈川県横浜市中区山下町218-4 石田ビル1F~3F",
        "lon": 139.64395,
        "lat": 35.44247
      },
      {
        "id": "bmv2tda4wga8",
        "name": "厚木本厚木店",
        "address": "神奈川県厚木市中町2-1-18 TRUNK本厚木1F",
        "lon": 139.36473,
        "lat": 35.44005
      },
      {
        "id": "bmv2tdmnb3by",
        "name": "さいたま大宮店",
        "address": "埼玉県さいたま市大宮区仲町1-33-6 岩浏ビル1F~2F",
        "lon": 139.62602,
        "lat": 35.90538
      },
      {
        "id": "bmv2tdu5800b",
        "name": "大阪心斎橋店",
        "address": "大阪府大阪市中央区心斎橋筋2-6-16 1F",
        "lon": 135.50072,
        "lat": 34.67034
      },
      {
        "id": "bmv2tehi28rz",
        "name": "大阪難波店",
        "address": "大阪府大阪市中央区難波 3-6-6 1F~2F",
        "lon": 135.50095,
        "lat": 34.66635
      },
      {
        "id": "bmv2tf1kyqzv",
        "name": "大阪日本橋店",
        "address": "大阪府大阪市中央区日本橋1-5-14 1F~4F",
        "lon": 135.50624,
        "lat": 34.66745
      },
      {
        "id": "bmv2tfgl8qo1",
        "name": "京都河原町店",
        "address": "京都府京都市中京区奈良屋町300 ビル1F~2F",
        "lon": 135.76942,
        "lat": 35.00602
      },
      {
        "id": "bmv2tfubsee5",
        "name": "神戸元町店",
        "address": "兵庫県神戸市中央区元町通1丁目10-3 1F~3F",
        "lon": 135.18829,
        "lat": 34.68872
      },
      {
        "id": "bmv2tndfyf9m",
        "name": "福岡天神店",
        "address": "福岡市中央区渡辺通5-26-4 GALEND.BLD01 1F~3F",
        "lon": 130.40269,
        "lat": 33.58857
      }
    ],
    "chainName": "楊国福",
    "branch": "東京新宿店",
    "more": [
      "埼玉",
      "東京",
      "神奈川",
      "京都",
      "大阪",
      "兵庫",
      "福岡"
    ],
    "lon": 139.70274,
    "lat": 35.69514,
    "id": "pmuwpd926bfm"
  },
  {
    "region": "kanto",
    "name": "café paro paro",
    "address": "東京都渋谷区神宮前2丁目6-6 秀和外苑レジデンス 104",
    "works": [
      "あんこバター（ベーグル）",
      "ラテ"
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
    "tabelog": "https://s.tabelog.com/tokyo/A1306/A130603/13311802/",
    "insta": "https://www.instagram.com/cafeparoparo?stkn=Z2JwYndvamV3bGJw",
    "lon": 139.71223,
    "lat": 35.6725,
    "id": "pmuwpmjt9f1s"
  },
  {
    "region": "chubu",
    "name": "岐阜タンメン",
    "address": "",
    "works": [
      "岐阜タンメン",
      "半チャーハン"
    ],
    "note": "※食べログのリンクは岐阜本店を引用",
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
    "tabelog": "https://s.tabelog.com/gifu/A2101/A210101/21010010/",
    "hp": "https://gifu-tanmen.com/",
    "insta": "https://www.instagram.com/gifu_tanmen?stkn=MXdlampicGNuOWVpbw==",
    "chain": true,
    "branches": [
      {
        "id": "bmv78ib162fo",
        "name": "岐阜本店",
        "address": "岐阜県岐阜市手力町38-1",
        "lon": 136.80203,
        "lat": 35.39109
      },
      {
        "id": "bmv78iqn8yil",
        "name": "大垣店",
        "address": "岐阜県大垣市長沢町5-27",
        "lon": 136.64037,
        "lat": 35.35458
      },
      {
        "id": "bmv78jb05qd4",
        "name": "多治見店",
        "address": "岐阜県多治見市宝町3丁目61",
        "lon": 137.10855,
        "lat": 35.33952
      },
      {
        "id": "bmv78kgnzmgt",
        "name": "長良店",
        "address": "岐阜県岐阜市下土居3丁目2番地17号",
        "lon": 136.7565,
        "lat": 35.45436
      },
      {
        "id": "bmv78ktgjilo",
        "name": "21号茜部店",
        "address": "岐阜県岐阜市茜部菱野１丁目26",
        "lon": 136.75044,
        "lat": 35.388
      },
      {
        "id": "bmv78ldtle8b",
        "name": "各務原店",
        "address": "岐阜県各務原市鵜沼川崎町2-224",
        "lon": 136.88115,
        "lat": 35.40259
      },
      {
        "id": "bmv78lsoo8rb",
        "name": "美濃加茂店",
        "address": "岐阜県美濃加茂市蜂屋町上蜂屋字石塚3501番21",
        "lon": 137.01871,
        "lat": 35.47522
      },
      {
        "id": "bmv78m6lhfod",
        "name": "関店",
        "address": "岐阜県関市小屋名字神明前1362番4",
        "lon": 136.87009,
        "lat": 35.48241
      },
      {
        "id": "bmv78miw2as9",
        "name": "可児店",
        "address": "岐阜県可児市広見5丁目43",
        "lon": 137.06531,
        "lat": 35.42535
      },
      {
        "id": "bmv78mzsxzi8",
        "name": "一宮インター店",
        "address": "愛知県一宮市伝法寺7丁目1-2",
        "lon": 136.8403,
        "lat": 35.2627
      },
      {
        "id": "bmv78nhqlik0",
        "name": "小牧店",
        "address": "愛知県小牧市下小針天神3-8",
        "lon": 136.90776,
        "lat": 35.26943
      },
      {
        "id": "bmv78ntvsl0i",
        "name": "一宮インター2号店",
        "address": "愛知県一宮市伝法寺9丁目12-11",
        "lon": 136.84242,
        "lat": 35.25974
      },
      {
        "id": "bmv78odeqayz",
        "name": "守山竜泉寺店",
        "address": "愛知県名古屋市守山区吉根1丁目203",
        "lon": 136.9975,
        "lat": 35.23195
      },
      {
        "id": "bmv78or80dza",
        "name": "長久手店",
        "address": "愛知県長久手市砂子110番",
        "lon": 137.04488,
        "lat": 35.17076
      },
      {
        "id": "bmv78p5cu93b",
        "name": "東海店",
        "address": "愛知県東海市荒尾町祢崎105",
        "lon": 136.91406,
        "lat": 35.02925
      },
      {
        "id": "bmv78phc1b4y",
        "name": "港店",
        "address": "愛知県名古屋市港区春田野三丁目1101番地",
        "lon": 136.81451,
        "lat": 35.11274
      },
      {
        "id": "bmv78psrg3j9",
        "name": "天白店",
        "address": "愛知県名古屋市天白区池場3丁目1912番",
        "lon": 136.98463,
        "lat": 35.12095
      },
      {
        "id": "bmv78q58iwif",
        "name": "豊田店",
        "address": "愛知県豊田市逢妻町四丁目59-1",
        "lon": 137.14004,
        "lat": 35.10591
      },
      {
        "id": "bmv78qhqjdkc",
        "name": "岡崎店",
        "address": "愛知県岡崎市井田南町2-1",
        "lon": 137.16058,
        "lat": 34.9758
      },
      {
        "id": "bmv78qt4rqrm",
        "name": "豊田2号店",
        "address": "愛知県豊田市四郷町森前南28-1",
        "lon": 137.16426,
        "lat": 35.12229
      },
      {
        "id": "bmv78r6gu4dv",
        "name": "豊橋店",
        "address": "愛知県豊橋市南栄町字蟹原21-22",
        "lon": 137.38339,
        "lat": 34.73772
      },
      {
        "id": "bmv78rl37jvd",
        "name": "名古屋中川店",
        "address": "名古屋市中川区篠原橋通三丁目2番",
        "lon": 136.86621,
        "lat": 35.14077
      },
      {
        "id": "bmv78s5bzmtm",
        "name": "松本店",
        "address": "長野県松本市筑摩1丁目11番13号",
        "lon": 137.97967,
        "lat": 36.22305
      },
      {
        "id": "bmv78slqqbyq",
        "name": "川中島店",
        "address": "長野県長野市川中島町御厨字児子石831-1",
        "lon": 138.16234,
        "lat": 36.59164
      },
      {
        "id": "bmv78t1bw200",
        "name": "富山店",
        "address": "富山県富山市上袋279-1",
        "lon": 137.21387,
        "lat": 36.659
      },
      {
        "id": "bmv78tclh7wz",
        "name": "浜松店",
        "address": "静岡県浜松市中央区天王町1245-1",
        "lon": 137.77191,
        "lat": 34.7368
      },
      {
        "id": "bmv78trdcegj",
        "name": "鈴鹿店",
        "address": "三重県鈴鹿市神戸地子町381番地1",
        "lon": 136.58667,
        "lat": 34.87272
      },
      {
        "id": "bmv78u450qmv",
        "name": "四日市店",
        "address": "三重県四日市市松原町2-17",
        "lon": 136.65469,
        "lat": 35.00851
      },
      {
        "id": "bmv78ugn6i3t",
        "name": "福井店",
        "address": "福井県福井市米松2丁目23-36",
        "lon": 136.24266,
        "lat": 36.06949
      },
      {
        "id": "bmv78uuqrfq2",
        "name": "石川店",
        "address": "石川県野々市市若松町22-32",
        "lon": 136.61414,
        "lat": 36.53415
      }
    ],
    "chainName": "岐阜タンメン",
    "noPlace": true,
    "pref": "岐阜",
    "more": [
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
    "hp": "https://peaceput.com/brand/im-donut/",
    "insta": "https://www.instagram.com/i.m.donut?stkn=MWVoeHhyNTN3OWUwYg==",
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
    "name": "CLAY Table（KOYO BASE）",
    "address": "岐阜県土岐市泉町久尻1496-5",
    "works": [
      "ひのき牛と飛騨豚のハンバーグとお野菜のセット"
    ],
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
    "tabelog": "https://s.tabelog.com/gifu/A2103/A210301/21021677/",
    "hp": "https://koyobase.com/",
    "insta": "https://www.instagram.com/koyobase.official?stkn=YzRtY2VsM2Nrem44",
    "lon": 137.16991,
    "lat": 35.35616,
    "id": "pmuwrbmoxtm2"
  },
  {
    "region": "chubu",
    "name": "土岐プレミアム・アウトレット",
    "address": "岐阜県土岐市土岐ヶ丘1-2",
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
    "hp": "https://www.premiumoutlets.co.jp/toki/",
    "insta": "https://www.instagram.com/tokipremiumoutlets?stkn=ZDJscWIzZmNoN2Ru",
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
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSb438kKn/",
        "date": "2026-06-15"
      },
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2066659542860251550?s=46",
        "date": "2026-06-16"
      }
    ],
    "photos": [
      "pmux6gqad1.jpg",
      "pmuwswdt22.jpg"
    ],
    "thumb": "pmuwswdt22.jpg",
    "tabelog": "https://s.tabelog.com/aichi/A2301/A230103/23041519/",
    "hp": "https://www.pancake-hoihoi.com/",
    "insta": "https://www.instagram.com/hoihoi724?stkn=MW5mZXhzNTJ5eDQwaQ==",
    "chain": true,
    "branches": [
      {
        "id": "bmv78wsliwrg",
        "name": "HoiHoi Handa Branch（半田市）",
        "address": "愛知県半田市青山4-5-7",
        "lon": 136.9066,
        "lat": 34.8817
      },
      {
        "id": "bmv78ym71yts",
        "name": "Foodie's Stand & PancakeHouseHoiHoi（セントレア）",
        "address": "愛知県常滑市セントレア1丁目1番地 フライトオブドリームズ内2F",
        "lon": 136.80902,
        "lat": 34.85851
      }
    ],
    "chainName": "PancakeHouse HoiHoi",
    "branch": "栄本店",
    "more": [
      "愛知"
    ],
    "lon": 136.91208,
    "lat": 35.16589,
    "id": "pmuwswmg6wji"
  },
  {
    "region": "kanto",
    "name": "鵬天閣 新館",
    "address": "神奈川県横浜市中区山下町192-15",
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
    "tabelog": "https://s.tabelog.com/kanagawa/A1401/A140105/14040668/",
    "hp": "https://houtenkaku.com/",
    "chain": true,
    "branches": [
      {
        "id": "bmv41tfv9fl4",
        "name": "点心舖",
        "address": "神奈川県横浜市中区山下町186 中華街大通り",
        "lon": 139.64735,
        "lat": 35.44307
      },
      {
        "id": "bmv41uhvvp4t",
        "name": "酒家",
        "address": "神奈川県横浜市中区山下町144-3",
        "lon": 139.64471,
        "lat": 35.44264
      }
    ],
    "chainName": "鵬天閣",
    "branch": "新館",
    "more": [
      "神奈川"
    ],
    "lon": 139.64662,
    "lat": 35.44296,
    "id": "pmuwtmcx196m"
  },
  {
    "region": "kanto",
    "name": "開華楼 横浜博覧館店",
    "address": "神奈川県横浜市中区山下町145番地 横浜博覧館1階",
    "works": [
      "三色ごま団子串"
    ],
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
    "tabelog": "https://s.tabelog.com/kanagawa/A1401/A140104/14050265/",
    "chain": true,
    "branches": [
      {
        "id": "bmv41zefue4i",
        "name": "横浜大世界店",
        "address": "神奈川県横浜市中区山下町97",
        "lon": 139.64867,
        "lat": 35.44238
      }
    ],
    "chainName": "開華楼",
    "branch": "横浜博覧館店",
    "more": [
      "神奈川"
    ],
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
    "tabelog": "https://s.tabelog.com/kanagawa/A1401/A140105/14080918/",
    "hp": "https://saiyuki.co.jp/",
    "insta": "https://www.instagram.com/saiyuki_yumcha?stkn=MWk0bmg1MHJqMmFzZA==",
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
    "tabelog": "https://s.tabelog.com/tokyo/A1304/A130401/13292323/",
    "hp": "https://caldo-shinjuku.jp/",
    "insta": "https://www.instagram.com/caldo.cafe.shinjuku?stkn=MWs5bGpkdDR2MzRuYg==",
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
    "tabelog": "https://s.tabelog.com/aichi/A2301/A230105/23067494/",
    "hp": "https://rockin-robin.com/",
    "insta": "https://www.instagram.com/rockin_robin_hamburger_osu?stkn=OWlnaHczcnl2YTAy",
    "chain": true,
    "branches": [
      {
        "id": "bmv792lejff8",
        "name": "栄店",
        "address": "愛知県名古屋市中区栄4-12-21 第2栄スカイタウン 1A",
        "lon": 136.91104,
        "lat": 35.16679
      }
    ],
    "chainName": "ロッキンロビン",
    "branch": "大須店",
    "more": [
      "愛知"
    ],
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
    "tabelog": "https://s.tabelog.com/aichi/A2301/A230105/23075674/",
    "hp": "https://www.yabaton.com/",
    "insta": "https://www.instagram.com/yabaton_official?stkn=d216ZnNlNjA4MWd4",
    "chain": true,
    "branches": [
      {
        "id": "bmv77a8oite6",
        "name": "矢場町本店",
        "address": "愛知県名古屋市中区大須3-6-18",
        "lon": 136.90625,
        "lat": 35.16163
      },
      {
        "id": "bmv77b3uoojq",
        "name": "栄LACHIC店",
        "address": "愛知県名古屋市中区栄3-6-1 LACHIC 7階",
        "lon": 136.90727,
        "lat": 35.16772
      },
      {
        "id": "bmv77btblg39",
        "name": "栄セントライズ店",
        "address": "愛知県名古屋市中区栄3-3-21 セントライズ栄 地下1階",
        "lon": 136.90558,
        "lat": 35.16775
      },
      {
        "id": "bmv77c7fuoax",
        "name": "栄 松坂屋店",
        "address": "愛知県名古屋市中区栄3-16-1 松坂屋名古屋店南館 10階",
        "lon": 136.90744,
        "lat": 35.16566
      },
      {
        "id": "bmv77daejcta",
        "name": "栄松坂屋地下店（お持ち帰り専門）",
        "address": "愛知県名古屋市中区栄3-16-1 松坂屋名古屋店本館 地下1階",
        "lon": 136.90744,
        "lat": 35.16566
      },
      {
        "id": "bmv77dyr5dkh",
        "name": "YABATON SHOP（お持ち帰り専門）",
        "address": "愛知県名古屋市中区大須3-6-13",
        "lon": 136.90622,
        "lat": 35.16183
      },
      {
        "id": "bmv77emztnbd",
        "name": "名古屋駅エスカ店",
        "address": "愛知県名古屋市中村区椿町6-9 エスカ地下街",
        "lon": 136.87984,
        "lat": 35.17031
      },
      {
        "id": "bmv77f8mfp8h",
        "name": "名古屋駅ルーセント店",
        "address": "愛知県名古屋市西区牛島町6-1 ルーセントタワー 地下1階",
        "lon": 136.88129,
        "lat": 35.17537
      },
      {
        "id": "bmv77ftryy0c",
        "name": "名古屋駅三井ビル北館店",
        "address": "愛知県名古屋市中村区名駅4-8-18 名古屋三井ビルディング北館 地下1階",
        "lon": 136.88518,
        "lat": 35.16878
      },
      {
        "id": "bmv77g9fnq7t",
        "name": "名古屋駅ジェイアールタカシマヤ店（お持ち帰り専門）",
        "address": "愛知県名古屋市中村区名駅1-1-4 ジェイアール名古屋タカシマヤ 地下1階",
        "lon": 136.88342,
        "lat": 35.17075
      },
      {
        "id": "bmv77hbmfyhk",
        "name": "名古屋駅店（お持ち帰り専門）",
        "address": "愛知県名古屋市中村区名駅1-1-4"
      },
      {
        "id": "bmv77i265l5m",
        "name": "名古屋城 金シャチ横丁店",
        "address": "愛知県名古屋市中区三の丸1-2-5",
        "lon": 136.89917,
        "lat": 35.18222
      },
      {
        "id": "bmv77j11kv35",
        "name": "イオンモールナゴヤドーム前店",
        "address": "愛知県名古屋市東区矢田南4-102-3 1階",
        "lon": 136.94463,
        "lat": 35.18856
      },
      {
        "id": "bmv77jp7ukn6",
        "name": "名古屋観光ホテル店",
        "address": "愛知県名古屋市中区錦1-19-30",
        "lon": 136.89529,
        "lat": 35.16824
      },
      {
        "id": "bmv77kk5nzq2",
        "name": "矢場とん市場（マルシェ）（お持ち帰り専門）",
        "address": "愛知県名古屋市昭和区鶴舞2-5-29",
        "lon": 136.91423,
        "lat": 35.15241
      },
      {
        "id": "bmv77lbv3zr1",
        "name": "ぶーちゃんハウス",
        "address": "愛知県清須市春日砂賀東145",
        "lon": 136.85051,
        "lat": 35.23113
      },
      {
        "id": "bmv77lyfk1lw",
        "name": "中部国際空港店",
        "address": "愛知県常滑市セントレア1-1 ターミナルビル 4階 レンガ通り",
        "lon": 136.80902,
        "lat": 34.85851
      },
      {
        "id": "bmv77mf4uqsc",
        "name": "豊田T-FACE店",
        "address": "愛知県豊田市若宮町1-57-1 T-FACE B館 8階",
        "lon": 137.15562,
        "lat": 35.08759
      },
      {
        "id": "bmv77naszrs6",
        "name": "NEOPASA岡崎店",
        "address": "愛知県岡崎市宮石町六ツ田10-4",
        "lon": 137.22437,
        "lat": 35.03033
      },
      {
        "id": "bmv77o5g44vs",
        "name": "三井アウトレットパーク岡崎店",
        "address": "愛知県岡崎市舞木町字金森200",
        "lon": 137.25092,
        "lat": 34.90028
      },
      {
        "id": "bmv77otb4p5t",
        "name": "ジャズドリーム長島店",
        "address": "三重県桑名市長島町浦安368 ジャズドリーム長島 サウスエリア1階 Evergreen Kitchen",
        "lon": 136.72992,
        "lat": 35.02905
      },
      {
        "id": "bmv77p9v1hbm",
        "name": "富山三井アウトレットパーク小矢部店",
        "address": "富山県小矢部市西中野972-1 三井アウトレットパーク北陸小矢部 2階 フードコート内",
        "lon": 136.8784,
        "lat": 36.68792
      },
      {
        "id": "bmv77pw8wd60",
        "name": "大阪 阪急三番街店",
        "address": "大阪府大阪市北区芝田1-1-3 阪急三番街北館 地下2階",
        "lon": 135.49901,
        "lat": 34.70414
      },
      {
        "id": "bmv77qeoax9l",
        "name": "大阪あべのハルカス店",
        "address": "大阪府大阪市阿倍野区阿倍野筋1-1-43 あべのハルカス近鉄本店ウイング館 地下2階",
        "lon": 135.51327,
        "lat": 34.64645
      },
      {
        "id": "bmv77quz46pc",
        "name": "大阪大丸心斎橋店",
        "address": "大阪府大阪市中央区心斎橋筋1-7-1 大丸心斎橋店本館 10階",
        "lon": 135.50128,
        "lat": 34.67343
      },
      {
        "id": "bmv77ra5f0jr",
        "name": "東京銀座店",
        "address": "東京都中央区銀座2-11-2 銀座大作ビル",
        "lon": 139.76936,
        "lat": 35.67268
      },
      {
        "id": "bmv77ront0c0",
        "name": "東京駅グランスタ八重洲店",
        "address": "東京都千代田区丸の内1-9-1 グランスタ八重洲 地下1階",
        "lon": 139.76724,
        "lat": 35.68125
      },
      {
        "id": "bmv77scxli6z",
        "name": "羽田エアポートガーデン店",
        "address": "東京都大田区羽田空港2-7-1 羽田エアポートガーデン 1階",
        "lon": 139.76468,
        "lat": 35.54385
      },
      {
        "id": "bmv77supzwgp",
        "name": "東京駅グランスタ店（お持ち帰り専門）",
        "address": "東京都千代田区丸の内1-9-1 JR東日本東京駅構内 地下1階 グランスタ",
        "lon": 139.76724,
        "lat": 35.68125
      }
    ],
    "chainName": "昔の矢場とん",
    "branch": "大須観音本店",
    "more": [
      "東京",
      "富山",
      "愛知",
      "三重",
      "大阪"
    ],
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
    "tabelog": "https://s.tabelog.com/aichi/A2301/A230105/23093020/",
    "hp": "https://www.asakuma.co.jp/shoplist/curry_osu.html",
    "insta": "https://www.instagram.com/asakuma_curry?stkn=dm1mcmR4YnFqcXVv",
    "chain": true,
    "branches": [
      {
        "id": "bmv790h22kzy",
        "name": "栄スカイル店",
        "address": "愛知県名古屋市中区栄3-4-5 栄スカイル 9階",
        "lon": 136.90631,
        "lat": 35.16866
      }
    ],
    "chainName": "カレーのあさくま",
    "branch": "大須店",
    "more": [
      "愛知"
    ],
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
    "hp": "https://www.tokyodisneyresort.jp/tdl/",
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
    "tabelog": "https://s.tabelog.com/tokyo/A1311/A131102/13253090/",
    "hp": "https://unana.jp/",
    "insta": "https://www.instagram.com/asakusaunana?stkn=dTkzcW4wbmpxZGFn",
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
    "note": "※チーズメンチは浅草雷門店のみ",
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
    "tabelog": "https://s.tabelog.com/tokyo/A1311/A131102/13231645/",
    "hp": "https://kuroge.com/shop/asakusa/",
    "insta": "https://www.instagram.com/asakusa777?stkn=MW00cGNrbTVkcWh4eQ==",
    "chain": true,
    "chainName": "くろげ",
    "branch": "浅草雷門店",
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
    "tabelog": "https://s.tabelog.com/tokyo/A1311/A131102/13277751/",
    "insta": "https://www.instagram.com/asakusa_tacotaco_koromo_bro?stkn=NWp3cGw0MngxdGdr",
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
    "note": "",
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
    "tabelog": "https://s.tabelog.com/tokyo/A1311/A131102/13161092/",
    "hp": "https://asakusa-kagetudo.com/",
    "insta": "https://www.instagram.com/asakusa.kagetsudo?stkn=Mng1ZTR2d2x3OTNy",
    "chain": true,
    "branches": [
      {
        "id": "bmv423nvogum",
        "name": "本店",
        "address": "東京都台東区浅草2-7-13",
        "lon": 139.79411,
        "lat": 35.71457
      },
      {
        "id": "bmv425ho0vh3",
        "name": "浅草さくら",
        "address": "東京都台東区浅草1-32-14",
        "lon": 139.79704,
        "lat": 35.71186
      }
    ],
    "chainName": "浅草花月堂",
    "branch": "雷門店",
    "more": [
      "東京"
    ],
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
    "tabelog": "https://s.tabelog.com/tokyo/A1304/A130401/13156065/",
    "hp": "https://kichimusubi.co.jp/shop/hand-bakes-shinjuku/",
    "insta": "https://www.instagram.com/handbakes.shinjuku?stkn=cnd3N2EzMDZ2MGM3",
    "chain": true,
    "branches": [
      {
        "id": "bmv7773ivc0n",
        "name": "イオンレイクタウンkaze店",
        "address": "埼玉県越谷市レイクタウン4-2-2 イオンレイクタウンkaze 2F",
        "lon": 139.82506,
        "lat": 35.87777
      }
    ],
    "chainName": "HAND BAKES",
    "branch": "ルミネ新宿店",
    "more": [
      "埼玉",
      "東京"
    ],
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
    "tabelog": "https://s.tabelog.com/tokyo/A1324/A132402/13299018/",
    "hp": "https://www.marion.co.jp/",
    "insta": "https://www.instagram.com/marionjapan?stkn=dWo2Z214aWwybnF4",
    "chain": true,
    "more": [
      "北海道",
      "青森",
      "岩手",
      "宮城",
      "山形",
      "茨城",
      "栃木",
      "埼玉",
      "千葉",
      "東京",
      "神奈川",
      "新潟",
      "富山",
      "長野",
      "静岡",
      "愛知",
      "滋賀",
      "京都",
      "大阪",
      "兵庫",
      "島根",
      "広島",
      "香川",
      "長崎",
      "宮崎",
      "鹿児島"
    ],
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
    "hp": "https://junglia.jp/",
    "insta": "https://www.instagram.com/junglia_okinawa_official?stkn=MXhla2xwdzBnZWsxNQ==",
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
    "hp": "https://www.umikajiterrace.com/",
    "insta": "https://www.instagram.com/umikajiterrace?stkn=ODJjdHBwcHJ4Mjdz",
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
    "tabelog": "https://s.tabelog.com/tokyo/A1304/A130402/13253328/",
    "insta": "https://www.instagram.com/__nuibox?stkn=MTdwbW1tNzQyeTJ1OQ==",
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
    "hp": "https://www.sugakico.co.jp/",
    "insta": "https://www.instagram.com/sugakiya_suchan?dlrf=MWx5N3prdGd0NmZicA==",
    "chain": true,
    "noPlace": true,
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
        "date": "2026-03-16"
      },
      {
        "name": "X(立花玲奈)",
        "url": "https://x.com/_rena615/status/2034474407582961685?s=46",
        "date": "2026-03-19"
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
    "tabelog": "https://s.tabelog.com/tokyo/A1304/A130401/13277618/",
    "insta": "https://www.instagram.com/linocafebar?stkn=MXc5eXh0cHd4bnE2Yg==",
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
      "pmuz5llct0.jpg",
      "pmuz5lld91.jpg",
      "pmuz5lldq2.jpg",
      "pmuz5lle73.jpg",
      "pmuz5lleo4.jpg",
      "pmux37io510.jpg"
    ],
    "thumb": "pmuz5llct0.jpg",
    "hp": "https://www.tokyo-dome.co.jp/dome/",
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
    "hp": "https://www.marines.co.jp/stadium/",
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
    "hp": "https://www.itsukushimajinja.jp/jp-sp/",
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
    "tabelog": "https://s.tabelog.com/hiroshima/A3401/A340109/34028644/",
    "hp": "https://seitenwotsuke.com/",
    "insta": "https://www.instagram.com/seitenwotsuke?stkn=M3BqbzhlYWpjODVi",
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
      },
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSbbXLbs1/",
        "date": "2026-04-01"
      },
      {
        "name": "X(エイアイカ)",
        "url": "https://x.com/aiika__official/status/2038995357930299654?s=46",
        "date": "2026-04-01"
      }
    ],
    "photos": [
      "pmux3vws621.jpg",
      "pmux3vwsc22.jpg",
      "pmuymkx426.jpg",
      "pmuzws39b0.jpg"
    ],
    "thumb": "pmux3vwsc22.jpg",
    "lon": 139.70172,
    "lat": 35.66177,
    "id": "pmux3w92upuh"
  },
  {
    "region": "kanto",
    "name": "TINTO COFFEE",
    "address": "東京都渋谷区渋谷2丁目8-10 青山ビル・グーテ 1F",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2026429521608814912?s=46",
        "date": "2026-02-25"
      }
    ],
    "photos": [
      "pmux42dgy23.jpg"
    ],
    "tabelog": "https://s.tabelog.com/tokyo/A1303/A130301/13192788/",
    "hp": "https://tintocoffee.jp/",
    "insta": "https://www.instagram.com/tintotokyo?stkn=MW56ODA2dWpoN202Ng==",
    "lon": 139.70743,
    "lat": 35.66063,
    "id": "pmux42hu52vc"
  },
  {
    "region": "kanto",
    "name": "外苑前いちょう並木",
    "address": "東京都港区北青山2丁目",
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DRuaA7Wk3wO/?stkn=MWU5NWI5dDNidWU1Mg==",
        "date": "2025-12-02"
      }
    ],
    "photos": [
      "pmux4bpod24.jpg",
      "pmux4bpov25.jpg",
      "pmux4bppi26.jpg",
      "pmux4bpq127.jpg",
      "pmux4bpqi28.jpg",
      "pmux4bpr229.jpg",
      "pmux4bprj30.jpg"
    ],
    "lon": 139.71776,
    "lat": 35.67193,
    "id": "pmux4bsun38m"
  },
  {
    "region": "kanto",
    "name": "代々木公園",
    "address": "東京都渋谷区代々木神園町2-1",
    "note": "",
    "sources": [
      {
        "name": "X(1)",
        "url": "https://x.com/chii_nyan02/status/2041100787074630089?s=46",
        "date": "2026-04-06"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DW891ihEXS2/?img_index=4&stkn=MWR0YnU4NWl5NXg3aw==",
        "date": "2026-04-10"
      },
      {
        "name": "X(2)",
        "url": "https://x.com/chii_nyan02/status/2044172266393743372?s=46",
        "date": "2026-04-15"
      }
    ],
    "photos": [
      "pmux5tq1231.jpg",
      "pmux5tq2532.jpg",
      "pmux5tq3033.jpg",
      "pmux5tq3j34.jpg",
      "pmux5tq3x35.jpg"
    ],
    "hp": "https://www.tokyo-park.or.jp/park/yoyogi/index.html",
    "lon": 139.70166,
    "lat": 35.66917,
    "id": "pmux5twho4p0"
  },
  {
    "region": "chugoku-shikoku",
    "name": "MIYAJIMA BREWERY",
    "address": "広島県廿日市市宮島町459-2 3F",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2055260477215928423?s=46",
        "date": "2026-05-15"
      }
    ],
    "photos": [
      "pmux60fb236.jpg"
    ],
    "tabelog": "https://s.tabelog.com/hiroshima/A3402/A340202/34031392/",
    "hp": "https://miyajima-brewery.com/",
    "insta": "https://www.instagram.com/miyajima.brewery?stkn=ZHY2a2VhNmJsbHJy",
    "lon": 132.30998,
    "lat": 34.27261,
    "id": "pmux63x54z5n"
  },
  {
    "region": "kanto",
    "name": "竹下通り",
    "address": "東京都渋谷区神宮前1丁目",
    "note": "",
    "sources": [
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSb4coQag/",
        "date": "2026-09-23"
      }
    ],
    "photos": [
      "pmux6abkz0.jpg"
    ],
    "hp": "https://www.takeshita-street.com/",
    "lon": 139.70531,
    "lat": 35.67155,
    "id": "pmux6av3i3m7"
  },
  {
    "region": "chubu",
    "name": "AOI cafe",
    "address": "愛知県名古屋市東区葵1-17-14",
    "works": [
      "鉄板ナポリタン"
    ],
    "note": "",
    "sources": [
      {
        "name": "TikTok(エイアイ過多)",
        "url": "https://vt.tiktok.com/ZSb4jLkrB/",
        "date": "2026-06-16"
      }
    ],
    "photos": [
      "pmuxszeqy0.jpg"
    ],
    "tabelog": "https://s.tabelog.com/aichi/A2301/A230104/23020176/",
    "insta": "https://www.instagram.com/aoicafe?stkn=MWI4eDZ4NG9kdTM0YQ==",
    "lon": 136.92119,
    "lat": 35.1712,
    "id": "pmuxszjsfzgj"
  },
  {
    "region": "kanto",
    "name": "HARBS ニュウマン高輪店",
    "address": "東京都港区高輪2-21-1 ニュウマン高輪 South 3F",
    "works": [
      "アーモンドマロンケーキ"
    ],
    "note": "※秋期限定メニュー\n※他店舗の可能性有",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2100720964862681119?s=46",
        "date": "2026-09-18"
      }
    ],
    "photos": [
      "pmuxtapvq1.jpg"
    ],
    "tabelog": "https://s.tabelog.com/tokyo/A1314/A131403/13313600/",
    "hp": "https://www.harbs.co.jp/",
    "chain": true,
    "branches": [
      {
        "id": "bmuzz9wniquf",
        "name": "麻布台ヒルズ店",
        "address": "東京都港区虎ノ門5-9-1 麻布台ヒルズ ガーデンプラザC B1F",
        "lon": 139.74307,
        "lat": 35.66221
      },
      {
        "id": "bmuzzajku55r",
        "name": "六本木ヒルズ店",
        "address": "東京都港区六本木6-10-2 ヒルサイド1F",
        "lon": 139.7292,
        "lat": 35.66021
      },
      {
        "id": "bmuzzdjvfy2c",
        "name": "東京ミッドタウン店",
        "address": "東京都港区赤坂9-7-4 東京ミッドタウン ガーデンテラス2F",
        "lon": 139.73221,
        "lat": 35.66602
      },
      {
        "id": "bmuzzeehzit3",
        "name": "ルミネ有楽町店",
        "address": "東京都千代田区有楽町2-5-1 ルミネ有楽町店ルミネ12F",
        "lon": 139.7628,
        "lat": 35.67358
      },
      {
        "id": "bmuzzfenlcvx",
        "name": "丸ビル店",
        "address": "東京都千代田区丸の内2-4-1 丸ビル3F"
      },
      {
        "id": "bmuzzg2l2cep",
        "name": "アトレ恵比寿店",
        "address": "東京都渋谷区恵比寿南1-5-5 アトレ恵比寿本館4F"
      },
      {
        "id": "bmuzzh0afeu1",
        "name": "渋谷ヒカリエ シンクス店",
        "address": "東京都渋谷区渋谷2-21-1 渋谷ヒカリエ シンクス4F",
        "lon": 139.70396,
        "lat": 35.65927
      },
      {
        "id": "bmuzzhxclsx1",
        "name": "渋谷サクラステージ店",
        "address": "東京都渋谷区桜ヶ丘町1-4 SHIBUYAサイド2F",
        "lon": 139.70201,
        "lat": 35.657
      },
      {
        "id": "bmuzziq679ys",
        "name": "コレド日本橋店",
        "address": "東京都中央区日本橋1-4-1 コレド日本橋3F",
        "lon": 139.77423,
        "lat": 35.68297
      },
      {
        "id": "bmuzzjl8z2y8",
        "name": "ルミネエスト新宿店",
        "address": "東京都新宿区新宿3-38-1 ルミネエスト新宿B2F",
        "lon": 139.70077,
        "lat": 35.69178
      },
      {
        "id": "bmuzzk8v5aed",
        "name": "上野店",
        "address": "東京都台東区上野3-24-6 パルコヤ2F",
        "lon": 139.77296,
        "lat": 35.70697
      },
      {
        "id": "bmuzzku6wffv",
        "name": "ルミネ池袋店",
        "address": "東京都豊島区西池袋1-11-1 ルミネ池袋1F",
        "lon": 139.7097,
        "lat": 35.72832
      },
      {
        "id": "bmuzzlfkwybe",
        "name": "池袋パルコ店",
        "address": "東京都豊島区南池袋1-28-2　B1F",
        "lon": 139.71034,
        "lat": 35.72712
      },
      {
        "id": "bmuzzm22du95",
        "name": "二子玉川店",
        "address": "東京都世田谷区玉川2-23-1 二子玉川ライズドッグウッドプラザ2F",
        "lon": 139.62724,
        "lat": 35.61258
      },
      {
        "id": "bmuzzmqjafzs",
        "name": "アトレ吉祥寺店",
        "address": "東京都武蔵野市吉祥寺南町1-1-24 アトレ吉祥寺B1F",
        "lon": 139.5797,
        "lat": 35.7033
      },
      {
        "id": "bmuzznfumzxg",
        "name": "ルミネ横浜店",
        "address": "神奈川県横浜市西区高島2-16-1 ルミネ横浜1F",
        "lon": 139.623,
        "lat": 35.46599
      },
      {
        "id": "bmuzzo2w49op",
        "name": "ニュウマン横浜店",
        "address": "神奈川県横浜市西区南幸1-1-1 ニュウマン横浜3F",
        "lon": 139.62276,
        "lat": 35.46761
      },
      {
        "id": "bmuzzoqq03lc",
        "name": "横浜ランドマークプラザ店",
        "address": "神奈川県横浜市西区みなとみらい2-2-1 ランドマークプラザ3F",
        "lon": 139.63145,
        "lat": 35.45509
      },
      {
        "id": "bmuzzscd785i",
        "name": "ニュウマン高輪店",
        "address": "東京都港区高輪2-21-1 ニュウマン高輪 South 3F",
        "lon": 139.73959,
        "lat": 35.63556
      }
    ],
    "chainName": "HARBS",
    "branch": "ニュウマン高輪店",
    "more": [
      "東京",
      "神奈川",
      "愛知",
      "京都",
      "大阪",
      "兵庫"
    ],
    "lon": 139.73959,
    "lat": 35.63556,
    "id": "pmuxtav7bkk8"
  },
  {
    "region": "kanto",
    "name": "WPÜ CAFE",
    "address": "東京都新宿区西新宿7-10-5",
    "works": [
      "ガトーショコラ（アイスクリーム）",
      "カフェラテ"
    ],
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2030970632062820607?s=46",
        "date": "2026-03-09"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DVqo4QdETE5/?stkn=MTgwbXdrdG1qcG4zcw==",
        "date": "2026-03-09"
      }
    ],
    "photos": [
      "pmuyc8ixe4.jpg",
      "pmuy9ap1l1.jpg",
      "pmuy9ap292.jpg"
    ],
    "tabelog": "https://s.tabelog.com/tokyo/A1304/A130401/13299609/",
    "hp": "https://hotel.wpu.co/ja/shinjuku/cafe/",
    "insta": "https://www.instagram.com/wpushinjuku?stkn=MWlndnA3aHQ3bzVsZA==",
    "lon": 139.69817,
    "lat": 35.69376,
    "id": "pmuy9artj4w2"
  },
  {
    "region": "chugoku-shikoku",
    "name": "博多屋",
    "address": "広島県廿日市市宮島町459",
    "works": [
      "宮島じゃけぇ（こしあん）"
    ],
    "note": "",
    "sources": [
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSbbdaVwu/",
        "date": "2026-05-16"
      }
    ],
    "photos": [
      "pmuy9hnw03.jpg"
    ],
    "tabelog": "https://s.tabelog.com/hiroshima/A3402/A340202/34005288/",
    "hp": "https://miyajimahakataya.com/",
    "insta": "https://www.instagram.com/hakataya_miyajima?stkn=MXRxOGtlY3JsMnZvMg==",
    "lon": 132.30998,
    "lat": 34.27261,
    "id": "pmuy9hvg8st8"
  },
  {
    "region": "kanto",
    "name": "鯉々",
    "address": "東京都中央区銀座1-6-10 広島ブランドショップ TAU 2F",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2036437544892858557?s=46",
        "date": "2026-03-24"
      },
      {
        "name": "X(柳本愛 ラストブルー)",
        "url": "https://x.com/55_ai_55_ai/status/2036424967064346801?s=46",
        "date": "2026-03-24"
      }
    ],
    "photos": [
      "pmuylyi8h0.jpg",
      "pmuylyi8w1.jpg"
    ],
    "tabelog": "https://s.tabelog.com/tokyo/A1301/A130101/13208559/",
    "hp": "https://www.tau-hiroshima.jp/store/2f/koikoi",
    "lon": 139.76732,
    "lat": 35.67424,
    "id": "pmuym0lm36bv"
  },
  {
    "region": "kanto",
    "name": "吉祥寺プティット村",
    "address": "東京都武蔵野市吉祥寺本町2-33-2 吉祥寺プティット村",
    "note": "",
    "sources": [
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2082965755818336500?s=46",
        "date": "2026-07-31"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DbiqFJdE2jT/?img_index=8&stkn=MWt3YXY0NGd4ZzRzdA==",
        "date": "2026-08-02"
      }
    ],
    "photos": [
      "pmuym79iq3.jpg",
      "pmuym79ie2.jpg"
    ],
    "hp": "https://petitmura.com/",
    "insta": "https://www.instagram.com/kichijoji_petitmura?stkn=eTJ6ZmJiemthemRp",
    "lon": 139.57457,
    "lat": 35.70461,
    "id": "pmuym8qh5ntl"
  },
  {
    "region": "kanto",
    "name": "井の頭恩賜公園",
    "address": "東京都武蔵野市御殿山1丁目18-31",
    "note": "",
    "sources": [
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSbbXYvmt/",
        "date": "2026-07-27"
      }
    ],
    "photos": [
      "pmuymemns4.jpg"
    ],
    "hp": "https://www.kensetsu.metro.tokyo.lg.jp/jimusho/seibuk/inokashira",
    "lon": 139.5742,
    "lat": 35.70101,
    "id": "pmuymeosojkk"
  },
  {
    "region": "kanto",
    "name": "MUFGスタジアム（国立競技場）",
    "address": "東京都新宿区霞ヶ丘町10-1",
    "note": "",
    "sources": [
      {
        "name": "TikTok",
        "url": "https://vt.tiktok.com/ZSbbXLbs1/",
        "date": "2026-07-28"
      }
    ],
    "photos": [
      "pmuyminth5.jpg"
    ],
    "hp": "https://jns-e.com/",
    "lon": 139.71486,
    "lat": 35.67805,
    "id": "pmuymip3vobm"
  },
  {
    "region": "chugoku-shikoku",
    "name": "旅館 さくらや",
    "address": "広島県廿日市市宮島町853-1",
    "works": [
      "焼きがき"
    ],
    "note": "",
    "sources": [
      {
        "name": "TikTok(エイアイ過多)",
        "url": "https://vt.tiktok.com/ZSbb4PHy2/",
        "date": "2026-05-09"
      }
    ],
    "photos": [
      "pmuyn43bz0.jpg"
    ],
    "tabelog": "https://s.tabelog.com/hiroshima/A3402/A340202/34019642/",
    "hp": "https://www.cs-homes.co.jp/",
    "lon": 132.32211,
    "lat": 34.30059,
    "id": "pmuyn45acgp1"
  },
  {
    "region": "kinki",
    "name": "新世界 串カツ いっとく 道頓堀戎橋店",
    "address": "大阪府大阪市中央区道頓堀1-6-10",
    "note": "",
    "sources": [
      {
        "name": "TikTok(エイアイ過多)",
        "url": "https://vt.tiktok.com/ZSbbVMcE3/",
        "date": "2026-04-30"
      }
    ],
    "photos": [
      "pmuynbrn21.jpg"
    ],
    "tabelog": "https://s.tabelog.com/osaka/A2701/A270202/27139874/",
    "hp": "https://ittoku94.co.jp/",
    "insta": "https://www.instagram.com/ittokudotonboriebisubashi?stkn=czdhcm9oMXlxbGZn",
    "chain": true,
    "more": [
      "大阪"
    ],
    "lon": 135.50238,
    "lat": 34.6688,
    "id": "pmuync0rvxvw"
  },
  {
    "region": "kinki",
    "name": "中座くいだおれビル",
    "address": "大阪府大阪市中央区道頓堀1丁目7-21",
    "note": "",
    "sources": [
      {
        "name": "TikTok(エイアイ過多)",
        "url": "https://vt.tiktok.com/ZSbbVMcE3/",
        "date": "2026-04-30"
      }
    ],
    "photos": [
      "pmuyngovk2.jpg"
    ],
    "hp": "https://nakaza-cuidaore.com/",
    "insta": "https://www.instagram.com/nakaza_cuidaore?stkn=bDdxMG82dXVmYWt3",
    "lon": 135.50253,
    "lat": 34.66869,
    "id": "pmuynhec0q3f"
  },
  {
    "region": "kinki",
    "name": "神戸ハーバーランド",
    "address": "兵庫県神戸市中央区東川崎町1丁目",
    "note": "",
    "sources": [
      {
        "name": "TikTok(エイアイカ)(1)",
        "url": "https://vt.tiktok.com/ZSbbbdwuc/",
        "date": "2025-11-03"
      },
      {
        "name": "TikTok(エイアイカ)(2)",
        "url": "https://vt.tiktok.com/ZSbbqK2C6/",
        "date": "2025-11-05"
      },
      {
        "name": "TikTok(エイアイカ)(3)",
        "url": "https://vt.tiktok.com/ZSbbb1fS4/",
        "date": "2025-11-14"
      }
    ],
    "photos": [
      "pmuyofpk73.jpg",
      "pmuzr9lp00.jpg",
      "pmuyofpl15.jpg"
    ],
    "thumb": "pmuzr9lp00.jpg",
    "hp": "https://harborland.co.jp/",
    "insta": "https://www.instagram.com/kobeharborland?stkn=MWFmcWM1M2tpNm42NA==",
    "lon": 135.18196,
    "lat": 34.67908,
    "id": "pmuyofyp12he"
  },
  {
    "region": "chubu",
    "name": "金沢21世紀美術館",
    "address": "石川県金沢市広坂1-2-1",
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DeUSCydky2s/?rpxt=MTVuNGJiN3pnZ2Qxbw==",
        "date": "2026-10-10"
      }
    ],
    "photos": [
      "pmv2hma8x0.jpg",
      "pmv2hma9h1.jpg"
    ],
    "hp": "https://www.kanazawa21.jp/",
    "lon": 136.65707,
    "lat": 36.56033,
    "id": "pmv2hn2astfq"
  },
  {
    "region": "chubu",
    "name": "川端鮮魚店 片町店",
    "address": "石川県金沢市片町2-2-20 木谷ビル 2F",
    "works": [
      "刺身盛り合わせ",
      "スプーンでほじくるなかおち",
      "炭火焼き 殻付焼きガキ"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DeUSCydky2s/?img_index=5&cplk=MTVuNGJiN3pnZ2Qxbw==",
        "date": "2026-10-10"
      }
    ],
    "photos": [
      "pmv2i75m82.jpg",
      "pmv2i75mp3.jpg"
    ],
    "tabelog": "https://s.tabelog.com/ishikawa/A1701/A170101/17005272/",
    "hp": "https://kawabatasengyoten-katamachi.owst.jp/",
    "chain": true,
    "branches": [
      {
        "id": "bmv2hvciq25h",
        "name": "本店",
        "address": "石川県金沢市木倉町2-4 西野ビル 1F"
      }
    ],
    "chainName": "川端鮮魚店",
    "branch": "片町店",
    "more": [
      "石川"
    ],
    "lon": 136.6517,
    "lat": 36.56015,
    "id": "pmv2iayoktqo"
  },
  {
    "region": "chubu",
    "name": "箔一 兼六園店",
    "address": "石川県金沢市兼六町2-10",
    "works": [
      "金箔のかがやきソフトクリーム"
    ],
    "note": "※金箔ソフトを置いている店舗のみ掲載",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DeUSCydky2s/?vrfl=MTVuNGJiN3pnZ2Qxbw==",
        "date": "2026-10-10"
      }
    ],
    "photos": [
      "pmv2ivzlb4.jpg"
    ],
    "tabelog": "https://s.tabelog.com/ishikawa/A1701/A170101/17006400/",
    "hp": "https://kanazawa.hakuichi.co.jp/",
    "chain": true,
    "branches": [
      {
        "id": "bmv2imgjra1k",
        "name": "本店 箔巧館",
        "address": "石川県金沢市森戸2丁目1番地1",
        "lon": 136.59804,
        "lat": 36.56126
      },
      {
        "id": "bmv2ipvft390",
        "name": "東山店",
        "address": "石川県金沢市東山 1-15-4",
        "lon": 136.66647,
        "lat": 36.57239
      }
    ],
    "chainName": "箔一",
    "branch": "兼六園店",
    "more": [
      "石川"
    ],
    "lon": 136.66299,
    "lat": 36.56519,
    "id": "pmv2iw18bi9t"
  },
  {
    "region": "chubu",
    "name": "JR金沢駅",
    "address": "石川県金沢市木ノ新保町1-1",
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DeUSCydky2s/?exln=MTVuNGJiN3pnZ2Qxbw==",
        "date": "2026-10-10"
      }
    ],
    "photos": [
      "pmv2iyh6m5.jpg"
    ],
    "lon": 136.64767,
    "lat": 36.57717,
    "id": "pmv2iyra0qh4"
  },
  {
    "region": "chugoku-shikoku",
    "name": "チー坊パーラー",
    "address": "",
    "works": [
      "チー坊（ストロベリー）"
    ],
    "note": "※写真は広島ふるさとまつり出演時\n※食べログのリンクは大手町店を引用",
    "sources": [
      {
        "name": "X(1)",
        "url": "https://x.com/chii_nyan02/status/2010664325795721309?s=46",
        "date": "2026-01-12"
      },
      {
        "name": "X(2)",
        "url": "https://x.com/chii_nyan02/status/2017007608369197061?s=46",
        "date": "2026-01-30"
      }
    ],
    "photos": [
      "pmv76tya70.jpg",
      "pmv76tyan1.jpg"
    ],
    "tabelog": "https://s.tabelog.com/hiroshima/A3401/A340116/34032112/",
    "hp": "https://www.setouchi-trip.jp/chibo-parlor",
    "insta": "https://instagram.com/chibohiroshima?vrfl=MXc3cXNvdWc0OGd0MA%3D%3D",
    "chain": true,
    "branches": [
      {
        "id": "bmv76pmhgq1x",
        "name": "大手町店",
        "address": "広島県広島市中区大手町1-5-3",
        "lon": 132.45598,
        "lat": 34.39442
      },
      {
        "id": "bmv76qb6x1w3",
        "name": "ジ・アウトレット店",
        "address": "広島県広島市佐伯区石内東4丁目1-1",
        "lon": 132.39763,
        "lat": 34.41009
      }
    ],
    "chainName": "チー坊パーラー",
    "noPlace": true,
    "more": [
      "広島"
    ],
    "id": "pmv770vo2kbw"
  },
  {
    "region": "chubu",
    "name": "うどんほうとう あまの",
    "address": "山梨県富士吉田市新西原4-11-8",
    "works": [
      "野菜ほうとう"
    ],
    "note": "",
    "sources": [
      {
        "name": "TikTok(エイアイカ)",
        "url": "https://vt.tiktok.com/ZSgNqaBmx/",
        "date": "2026-10-15"
      },
      {
        "name": "X",
        "url": "https://x.com/chii_nyan02/status/2113039727360381321?s=46",
        "date": "2026-10-22"
      }
    ],
    "photos": [
      "pmvavo2341.jpg",
      "pmvavo22m0.jpg",
      "pmvipi1bl0.jpg"
    ],
    "thumb": "pmvipi1bl0.jpg",
    "tabelog": "https://s.tabelog.com/yamanashi/A1903/A190301/19012061/",
    "hp": "https://nbzw700.gorp.jp/",
    "insta": "https://www.instagram.com/udon.houtou_amano?mdxt=MXY5bWFoNmp2dTgzOQ==",
    "lon": 138.78278,
    "lat": 35.48137,
    "id": "pmvavoc8nhar"
  },
  {
    "region": "chubu",
    "name": "oimo&coco. 富士急ハイランド店",
    "address": "山梨県富士吉田市新西原5-6-1 富士急ハイランド",
    "note": "",
    "sources": [
      {
        "name": "TikTok(エイアイカ)",
        "url": "https://vt.tiktok.com/ZSgNqwx5E/",
        "date": "2026-10-15"
      }
    ],
    "photos": [
      "pmvavurk92.jpg",
      "pmvavurkn3.jpg"
    ],
    "tabelog": "https://s.tabelog.com/yamanashi/A1903/A190301/19013383/",
    "hp": "https://oimo-coco.jp/",
    "insta": "https://www.instagram.com/oimococo_fujiq?psln=enZoZzVhaGxkMzM1",
    "chain": true,
    "branches": [
      {
        "id": "bmvavwygxmnx",
        "name": "本店",
        "address": "静岡県静岡市葵区与左衛門新田26-1",
        "lon": 138.35706,
        "lat": 35.01214
      },
      {
        "id": "bmvavydtll5t",
        "name": "彦根店",
        "address": "滋賀県彦根市本町1丁目11番地22号原ビル1階",
        "lon": 136.25146,
        "lat": 35.26908
      },
      {
        "id": "bmvavyjqjr2q",
        "name": "石神井公園店",
        "address": "東京都練馬区石神井町7丁目1-14 石神井スカイビル1F",
        "lon": 139.60228,
        "lat": 35.74449
      },
      {
        "id": "bmvaw28snrd3",
        "name": "江ノ島すばな通り店",
        "address": "神奈川県藤沢市片瀬海岸1丁目13-11 すばな通り上",
        "lon": 139.48595,
        "lat": 35.30892
      },
      {
        "id": "bmvaw3u308zy",
        "name": "上足洗店",
        "address": "静岡県静岡市葵区上足洗2丁目11-53",
        "lon": 138.39427,
        "lat": 34.99274
      },
      {
        "id": "bmvaw500ecng",
        "name": "清水月見町店",
        "address": "静岡県静岡市清水区月見町3-30",
        "lon": 138.48149,
        "lat": 35.00333
      },
      {
        "id": "bmvaw66wg89x",
        "name": "藤枝店",
        "address": "静岡県藤枝市五十海4丁目18-15",
        "lon": 138.26388,
        "lat": 34.88229
      },
      {
        "id": "bmvaw7rkt199",
        "name": "大阪野江店",
        "address": "大阪府大阪市城東区成育1-1-13-101",
        "lon": 135.54175,
        "lat": 34.70542
      },
      {
        "id": "bmvaw8zyhg0s",
        "name": "深谷店",
        "address": "埼玉県深谷市上柴町西3丁目4-16",
        "lon": 139.30118,
        "lat": 36.18492
      }
    ],
    "chainName": "oimo&coco.",
    "branch": "富士急ハイランド店",
    "more": [
      "埼玉",
      "東京",
      "神奈川",
      "山梨",
      "静岡",
      "滋賀",
      "大阪"
    ],
    "lon": 138.78026,
    "lat": 35.4861,
    "id": "pmvawa5fnlzk"
  },
  {
    "region": "chubu",
    "name": "飛騨牛グリルばくろ",
    "address": "岐阜県岐阜市米屋町9",
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/Ddtt_V6E9ny/?mdxt=ZG00MXloMDBvY3l3",
        "date": "2026-09-25"
      }
    ],
    "photos": [
      "pmvbcawez0.jpg"
    ],
    "tabelog": "https://s.tabelog.com/gifu/A2101/A210101/21010723/",
    "hp": "http://grill.bakuroichidai.co.jp/",
    "insta": "https://www.instagram.com/bakuroichidai_official?psln=cjZkaWF5OTAzdWVw",
    "lon": 136.76646,
    "lat": 35.42957,
    "id": "pmvbcazub6zo"
  },
  {
    "region": "chubu",
    "name": "岐阜県庁",
    "address": "岐阜県岐阜市薮田南2丁目1番1号",
    "note": "※モニュメント・フォトスポットの設置終了日は未定",
    "sources": [
      {
        "name": "X(1)",
        "url": "https://x.com/chii_nyan02/status/2112138894305280424?s=46",
        "date": "2026-10-19"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DerSihDk6i7/?img_index=10&vrfl=MTgybHFoZXZsNnphMw==",
        "date": "2026-10-19"
      },
      {
        "name": "X(2)",
        "url": "https://x.com/chii_nyan02/status/2112316511432126625?s=46",
        "date": "2026-10-20"
      }
    ],
    "photos": [
      "pmvf5t0se0.jpg",
      "pmvf5t0sr1.jpg",
      "pmvf5t0t22.jpg",
      "pmvf5t0t93.jpg",
      "pmvfaa5xr3.jpg",
      "pmvfaa5y84.jpg",
      "pmvfux8vd0.jpg"
    ],
    "thumb": "pmvf5t0sr1.jpg",
    "hp": "https://www.pref.gifu.lg.jp/page/513147.html",
    "lon": 136.72272,
    "lat": 35.39169,
    "id": "pmvf5tmpwj4s"
  },
  {
    "region": "chubu",
    "name": "ラスティコ ツー",
    "address": "岐阜県岐阜市薮田南4-6-10",
    "works": [
      "モーニングプレート",
      "カフェ・ラテ"
    ],
    "note": "",
    "sources": [
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/p/DerSihDk6i7/?xtok=MTgybHFoZXZsNnphMw==",
        "date": "2026-10-19"
      }
    ],
    "photos": [
      "pmvf9wojy0.jpg",
      "pmvf9wokj1.jpg",
      "pmvf9wokz2.jpg"
    ],
    "thumb": "pmvf9wokj1.jpg",
    "tabelog": "https://s.tabelog.com/gifu/A2101/A210101/21014254/",
    "insta": "https://www.instagram.com/r_u_s_t_i_c_o?vrfl=MWMxOXZyZWlueXNmcw==",
    "chain": true,
    "branches": [
      {
        "id": "bmvf9wyofctx",
        "name": "（ワン）",
        "address": "岐阜県岐阜市福光西3-1-1",
        "lon": 136.77051,
        "lat": 35.45484
      },
      {
        "id": "bmvf9xj72m38",
        "name": "スリー",
        "address": "岐阜県岐阜市東川手2-44",
        "lon": 136.76416,
        "lat": 35.38832
      },
      {
        "id": "bmvf9yxd8jgk",
        "name": "フォー",
        "address": "岐阜県岐阜市玉井町12",
        "lon": 136.77115,
        "lat": 35.43706
      }
    ],
    "chainName": "ラスティコ",
    "branch": "ツー",
    "more": [
      "岐阜"
    ],
    "lon": 136.71907,
    "lat": 35.38856,
    "id": "pmvfa0teqxp8"
  }
];
