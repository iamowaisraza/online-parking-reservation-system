
const ParkingSection = ({viewSectionHandler}) => {
    return (
        <>
            <div
                style={{ width: '20%', height: '200px', backgroundColor: '#eee', textAlign: 'center', lineHeight: '180px', cursor: 'pointer' }}
                onClick={viewSectionHandler}
            >
                <span style={{ fontSize: '70px' }}>+</span>
            </div>
        </>
    )
}

export default ParkingSection;