import radioData from '../utils/radioStations'

export default function RegionStationList({ region, playFunc }) {

    return (<>

        {radioData.filter(radio => radio.city === region).map((radio, index) => (
            <div className='station-item' key={index} onClick={() => [playFunc(radio)]}>
                {radio.title}
            </div>
        ))}

    </>)
}