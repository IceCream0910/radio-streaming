export default async function handler(req, res) {
    const { stn, ch, city } = req.query;

    let song;

    if (stn == 'mbc') {
        const response = await fetch(`https://miniapi.imbc.com/music/somitem?rtype=jsonp&callback=__somitem`);
        const text = await response.text();
        const data = JSON.parse(text.replace('__somitem(', '').slice(0, -1));

        const matchingItem = data.find(item => item.Channel.toLowerCase() === ch.toLowerCase());
        if (matchingItem) {
            song = matchingItem.SomItem.replace('♬', '');
        }
        if (!song) {
            song = '';
        }
        res.status(200).json({ song: song });
    }
}