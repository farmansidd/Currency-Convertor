import React, {useId} from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
   const amountInputId = useId()

    return (
        <div className={`input-field ${className}`}>
            <div>
                <label htmlFor={amountInputId} className="input-label">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="currency-input"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount || ''}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div>
                <p className="currency-label">Currency Type</p>
                <div className="currency-select">
                    <select
                        value={selectCurrency}
                        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                        disabled={currencyDisable}
                    >
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <span className="dropdown-icon">▼</span>
                </div>
            </div>
        </div>
    );
}

export default InputBox;