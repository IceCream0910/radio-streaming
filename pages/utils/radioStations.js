const radioData = [
    {
        "title": "KBS 1라디오",
        "city": "seoul",
        "url": "/api/stream?stn=kbs&ch=1radio"
    },
    {
        "title": "KBS 2라디오",
        "city": "seoul",
        "url": "/api/stream?stn=kbs&ch=2radio"
    },
    {
        "title": "KBS 3라디오",
        "city": "seoul",
        "url": "/api/stream?stn=kbs&ch=3radio"
    },
    {
        "title": "KBS 1FM",
        "city": "seoul",
        "url": "/api/stream?stn=kbs&ch=1fm"
    },
    {
        "title": "KBS 2FM",
        "city": "seoul",
        "url": "/api/stream?stn=kbs&ch=2fm"
    },
    {
        "title": "KBS 한민족방송",
        "city": "seoul",
        "url": "/api/stream?stn=kbs&ch=hanminjok"
    },
    {
        "title": "MBC 표준FM",
        "city": "seoul",
        "url": "/api/stream?stn=mbc&ch=sfm"
    },
    {
        "title": "MBC FM4U",
        "city": "seoul",
        "url": "/api/stream?stn=mbc&ch=fm4u"
    },
    {
        "title": "MBC mini 올댓뮤직",
        "city": "seoul",
        "url": "/api/stream?stn=mbc&ch=chm"
    },
    {
        "title": "SBS 러브FM",
        "city": "seoul",
        "url": "/api/stream?stn=sbs&ch=lovefm"
    },
    {
        "title": "SBS 파워FM",
        "city": "seoul",
        "url": "/api/stream?stn=sbs&ch=powerfm"
    },
    {
        "title": "SBS 고릴라디오M",
        "city": "seoul",
        "url": "/api/stream?stn=sbs&ch=dmb"
    },
    {
        "title": "EBS FM",
        "city": "seoul",
        "url": "/api/stream?stn=ebs"
    },
    {
        "title": "OBS 라디오",
        "city": "seoul",
        "url": "/api/stream?stn=obs"
    },
    {
        "title": "iFM 경인방송",
        "city": "seoul",
        "url": "/api/stream?stn=ifm"
    },
    {
        "title": "YTN 라디오",
        "city": "seoul",
        "url": "/api/stream?stn=ytn"
    },
    {
        "title": "TBS FM",
        "city": "seoul",
        "url": "/api/stream?stn=tbs&ch=fm"
    },
    {
        "title": "TBS eFM",
        "city": "seoul",
        "url": "/api/stream?stn=tbs&ch=efm"
    },
    {
        "title": "TBN 경인교통방송",
        "city": "seoul",
        "url": "/api/stream?stn=tbn"
    },
    {
        "title": "CBS 표준FM",
        "city": "seoul",
        "url": "/api/stream?stn=cbs&ch=sfm"
    },
    {
        "title": "CBS 음악FM",
        "city": "seoul",
        "url": "/api/stream?stn=cbs&ch=mfm"
    },
    {
        "title": "FEBC 서울극동방송",
        "city": "seoul",
        "url": "/api/stream?stn=febc"
    },
    {
        "title": "BBS 서울불교방송",
        "city": "seoul",
        "url": "/api/stream?stn=bbs"
    },
    {
        "title": "CPBC 가톨릭평화방송",
        "city": "seoul",
        "url": "/api/stream?stn=cpbc"
    },
    {
        "title": "WBS 서울원음방송",
        "city": "seoul",
        "url": "/api/stream?stn=wbs"
    },
    {
        "title": "국방FM",
        "city": "seoul",
        "url": "/api/stream?stn=kookbang"
    },
    {
        "title": "국악방송",
        "city": "seoul",
        "url": "/api/stream?stn=kugak"
    },
    {
        "title": "AFN Go Humphreys",
        "city": "seoul",
        "url": "/api/stream?stn=afn&city=humphreys"
    },
    //busan
    {
        "title": "KBS부산 1라디오",
        "city": "busan",
        "url": "/api/stream/?stn=kbs&ch=1radio&city=busan"
    },
    {
        "title": "KBS부산 2라디오",
        "city": "busan",
        "url": "/api/stream/?stn=kbs&ch=2radio&city=busan"
    },
    {
        "title": "KBS부산 음악FM",
        "city": "busan",
        "url": "/api/stream/?stn=kbs&ch=1fm&city=busan"
    },
    {
        "title": "KBS창원 1라디오",
        "city": "busan",
        "url": "/api/stream/?stn=kbs&ch=1radio&city=changwon"
    },
    {
        "title": "KBS창원 2라디오",
        "city": "busan",
        "url": "/api/stream/?stn=kbs&ch=2radio&city=changwon"
    },
    {
        "title": "KBS창원 음악FM",
        "city": "busan",
        "url": "/api/stream/?stn=kbs&ch=1fm&city=changwon"
    },
    {
        "title": "KBS진주 1라디오",
        "city": "busan",
        "url": "/api/stream/?stn=kbs&ch=1radio&city=jinju"
    },
    {
        "title": "부산MBC 표준FM",
        "city": "busan",
        "url": "/api/stream/?stn=mbc&ch=sfm&city=busan"
    },
    {
        "title": "부산MBC FM4U",
        "city": "busan",
        "url": "/api/stream/?stn=mbc&ch=fm4u&city=busan"
    },
    {
        "title": "울산MBC 표준FM",
        "city": "busan",
        "url": "/api/stream/?stn=mbc&ch=sfm&city=ulsan"
    },
    {
        "title": "울산MBC FM4U",
        "city": "busan",
        "url": "/api/stream/?stn=mbc&ch=fm4u&city=ulsan"
    },
    {
        "title": "MBC경남 표준FM",
        "city": "busan",
        "url": "/api/stream/?stn=mbc&ch=sfm&city=changwon"
    },
    {
        "title": "MBC경남 FM4U",
        "city": "busan",
        "url": "/api/stream/?stn=mbc&ch=fm4u&city=changwon"
    },
    {
        "title": "KNN 러브FM",
        "city": "busan",
        "url": "/api/stream/?stn=sbs&ch=lovefm&city=busan"
    },
    {
        "title": "KNN 파워FM",
        "city": "busan",
        "url": "/api/stream/?stn=sbs&ch=powerfm&city=busan"
    },
    {
        "title": "UBC 그린FM",
        "city": "busan",
        "url": "/api/stream/?stn=sbs&ch=powerfm&city=ulsan"
    },
    {
        "title": "EBS FM",
        "city": "busan",
        "url": "/api/stream/?stn=ebs"
    },
    {
        "title": "TBN 부산교통방송",
        "city": "busan",
        "url": "/api/stream/?stn=tbn&city=busan"
    },
    {
        "title": "TBN 울산교통방송",
        "city": "busan",
        "url": "/api/stream/?stn=tbn&city=ulsan"
    },
    {
        "title": "TBN 경남교통방송",
        "city": "busan",
        "url": "/api/stream/?stn=tbn&city=gyeongnam"
    },
    {
        "title": "부산CBS 표준FM",
        "city": "busan",
        "url": "/api/stream/?stn=cbs&ch=sfm&city=busan"
    },
    {
        "title": "부산CBS 음악FM",
        "city": "busan",
        "url": "/api/stream/?stn=cbs&ch=mfm&city=busan"
    },
    {
        "title": "울산CBS 표준FM",
        "city": "busan",
        "url": "/api/stream/?stn=cbs&ch=sfm&city=ulsan"
    },
    {
        "title": "경남CBS 표준FM",
        "city": "busan",
        "url": "/api/stream/?stn=cbs&ch=sfm&city=gyeongnam"
    },
    {
        "title": "FEBC 부산극동방송",
        "city": "busan",
        "url": "/api/stream/?stn=febc&city=busan"
    },
    {
        "title": "FEBC 울산극동방송",
        "city": "busan",
        "url": "/api/stream/?stn=febc&city=ulsan"
    },
    {
        "title": "FEBC 창원극동방송",
        "city": "busan",
        "url": "/api/stream/?stn=febc&city=changwon"
    },
    {
        "title": "CPBC 부산가톨릭평화방송",
        "city": "busan",
        "url": "/api/stream/?stn=cpbc&city=busan"
    },
    {
        "title": "WBS 부산원음방송",
        "city": "busan",
        "url": "/api/stream/?stn=wbs&city=busan"
    },
    {
        "title": "국방FM",
        "city": "busan",
        "url": "/api/stream/?stn=kookbang"
    },
    //daegu
    {
        "title": "KBS대구 1라디오",
        "city": "daegu",
        "url": "/api/stream/?stn=kbs&ch=1radio&city=daegu"
    },
    {
        "title": "KBS대구 2라디오",
        "city": "daegu",
        "url": "/api/stream/?stn=kbs&ch=2radio&city=daegu"
    },
    {
        "title": "KBS대구 음악FM",
        "city": "daegu",
        "url": "/api/stream/?stn=kbs&ch=1fm&city=daegu"
    },
    {
        "title": "KBS안동 1라디오",
        "city": "andong",
        "url": "/api/stream/?stn=kbs&ch=1radio&city=andong"
    },
    {
        "title": "KBS포항 1라디오",
        "city": "pohang",
        "url": "/api/stream/?stn=kbs&ch=1radio&city=pohang"
    },
    {
        "title": "대구MBC 표준FM",
        "city": "daegu",
        "url": "/api/stream/?stn=mbc&ch=sfm&city=daegu"
    },
    {
        "title": "대구MBC FM4U",
        "city": "daegu",
        "url": "/api/stream/?stn=mbc&ch=fm4u&city=daegu"
    },
    {
        "title": "안동MBC 표준FM",
        "city": "daegu",
        "url": "/api/stream/?stn=mbc&ch=sfm&city=andong"
    },
    {
        "title": "안동MBC FM4U",
        "city": "daegu",
        "url": "/api/stream/?stn=mbc&ch=fm4u&city=andong"
    },
    {
        "title": "포항MBC 표준FM",
        "city": "daegu",
        "url": "/api/stream/?stn=mbc&ch=sfm&city=pohang"
    },
    {
        "title": "포항MBC FM4U",
        "city": "daegu",
        "url": "/api/stream/?stn=mbc&ch=fm4u&city=pohang"
    },
    {
        "title": "TBC 드림FM",
        "city": "daegu",
        "url": "/api/stream/?stn=sbs&ch=powerfm&city=daegu"
    },
    {
        "title": "EBS FM",
        "city": "daegu",
        "url": "/api/stream/?stn=ebs"
    },
    {
        "title": "TBN 대구교통방송",
        "city": "daegu",
        "url": "/api/stream/?stn=tbn&city=daegu"
    },
    {
        "title": "TBN 경북교통방송",
        "city": "daegu",
        "url": "/api/stream/?stn=tbn&city=gyeongbuk"
    },
    {
        "title": "대구CBS 표준FM",
        "city": "daegu",
        "url": "/api/stream/?stn=cbs&ch=sfm&city=daegu"
    },
    {
        "title": "대구CBS 음악FM",
        "city": "daegu",
        "url": "/api/stream/?stn=cbs&ch=mfm&city=daegu"
    },
    {
        "title": "포항CBS 표준FM",
        "city": "daegu",
        "url": "/api/stream/?stn=cbs&ch=sfm&city=pohang"
    },
    {
        "title": "FEBC 대구극동방송",
        "city": "daegu",
        "url": "/api/stream/?stn=febc&city=daegu"
    },
    {
        "title": "FEBC 포항극동방송",
        "city": "daegu",
        "url": "/api/stream/?stn=febc&city=pohang"
    },
    {
        "title": "BBS 대구불교방송",
        "city": "daegu",
        "url": "/api/stream/?stn=bbs&city=daegu"
    },
    {
        "title": "CPBC 대구가톨릭평화방송",
        "city": "daegu",
        "url": "/api/stream/?stn=cpbc&city=daegu"
    },
    {
        "title": "WBS 대구원음방송",
        "city": "daegu",
        "url": "/api/stream/?stn=wbs&city=daegu"
    },
    {
        "title": "국방FM",
        "city": "daegu",
        "url": "/api/stream/?stn=kookbang"
    },
    {
        "title": "AFN Go Daegu",
        "city": "daegu",
        "url": "/api/stream/?stn=afn&city=daegu"
    },
    //gwangju
    {
        "title": "KBS광주 1라디오",
        "city": "gwangju",
        "url": "/api/stream?stn=kbs&ch=1radio&city=gwangju"
    },
    {
        "title": "KBS광주 2라디오",
        "city": "gwangju",
        "url": "/api/stream?stn=kbs&ch=2radio&city=gwangju"
    },
    {
        "title": "KBS광주 음악FM",
        "city": "gwangju",
        "url": "/api/stream?stn=kbs&ch=1fm&city=gwangju"
    },
    {
        "title": "KBS목포 1라디오",
        "city": "gwangju",
        "url": "/api/stream?stn=kbs&ch=1radio&city=mokpo"
    },
    {
        "title": "KBS목포 음악FM",
        "city": "gwangju",
        "url": "/api/stream?stn=kbs&ch=1fm&city=mokpo"
    },
    {
        "title": "KBS순천 1라디오",
        "city": "gwangju",
        "url": "/api/stream?stn=kbs&ch=1radio&city=suncheon"
    },
    {
        "title": "광주MBC 표준FM",
        "city": "gwangju",
        "url": "/api/stream?stn=mbc&ch=sfm&city=gwangju"
    },
    {
        "title": "광주MBC FM4U",
        "city": "gwangju",
        "url": "/api/stream?stn=mbc&ch=fm4u&city=gwangju"
    },
    {
        "title": "목포MBC 표준FM",
        "city": "gwangju",
        "url": "/api/stream?stn=mbc&ch=sfm&city=mokpo"
    },
    {
        "title": "목포MBC FM4U",
        "city": "gwangju",
        "url": "/api/stream?stn=mbc&ch=fm4u&city=mokpo"
    },
    {
        "title": "여수MBC 표준FM",
        "city": "gwangju",
        "url": "/api/stream?stn=mbc&ch=sfm&city=yeosu"
    },
    {
        "title": "여수MBC FM4U",
        "city": "gwangju",
        "url": "/api/stream?stn=mbc&ch=fm4u&city=yeosu"
    },
    {
        "title": "KBC 마이FM",
        "city": "gwangju",
        "url": "/api/stream?stn=sbs&ch=powerfm&city=gwangju"
    },
    {
        "title": "EBS FM",
        "city": "gwangju",
        "url": "/api/stream?stn=ebs"
    },
    {
        "title": "TBN 광주교통방송",
        "city": "gwangju",
        "url": "/api/stream?stn=tbn&city=gwangju"
    },
    {
        "title": "광주CBS 표준FM",
        "city": "gwangju",
        "url": "/api/stream?stn=cbs&ch=sfm&city=gwangju"
    },
    {
        "title": "전남CBS 표준FM",
        "city": "gwangju",
        "url": "/api/stream?stn=cbs&ch=sfm&city=jeonnam"
    },
    {
        "title": "FEBC 광주극동방송",
        "city": "gwangju",
        "url": "/api/stream?stn=febc&city=gwangju"
    },
    {
        "title": "FEBC 목포극동방송",
        "city": "gwangju",
        "url": "/api/stream?stn=febc&city=mokpo"
    },
    {
        "title": "FEBC 전남동부극동방송",
        "city": "gwangju",
        "url": "/api/stream?stn=febc&city=jeonnam"
    },
    {
        "title": "BBS 광주불교방송",
        "city": "gwangju",
        "url": "/api/stream?stn=bbs&city=gwangju"
    },
    {
        "title": "CPBC 광주가톨릭평화방송",
        "city": "gwangju",
        "url": "/api/stream?stn=cpbc&city=gwangju"
    },
    {
        "title": "WBS 광주원음방송",
        "city": "gwangju",
        "url": "/api/stream?stn=wbs&city=gwangju"
    },
    {
        "title": "국방FM",
        "city": "gwangju",
        "url": "/api/stream?stn=kookbang"
    },
    //jeonbuk
    {
        "title": "KBS전주 1라디오",
        "city": "jeonbuk",
        "url": "/api/stream?stn=kbs&ch=1radio&city=jeonju"
    },
    {
        "title": "KBS전주 2라디오",
        "city": "jeonbuk",
        "url": "/api/stream?stn=kbs&ch=2radio&city=jeonju"
    },
    {
        "title": "KBS전주 음악FM",
        "city": "jeonbuk",
        "url": "/api/stream?stn=kbs&ch=1fm&city=jeonju"
    },
    {
        "title": "전주MBC 표준FM",
        "city": "jeonbuk",
        "url": "/api/stream?stn=mbc&ch=sfm&city=jeonju"
    },
    {
        "title": "전주MBC FM4U",
        "city": "jeonbuk",
        "url": "/api/stream?stn=mbc&ch=fm4u&city=jeonju"
    },
    {
        "title": "JTV 매직FM",
        "city": "jeonbuk",
        "url": "/api/stream?stn=sbs&ch=powerfm&city=jeonju"
    },
    {
        "title": "EBS FM",
        "city": "jeonbuk",
        "url": "/api/stream?stn=ebs"
    },
    {
        "title": "TBN 전북교통방송",
        "city": "jeonbuk",
        "url": "/api/stream?stn=tbn&city=jeonbuk"
    },
    {
        "title": "전북CBS 표준FM",
        "city": "jeonbuk",
        "url": "/api/stream?stn=cbs&ch=sfm&city=jeonbuk"
    },
    {
        "title": "FEBC 전북극동방송",
        "city": "jeonbuk",
        "url": "/api/stream?stn=febc&city=jeonbuk"
    },
    {
        "title": "WBS 전북원음방송",
        "city": "jeonbuk",
        "url": "/api/stream?stn=wbs&city=jeonbuk"
    },
    {
        "title": "국방FM",
        "city": "jeonbuk",
        "url": "/api/stream?stn=kookbang"
    },
    {
        "title": "AFN Go Kunsan",
        "city": "jeonbuk",
        "url": "/api/stream?stn=afn&city=kunsan"
    },
    //daejeon
    {
        "title": "KBS대전 1라디오",
        "city": "daejeon",
        "url": "/api/stream?stn=kbs&ch=1radio&city=daejeon"
    },
    {
        "title": "KBS대전 2라디오",
        "city": "daejeon",
        "url": "/api/stream?stn=kbs&ch=2radio&city=daejeon"
    },
    {
        "title": "KBS대전 음악FM",
        "city": "daejeon",
        "url": "/api/stream?stn=kbs&ch=1fm&city=daejeon"
    },
    {
        "title": "대전MBC 표준FM",
        "city": "daejeon",
        "url": "/api/stream?stn=mbc&ch=sfm&city=daejeon"
    },
    {
        "title": "대전MBC FM4U",
        "city": "daejeon",
        "url": "/api/stream?stn=mbc&ch=fm4u&city=daejeon"
    },
    {
        "title": "TJB 파워FM",
        "city": "daejeon",
        "url": "/api/stream?stn=sbs&ch=powerfm&city=daejeon"
    },
    {
        "title": "EBS FM",
        "city": "daejeon",
        "url": "/api/stream?stn=ebs"
    },
    {
        "title": "TBN 대전교통방송",
        "city": "daejeon",
        "url": "/api/stream?stn=tbn&city=daejeon"
    },
    {
        "title": "대전CBS 표준FM",
        "city": "daejeon",
        "url": "/api/stream?stn=cbs&ch=sfm&city=daejeon"
    },
    {
        "title": "FEBC 대전극동방송",
        "city": "daejeon",
        "url": "/api/stream?stn=febc&city=daejeon"
    },
    {
        "title": "국방FM",
        "city": "daejeon",
        "url": "/api/stream?stn=kookbang"
    },
    //chungbuk
    {
        "title": "KBS청주 1라디오",
        "city": "chungbuk",
        "url": "/api/stream?stn=kbs&ch=1radio&city=cheongju"
    },
    {
        "title": "KBS청주 2라디오",
        "city": "chungbuk",
        "url": "/api/stream?stn=kbs&ch=2radio&city=cheongju"
    },
    {
        "title": "KBS청주 음악FM",
        "city": "chungbuk",
        "url": "/api/stream?stn=kbs&ch=1fm&city=cheongju"
    },
    {
        "title": "MBC충북 표준FM",
        "city": "chungbuk",
        "url": "/api/stream?stn=mbc&ch=sfm&city=cheongju"
    },
    {
        "title": "MBC충북 FM4U",
        "city": "chungbuk",
        "url": "/api/stream?stn=mbc&ch=fm4u&city=cheongju"
    },
    {
        "title": "CJB 조이FM",
        "city": "chungbuk",
        "url": "/api/stream?stn=sbs&ch=powerfm&city=cheongju"
    },
    {
        "title": "EBS FM",
        "city": "chungbuk",
        "url": "/api/stream?stn=ebs"
    },
    {
        "title": "TBN 충북교통방송",
        "city": "chungbuk",
        "url": "/api/stream?stn=tbn&city=chungbuk"
    },
    {
        "title": "충북CBS 표준FM",
        "city": "chungbuk",
        "url": "/api/stream?stn=cbs&ch=sfm&city=cheongju"
    },
    {
        "title": "국방FM",
        "city": "chungbuk",
        "url": "/api/stream?stn=kookbang"
    },
    //gangwon
    {
        "title": "KBS춘천 1라디오",
        "city": "gangwon",
        "url": "/api/stream?stn=kbs&ch=1radio&city=chuncheon"
    },
    {
        "title": "KBS춘천 2라디오",
        "city": "gangwon",
        "url": "/api/stream?stn=kbs&ch=2radio&city=chuncheon"
    },
    {
        "title": "KBS춘천 음악FM",
        "city": "gangwon",
        "url": "/api/stream?stn=kbs&ch=1fm&city=chuncheon"
    },
    {
        "title": "KBS원주 1라디오",
        "city": "gangwon",
        "url": "/api/stream?stn=kbs&ch=1radio&city=wonju"
    },
    {
        "title": "KBS원주 음악FM",
        "city": "gangwon",
        "url": "/api/stream?stn=kbs&ch=1fm&city=wonju"
    },
    {
        "title": "춘천MBC 표준FM",
        "city": "gangwon",
        "url": "/api/stream?stn=mbc&ch=sfm&city=chuncheon"
    },
    {
        "title": "춘천MBC FM4U",
        "city": "gangwon",
        "url": "/api/stream?stn=mbc&ch=fm4u&city=chuncheon"
    },
    {
        "title": "원주MBC 표준FM",
        "city": "gangwon",
        "url": "/api/stream?stn=mbc&ch=sfm&city=wonju"
    },
    {
        "title": "원주MBC FM4U",
        "city": "gangwon",
        "url": "/api/stream?stn=mbc&ch=fm4u&city=wonju"
    },
    {
        "title": "MBC강원영동 표준FM",
        "city": "gangwon",
        "url": "/api/stream?stn=mbc&ch=sfm&city=gangneung"
    },
    {
        "title": "MBC강원영동 FM4U",
        "city": "gangwon",
        "url": "/api/stream?stn=mbc&ch=fm4u&city=gangneung"
    },
    {
        "title": "G1 프레쉬FM",
        "city": "gangwon",
        "url": "/api/stream?stn=sbs&ch=powerfm&city=chuncheon"
    },
    {
        "title": "EBS FM",
        "city": "gangwon",
        "url": "/api/stream?stn=ebs"
    },
    {
        "title": "TBN 강원교통방송",
        "city": "gangwon",
        "url": "/api/stream?stn=tbn&city=gangwon"
    },
    {
        "title": "춘천CBS 표준FM",
        "city": "gangwon",
        "url": "/api/stream?stn=cbs&ch=sfm&city=chuncheon"
    },
    {
        "title": "FEBC 영동극동방송",
        "city": "gangwon",
        "url": "/api/stream?stn=febc&city=gangwon"
    },
    {
        "title": "국방FM",
        "city": "gangwon",
        "url": "/api/stream?stn=kookbang"
    },
    //jeju
    {
        "title": "KBS제주 1라디오",
        "city": "jeju",
        "url": "/api/stream?stn=kbs&ch=1radio&city=jeju"
    },
    {
        "title": "KBS제주 2라디오",
        "city": "jeju",
        "url": "/api/stream?stn=kbs&ch=2radio&city=jeju"
    },
    {
        "title": "KBS제주 음악FM",
        "city": "jeju",
        "url": "/api/stream?stn=kbs&ch=1fm&city=jeju"
    },
    {
        "title": "제주MBC 표준FM",
        "city": "jeju",
        "url": "/api/stream?stn=mbc&ch=sfm&city=jeju"
    },
    {
        "title": "제주MBC FM4U",
        "city": "jeju",
        "url": "/api/stream?stn=mbc&ch=fm4u&city=jeju"
    },
    {
        "title": "JIBS 뉴파워FM",
        "city": "jeju",
        "url": "/api/stream?stn=sbs&ch=powerfm&city=jeju"
    },
    {
        "title": "EBS FM",
        "city": "jeju",
        "url": "/api/stream?stn=ebs"
    },
    {
        "title": "TBN 제주교통방송",
        "city": "jeju",
        "url": "/api/stream?stn=tbn&city=jeju"
    },
    {
        "title": "제주CBS 표준FM",
        "city": "jeju",
        "url": "/api/stream?stn=cbs&ch=sfm&city=jeju"
    },
    {
        "title": "FEBC 제주극동방송",
        "city": "jeju",
        "url": "/api/stream?stn=febc&city=jeju"
    },
    {
        "title": "국방FM",
        "city": "jeju",
        "url": "/api/stream?stn=kookbang"
    }
];

export default radioData;