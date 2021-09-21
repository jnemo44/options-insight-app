import { PlusIcon as PlusIconSolid, MinusIcon as MinusIconSolid } from '@heroicons/react/solid'
import Button from '../UI/Button';
import FormInput from '../UI/Input';
import BuySellToggle from '../UI/Toggle';

function TradeLegs(props) {
    props.tradeLegs.map((element, index) => {
        return (
            <div className="grid">
                <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label htmlFor="legStrike" className="block text-xs font-medium text-gray-900">
                        Strike
                    </label>
                    <input
                        type="text"
                        name="legStrike"
                        id={"Strike" + index}
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Enter Strike"
                        defaultValue={(props.edit && index in props.tradeInfo.tradeLegs) ? props.tradeInfo.tradeLegs[index].legStrike : null}
                        onChange={e => props.handleInputChange(index, e)}
                    />
                </div>
                <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label htmlFor="legPrice" className="block text-xs font-medium text-gray-900">
                        Price
                    </label>
                    <input
                        type="number"
                        name="legPrice"
                        step="0.01"
                        id={"Price" + index}
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Enter Price"
                        defaultValue={(props.edit && index in props.tradeInfo.tradeLegs) ? props.tradeInfo.tradeLegs[index].legPrice : null}
                        onChange={e => props.handleInputChange(index, e)}
                    />
                </div>
                <div className="flex content-center">
                    <Button
                        type="button"
                        onClick={() => props.removeTradeLegHandler(index)}
                        name="Delete"
                        className="btn-delete">
                    </Button>
                </div>
            </div>
        )
    })

}

export default TradeLegs;