

export default function RegionStationList({ region, playFunc }) {
    const radioData = require('/public/radioStations.json');

    return (<>

        {radioData.filter(radio => radio.city === region).map((radio, index) => (
            <div className='station-item' key={index} onClick={() => [playFunc(radio)]}>
                {radio.title}
            </div>
        ))}

    </>)
}