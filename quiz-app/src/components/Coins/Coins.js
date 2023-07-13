import coinA from '../../Assets/coinA.png';
import coinB from '../../Assets/coinB.png';
import coinC from '../../Assets/coinC.png';
import coinD from '../../Assets/coinD.png';

const Coin = ()=>{
return (
    // <div className='coin-child'>
    //     <img src={coinA} alt="" className='coin' />
    //     <img src={coinB} alt="" className='coin'/>
    //     <img src={coinC} alt="" className='coin'/>
    //     <img src={coinD} alt="" className='coin'/>
    // </div>
    <>
    <div className='coinA coin-child'>
        <img src={coinA} alt="" className='coin' />
    </div >
    <div className='coinB coin-child'>
        <img src={coinB} alt="" className='coin' />
    </div>
    <div className='coinC coin-child'>
        <img src={coinC} alt="" className='coin' />
    </div>
    <div className='coinD coin-child'>
        <img src={coinD} alt="" className='coin' />
    </div>
    </>
)
}

export default Coin;