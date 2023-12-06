export default async function handler(req, res) {
    const { stn, ch, city } = req.query;

    let title;
    let result;

    //kbs
    if (stn == 'kbs') {
        let code;
        switch (city) {
            case 'busan':
                code = '10_';
                title = 'KBS부산 ';
                break;
            case 'changwon':
                code = '20_';
                title = 'KBS창원 ';
                break;
            case 'jinju':
                code = '21_';
                title = 'KBS진주 ';
                break;
            case 'daegu':
                code = '30_';
                title = 'KBS대구 ';
                break;
            case 'andong':
                code = '31_';
                title = 'KBS안동 ';
                break;
            case 'pohang':
                code = '32_';
                title = 'KBS포항 ';
                break;
            case 'gwangju':
                code = '40_';
                title = 'KBS광주 ';
                break;
            case 'mokpo':
                code = '41_';
                title = 'KBS목포 ';
                break;
            case 'suncheon':
                code = '43_';
                title = 'KBS순천 ';
                break;
            case 'jeonju':
                code = '50_';
                title = 'KBS전주 ';
                break;
            case 'daejeon':
                code = '60_';
                title = 'KBS대전 ';
                break;
            case 'cheongju':
                code = '70_';
                title = 'KBS청주 ';
                break;
            case 'chuncheon':
                code = '80_';
                title = 'KBS춘천 ';
                break;
            case 'gangneung':
                code = '81_';
                title = 'KBS강릉 ';
                break;
            case 'wonju':
                code = '82_';
                title = 'KBS원주 ';
                break;
            case 'jeju':
                code = '90_';
                title = 'KBS제주 ';
                break;
            default:
                code = '';
                title = 'KBS ';
                break;
        }

        switch (ch) {
            case '1radio':
                code += '21';
                title += '1라디오';
                break;
            case '2radio':
                code += '22';
                title += '2라디오';
                break;
            case '3radio':
                code += '23';
                title += '3라디오';
                break;
            case '1fm':
                code += '24';
                if (title == 'KBS ') { title += '1FM'; }
                else { title += '음악FM'; }
                break;
            case '2fm':
                code += '25';
                title += '2FM';
                break;
            case 'hanminjok':
                code += '26';
                title += '한민족방송';
                break;
        }

        const promise = await fetch("https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/" + code);
        try {
            const json = await promise.json();
            result = json.channel_item[0].service_url;
        } catch (e) {
            result = undefined;
        }
    }

    //mbc
    if (stn == 'mbc') {
        switch (ch) {
            case 'sfm': // MBC 표준FM
                switch (city) {
                    case 'busan':
                        result = "https://stream.bsmbc.com/live/mp4:BusanMBC-LiveStream-AM/playlist.m3u8";
                        title = '부산MBC';
                        break;
                    case 'ulsan':
                        result = "https://5ddfd163bd00d.streamlock.net/STDFM/STDFM/playlist.m3u8";
                        title = '울산MBC';
                        break;
                    case 'changwon':
                        result = "https://624a79c87201d.streamlock.net/MBCFM/TV2.stream/playlist.m3u8";
                        title = 'MBC경남';
                        break;
                    case 'daegu':
                        result = "https://5ee1ec6f32118.streamlock.net/amradio/am/playlist.m3u8";
                        title = '대구MBC';
                        break;
                    case 'andong':
                        result = "https://live.andongmbc.co.kr/live/amlive/playlist.m3u8";
                        title = '안동MBC';
                        break;
                    case 'pohang':
                        result = "http://stream.yubinet.com:1935/live/_definst_/Radio_Am/playlist.m3u8";
                        title = '포항MBC';
                        break;
                    case 'gwangju':
                        result = "https://media.kjmbc.co.kr/hls/amlive/GWANGJU-MBC-AM/playlist.m3u8";
                        title = '광주MBC';
                        break;
                    case 'mokpo':
                        result = "https://vod.mpmbc.co.kr/live/encoder-am/playlist.m3u8";
                        title = '목포MBC';
                        break;
                    case 'yeosu':
                        result = "https://5c3639aa99149.streamlock.net/표준FM/표준FM/playlist.m3u8";
                        title = '여수MBC';
                        break;
                    case 'jeonju':
                        result = "https://5ee9633b25727.streamlock.net/jmbc_sfm/myStream/playlist.m3u8";
                        title = '전주MBC';
                        break;
                    case 'daejeon':
                        result = "https://ns1.tjmbc.co.kr/live_am/live_am.stream/playlist.m3u8";
                        title = '대전MBC';
                        break;
                    case 'cheongju':
                        result = "https://mbccbp.coreit.co.kr/radio_stfm/myStream.sdp/playlist.m3u8";
                        title = 'MBC충북';
                        break;
                    case 'chuncheon':
                        result = "https://stream.chmbc.co.kr/live_radio/fm2/playlist.m3u8";
                        title = '춘천MBC';
                        break;
                    case 'wonju':
                        result = "mms://live.wjmbc.co.kr/fm2";
                        title = '원주MBC';
                        break;
                    case 'gangneung':
                        result = "http://123.254.72.24:1935/amlive/livestream/playlist.m3u8";
                        title = 'MBC강원영동';
                        break;
                    case 'jeju':
                        result = "https://wowza.jejumbc.com/live/_definst_/mp3:radio1/playlist.m3u8";
                        title = '제주MBC';
                        break;
                    default:
                        const promise = await fetch("https://sminiplay.imbc.com/aacplay.ashx?agent=webapp&channel=sfm");
                        const text = await promise.text();
                        result = text;
                        title = 'MBC';
                        break;
                }
                title += ' 표준FM';
                break;
            case 'fm4u':  // MBC FM4U
                switch (city) {
                    case 'busan':
                        result = "https://stream.bsmbc.com/live/mp4:BusanMBC-LiveStream-FM/playlist.m3u8";
                        title = '부산MBC';
                        break;
                    case 'ulsan':
                        result = "https://5ddfd163bd00d.streamlock.net/FM4U/FM4U/playlist.m3u8";
                        title = '울산MBC';
                        break;
                    case 'changwon':
                        result = "https://624a79c87201d.streamlock.net/MBCFM4U/TV3.stream/playlist.m3u8";
                        title = 'MBC경남';
                        break;
                    case 'daegu':
                        result = "https://5ee1ec6f32118.streamlock.net/fmradio/fm/playlist.m3u8";
                        title = '대구MBC';
                        break;
                    case 'andong':
                        result = "https://live.andongmbc.co.kr/live/fmlive/playlist.m3u8";
                        title = '안동MBC';
                        break;
                    case 'pohang':
                        result = "http://stream.yubinet.com:1935/live/_definst_/Radio_Fm/playlist.m3u8";
                        title = '포항MBC';
                        break;
                    case 'gwangju':
                        result = "https://media.kjmbc.co.kr/hls/fmlive/GWANGJU-MBC-FM/playlist.m3u8";
                        title = '광주MBC';
                        break;
                    case 'mokpo':
                        result = "https://vod.mpmbc.co.kr/live/encoder-fm/playlist.m3u8";
                        title = '목포MBC';
                        break;
                    case 'yeosu':
                        result = "https://5c3639aa99149.streamlock.net/FM4U/FM4U/playlist.m3u8";
                        title = '여수MBC';
                        break;
                    case 'jeonju':
                        result = "https://5ee9633b25727.streamlock.net/jmbc_fm4u/myStream/playlist.m3u8";
                        title = '전주MBC';
                        break;
                    case 'daejeon':
                        result = "https://ns1.tjmbc.co.kr/live_fm/live_fm.stream/playlist.m3u8";
                        title = '대전MBC';
                        break;
                    case 'cheongju':
                        result = "https://mbccbp.coreit.co.kr/radio_fm/myStream.sdp/playlist.m3u8";
                        title = 'MBC충북';
                        break;
                    case 'chuncheon':
                        result = "https://stream.chmbc.co.kr/live_radio2/fm1/playlist.m3u8";
                        title = '춘천MBC';
                        break;
                    case 'wonju':
                        result = "mms://live.wjmbc.co.kr/fm989";
                        title = '원주MBC';
                        break;
                    case 'gangneung':
                        result = "http://123.254.72.24:1935/fmlive/livestream/playlist.m3u8";
                        title = 'MBC강원영동';
                        break;
                    case 'jeju':
                        result = "https://wowza.jejumbc.com/live/_definst_/mp3:radio2/playlist.m3u8";
                        title = '제주MBC';
                        break;
                    default:
                        const promise = await fetch("https://sminiplay.imbc.com/aacplay.ashx?agent=webapp&channel=mfm");
                        const text = await promise.text();
                        result = text;
                        title = 'MBC';
                        break;
                }
                title += ' FM4U';
                break;
            case "chm":
                const promise = await fetch("https://sminiplay.imbc.com/aacplay.ashx?agent=webapp&channel=chm");
                const text = await promise.text();
                result = text;
                title = 'MBC mini 올댓뮤직';
                break;
        }
    }

    //sbs
    if (stn == 'sbs') {
        let text;

        switch (ch) {
            case 'lovefm':  // SBS 러브FM
                switch (city) {
                    case 'busan':
                        result = "https://stream1.knn.co.kr/hls/b3y26uu6471k8tes9w7h_lfm/index.m3u8";
                        title = 'KNN 러브FM';
                        break;
                    default:
                        const promise = await fetch("https://apis.sbs.co.kr/play-api/1.0/livestream/lovepc/lovefm?protocol=hls&ssl=Y");
                        text = await promise.text();
                        result = text;
                        title = 'SBS 러브FM';
                        break;
                }
                break;
            case 'powerfm': // SBS 파워FM
                switch (city) {
                    case 'busan':
                        result = "https://stream1.knn.co.kr/hls/lb9ezl87d37uu0vy65bb_pfm/index.m3u8";
                        title = 'KNN 파워FM';
                        break;
                    case 'ulsan':
                        result = "http://59.23.231.102:1935/live/mp3:UBCfmstream/playlist.m3u8";
                        title = 'UBC 그린FM';
                        break;
                    case 'daegu':
                        result = "http://203.251.91.122:1935/on-air-Backup/fm/playlist.m3u8";
                        title = 'TBC 드림FM';
                        break;
                    case 'gwangju':
                        result = "https://vod.ikbc.co.kr/KBCFM/kbcra_aac/playlist.m3u8";
                        title = 'KBC 마이FM';
                        break;
                    case 'jeonju':
                        result = "http://61.85.197.53:1935/jtv_radio/myStream/playlist.m3u8";
                        title = 'JTV 매직FM';
                        break;
                    case 'daejeon':
                        result = "http://1.245.74.5/radiolive/radio_64k/playlist.m3u8";
                        title = 'TJB 파워FM';
                        break;
                    case 'cheongju':
                        result = "https://wowza1.cjb.co.kr/live/cjbradio/playlist.m3u8";
                        title = 'CJB 조이FM';
                        break;
                    case 'chuncheon':
                        result = "http://61.82.49.4:1935/fm/_definst_/myStream/playlist.m3u8";
                        title = 'G1 프레쉬FM';
                        break;
                    case 'jeju':
                        result = "http://123.140.197.22/stream/2/play.m3u8";
                        title = 'JIBS 뉴파워FM';
                        break;
                    default:
                        const promise = await fetch("https://apis.sbs.co.kr/play-api/1.0/livestream/powerpc/powerfm?protocol=hls&ssl=Y");
                        text = await promise.text();
                        result = text;
                        title = 'SBS 파워FM';
                        break;
                }
                break;
            case "dmb":
                const promise = await fetch("https://apis.sbs.co.kr/play-api/1.0/livestream/sbsdmbpc/sbsdmb?protocol=hls&ssl=Y");
                text = await promise.text();
                result = text;
                title = 'SBS 고릴라디오M';

                break;
        }
    }

    //tbn
    if (stn == 'tbn') {
        title = 'TBN ';
        switch (city) {
            case 'busan':
                result = "http://radio2.tbn.or.kr:1935/busan/myStream/playlist.m3u8";
                title += '부산교통방송';
                break;
            case 'ulsan':
                result = "http://radio2.tbn.or.kr:1935/ulsan/myStream/playlist.m3u8";
                title += '울산교통방송';
                break;
            case 'gyeongnam':
                result = "http://radio2.tbn.or.kr:1935/gyeongnam/myStream/playlist.m3u8";
                title += '경남교통방송';
                break;
            case 'daegu':
                result = "http://radio2.tbn.or.kr:1935/daegu/myStream/playlist.m3u8";
                title += '대구교통방송';
                break;
            case 'gyeongbuk':
                result = "http://radio2.tbn.or.kr:1935/kyungbuk/myStream/playlist.m3u8";
                title += '경북교통방송';
                break;
            case 'gwangju':
                result = "http://radio2.tbn.or.kr:1935/gwangju/myStream/playlist.m3u8";
                title += '광주교통방송';
                break;
            case 'jeonbuk':
                result = "http://radio2.tbn.or.kr:1935/jeonbuk/myStream/playlist.m3u8";
                title += '전북교통방송';
                break;
            case 'daejeon':
                result = "http://radio2.tbn.or.kr:1935/daejeon/myStream/playlist.m3u8";
                title += '대전교통방송';
                break;
            case 'chungbuk':
                result = "http://radio2.tbn.or.kr:1935/chungbuk/myStream/playlist.m3u8";
                title += '충북교통방송';
                break;
            case 'gangwon':
                result = "http://radio2.tbn.or.kr:1935/gangwon/myStream/playlist.m3u8";
                title += '강원교통방송';
                break;
            case 'jeju':
                result = "http://radio2.tbn.or.kr:1935/jeju/myStream/playlist.m3u8";
                title += '제주교통방송';
                break;
            default:
                result = "http://radio2.tbn.or.kr:1935/gyeongin/myStream/playlist.m3u8";
                title += '경인교통방송';
                break;
        }
    }

    //cbs
    if (stn == 'cbs') {
        switch (ch) {
            case 'sfm': // CBS 표준FM
                switch (city) {
                    case 'busan':
                        result = "https://aac.cbs.co.kr/busan981/_definst_/busan981.stream/playlist.m3u8";
                        title = '부산';
                        break;
                    case 'ulsan':
                        result = "https://aac.cbs.co.kr/ulsan/_definst_/ulsan.stream/playlist.m3u8";
                        title = '울산';
                        break;
                    case 'gyeongnam':
                        result = "https://aac.cbs.co.kr/gyeongnam/_definst_/gyeongnam.stream/playlist.m3u8";
                        title = '경남';
                        break;
                    case 'daegu':
                        result = "https://aac.cbs.co.kr/daegu/_definst_/daegu.stream/playlist.m3u8";
                        title = '대구';
                        break;
                    case 'pohang':
                        result = "https://aac.cbs.co.kr/pohang/_definst_/pohang.stream/playlist.m3u8";
                        title = '포항';
                        break;
                    case 'gwangju':
                        result = "https://aac.cbs.co.kr/gwangju/_definst_/gwangju.stream/playlist.m3u8";
                        title = '광주';
                        break;
                    case 'jeonnam':
                        result = "https://aac.cbs.co.kr/jeonnam/_definst_/jeonnam.stream/playlist.m3u8";
                        title = '전남';
                        break;
                    case 'jeonbuk':
                        result = "https://aac.cbs.co.kr/jeonbuk/_definst_/jeonbuk.stream/playlist.m3u8";
                        title = '전북';
                        break;
                    case 'daejeon':
                        result = "https://aac.cbs.co.kr/daejeon/_definst_/daejeon.stream/playlist.m3u8";
                        title = '대전';
                        break;
                    case 'cheongju':
                        result = "https://aac.cbs.co.kr/cheongju/_definst_/cheongju.stream/playlist.m3u8";
                        title = '청주';
                        break;
                    case 'chuncheon':
                        result = "https://aac.cbs.co.kr/chuncheon/_definst_/chuncheon.stream/playlist.m3u8";
                        title = '춘천';
                        break;
                    case 'jeju':
                        result = "https://aac.cbs.co.kr/jeju/_definst_/jeju.stream/playlist.m3u8";
                        title = '제주';
                        break;
                    default:
                        result = "https://aac.cbs.co.kr/cbs981/_definst_/cbs981.stream/playlist.m3u8";
                        title = '';
                        break;
                }
                title += 'CBS 표준FM';
                break;
            case 'mfm': // CBS 음악FM
                switch (city) {
                    case 'busan':
                        result = "https://aac.cbs.co.kr/busan939/_definst_/busan939.stream/playlist.m3u8";
                        title = '부산';
                        break;
                    case 'daegu':
                        result = "https://aac.cbs.co.kr/daegu939/_definst_/daegu939.stream/playlist.m3u8";
                        title = '대구';
                        break;
                    default:
                        result = "https://aac.cbs.co.kr/cbs939/_definst_/cbs939.stream/playlist.m3u8";
                        title = '';
                        break;
                }
                title += 'CBS 음악FM';
                break;
        }
    }

    //febc
    if (stn == 'febc') {
        switch (city) {
            case 'busan':
                result = "http://mlive2.febc.net:1935/live/bsfebc/playlist.m3u8";
                title = 'FEBC 부산극동방송';
                break;
            case 'ulsan':
                result = "http://mlive2.febc.net:1935/live/uslive/playlist.m3u8";
                title = 'FEBC 울산극동방송';
                break;
            case 'changwon':
                result = "http://mlive2.febc.net:1935/live/cwlive/playlist.m3u8";
                title = 'FEBC 창원극동방송';
                break;
            case 'daegu':
                result = "http://220.73.173.216:1935/live/daegulive/playlist.m3u8";
                title = 'FEBC 대구극동방송';
                break;
            case 'pohang':
                result = "http://mlive2.febc.net:1935/live/phlive/playlist.m3u8";
                title = 'FEBC 포항극동방송';
                break;
            case 'gwangju':
                result = "http://mlive2.febc.net:1935/live/gjlive/playlist.m3u8";
                title = 'FEBC 광주극동방송';
                break;
            case 'mokpo':
                result = "http://mlive2.febc.net:1935/live/mplive/playlist.m3u8";
                title = 'FEBC 목포극동방송';
                break;
            case 'jeonnam':
                result = "http://mlive2.febc.net:1935/live/jndblive/playlist.m3u8";
                title = 'FEBC 전남동부극동방송';
                break;
            case 'jeonbuk':
                result = "http://mlive2.febc.net:1935/live/jblive/playlist.m3u8";
                title = 'FEBC 전북극동방송';
                break;
            case 'daejeon':
                result = "http://mlive2.febc.net:1935/live/djlive/playlist.m3u8";
                title = 'FEBC 대전극동방송';
                break;
            case 'gangwon':
                result = "http://mlive2.febc.net:1935/live/ydlive/playlist.m3u8";
                title = 'FEBC 영동극동방송';
                break;
            case 'jeju':
                result = "http://mlive2.febc.net:1935/live/jejufm/playlist.m3u8";
                title = 'FEBC 제주극동방송FM';
                break;
            default:
                result = "http://mlive2.febc.net:1935/live/seoulfm/playlist.m3u8";
                title = 'FEBC 서울극동방송FM';
                break;
        }
    }

    //bbs
    if (stn == 'bbs') {
        switch (city) {
            case 'gwangju':
                result = "http://live.cdn.smilecdn.com:1935/kjbbs1_live/live/playlist.m3u8";
                title = 'BBS 광주불교방송';
                break;
            case 'daegu':
                result = "https://bbslive.goldenday.kr:446/hls/dgbbs.m3u8";
                title = 'BBS 대구불교방송';
                break;
            default:
                result = "https://bbslive.clouducs.com/bbsradio-live/livestream/playlist.m3u8";
                title = 'BBS 서울불교방송';
                break;
        }
    }

    //cpbs
    if (stn == 'cpbc') {
        switch (city) {
            case 'busan':
                result = "http://pbcradio.dynamicsmart.com:1935/radio/bscpbc-radio/index.m3u8";
                title = 'CPBC 부산가톨릭평화방송';
                break;
            case 'daegu':
                result = "http://live.dgcpbc.co.kr/dgcpbclive/livestream/playlist.m3u8";
                title = 'CPBC 대구가톨릭평화방송';
                break;
            case 'gwangju':
                result = "http://pbcradio.dynamicsmart.com:1935/radio/kjpbc2/index.m3u8";
                title = 'CPBC 광주가톨릭평화방송';
                break;
            default:
                const promise = await fetch("https://apis.cpbc.co.kr/play-api/2.0/onair/channel/radio");
                const json = await promise.json();
                result = await json.onair.source.mediasource.mediaurl;
                title = 'CPBC 가톨릭평화방송';
                break;
        }
    }

    //wbs
    if (stn == 'wbs') {
        switch (city) {
            case 'busan':
                result = "https://wbsradio.kr/wbs-b";
                title = 'WBS 부산원음방송';
                break;
            case 'daegu':
                result = "https://wbsradio.kr/wbs-d";
                title = 'WBS 대구원음방송';
                break;
            case 'gwangju':
                result = "https://wbsradio.kr/wbs-g";
                title = 'WBS 광주원음방송';
                break;
            case 'jeonbuk':
                result = "https://wbsradio.kr/wbs-j";
                title = 'WBS 전북원음방송';
                break;
            default:
                result = "https://wbsradio.kr/wbs-seoul";
                title = 'WBS 서울원음방송';
                break;
        }
    }

    //afn
    if (stn == 'afn') {
        switch (city) {
            case 'kunsan':
                result = "https://25433.live.streamtheworld.com/AFNP_KSNAAC.aac";
                title = 'AFN Go Kunsan';
                break;
            case 'daegu':
                result = "https://19263.live.streamtheworld.com/AFNP_DGUAAC.aac";
                title = 'AFN Go Daegu';
                break;
            default:
                result = "https://13743.live.streamtheworld.com/AFNP_OSNAAC.aac";
                title = 'AFN Go Humphreys';
                break;
        }
    }

    //tbs
    if (stn == 'tbs') {
        switch (ch) {
            // TBS FM
            case 'fm':
                result = "https://cdnfm.tbs.seoul.kr/tbs/_definst_/tbs_fm_web_360.smil/playlist.m3u8";
                title = 'TBS FM';
                break;
            // TBS eFM
            case 'efm':
                result = "https://cdnefm.tbs.seoul.kr/tbs/_definst_/tbs_efm_web_360.smil/playlist.m3u8";
                title = 'TBS eFM';
                break;
        }
    }

    /*----- EBS 라디오 -----*/
    if (stn == 'ebs') {
        result = "https://ebsonair.ebs.co.kr/fmradiofamilypc/familypc1m/playlist.m3u8";
        title = 'EBS FM';
    }

    /*----- YTN 라디오 -----*/
    if (stn == 'ytn') {
        result = "https://radiolive.ytn.co.kr/radio/_definst_/20211118_fmlive/playlist.m3u8";
        title = 'YTN 라디오';
    }

    /*----- iFM 경인방송 -----*/
    if (stn == 'ifm') {
        result = "https://180.131.1.27:1935/live/aod1/playlist.m3u8";
        title = 'iFM 경인방송';
    }

    /*----- OBS 라디오 -----*/
    if (stn == 'obs') {
        result = "https://vod3.obs.co.kr:444/live/obsstream1/radio.stream/playlist.m3u8";
        title = 'OBS 라디오';
    }

    /*----- 국방FM -----*/
    if (stn == 'kookbang') {
        result = "https://mediaworks.dema.mil.kr/live_edge/audio.sdp/playlist.m3u8";
        title = '국방FM';
    }

    /*----- 국악방송 -----*/
    if (stn == 'kugak') {
        result = "https://mgugaklive.nowcdn.co.kr/gugakradio/gugakradio.stream/playlist.m3u8";
        title = '국악방송';
    }

    if (result !== undefined) {
        const headers = {
            'Content-Type': 'audio/x-scpls',
            'Access-Control-Allow-Origin': '*', // 모든 URL 허용
            'Location': '/',
        };

        res.redirect(302, result, headers);
    } else {
        res.status(404).end();
    }
}