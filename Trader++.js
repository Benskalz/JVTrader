// ==UserScript==
// @name         Trader ++
// @namespace    http://www.jeuxvideo.com/forums/0-3011927-0-1-0-1-0-finance.htm
// @version      0.9.2
// @description  Script qui aide à se sentir TRADER
// @author       -01
// @match        http://www.jeuxvideo.com/forums/0-3011927*
// @match        http://www.jeuxvideo.com/forums/42-30*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require      https://static.cryptowat.ch/assets/scripts/embed.bundle.js
// @require      https://files.coinmarketcap.com/static/widget/currency.js
// @run-at       document-end
// @downloadURL  https://openuserjs.org/install/-01/Trader_++.user.js
// @grant        none
// ==/UserScript==

(function() {

    const CONVERTIR_EN     = "USD";             // En quoi sont converti les crypto. Valeurs possibles : USD, EUR, BTC
    const PERIODE_1        = "1D";              // PERIODE1 -> range du graphique 1. Valeurs possibles : 1D, 2W, 1M, 3M, 6M, 1Y.
    const PERIODE_2        = "1W";              // PERIODE2 -> range du graphique 2. Valeurs possibles : 1D, 2W, 1M, 3M, 6M, 1Y.

    const CRYPTO_DEFAULT   = "BTC";             // crytpo qui s'affiche sur les graphique de la liste des sujets.

    const CRYPTOS_BANDEAU_1 = "BTC,ETH,BCH,XRP"; // crypto qui s'affiche sur le bandeau 1 (en dessus de la liste des sujets). Mettre seulement le raccourci de la crypto.
    const CRYPTOS_BANDEAU_2 = "LTC,XEM,DASH,XMR";// crypto qui s'affiche sur le bandeau 2





    /* Fonction widget cryptocompare.com */
    function widget(urlAPI, elmt){
        baseUrl = "https://widgets.cryptocompare.com/";
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = baseUrl + urlAPI;
        elmt.appendChild(s);
    }

    /* Fonction qui affiche le bandeau */
    function widgetHeader(coins){
        $('.bloc-pagi-default')[0].outerHTML = "<div class='header-crypto' style='visibility: hidden; height:30px'></div>" + $('.bloc-pagi-default')[0].outerHTML; 
        urlAPI = "serve/v3/coin/header?fsyms="+coins+"&tsyms="+CONVERTIR_EN;
        widget(urlAPI, $(".header-crypto")[0]);
        setTimeout(function(){ // css des bandeaux
            $('.ccc-widget.ccc-header-v3').css({
                "background": "#d2d2d2",
                "padding": "5px",
                "border-radius": "2px",
                "margin-bottom": "5px"});

            $('.header-crypto').css("visibility","visible");
        }, 200);
    }

    /* Fonction qui affiche les 2 graphiques */
    function widgetCharts(coin, period1, period2){
        $('.panel.panel-jv-forum').after("<div id='chart-1'></div>");
        $('.panel.panel-jv-forum').after("<div id='chart-2'></div>");
        if(coin == "BTC" && CONVERTIR_EN == "BTC"){ // flemme de faire autrement
            urlAPI1 = "serve/v2/coin/chart?fsym="+coin+"&tsym="+"USD"+"&period="+period1;
            urlAPI2 = "serve/v2/coin/chart?fsym="+coin+"&tsym="+"USD"+"&period="+period2;
        }else{
            urlAPI1 = "serve/v2/coin/chart?fsym="+coin+"&tsym="+CONVERTIR_EN+"&period="+period1;
            urlAPI2 = "serve/v2/coin/chart?fsym="+coin+"&tsym="+CONVERTIR_EN+"&period="+period2;
        }
        widget(urlAPI1, $("#chart-2")[0]);
        widget(urlAPI2, $("#chart-1")[0]);
    }
    /* Détecte les cryptos valides dans les titres et affiche leur graphiques */
    function widgetTopic(period1, period2){
        var titreTopic = $('#bloc-title-forum').text();
        var validCoins = ["IOTA", "DIGS","EXP","GCR","MAPC","MI","CON","NEU","TX","GRS","SC","CLV","FCT","LYB","BST","PXI","CPC","AMS","OBITS","CLUB","RADS","EMC","BLITZ","EGC","MND","I0C","BTA","KARM","DCR","NAS2","PAK","CRBIT","DOGED","OK","VOX","HODL","EDRC","HTC","GAME","DSH","DBIC","XHI","SPOTS","BIOS","KNC","CAB","DIEM","GBT","SAR","RCX","PWR","TRUMP","BCY","RBIES","STEEM","BLRY","XWC","DOT","SCOT","DNET","BAC","GRT","TCR","POST","INFX","ETHS","PXL","NUM","SOUL","ION","GROW","OLDSF","SSTC","NETC","GPU","TAGR","HMP","ADZ","GAP","MYC","IVZ","VTA","SLS","SOIL","CUBE","YOC","COIN","VPRC","APC","STEPS","DBTC","UNIT","AEON","MOIN","SIB","ERC","AIB","PRIME","BERN","BIGUP","KR","XRE","1337","MEME","XDB","ANTI","BRK","CV2","ADCN","ZEIT","611","2GIVE","CGA","SWING","NEBU","AEC","FRN","ADN","PULSE","N7","CYG","LGBTQ","UTH","MPRO","KAT","404","SPM","MOJO","BELA","FLX","BOLI","CLUD","DIME","FLY","HVCO","GIZ","GREXIT","CARBON","DEUR","TUR","LEMON","STS","DISK","NEVA","CYT","FUZZ","NKC","SCRT","XRA","XNX","STHR","DBG","BON","WMC","GOTX","FLVR","RISE","REV","PBC","OBS","EXIT","EDC","CLINT","CKC","VIP","NXE","ZOOM","DRACO","YOVI","ORLY","KUBO","INCP","SAK","EVIL","OMA","MUE","COX","EKO","BSD","DES","BIT16","CMT","CHESS","SPACE","REE","LQD","MARV","XDE2","VEC2","GSY","TKN*","LIR","MMNXT","SCRPT","LBC","SPX","PPC","SBD","CJ","KRAK","DLISK","IBANK","VOYA","ENTER","WGC","BM","ZEC","FRWC","PSY","XT","RUST","NZC","XAUR","BFX","UNIQ","CRX","XPOKE","MUDRA","WARP","CNMT","PIZZA","LC","HEAT","EXB","CDX","RBIT","DCS.","GB","ANC","SYNX","EDR","JWL","WAY","TAB","TRIG","BITCNY","BITUSD","ATM","STO","SNS","FSN","CTC","TOT","BTD","BOTS","MDC","FTP","ZET2","COV","KRB","TELL","ENE","TDFB","BLOCKPAY","BXT","ZYD","MST","GOON","808","VLT","ZNE","DCK","COVAL","DGDC","TODAY","VRM","ROOT","GPL","B3","FX","PIO","GAY","SMSR","UBIQ","ARM","RING","ERB","LAZ","FONZ","BTCR","DROP","SANDG","PNK","MOOND","DLC","SEN","SCN","WEX","LTH","BRONZ","SH","BUZZ","MG","PSI","XPO","NLC","XBTS","FIT","PINKX","FIRE","UNF","SPORT","NTC","EGO","BTCL","RCN","X2","TIA","GBRC","XUP","888","HALLO","BBCC","EMIGR","BHC","CRAFT","INV","OLYMP","DPAY","ATOM","HKG","ANTC","JOBS","DGORE","THC","TRA","RMS","FJC","VAPOR","SDP","RRT","XZC","PRE","CALC","LEA","CF","CRNK","CFC","VTY","SFE","ARDR","BS","JIF","CRAB","AIR","HILL","FOREX","MONETA","EC","RUBIT","HCC","BRAIN","VTX","KRC","ROYAL","LFC","ZUR","NUBIS","TENNET","PEC","GMX","32BIT","GNJ","TEAM","SCT","LANA","ELE","GCC","AND","GBYTE","EQUAL","SWEET","2BACCO","DKC","COC","CHOOF","CSH","ZCL","RYCN","PCS","NBIT","WINE","IFLT","ZECD","ZXT","WASH","TESLA","LUCKY","TPG","LEO","MDT","CBD","PEX","INSANE","PEN","BASH","FAME","LIV","SP","MEGA","VRS","ALC","DOGETH","KLC","HUSH","BTLC","DRM8","FIST","EBZ","365","DRS","FGZ","BOSON","ATX","PNC","BRDD","BIP","XNC	","EMB","BTTF","DLR","CSMIC","FIRST","SCASH","XEN","JIO","IW","JNS","TRICK","DCRE","FRE","NPC","PLNC","DGMS","ARCO","KURT","XCRE","ENT","UR","MTLM3","ODNT","EUC","CCX","BCF","SEEDS","POSW","SHORTY","PCM","KC","CORAL","BamitCoin","MONEY","BSTAR","HSP","HZT","CS","XSP","CCRB","BULLS","ICON","NIC","ACN","XNG","XCI","PRC","YBC","DANK","GIVE","KOBO","DT","CETI","SUP","XPD","GEO","CHASH","SPR","NXTI","WOLF","XDP","LOOK","LOC","MMXVI","MIS","WOP","CQST","2015","DASH","LTC","42","AC","ACOIN","AERO","ALF","AGS","AMC","ALN","ANNC","APEX","ARCH","ARI","AUR","AXR","BCX","BET","BITB","BLK","BLU","BOST","BQC","XMY","MOON","ZET","SXC","QTL","ENRG","QRK","RIC","DGC","LIMX","ARG","BTB","BTCD","BTE","BTG","BTM","BUK","CACH","CAIX","CANN","CAP","CASH","CCN","CIN","CINNI","CXC","CLAM","CLOAK","CLR","CMC","CNC","CNL","COMM","COOL","CRACK","CRAIG","CRC","CRYPT","CSC","DEM","DOGE","XVG","DRKC","DSB","DVC","EAC","EFL","ELC","EMC2","EMD","EXCL","EXE","EZC","FLAP","FC2","FFC","FIBRE","FLT","FRAC","FRC","FRK","FST","FTC","GDC","GLC","GLD","GLX","GLYPH","GML","GUE","HAL","HBN","HUC","HVC","HYP","ICB","IFC","IOC","IXC","JBS","JKC","JUDGE","KDC","KEY","KGC","LAB","LGD*","LK7","LKY","LSD","LTB","LTCX","LXC","LYC","MAX","MEC","MED","MIN","MINT","MN","MNC","MZC","NAN","NAUT","NAV","NBL","NEC","NET","NMB","NRB","NOBL","NRS","NVC","NMC","NYAN","OPAL","ORB","OSC","PHS","POINTS","POT","PSEUD","PTS","PXC","PYC","RDD","RIPO","RPC","RT2","RYC","RZR","SAT2","SBC","SDC","SFR","SHADE","SHLD","SILK","SLG","SMC","SOLE","SPA","SPT","SRC","SSV","XLM","SUPER","SWIFT","SYNC","SYS","TAG","TAK","TES","TGC","TIT","TOR","TRC","TTC","ULTC","UNB","UNO","URO","USDE","UTC","UTIL","VDO","VOOT","VRC","VTC","WC","WDC","XAI","XBOT","XBS","XC","XCASH","XCR","XJO","XLB","XPM","XPY","XRP","XST","XXX","YAC","ZCC","ZED","XMR","BCN","EKN","XDN","XAU","TMC","XEM","BURST","NBT","HUGE","007","NSR","MONA","CELL","TEK","TRON","NTRN","SLING","XVC","CRAVE","BLOCK","XSI","GHS","BYC","GRC","GEMZ","KTK","HZ","FAIR","QORA","NLG","RBY","PTC","WBB","SSD","XTC","NOTE","GRID","ETC","FLO","MMXIV","8BIT","STV","EBS","AM","XMG","AMBER","JPC","NKT","J","GHC","DTC","ABY","LDOGE","MTR","TRI","BBR","BTCRY","BCR","XPB","XDQ","FLDC","SLR","SMAC","TRK","U","UIS","CYP","UFO","ASN","OC","GSM","FSC2","NXTTY","QBK","BLC","MARYJ","OMC","GIG","CC","BITS","LTBC","NEOS","HYPER","VTR","METAL","PINK","XG","CHILD","BOOM","MINE","ROS","UNAT","SLM","GAIA","TRUST","FCN","XCN","GMC","MMC","XBC","CYC","OCTO","MSC","EGG","C2","GSX","CAM","RBR","XQN","ICASH","NODE","SOON","BTMI","EVENT","1CR","VIOR","XCO","VMC","MRS","VIRAL","EQM","ISL","QSLV","XWT","XNA","RDN","SKB","BSTY","FCS","GAM","NXS","CESC","TWLV","EAGS","MWC","ADC","MARS","XMS","SPHR","SIGU","DCC","M1","DB","CTO","LUX","FUTC","GLOBE","TAM","MRP","CREVA","XFC","NANAS","LOG","XCE","ACP","DRZ","BUCKS*","BSC","DRKT","CIRC","NKA","VERSA","EPY","SQL","POLY","PIGGY","CHA","MIL","CRW","GEN","XPH","GRM","QTZ","ARB","LTS","SPC","GP","BITZ","DUB","GRAV","BOB","MCN","QCN","HEDG","SONG","XSEED","CRE","AXIOM","SMLY","RBT","CHIP","SPEC","GRAM","UNC","SPRTS","ZNY","BTQ","PKB","STR*","SNRG","GHOUL","HNC","PUT","GRE","PRM","SNGLS","TRST","INCNT","ARK","PPY","EDGE","DAR","MC","OMNI","NXT","VSL","CURE","ETH","STRAT","GNT","WAVES","ICN","1ST","ROOTS","BAY","BTS","MNM","MAID","PSB","KMD","SWARM","TIME","VIA","XCP","WINGS","CAT","BNT","REP","DCT","AMP","ICOB","TKS","LSK","NXC","DGB","MT","DOPE","MOBI","SAFEX","NEO","PDC","DGD","SJCX","UNITY","IWT","BNX","BSTK","RNS","DBIX","AMIS","KAYI","XVP","BOAT","TAJ","IMX","CJC","AMY","QBT","SRC*","EB3","XVE","FAZZ","APT","BLAZR","ARPA","UNI","ECO","XLR","DARK","DOV","MER","WGO","RLC","ATMS","INPAY","ETT","WBTC","VISIO","HPC","GOT","CXT","EMPC","GNO","LGD","TAAS","BUCKS","XBY","GUP","MCRN","LUN","RAIN","WSX","IEC","IMS","ARGUS","CNT","LMC","TKN","BTCS","PROC","XGR","WRC","BENJI","HMQ","BCAP","DUO","RBX","GRW","APX","MILO","XVS","ILC","MRT","IOU","PZM","PHR","ANT","PUPA","RICE","XCT","DEA","RED","ZSE","CTIC","TAP","BITOK","PBT","MUU","INF8","HTML5","MNE","DICE","SUB","USC","DUX","XPS","EQT","INSN","BAT","MAT","F16","HAMS","NEF","ZEN","BOS","QWARK","QRL","ADL","ECC","PTOY","ESP","MAD","DYN","SEQ","MCAP","MYST","SNM","SKY","CFI","SNT","AVT","DENT","BQX","STA","TFL","EFYT","XTZ","NMR","ADX","QAU","ECOB","PLBT","USDT","XRB","ATB","TIX","4CHN","CMP","HRB","NET*","8BT","ACT","DNT","SUR","PING","MIV","SAN","WGR","XEL","NVST","FUNC","WTT","MTL","HVN","MYB","PPT","SNC","STAR","COR","XRL","OROC","OAX","MBI","DDF","GGS","DNA","FYN","FND","DCY","CFT","DNR","DP","VUC","BTPL","UNIFY","IPC","BRIT","AMMO","SOCC","MASS","IML","XUC","PLR","GUNS","IFT","PRO","SYC","TRIBE","TNT","STORM","UNIKRN","NPX","STORJ","SCORE","OMG","OTX","EQB","VSM","ETB","CVCOIN","DRP","ARC*","BOG","NDC","POE","ADT","AE","UET","PART","AGRS","SAND","DAS","XCJ","RKC","NLC2","LINDA","SPN","KING","ANCP","CABS","BITSD","XLC","SKIN","MSP","HIRE","BBT","REAL","DFBT","VIB","ONION","BTX","ICE","XID","GCN","ATOM*","ICOO","TME","SMART","ONX","COE","ARNA","WINK","CRM","BCH","STX","BNB","CORE","QVT","AUT","CTT","GRWI","MTH","CCC","BMXT","GAS","BNC","TOM","XAS","SMNX","DCN","DELTA","MRV","MBRS","NEBL","XMCC","CMPCO","WNET","PRG","THNX","WORM","FUCK","DUCK","IMPS","IN","CHIEF","GOAT","ANAL","RC","PND","PX","CND","OPTION","AV","LTD","UNITS","HEEL","GAKH","SHIFT","S8C","LVG","DRA","ASAFE","LTCR","QBC","XPRO","AST","GIFT","VIDZ","INC","PTA","ACID","ZLQ","RADI","RNC","GOLOS","PASC","TWIST","PAYP","DETH","YAY","YES","LENIN","MRSA","OS76","BOSS","MKR","BIC","CRPS","MOTO","NTCC","HXX","SPKTR","MAC","SEL","NOO","CHAO","XGB","YMC","JOK","GBIT","BOMB","RIDE","PIVX","KED","CNO","WEALTH","IOP","XSPEC","PEPECASH","CLICK","ELS","KUSH","ERY","PLU","PRES","BTZ","OPES","WCT","RATIO","BAN","NICE","SMF","CWXT","TECH","CIR","LEPEN","ROUND","MAR","MARX","TAT","HAZE","PRX","NRC","PAC","IMPCH","ERR","TIC","NUKE","EOC","SFC","JANE","PARA","MM","BXC","NDOGE","ZBC","MLN","FRST","PAY","ORO","ALEX","TBCX","MCAR","THS","ACES","UAEC","EA","PIE","CREA","WISC","BVC","FIND","MLITE","STALIN","TSE","VLTC","SWT","PASL","ZER","CHAT","CDN","TPAY","NETKO","ZOI","HONEY","MXT","MUSIC","DTB","VEG","MBIT","VOLT","MGO","EDG","B@","BEST","CHC","ZENI","PLANET","DMARKET","Litra","OPT","MANA","SCOR","BRO","MINEX","BTM*","KEX","BCCOIN","RCC","SIGT","AHT*","CAT*","BET*","BNB*","XNC*","STA*","STAR*","XID*","HIRE*","BTX*","PQT","KCN","MNY","ARI*","MLS","SOJ","STCN","RIYA","LNK","SNK","WAN","DFT","TIE","ALTC","MNT","CREDO","ATL","SQP","BLX","BANKEX","BOU","DIM","ITT","OXY","TTT","AMT","PST","BTC","HDG","VERI","NYC","LBTC","KRONE","GIM","IOT","CVC","QTUM","ZRX","XAI*","KORE","UTK","EQ","ACC","BEN","CBX","DMD","LTCD","ZRC","ZRC*","BIOB","MYST*","START","TEC","MCO","ZNT","LKK","BT","IGNIS","MRY","PIX","EVX","GXC","DGT","OCL","NIMFA","SDAO","CLOUD","EOS","ADST","AUTH","MEDI","STU","COSS","CASH*","HBT","FIL","IND","CTR","PGL","RVT","AHT","VNT","SUB*","SRT","HGT","MAG","JDC","KICK","WOLK","EMT","MET","UMC","DTCT","ICOS","SIFT","CSNO","AVA","ARC1","Z2","FUN","UBQ","COB","LAT","LATO","LINX","XCXT","BLAS","GOOD","IXT","CDT"];
        var coinReg = new RegExp("\[[A-Za-z0-9]{0,6}\]");
        if (coinReg.test(titreTopic)){ // si titre au format [AAA]
            coin = coinReg.exec(titreTopic)[0];
            coin = coin.replace(/\[|\]/g, ""); // supprime le '[' et ']'
            if (coin == "MIOTA"){ coin = "IOT";}
            console.log("Balise [] détécté contenant : " + coin);

            if (validCoins.includes(coin)){ // si le [AAA] est présent dans la liste des coins valides, retourne le coin
                console.log("Coin valide !");
                widgetCharts(coin, period1, period2);
            }
        }
    }

    /* Charge les widgets */

    var url_forum = "http://www.jeuxvideo.com/forums/0-3011927-0-1-0";
    if (window.location.href.includes(url_forum)){ // affichage garph par défaut sur la page d'accueil
        widgetCharts(CRYPTO_DEFAULT, PERIODE_1, PERIODE_2);
    }


    widgetTopic(PERIODE_1, PERIODE_2);

    widgetHeader(CRYPTOS_BANDEAU_1);
    widgetHeader(CRYPTOS_BANDEAU_2);




    /* intégration des liens coinmarketplace et cryptowatch */
    coinmarketplaceReg = new RegExp("https?:\/\/coinmarketcap\.com\/currencies\/[a-zA-Z0-9]+\/");
    cryptowatchReg     = new RegExp("https:\/\/cryptowat\.ch\/[a-zA-Z]+\/[a-zA-Z0-9]+(\/[a-z0-9]+)?");

    id = 0;
    $('.bloc-contenu a,.message__content-text a').each(function(){
        id++;
        var lien = ($(this).attr('href'));
        var obj = $(this);

        if(coinmarketplaceReg.test(lien)){
            lienMarket = coinmarketplaceReg.exec(lien)[0];
            coin = lienMarket.replace(/https:\/\/coinmarketcap.com\/currencies\/|http:\/\/coinmarketcap.com\/currencies\/|\//g,""); // isole le coin
            html = '<div class="coinmarketcap-currency-widget" style="max-width:300px; zoom: 0.8; background-color:white; border-radius:15px"></div>';
            obj.after(html);
            $(".coinmarketcap-currency-widget").attr({
                "data-currency" : coin,
                "data-base" : CONVERTIR_EN,
                "data-secondary" : "BTC"
            });

        }
        if(cryptowatchReg.test(lien)){
            lienCrypto = cryptowatchReg.exec(lien)[0];
            dataArr = lienCrypto.replace("https:\/\/cryptowat.ch\/","").split("/"); // isole les 2 var
            console.log("Lien cryptowatch détécté : " + lienCrypto + " -> " + dataArr);
            exchange = dataArr[0];
            coin = dataArr[1];
            if (typeof dataArr[2] !== "undefined"){
                interval = dataArr[2];
                console.log("time précisé : " + interval);
            }else{
                interval = "1h";
            }
            html = '<div id="chart-cryptowatch'+id+'" style="height:500px;"></div>';
            obj.after(html);

            var chart = new cryptowatch.Embed(exchange, coin, {
                width: 650,
                timePeriod: interval,
                presetColorScheme: 'standard',
                customColorScheme: {
                    bg:           "000000",
                    text:         "b2b2b2",
                    textStrong:   "e5e5e5",
                    textWeak:     "7f7f7f",
                    short:        "FD4600",
                    shortFill:    "FF672C",
                    long:         "6290FF",
                    longFill:     "002782",
                    cta:          "363D52",
                    ctaHighlight: "414A67",
                    alert:        "FFD506",
                }
            });
            chart.mount('#chart-cryptowatch'+id);
        }
    });


})();