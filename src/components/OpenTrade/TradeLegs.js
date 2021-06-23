import { PlusIcon as PlusIconSolid, MinusIcon as MinusIconSolid } from '@heroicons/react/solid'
import Button from '../UI/Button';
import FormInput from '../UI/Input';
import BuySellToggle from '../UI/Toggle';

function TradeLegs(props) {
    return (
        <div class='flex flex-row'>
        <div>
            {/* {Delete Leg Button} */}
            <Button
                type='button'
                className='inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
                <MinusIconSolid className="h-5 w-5" aria-hidden="true" />
            </Button>
         </div>   
        <div>
            {/* Add leg button */}
            <Button
                type='button'
                className='inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
                <PlusIconSolid className="h-5 w-5" aria-hidden="true" />
            </Button>
        </div>
        <div>
            {/* Price */}
            <FormInput
                type='number'
                step='0.01'
                label='Price'
            >
            </FormInput>
        </div>
        <div>
            {/* Buy/Sell Toggle */}
            <BuySellToggle></BuySellToggle>
        </div>
        <div>
            {/* Call/Put Toggle */}
            <BuySellToggle></BuySellToggle>
        </div>
        <div>
            {/* Strike Selector */}
            <FormInput
                type='number'
                step='0.01'
                label='Strike'
            >
            </FormInput>
        </div>
        </div>

    );
}

export default TradeLegs;